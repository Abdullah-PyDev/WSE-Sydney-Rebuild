import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Settings, Waves, ArrowRight, History, ShieldCheck, Globe } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Services = () => {
  return (
    <main className="pt-20">
      <section className="relative min-h-[800px] flex items-center overflow-hidden bg-primary px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10"></div>
          <img 
            alt="Blueprint" 
            className="w-full h-full object-cover opacity-30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj5O6tpaDcBtbszy1Y_0WojtLKOT6JkjF5AHKiglzJkMNNOkop7NFdpcG2ERyzsjetCHxmkGUSU5piqYJ9_2wsVfKo-rtrZZSsu_hRpuVkgFye9yDutAYjdidr1WvrziutdFo7QYt7rCvZvfj4ETcpCOIDpm0c9yIF91IOF3xOL1-1nfHb4dpLwx7WVNfaGnkdaBtR6XHSvbDo38Ce3n4Bji24T0uyl_IAyzOYW4fiMMfMlTnYpLX8qv0W6SXG-to7DvzvKgBlZ8I" 
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary-container text-blue-200 text-xs font-bold tracking-widest uppercase font-body">
              <ShieldCheck size={14} />
              Industry Certified Accuracy
            </div>
            <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Precision Engineering. <br/><span className="text-blue-400">Guaranteed Accuracy.</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-lg leading-relaxed opacity-90 font-body">
              Australia's leading experts in Water & Sewer Estimating with a 24-48h turnaround. Reducing risk and ensuring compliance for Sydney's most complex projects.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/request" className="bg-blue-400 text-primary px-8 py-4 rounded-md font-bold text-base hover:bg-blue-300 transition-all shadow-xl shadow-black/20 font-body">
                Request a BOQ
              </Link>
              <Link to="/services/detail" className="border border-blue-400/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-md font-bold text-base hover:bg-white/10 transition-all font-body">
                Our Services
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white p-8 rounded-xl shadow-2xl border-l-4 border-primary">
              <div className="flex items-center justify-between mb-8">
                <span className="font-headline font-bold text-primary">Live Estimate Dashboard</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-body">Active Status</span>
              </div>
              <div className="space-y-6">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-primary to-blue-400"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 font-body">
                  <div className="p-4 bg-slate-50 rounded-md">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Response Time</p>
                    <p className="text-2xl font-headline font-extrabold text-primary">24h</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-md">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">Accuracy Rate</p>
                    <p className="text-2xl font-headline font-extrabold text-primary">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 font-body">Trusted by Tier 1 Engineering Firms & Developers</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale font-headline">
            <div className="text-2xl font-black text-primary">CIVILNET</div>
            <div className="text-2xl font-black text-primary">HYDRAFLOW</div>
            <div className="text-2xl font-black text-primary">SYD_WATER_A</div>
            <div className="text-2xl font-black text-primary">PRECISE_CON</div>
            <div className="text-2xl font-black text-primary">AUST_INFRA</div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-3xl font-extrabold text-primary mb-4">Specialist Engineering Services</h2>
            <div className="h-1.5 w-24 bg-primary"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 font-body">
            <motion.div whileHover={{ y: -10 }} className="group p-8 bg-white border-l-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-md text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Droplets size={24} />
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Water Reticulation & Renewals</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Detailed estimation for potable water networks, recycled water infrastructure, and major trunk renewals with strict adherence to Sydney Water standards.
              </p>
              <Link to="/services/detail" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:underline">
                View Capability <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="group p-8 bg-white border-l-4 border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-md text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Settings size={24} />
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Sewer Reticulation & Pump Stations</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Expert analysis of gravity sewer systems, rising mains, and pumping station components with integrated risk assessments and BOQ precision.
              </p>
              <Link to="/services/detail" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:underline">
                View Capability <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="group p-8 bg-white border-l-4 border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-md text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Waves size={24} />
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Stormwater & OSD Systems</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                From minor pit and pipe works to complex On-site Stormwater Detention (OSD) basins and quality treatment systems for large-scale developments.
              </p>
              <Link to="/services/detail" className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:underline">
                View Capability <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4 flex flex-col justify-center">
              <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">Why Civil Engineers Choose WSE.</h2>
              <p className="text-slate-600 leading-relaxed font-body">
                Our estimating methodology is rooted in structural accuracy and regional compliance, ensuring your tenders are competitive and technically sound.
              </p>
            </div>
            <div className="md:col-span-4 bg-white p-10 rounded-xl shadow-sm flex flex-col items-start gap-4 font-body">
              <span className="text-4xl font-headline font-black text-slate-100">01</span>
              <div className="w-10 h-10 bg-slate-50 rounded flex items-center justify-center text-primary">
                <History size={20} />
              </div>
              <h4 className="font-headline font-bold text-lg">15+ Years Experience</h4>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Proven Industry Track Record</p>
            </div>
            <div className="md:col-span-4 bg-primary p-10 rounded-xl shadow-xl flex flex-col items-start gap-4 text-white font-body">
              <span className="text-4xl font-headline font-black text-white/10">02</span>
              <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-blue-300">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-headline font-bold text-lg">Sydney Water Accredited</h4>
              <p className="text-xs text-blue-300 uppercase tracking-wider">Certified Compliance Standards</p>
            </div>
            <div className="md:col-span-8 bg-white p-10 rounded-xl flex flex-col md:flex-row items-center gap-8 border border-slate-100 font-body">
              <div className="flex-1">
                <span className="text-4xl font-headline font-black text-slate-100">03</span>
                <h4 className="font-headline font-bold text-xl mt-4 mb-2">National Capability</h4>
                <p className="text-slate-600 text-sm">Strategic presence in Sydney (Bankstown HQ), Melbourne, and Brisbane to service infrastructure projects nationwide.</p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-slate-50 rounded-md text-[10px] font-bold text-primary shadow-sm border border-slate-200 uppercase tracking-widest">Bankstown</div>
                <div className="px-4 py-2 bg-slate-50 rounded-md text-[10px] font-bold text-primary shadow-sm border border-slate-200 uppercase tracking-widest">Melbourne</div>
                <div className="px-4 py-2 bg-slate-50 rounded-md text-[10px] font-bold text-primary shadow-sm border border-slate-200 uppercase tracking-widest">Brisbane</div>
              </div>
            </div>
            <div className="md:col-span-4 bg-emerald-900 p-10 rounded-xl flex flex-col justify-end text-white font-body">
              <p className="text-sm font-medium mb-4 italic opacity-80">"The fastest turnaround in the sector without compromising on technical detail."</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Project Director, AustInfra</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">Client Testimonials</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-body">Hear from the industry leaders who trust WSE Sydney for their infrastructure estimating needs.</p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-container p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-8">Ready to secure your project's accuracy?</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto opacity-80 font-body">Download our rate card or request a Bill of Quantities today for a 48h guaranteed response.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-body">
              <Link to="/request" className="bg-white text-primary px-10 py-4 rounded-md font-bold text-base hover:bg-blue-100 transition-all">Request a BOQ</Link>
              <button className="border border-white/30 text-white px-10 py-4 rounded-md font-bold text-base hover:bg-white/10 transition-all">Download Rate Card</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
