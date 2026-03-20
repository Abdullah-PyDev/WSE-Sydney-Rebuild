import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, CheckCircle2, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

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
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-14 flex items-center justify-center overflow-hidden min-w-[120px]">
            <img 
              src="/logo.png" 
              alt="WSE Sydney" 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-text');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }}
            />
            <div className="fallback-text hidden flex-col">
              <span className="text-xl font-bold tracking-tight text-primary font-headline leading-none">WSE SYDNEY</span>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Precision Estimating</span>
            </div>
          </div>
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
    <footer className="w-full bg-white text-slate-600 pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand & Mission */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 flex items-center justify-center overflow-hidden bg-slate-50 rounded-md p-1 px-3 border border-slate-100">
              <img 
                src="/logo.png" 
                alt="WSE Sydney" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
            WSE Sydney provides industry-leading water and sewer estimating solutions. We combine technical precision with local expertise to deliver accurate BOQs for civil projects across New South Wales.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-primary hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-blue-400 hover:text-white transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-100 rounded-full hover:bg-blue-600 hover:text-white transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h5 className="text-slate-900 font-headline font-bold text-sm uppercase tracking-widest mb-8">Navigation</h5>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link to="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About WSE</Link></li>
            <li><Link to="/request" className="text-primary font-bold hover:underline transition-colors flex items-center gap-1">Request a BOQ <ArrowUpRight size={14} /></Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-3">
          <h5 className="text-slate-900 font-headline font-bold text-sm uppercase tracking-widest mb-8">Core Services</h5>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Water Main Estimating</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Sewer Infrastructure BOQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Sydney Water Compliance</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Civil Project Costing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Tender Support Services</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3">
          <h5 className="text-slate-900 font-headline font-bold text-sm uppercase tracking-widest mb-8">Contact Us</h5>
          <ul className="space-y-6 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
              <span>Bankstown Head Office<br/>Sydney, NSW 2200</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary flex-shrink-0" />
              <span>+61 2 9000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary flex-shrink-0" />
              <a href="mailto:info@wsesydney.com.au" className="hover:text-primary transition-colors">info@wsesydney.com.au</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2024 Water & Sewer Estimating Sydney.</span>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-primary" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Sydney Water Accredited</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
