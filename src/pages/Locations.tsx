import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Building2, Landmark, Factory } from 'lucide-react';

const Locations = () => {
  return (
    <main className="pt-24">
      <section className="max-w-7xl mx-auto px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-7"
          >
            <span className="font-headline uppercase tracking-widest text-xs text-on-surface-variant mb-4 block">National Presence</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary leading-tight tracking-tight">
              Precise Estimating, <br/><span className="text-surface-tint">Across Australia.</span>
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5 pb-2"
          >
            <p className="text-on-surface-variant text-lg leading-relaxed border-l-4 border-primary-container pl-6 font-body">
              From our strategic hub in Bankstown to regional centers in Melbourne and Brisbane, WSE Sydney provides data-driven water and sewer estimating for Australia's largest civil projects.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-container-low py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 relative min-h-[500px] bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #001d44 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
              <div className="w-full h-full relative">
                <img 
                  className="w-full h-full object-cover opacity-90 grayscale contrast-125" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqg_mNJ65MD6_Sw3VtJsmM7XexeTtccznk3s8a3z1r3NEov5G4zqUWguGgOKZxJoxPDarN-0_mfctBbMjhLF36hz8AvEBFMqM4N1Zsggwbxg-4fqpHNtFwsEf6XT-fwxZoo-5VO68PjOPfh07n2RBydEOMqnLQpXAxIHRtF_6etgn5Kl-CDhI4JVHqG8ZxBVigiA9VhB-BXvMmLc_GnharkShw4H-Wy_cRsvGd_iAZam_C1vjwOhRHyLCzS11VMw5yIcjdnAFhXzY" 
                  alt="Australia Map"
                />
                <div className="absolute top-[65%] left-[80%] -translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/20 animate-pulse"></div>
                </div>
                <div className="absolute top-[82%] left-[72%] -translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-3 h-3 bg-surface-tint rounded-full ring-4 ring-surface-tint/20"></div>
                </div>
                <div className="absolute top-[52%] left-[86%] -translate-x-1/2 -translate-y-1/2 group">
                  <div className="w-3 h-3 bg-surface-tint rounded-full ring-4 ring-surface-tint/20"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 p-6 bg-white/90 text-slate-900 backdrop-blur-md rounded-lg max-w-xs border border-white/20 shadow-xl">
                <h4 className="font-headline font-bold text-lg mb-2">Coverage Statistics</h4>
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <span className="block text-2xl font-bold font-headline text-primary">98%</span>
                    <span className="text-[10px] uppercase font-body text-slate-500">NSW Market Coverage</span>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-200"></div>
                  <div>
                    <span className="block text-2xl font-bold font-headline text-primary">48h</span>
                    <span className="text-[10px] uppercase font-body text-slate-500">Average Response</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-body text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded">Head Office</span>
                    <h3 className="font-headline text-2xl font-extrabold text-primary mt-2">Bankstown, NSW</h3>
                  </div>
                  <Building2 className="text-primary" size={32} />
                </div>
                <div className="space-y-4 text-sm text-on-surface-variant font-body">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} />
                    <span>Suite 402, 11-15 Fetherstone St, Bankstown NSW 2200</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} />
                    <span>+61 (02) 9000 0000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} />
                    <span>sydney@wsestimations.com.au</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-body text-[10px] font-bold text-surface-tint uppercase tracking-widest bg-surface-tint/5 px-2 py-1 rounded">Regional Office</span>
                    <h3 className="font-headline text-xl font-bold text-on-surface mt-2">Melbourne, VIC</h3>
                  </div>
                  <Landmark className="text-on-surface-variant" size={24} />
                </div>
                <p className="text-sm text-on-surface-variant mb-4 font-body">Level 12, 440 Collins Street, Melbourne VIC 3000</p>
                <a className="text-primary font-bold text-xs uppercase tracking-tighter hover:underline font-body" href="#">View Local Team</a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-surface-container-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-body text-[10px] font-bold text-surface-tint uppercase tracking-widest bg-surface-tint/5 px-2 py-1 rounded">Regional Office</span>
                    <h3 className="font-headline text-xl font-bold text-on-surface mt-2">Brisbane, QLD</h3>
                  </div>
                  <Factory className="text-on-surface-variant" size={24} />
                </div>
                <p className="text-sm text-on-surface-variant mb-4 font-body">Suite 15.01, 10 Eagle St, Brisbane City QLD 4000</p>
                <a className="text-primary font-bold text-xs uppercase tracking-tighter hover:underline font-body" href="#">View Local Team</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-blue-50 border border-blue-100 p-12 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10 md:w-2/3">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">National Service Capability</h2>
            <p className="text-slate-600 text-lg leading-relaxed font-body">
              While our hubs serve as regional command centers, our estimating teams are equipped to handle infrastructure projects in any territory. We utilize advanced geospatial data and local cost indices to ensure precision anywhere in Australia.
            </p>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <span className="block text-primary text-3xl font-black mb-1 font-headline">150+</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-body">Projects Annually</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <span className="block text-primary text-3xl font-black mb-1 font-headline">24h</span>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-body">Local Support</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Locations;
