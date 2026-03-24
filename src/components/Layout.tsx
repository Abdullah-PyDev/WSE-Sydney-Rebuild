import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Shield, CheckCircle2, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Magnetic from './Magnetic';

export const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Estimator', path: '/estimator' },
    { name: 'Locations', path: '/locations' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 md:h-14 flex items-center justify-center overflow-hidden min-w-[100px] md:min-w-[120px]">
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
              <span className="text-lg md:text-xl font-bold tracking-tight text-primary font-headline leading-none">WSE SYDNEY</span>
              <span className="text-[6px] md:text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Precision Estimating</span>
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={0.15}>
              <Link
                to={link.path}
                className={`font-body text-sm transition-colors px-2 py-1 ${
                  location.pathname === link.path
                    ? 'text-primary border-b-2 border-primary pb-1 font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            </Magnetic>
          ))}
          <Magnetic strength={0.2}>
            <Link
              to="/request"
              data-cursor-label="GO"
              className="bg-primary text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-primary-container transition-all active:scale-95 duration-150 block"
            >
              Request a BOQ
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Link
            to="/request"
            className="bg-primary text-white px-4 py-2 rounded-md font-bold text-xs hover:bg-primary-container transition-all active:scale-95 duration-150"
          >
            BOQ
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                <span className="font-headline font-bold text-primary">Navigation</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <Menu size={24} className="rotate-90" />
                </button>
              </div>
              <div className="flex-grow py-8 px-6 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-headline text-2xl font-bold transition-colors ${
                      location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-8 border-t border-slate-100">
                  <Link
                    to="/request"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-center block shadow-lg shadow-primary/20"
                  >
                    Request a BOQ
                  </Link>
                </div>
              </div>
              <div className="p-8 bg-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <Phone size={18} />
                  <span className="text-sm font-medium">+61 2 9000 0000</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail size={18} />
                  <span className="text-sm font-medium">info@wsesydney.com.au</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="bg-slate-100 h-[1px] w-full"></div>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-primary text-white/70 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand & Mission */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 flex items-center justify-center overflow-hidden bg-white rounded-md p-1 px-3">
              <img 
                src="/logo.png" 
                alt="WSE Sydney" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-white/50 max-w-sm font-body">
            WSE Sydney provides industry-leading water and sewer estimating solutions. We combine technical precision with local expertise to deliver accurate BOQs for civil projects across New South Wales.
          </p>
          <div className="flex gap-4">
            <Magnetic strength={0.3}>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-surface-tint transition-colors block">
                <Linkedin size={18} className="text-white" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-surface-tint transition-colors block">
                <Twitter size={18} className="text-white" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-surface-tint transition-colors block">
                <Facebook size={18} className="text-white" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h5 className="text-white font-headline font-bold text-sm uppercase tracking-widest mb-8">Navigation</h5>
          <ul className="space-y-4 text-sm font-body">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
            <li><Link to="/locations" className="hover:text-white transition-colors">Locations</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About WSE</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/request" className="text-surface-tint font-bold hover:text-white transition-colors flex items-center gap-1">Request a BOQ <ArrowUpRight size={14} /></Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="md:col-span-3">
          <h5 className="text-white font-headline font-bold text-sm uppercase tracking-widest mb-8">Core Services</h5>
          <ul className="space-y-4 text-sm font-body">
            <li><a href="#" className="hover:text-white transition-colors">Water Main Estimating</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sewer Infrastructure BOQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sydney Water Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Civil Project Costing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tender Support Services</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3">
          <h5 className="text-white font-headline font-bold text-sm uppercase tracking-widest mb-8">Contact Us</h5>
          <ul className="space-y-6 text-sm font-body">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-surface-tint flex-shrink-0 mt-1" />
              <span>Bankstown Head Office<br/>Sydney, NSW 2200</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-surface-tint flex-shrink-0" />
              <span>+61 2 9000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-surface-tint flex-shrink-0" />
              <a href="mailto:info@wsesydney.com.au" className="hover:text-white transition-colors">info@wsesydney.com.au</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-body">
          <div className="flex items-center gap-2">
            <span>© 2024 Water & Sewer Estimating Sydney.</span>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-surface-tint" />
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
