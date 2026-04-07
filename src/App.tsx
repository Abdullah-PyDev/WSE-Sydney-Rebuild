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
import Estimator from './pages/Estimator';
import RequestBOQ from './pages/RequestBOQ';
import ProjectDetail from './pages/ProjectDetail';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';

function AppContent() {
  const location = useLocation();
  const isEmbed = new URLSearchParams(location.search).get('embed') === 'true';

  return (
    <div className="min-h-screen flex flex-col">
      {!isEmbed && <CustomCursor />}
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/services" replace />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/detail" element={<ServicesDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/boq" element={<RequestBOQ />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
      {!isEmbed && <div className="bg-slate-100 h-[1px] w-full"></div>}
      <Footer />
      {!isEmbed && <ChatBot />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

