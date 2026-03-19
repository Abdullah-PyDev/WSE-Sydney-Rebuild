import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, CheckCircle2 } from 'lucide-react';

export const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Locations', path: '/locations' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto h-20">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary font-headline">
          WSE Sydney
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-body text-sm transition-colors ${
                location.pathname === link.path
                  ? 'text-blue-700 border-b-2 border-blue-700 pb-1 font-bold'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/request"
            className="bg-primary text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-primary-container transition-all active:scale-95 duration-150"
          >
            Request a BOQ
          </Link>
        </div>
        <div className="md:hidden">
          <Menu className="text-primary" />
        </div>
      </div>
      <div className="bg-slate-100 h-[1px] w-full"></div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div className="col-span-1">
          <div className="text-lg font-black text-primary mb-6 font-headline">WSE SYDNEY</div>
          <p className="text-slate-500 text-xs leading-relaxed font-body">
            Professional water and sewer estimating solutions for civil engineering firms, developers, and government bodies.
          </p>
        </div>
        <div>
          <h5 className="font-headline uppercase tracking-wider text-xs font-bold text-primary mb-6">Regional Offices</h5>
          <ul className="space-y-4">
            <li><Link to="/locations" className="text-slate-500 text-xs hover:text-blue-600 underline-offset-4 hover:underline">Bankstown Head Office</Link></li>
            <li><Link to="/locations" className="text-slate-500 text-xs hover:text-blue-600 underline-offset-4 hover:underline">Regional Offices</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-headline uppercase tracking-wider text-xs font-bold text-primary mb-6">Resources</h5>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-500 text-xs hover:text-blue-600 underline-offset-4 hover:underline">Compliance Certifications</a></li>
            <li><a href="#" className="text-slate-500 text-xs hover:text-blue-600 underline-offset-4 hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-headline uppercase tracking-wider text-xs font-bold text-primary mb-6">Legal</h5>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-500 text-xs hover:text-blue-600 underline-offset-4 hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="pt-8 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between items-center font-body">
          <span>© 2024 Water & Sewer Estimating Sydney. All rights reserved.</span>
          <div className="flex gap-6">
            <Shield size={14} />
            <CheckCircle2 size={14} />
          </div>
        </div>
      </div>
    </footer>
  );
};
