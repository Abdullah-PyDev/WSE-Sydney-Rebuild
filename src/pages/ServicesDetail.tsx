import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Filter, Ruler, BarChart3, CheckCircle2, Zap, Award, Mail, Phone, MapPin } from 'lucide-react';

const ServicesDetail = () => {
  return (
    <main className="pt-20">
      {/* Dark Hero Section */}
      <section className="relative bg-[#001D3D] py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            alt="Blueprint" 
            className="w-full h-full object-cover mix-blend-overlay opacity-30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPQVYHLUZYXkYmtoP6Z00I9hYhHK7G8zG3t3mqiDZ9eIUXgYZKUgr9U2dprzDAxQmSFrNxG_sEatIQAm0Xa1yhWFRTZNNNoyjNh3pIeVFWo78LL2DImnNuJii3E2dDEDVjt9kaZWYAkIM8dGkGvFbU0t5v3OMDLq-jmb_cXh5rPl9QIXRva1Shv-0NWTjGfPbPmR2bVyMX2wEmuJogPky9yGZrrlNzufDbur59PaH4TNmp8uptACCsHeGGzo5lChif0jzux2fXw3o" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <span className="text-[#8ECAE6] font-headline font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">PRECISION ENGINEERING ESTIMATING</span>
              <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6 font-headline">
                First-Principles <br/> Hydraulic Valuation
              </h1>
              <p className="text-white/70 text-xl font-light leading-relaxed max-w-2xl font-body">
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

      <section className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 flex overflow-x-auto no-scrollbar gap-12 py-5 font-headline text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#sps" className="whitespace-nowrap text-[#001D3D] hover:text-[#00C49A] transition-colors flex items-center gap-2">
            <Droplets size={14} className="text-[#00C49A]" /> Sewer Pump Stations
          </a>
          <a href="#osd" className="whitespace-nowrap text-gray-400 hover:text-[#001D3D] transition-colors flex items-center gap-2">
            <Filter size={14} /> On-Site Detention
          </a>
          <a href="#underbores" className="whitespace-nowrap text-gray-400 hover:text-[#001D3D] transition-colors flex items-center gap-2">
            <Ruler size={14} /> Underbores
          </a>
          <a href="#pipeline" className="whitespace-nowrap text-gray-400 hover:text-[#001D3D] transition-colors flex items-center gap-2">
            <BarChart3 size={14} /> Data Pipeline
          </a>
        </div>
      </section>

      <section className="py-24 px-8 bg-white border-b border-gray-100" id="sps">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-100">
            <div className="lg:col-span-5 p-12 border-r border-gray-100">
              <div className="mb-12 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#001D3D] rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Droplets size={28} />
                </div>
                <h2 className="text-4xl font-extrabold text-[#001D3D] tracking-tight font-headline">Sewer Pump Stations</h2>
              </div>
              <div className="space-y-8 text-gray-500 leading-relaxed font-body">
                <p className="text-lg">Our approach to SPS estimating bypasses generic per-kilowatt rates. We calculate based on wet-well geometry, structural concrete volumes, and mechanical redundancy requirements.</p>
                <div className="space-y-4">
                  {[
                    "Civil excavation & shoring in variable geotechnical conditions.",
                    "Mechanical & electrical telemetry integration.",
                    "Odour control unit lifecycle costing."
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#00C49A]/10 flex items-center justify-center text-[#00C49A]">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-12 border-b border-r border-gray-100 bg-gray-50/30">
                <span className="text-[10px] font-bold uppercase text-[#00C49A] tracking-[0.3em] block mb-4">PRIMARY METRIC</span>
                <h3 className="text-3xl font-headline font-bold text-[#001D3D] mb-4">Cost/m³ Volume</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Precise concrete vs backfill volume analysis to minimize procurement waste and optimize structural efficiency.</p>
              </div>
              <div className="p-12 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase text-[#00C49A] tracking-[0.3em] block mb-4">RISK FACTOR</span>
                <h3 className="text-3xl font-headline font-bold text-[#001D3D] mb-4">Geotech-L</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Dynamic sensitivity analysis based on rock-socketing requirements and groundwater table fluctuations.</p>
              </div>
              <div className="col-span-1 md:col-span-2 relative h-96 overflow-hidden group">
                <img 
                  alt="Construction" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzu28mN-GFQdnJ4VGNUXL6NSNFnNFgI7XqUrcbl3iNCzO_R6cDrd8-cp4oVwIENxXC5K3o5dSEr-oC6UuJF1HnTUQR9cyIXcMy5UXidOjOzbj7VmBOedixSlUe6pHdNTemaUNECLpE3rpZhJKSxWuvN1BHv6uFHX9lTnfbh6xpQy3AspqgiOekXb7BbY4FZmZY9AblloBVma4tTGGSjh8zJwXUGthimGVZBziODvJepiRLINZwr6KYi65H1NqG5zGjbhT6EwZAeSE" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D3D] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-12">
                  <span className="text-white font-headline font-bold text-2xl tracking-tight">Industrial Scale Efficiency</span>
                  <div className="h-1 w-12 bg-[#00C49A] mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-gray-50" id="osd">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-[#00C49A] font-headline font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">HYDRAULIC OPTIMIZATION</span>
              <h2 className="text-4xl font-extrabold text-[#001D3D] tracking-tight mb-4 font-headline">On-Site Detention (OSD)</h2>
              <p className="text-gray-500 max-w-xl font-body">Optimizing discharge rates through rigorous hydraulic modeling and structural innovation to meet stringent council requirements.</p>
            </div>
            <div className="flex gap-3 font-body">
              <div className="px-5 py-2 bg-white border border-gray-200 text-[#001D3D] font-bold text-[10px] uppercase tracking-widest shadow-sm">STORMWATER DESIGN</div>
              <div className="px-5 py-2 bg-white border border-gray-200 text-[#001D3D] font-bold text-[10px] uppercase tracking-widest shadow-sm">VOLUME OPTIMIZATION</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[650px] font-body">
            <div className="md:col-span-2 md:row-span-2 bg-white p-12 flex flex-col justify-between group shadow-sm border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-500">
              <div>
                <span className="text-gray-100 font-bold text-7xl mb-8 block font-headline group-hover:text-[#00C49A]/10 transition-colors">01</span>
                <h3 className="text-3xl font-bold mb-6 font-headline text-[#001D3D]">Structural Integrity Matrix</h3>
                <p className="text-gray-500 leading-relaxed text-lg">Calculations for varying surcharge loads and trafficable lid requirements, ensuring compliance without over-engineering.</p>
              </div>
              <div className="h-2 w-full bg-gray-100 mt-8 relative overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  className="absolute inset-0 bg-[#00C49A]"
                ></motion.div>
              </div>
            </div>
            <div className="md:col-span-2 bg-[#001D3D] p-12 relative overflow-hidden flex flex-col justify-center rounded-2xl group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4 font-headline text-white group-hover:text-[#8ECAE6] transition-colors">Orifice Plate Sizing</h3>
                <p className="text-white/60 text-base leading-relaxed">First-principles calculation of headwater levels vs discharge velocity for precise flow control.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5 text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Droplets size={200} />
              </div>
            </div>
            <div className="bg-[#002B2B] p-10 flex flex-col justify-center items-center text-center rounded-2xl group hover:bg-[#003d3d] transition-colors">
              <div className="w-12 h-12 bg-[#00C49A] rounded-xl flex items-center justify-center text-[#002B2B] mb-6 shadow-lg shadow-[#00C49A]/20">
                <Zap size={24} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#00C49A] mb-2">FAST-TRACK</div>
              <div className="text-2xl font-bold font-headline text-white">48hr Turnaround</div>
            </div>
            <div className="bg-white p-10 flex flex-col justify-center items-center text-center rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#001D3D] rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#001D3D]/20">
                <CheckCircle2 size={24} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2">COUNCIL APPROVAL</div>
              <div className="text-2xl font-bold text-[#001D3D] font-headline">100% Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white" id="underbores">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
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
              <span className="bg-[#9381FF]/10 text-[#9381FF] px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6 inline-block">COMPLEX METHODOLOGY</span>
              <h2 className="text-4xl font-extrabold text-[#001D3D] tracking-tight mb-8 font-headline">Trenchless Technology & Underbores</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-lg">Micro-Tunneling Analysis</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Detailed costing for slurry separation, jacking forces, and reception pit structural requirements.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-lg">Horizontal Directional Drilling (HDD)</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Modeling for annular pressure and inadvertent return risks during creek or road crossings.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#001D3D] mb-2 text-lg">Auger Boring</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Precision casing installation estimating with laser-guided accuracy margins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-[#001D3D] relative overflow-hidden" id="pipeline">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto text-center font-body relative z-10">
          <span className="text-[#00C49A] font-headline font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">SYSTEMATIC METHODOLOGY</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-20 tracking-tight font-headline">The Precision Data Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-white/10">
            {[
              { id: '01', title: 'Quantification', desc: 'Automated Take-offs from BIM & CAD.' },
              { id: '02', title: 'Market Parity', desc: 'Real-time local material index updates.' },
              { id: '03', title: 'Labour Logics', desc: 'Production rate adjustment per terrain.' },
              { id: '04', title: 'Risk Stack', desc: 'Monte Carlo contingency modeling.' },
              { id: '05', title: 'BOQ Delivery', desc: 'Ready-for-tender final submission.', highlight: true }
            ].map((step) => (
              <div key={step.id} className={`p-10 border-r border-white/10 last:border-r-0 transition-all duration-500 hover:bg-white/5 group ${step.highlight ? 'bg-white/5' : ''}`}>
                <div className="text-4xl font-headline font-black text-white/10 mb-8 group-hover:text-[#00C49A]/20 transition-colors">{step.id}</div>
                <h4 className="font-headline font-bold text-lg mb-4 text-white">{step.title}</h4>
                <p className="text-xs leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">{step.desc}</p>
                {step.highlight && <div className="mt-8 h-1 w-full bg-[#00C49A]"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center font-body">
          <h2 className="text-4xl font-headline font-extrabold text-[#001D3D] mb-12">Ready for an engineered estimate?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request" className="bg-[#001D3D] text-white px-10 py-4 rounded-md font-bold hover:bg-[#002B2B] transition-all">Submit Tender Documents</Link>
            <button className="bg-white text-[#001D3D] border border-gray-200 px-10 py-4 rounded-md font-bold hover:bg-gray-50 transition-all">Download Sample BOQ</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesDetail;
