import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Filter, Ruler, BarChart3, CheckCircle2, Zap, Award, Mail, Phone, MapPin } from 'lucide-react';

const ServicesDetail = () => {
  return (
    <main className="pt-20">
      <section className="relative bg-surface-container-low py-24 px-8 overflow-hidden border-b border-outline-variant">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-white"></div>
          <img 
            alt="Blueprint" 
            className="w-full h-full object-cover mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPQVYHLUZYXkYmtoP6Z00I9hYhHK7G8zG3t3mqiDZ9eIUXgYZKUgr9U2dprzDAxQmSFrNxG_sEatIQAm0Xa1yhWFRTZNNNoyjNh3pIeVFWo78LL2DImnNuJii3E2dDEDVjt9kaZWYAkIM8dGkGvFbU0t5v3OMDLq-jmb_cXh5rPl9QIXRva1Shv-0NWTjGfPbPmR2bVyMX2wEmuJogPky9yGZrrlNzufDbur59PaH4TNmp8uptACCsHeGGzo5lChif0jzux2fXw3o" 
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-primary font-headline font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Precision Engineering Estimating</span>
              <h1 className="text-on-surface text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
                First-Principles Hydraulic Valuation
              </h1>
              <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl font-body">
                We decompose complex infrastructure into its fundamental units of labor, material, and risk. No benchmarks—just raw data-driven clarity.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="bg-white p-8 border-l-4 border-primary shadow-sm rounded-r-xl">
                <div className="text-primary font-headline text-3xl font-bold">99.4%</div>
                <div className="text-on-surface-variant text-xs font-bold uppercase tracking-wider font-body">Historical Accuracy</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low border-b border-outline-variant sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-8 flex overflow-x-auto no-scrollbar gap-8 py-4 font-headline text-sm font-bold">
          <a href="#sps" className="whitespace-nowrap text-primary flex items-center gap-2">
            <Droplets size={16} /> Sewer Pump Stations
          </a>
          <a href="#osd" className="whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
            <Filter size={16} /> On-Site Detention
          </a>
          <a href="#underbores" className="whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
            <Ruler size={16} /> Underbores
          </a>
          <a href="#pipeline" className="whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
            <BarChart3 size={16} /> Data Pipeline
          </a>
        </div>
      </section>

      <section className="py-24 px-8 bg-white" id="sps">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center text-white">
                  <Droplets size={24} />
                </div>
                <h2 className="text-4xl font-extrabold text-primary tracking-tight font-headline">Sewer Pump Stations</h2>
              </div>
              <div className="space-y-6 text-on-surface-variant leading-relaxed font-body">
                <p>Our approach to SPS estimating bypasses generic per-kilowatt rates. We calculate based on wet-well geometry, structural concrete volumes, and mechanical redundancy requirements.</p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-surface-tint shrink-0" size={20} />
                    <span>Civil excavation & shoring in variable geotechnical conditions.</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-surface-tint shrink-0" size={20} />
                    <span>Mechanical & electrical telemetry integration.</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="text-surface-tint shrink-0" size={20} />
                    <span>Odour control unit lifecycle costing.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
              <div className="bg-surface-container-low p-8 rounded-lg border-l-4 border-primary">
                <span className="text-xs font-bold uppercase text-primary tracking-widest block mb-2">Primary Metric</span>
                <h3 className="text-3xl font-headline font-bold text-on-surface mb-2">Cost/m³ Volume</h3>
                <p className="text-sm text-on-surface-variant">Precise concrete vs backfill volume analysis to minimize procurement waste.</p>
              </div>
              <div className="bg-surface-container p-8 rounded-lg">
                <span className="text-xs font-bold uppercase text-on-surface-variant tracking-widest block mb-2">Risk Factor</span>
                <h3 className="text-3xl font-headline font-bold text-on-surface mb-2">Geotech-L</h3>
                <p className="text-sm text-on-surface-variant">Dynamic sensitivity analysis based on rock-socketing requirements.</p>
              </div>
              <div className="col-span-1 md:col-span-2 relative h-64 bg-outline-variant rounded-lg overflow-hidden group">
                <img 
                  alt="Construction" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzu28mN-GFQdnJ4VGNUXL6NSNFnNFgI7XqUrcbl3iNCzO_R6cDrd8-cp4oVwIENxXC5K3o5dSEr-oC6UuJF1HnTUQR9cyIXcMy5UXidOjOzbj7VmBOedixSlUe6pHdNTemaUNECLpE3rpZhJKSxWuvN1BHv6uFHX9lTnfbh6xpQy3AspqgiOekXb7BbY4FZmZY9AblloBVma4tTGGSjh8zJwXUGthimGVZBziODvJepiRLINZwr6KYi65H1NqG5zGjbhT6EwZAeSE" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                  <span className="text-white font-headline font-bold">Industrial Scale Efficiency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low" id="osd">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-4 font-headline">On-Site Detention (OSD)</h2>
              <p className="text-on-surface-variant max-w-xl font-body">Optimizing discharge rates through rigorous hydraulic modeling and structural innovation.</p>
            </div>
            <div className="flex gap-4 font-body">
              <div className="px-6 py-2 border-2 border-primary text-primary font-bold text-xs uppercase tracking-widest rounded-md">Stormwater Design</div>
              <div className="px-6 py-2 border-2 border-primary text-primary font-bold text-xs uppercase tracking-widest rounded-md">Volume Optimization</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px] font-body">
            <div className="md:col-span-2 md:row-span-2 bg-white p-10 flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all">
              <div>
                <span className="text-primary font-bold text-4xl mb-4 block font-headline">01</span>
                <h3 className="text-2xl font-bold mb-4 font-headline">Structural Integrity Matrix</h3>
                <p className="text-on-surface-variant leading-relaxed">Calculations for varying surcharge loads and trafficable lid requirements, ensuring compliance without over-engineering.</p>
              </div>
              <div className="h-1 w-full bg-surface-container mt-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary w-3/4"></div>
              </div>
            </div>
            <div className="md:col-span-2 bg-surface-container-low border border-outline-variant p-10 relative overflow-hidden rounded-xl">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 font-headline text-primary">Orifice Plate Sizing</h3>
                <p className="text-on-surface-variant text-sm">First-principles calculation of headwater levels vs discharge velocity.</p>
              </div>
              <div className="absolute bottom-0 right-0 opacity-10 text-primary">
                <Droplets size={160} />
              </div>
            </div>
            <div className="bg-tertiary-container border border-outline-variant text-on-tertiary-container p-8 flex flex-col justify-center items-center text-center rounded-xl">
              <Zap className="text-tertiary mb-2" size={32} />
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary">Fast-Track</div>
              <div className="text-xl font-bold font-headline">48hr Turnaround</div>
            </div>
            <div className="bg-outline-variant p-8 flex flex-col justify-center items-center text-center">
              <Award className="text-primary mb-2" size={32} />
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-on-surface-variant">Council Approval</div>
              <div className="text-xl font-bold text-primary font-headline">100% Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white" id="underbores">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <img 
                  alt="Drilling" 
                  className="w-full aspect-video object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeFu82izwPPDY9PHHbv8SrDMsVmDjvpwnm-4HUCpSzznI0M9GqyadXOKzwBAuk7PVArFd020jeqYZvpXvBrgFQrhKwwWMt9m9GXPyAConn54wWGPz4VmOMhFssXdW1T-r17cLNM7bvNJTLiSgY-acMDjxAIWscUZZ8PmPT8nVUJqUjkFj8i3Mxguxq7LrY5Esa8AM7XH5x-tH40FRZMjlN5uo5CUWLEGbBreYhinIH-9eYL7Y-PVG7jQ5qC5LXbsrLY5MSoBObDKU" 
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 font-body">
              <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6 inline-block">Complex Methodology</span>
              <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-6 font-headline">Trenchless Technology & Underbores</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-outline-variant pl-6 py-2">
                  <h4 className="font-bold text-primary mb-1">Micro-Tunneling Analysis</h4>
                  <p className="text-sm text-on-surface-variant">Detailed costing for slurry separation, jacking forces, and reception pit structural requirements.</p>
                </div>
                <div className="border-l-2 border-outline-variant pl-6 py-2">
                  <h4 className="font-bold text-primary mb-1">Horizontal Directional Drilling (HDD)</h4>
                  <p className="text-sm text-on-surface-variant">Modeling for annular pressure and inadvertent return risks during creek or road crossings.</p>
                </div>
                <div className="border-l-2 border-outline-variant pl-6 py-2">
                  <h4 className="font-bold text-primary mb-1">Auger Boring</h4>
                  <p className="text-sm text-on-surface-variant">Precision casing installation estimating with laser-guided accuracy margins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low border-y border-outline-variant" id="pipeline">
        <div className="max-w-7xl mx-auto text-center font-body">
          <h2 className="text-3xl font-extrabold text-primary mb-16 tracking-tight font-headline">The Precision Data Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-outline-variant -translate-y-1/2 z-0"></div>
            {[
              { id: 1, title: 'Quantification', desc: 'Automated Take-offs from BIM & CAD.' },
              { id: 2, title: 'Market Parity', desc: 'Real-time local material index updates.' },
              { id: 3, title: 'Labour Logics', desc: 'Production rate adjustment per terrain.' },
              { id: 4, title: 'Risk Stack', desc: 'Monte Carlo contingency modeling.' },
              { id: 5, title: 'BOQ Delivery', desc: 'Ready-for-tender final submission.', highlight: true }
            ].map((step) => (
              <div key={step.id} className={`relative z-10 p-8 rounded-lg border ${step.highlight ? 'bg-tertiary-container border-tertiary shadow-sm' : 'bg-white border-outline-variant shadow-sm'} backdrop-blur-md`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-bold ${step.highlight ? 'bg-tertiary text-white' : 'bg-primary text-white'}`}>
                  {step.id}
                </div>
                <h4 className={`font-bold text-sm mb-2 ${step.highlight ? 'text-on-tertiary-container' : 'text-primary'}`}>{step.title}</h4>
                <p className={`text-xs ${step.highlight ? 'text-tertiary' : 'text-on-surface-variant'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto text-center font-body">
          <h2 className="text-4xl font-headline font-extrabold text-primary mb-8">Ready for an engineered estimate?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request" className="bg-primary text-white px-8 py-4 rounded-md font-bold hover:bg-primary-container transition-all">Submit Tender Documents</Link>
            <button className="bg-white text-primary border border-outline-variant px-8 py-4 rounded-md font-bold hover:bg-surface-container transition-all">Download Sample BOQ</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesDetail;
