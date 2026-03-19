/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Services from './pages/Services';
import ServicesDetail from './pages/ServicesDetail';
import Locations from './pages/Locations';
import About from './pages/About';
import RequestBOQ from './pages/RequestBOQ';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/services" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/detail" element={<ServicesDetail />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/request" element={<RequestBOQ />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

