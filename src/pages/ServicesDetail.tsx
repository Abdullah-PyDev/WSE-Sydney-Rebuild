import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Filter, Ruler, BarChart3, CheckCircle2, Zap, Award, Mail, Phone, MapPin, Settings, Waves, ChevronRight } from 'lucide-react';

const ServicesDetail = () => {
  const [activeSection, setActiveSection] = useState('water');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          // Auto-scroll sub-nav to active item
          const navElement = document.querySelector(`a[href="#${entry.target.id}"]`);
          if (navElement && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const navRect = navElement.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            if (navRect.left < containerRect.left || navRect.right > containerRect.right) {
              navElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['water', 'sewer', 'stormwater', 'underbores', 'pipeline'];
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'sewer', label: 'Sewer', icon: Settings },
    { id: 'stormwater', label: 'Storm', icon: Waves },
    { id: 'underbores', label: 'Trenchless', icon: Ruler },
    { id: 'pipeline', label: 'Methodology', icon: BarChart3 },
  ];

  return (
    <main className="pt-20">
      {/* Dark Hero Section */}
      <section className="relative bg-[#001D3D] py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            alt="Blueprint" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPQVYHLUZYXkYmtoP6Z00I9hYhHK7G8zG3t3mqiDZ9eIUXgYZKUgr9U2dprzDAxQmSFrNxG_sEatIQAm0Xa1yhWFRTZNNNoyjNh3pIeVFWo78LL2DImnNuJii3E2dDEDVjt9kaZWYAkIM8dGkGvFbU0t5v3OMDLq-jmb_cXh5rPl9QIXRva1Shv-0NWTjGfPbPmR2bVyMX2wEmuJogPky9yGZrrlNzufDbur59PaH4TNmp8uptACCsHeGGzo5lChif0jzux2fXw3o" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-[#8ECAE6] font-headline font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px] mb-4 block">PRECISION ENGINEERING ESTIMATING</span>
              <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6 font-headline">
                First-Principles <br className="hidden md:block"/> Hydraulic Valuation
              </h1>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl font-body">
                We decompose complex infrastructure into its fundamental units of labor, material, and risk. No benchmarks—just raw data-driven clarity.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-[#001D3D]/40 backdrop-blur-md p-8 border-l-4 border-[#8ECAE6] shadow-xl">
                <div className="text-white font-headline text-4xl font-bold">99.4%</div>
                <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest font-body">HISTORICAL ACCURACY</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Mobile Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />
          
          <div 
            ref={scrollContainerRef}
            className="px-4 md:px-8 flex overflow-x-auto no-scrollbar gap-6 md:gap-12 py-3 md:py-5 font-headline text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em]"
          >
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`whitespace-nowrap transition-all duration-300 flex items-center gap-2 relative py-1 ${
                  activeSection === item.id 
                    ? 'text-blue-600 scale-105' 
                    : 'text-gray-400 hover:text-primary'
                }`}
              >
                <item.icon size={14} className={activeSection === item.id ? 'text-blue-500' : 'text-gray-400'} />
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeSubNav"
                    className="absolute -bottom-3 md:-bottom-5 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-white border-b border-gray-100" id="water">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-100">
            <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="mb-8 md:mb-12 flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#001D3D] rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                  <Droplets size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001D3D] tracking-tight font-headline">Water Mains Estimates</h2>
              </div>
              <div className="space-y-6 md:space-y-8 text-gray-500 leading-relaxed font-body">
                <p className="text-base md:text-lg">Comprehensive estimating for potable and recycled water networks. We specialize in complex Sydney Water infrastructure, ensuring every fitting and meter is accounted for.</p>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {[
                    "Subdivisions (Paddock & Live Road)",
                    "DTC Handle Bars & Metering",
                    "Underbores & Trenchless Crossings",
                    "MSCL & PE Main Installations",
                    "Water Lead-Ins & Recycled Water",
                    "Replace & Upgrade Existing Mains",
                    "Large Diameter Trunk Water Mains"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 md:gap-4 items-start p-3 bg-slate-50 rounded-lg">
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 border-b border-r border-gray-100 bg-gray-50/30">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">TECHNICAL SPEC</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">DTC Compliance</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Detailed take-offs for Dual Tap Connections (DTC) ensuring all Sydney Water handle bar configurations are priced to current standards.</p>
              </div>
              <div className="p-8 md:p-12 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">MATERIAL INDEX</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">MSCL vs PE</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Dynamic cost-benefit analysis between Mild Steel Cement Lined and Polyethylene materials based on project-specific pressure ratings.</p>
              </div>
              <div className="col-span-1 md:col-span-2 relative h-64 md:h-96 overflow-hidden group">
                <img 
                  alt="Water Infrastructure" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="https://picsum.photos/seed/water-infra/1200/800" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <span className="text-white font-headline font-bold text-xl md:text-2xl tracking-tight">Potable Water Network Precision</span>
                  <div className="h-1 w-12 bg-blue-400 mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-gray-50 border-b border-gray-100" id="sewer">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-100 bg-white">
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-0 order-2 lg:order-1">
              <div className="p-8 md:p-12 border-b border-r border-gray-100 bg-gray-50/30">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">INFRASTRUCTURE</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">Pump Stations & IOP</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Full civil and mechanical component estimation for Type 60 pump stations and Integrated Operating Platforms.</p>
              </div>
              <div className="p-8 md:p-12 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">GEOTECHNICAL</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">Deep Sewer Analysis</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Calculating shoring, excavation, and structural concrete requirements for deep gravity sewer installations.</p>
              </div>
              <div className="col-span-1 md:col-span-2 relative h-64 md:h-96 overflow-hidden group">
                <img 
                  alt="Sewer Infrastructure" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="https://picsum.photos/seed/sewer-infra/1200/800" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <span className="text-white font-headline font-bold text-xl md:text-2xl tracking-tight">Gravity Sewer & Rising Mains</span>
                  <div className="h-1 w-12 bg-blue-400 mt-4"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-l border-gray-100 order-1 lg:order-2">
              <div className="mb-8 md:mb-12 flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#001D3D] rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                  <Settings size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001D3D] tracking-tight font-headline">Sewer Mains Estimates</h2>
              </div>
              <div className="space-y-6 md:space-y-8 text-gray-500 leading-relaxed font-body">
                <p className="text-base md:text-lg">Expert analysis of gravity sewer systems, rising mains, and pumping station components with integrated risk assessments.</p>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {[
                    "Lead-In Sewer & Subdivisions",
                    "Deep Sewer & Concrete Encasement",
                    "Custom Design Manholes & Adjustments",
                    "Insert Sewer Junctions",
                    "Remove & Upgrade Existing Sewer Mains",
                    "Sewer Rising Mains & Pump Stations",
                    "IOP (Integrated Operating Platforms)"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 md:gap-4 items-start p-3 bg-slate-50 rounded-lg">
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-white border-b border-gray-100" id="stormwater">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-100">
            <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="mb-8 md:mb-12 flex items-center gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#001D3D] rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                  <Waves size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001D3D] tracking-tight font-headline">Stormwater Estimates</h2>
              </div>
              <div className="space-y-6 md:space-y-8 text-gray-500 leading-relaxed font-body">
                <p className="text-base md:text-lg">Detailed first-principles estimates for stormwater networks, ensuring accurate pricing for the hidden drivers of project cost.</p>
                <div className="grid grid-cols-1 gap-2 md:gap-3">
                  {[
                    "Pipe Sizing & Depth Analysis",
                    "Bedding & Overlay Material Optimization",
                    "Machinery & Plant Selection Logic",
                    "Pits & Pit Risers Costing",
                    "RCP Pipe Cutting & Wastage",
                    "Backfill Material Major Cost Drivers",
                    "OSD Basin Structural Estimating"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 md:gap-4 items-start p-3 bg-slate-50 rounded-lg">
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 border-b border-r border-gray-100 bg-gray-50/30">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">COST DRIVER</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">Backfill Optimization</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Accurate volume calculations for bedding, overlay, and select backfill to prevent material over-ordering.</p>
              </div>
              <div className="p-8 md:p-12 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase text-blue-500 tracking-[0.3em] block mb-4">TECHNICAL LABOR</span>
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-[#001D3D] mb-4">RCP Pipe Cutting</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Factoring in the time-consuming and costly nature of Reinforced Concrete Pipe (RCP) cutting and jointing.</p>
              </div>
              <div className="col-span-1 md:col-span-2 relative h-64 md:h-96 overflow-hidden group">
                <img 
                  alt="Stormwater Infrastructure" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="https://picsum.photos/seed/storm-infra/1200/800" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12">
                  <span className="text-white font-headline font-bold text-xl md:text-2xl tracking-tight">Stormwater & OSD System Accuracy</span>
                  <div className="h-1 w-12 bg-blue-400 mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-white" id="underbores">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-100 p-2 rounded-xl">
                <img 
                  alt="Drilling" 
                  className="w-full aspect-video object-cover rounded-lg" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeFu82izwPPDY9PHHbv8SrDMsVmDjvpwnm-4HUCpSzznI0M9GqyadXOKzwBAuk7PVArFd020jeqYZvpXvBrgFQrhKwwWMt9m9GXPyAConn54wWGPz4VmOMhFssXdW1T-r17cLNM7bvNJTLiSgY-acMDjxAIWscUZZ8PmPT8nVUJqUjkFj8i3Mxguxq7LrY5Esa8AM7XH5x-tH40FRZMjlN5uo5CUWLEGbBreYhinIH-9eYL7Y-PVG7jQ5qC5LXbsrLY5MSoBObDKU" 
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 font-body">
              <span className="bg-[#9381FF]/10 text-[#9381FF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-4 md:mb-6 inline-block">COMPLEX METHODOLOGY</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#001D3D] tracking-tight mb-6 md:mb-8 font-headline">Trenchless Technology & Underbores</h2>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-base md:text-lg font-headline">Micro-Tunneling Analysis</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Detailed costing for slurry separation, jacking forces, and reception pit structural requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-base md:text-lg font-headline">Horizontal Directional Drilling (HDD)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Modeling for annular pressure and inadvertent return risks during creek or road crossings.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-base md:text-lg font-headline">Auger Boring</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Precision casing installation estimating with laser-guided accuracy margins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#001D3D] relative overflow-hidden" id="pipeline">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto text-center font-body relative z-10">
          <span className="text-[#00C49A] font-headline font-bold uppercase tracking-[0.4em] text-[10px] md:text-[11px] mb-4 block">SYSTEMATIC METHODOLOGY</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-12 md:mb-20 tracking-tight font-headline">The Precision Data Pipeline</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 border border-white/10">
            {[
              { id: '01', title: 'Quantification', desc: 'Automated Take-offs from BIM & CAD.' },
              { id: '02', title: 'Market Parity', desc: 'Real-time local material index updates.' },
              { id: '03', title: 'Labour Logics', desc: 'Production rate adjustment per terrain.' },
              { id: '04', title: 'Risk Stack', desc: 'Monte Carlo contingency modeling.' },
              { id: '05', title: 'BOQ Delivery', desc: 'Ready-for-tender final submission.', highlight: true }
            ].map((step) => (
              <div key={step.id} className={`p-6 md:p-10 border-b lg:border-b-0 sm:border-r border-white/10 last:border-r-0 transition-all duration-500 hover:bg-white/5 group ${step.highlight ? 'bg-white/5' : ''}`}>
                <div className="text-3xl md:text-4xl font-headline font-black text-white/10 mb-6 md:mb-8 group-hover:text-[#00C49A]/20 transition-colors">{step.id}</div>
                <h4 className="font-headline font-bold text-base md:text-lg mb-3 md:mb-4 text-white">{step.title}</h4>
                <p className="text-[10px] md:text-xs leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">{step.desc}</p>
                {step.highlight && <div className="mt-6 md:mt-8 h-1 w-full bg-[#00C49A]"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center font-body">
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-[#001D3D] mb-8 md:mb-12">Ready for an engineered estimate?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request" className="bg-[#001D3D] text-white px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-[#002B2B] transition-all text-center">Submit Tender Documents</Link>
            <a 
              href="/sample-boq.pdf" 
              download 
              className="bg-white text-[#001D3D] border border-gray-200 px-8 md:px-10 py-3 md:py-4 rounded-md font-bold hover:bg-gray-50 transition-all text-center"
            >
              Download Sample BOQ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesDetail;
