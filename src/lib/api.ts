export interface BOQRequest {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  file?: File;
}

export const submitBOQRequest = async (data: BOQRequest) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('projectType', data.projectType);
  formData.append('description', data.description);
  if (data.file) {
    formData.append('file', data.file);
  }

  const response = await fetch('/api/boq-request', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to submit BOQ request');
  }

  return response.json();
};

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
    },
  });
  return response;
};
