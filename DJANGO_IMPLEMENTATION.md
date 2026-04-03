# Django REST Framework Implementation Guide

This document provides the production-grade implementation of the usage-limiting and lead-capture system using Django REST Framework (DRF).

## 1. Project Structure

```text
backend/
├── core/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── estimator/
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── utils.py
└── manage.py
```

## 2. Models (`estimator/models.py`)

```python
from django.db import models
from django.utils import timezone

class UserSession(models.Model):
    ip_address = models.GenericIPAddressField()
    session_token = models.CharField(max_length=255, unique=True)
    usage_count = models.PositiveIntegerField(default=0)
    last_used = models.DateTimeField(auto_now=True)
    is_unlocked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ip_address} - {self.usage_count} uses"

class Lead(models.Model):
    session = models.ForeignKey(UserSession, on_delete=models.CASCADE, related_name='leads')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"
```

## 3. Serializers (`estimator/serializers.py`)

```python
from rest_framework import serializers
from .models import UserSession, Lead

class UserSessionSerializer(serializers.ModelSerializer):
    limit_reached = serializers.SerializerMethodField()

    class Meta:
        model = UserSession
        fields = ['usage_count', 'is_unlocked', 'limit_reached']

    def get_limit_reached(self, obj):
        return obj.usage_count >= 3

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['name', 'email', 'phone']
```

## 4. Views (`estimator/views.py`)

```python
from rest_framework import status, views
from rest_framework.response import Response
from .models import UserSession, Lead
from .serializers import UserSessionSerializer, LeadSerializer
from .utils import get_client_ip

class CheckLimitView(views.APIView):
    def get(self, request):
        session_token = request.headers.get('X-Session-Token')
        ip_address = get_client_ip(request)

        if not session_token:
            return Response({"error": "Session token required"}, status=status.HTTP_400_BAD_REQUEST)

        session, created = UserSession.objects.get_or_create(
            session_token=session_token,
            defaults={'ip_address': ip_address}
        )
        
        serializer = UserSessionSerializer(session)
        return Response(serializer.data)

class TrackUsageView(views.APIView):
    def post(self, request):
        session_token = request.headers.get('X-Session-Token')
        if not session_token:
            return Response({"error": "Session token required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = UserSession.objects.get(session_token=session_token)
        except UserSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        if session.usage_count >= 3 and not session.is_unlocked:
            return Response({"error": "Limit reached"}, status=status.HTTP_403_FORBIDDEN)

        session.usage_count += 1
        session.save()
        
        return Response({"success": True, "usage_count": session.usage_count})

class SubmitLeadView(views.APIView):
    def post(self, request):
        session_token = request.headers.get('X-Session-Token')
        if not session_token:
            return Response({"error": "Session token required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = UserSession.objects.get(session_token=session_token)
        except UserSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(session=session)
            session.is_unlocked = True
            session.save()
            return Response({"success": True, "message": "Lead captured and tool unlocked"})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## 5. Utils (`estimator/utils.py`)

```python
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
```

## 6. URLs (`estimator/urls.py`)

```python
from django.urls import path
from .views import CheckLimitView, TrackUsageView, SubmitLeadView

urlpatterns = [
    path('check-limit/', CheckLimitView.as_view(), name='check-limit'),
    path('track-usage/', TrackUsageView.as_view(), name='track-usage'),
    path('submit-lead/', SubmitLeadView.as_view(), name='submit-lead'),
]
```

## 7. Security & Performance (Advanced)

*   **Rate Limiting:** Use `rest_framework.throttling.AnonRateThrottle` to prevent brute-force usage.
*   **Redis Caching:** Cache the `UserSession` count in Redis for faster lookups.
*   **Token Rotation:** Rotate session tokens periodically to prevent long-term tracking bypass.
