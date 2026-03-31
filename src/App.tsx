/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Services from './pages/Services';
import ServicesDetail from './pages/ServicesDetail';
import Locations from './pages/Locations';
import About from './pages/About';
import FAQ from './pages/FAQ';
import RequestBOQ from './pages/RequestBOQ';
import Estimator from './pages/Estimator';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import { AlertCircle } from 'lucide-react';
import { Toaster } from 'sonner';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/services" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/detail" element={<ServicesDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/request" element={<RequestBOQ />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </div>
      {!isAdminPage && (
        <>
          <div className="bg-slate-100 h-[1px] w-full"></div>
          <Footer />
          <ChatBot />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" expand={true} richColors />
      <ScrollToTop />
      <CustomCursor />
      <AppContent />
    </Router>
  );
}

