import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Settings, Waves, ArrowRight, History, ShieldCheck, Globe, Plus } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Typewriter = ({ phrases, delay = 0, speed = 100, deleteSpeed = 50, pause = 2000 }: { 
  phrases: string[]; 
  delay?: number; 
  speed?: number; 
  deleteSpeed?: number;
  pause?: number;
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(deleteSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(speed);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopNum, phrases, speed, deleteSpeed, pause, typingSpeed]);

  return (
    <span className="relative">
      {text}
      <span className="inline-block w-[3px] h-[0.8em] bg-blue-400 ml-1 align-middle animate-pulse" />
    </span>
  );
};

const Services = () => {
  const heroRef = useRef(null);
  const phrases = [
    "Guaranteed Accuracy.",
    "Sydney Water Accredited.",
    "24-Hour Turnaround.",
    "Data-Driven Clarity.",
    "Technical Excellence."
  ];
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main className="pt-20">
      <section ref={heroRef} className="relative min-h-[800px] flex items-center overflow-hidden bg-slate-50 px-8">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
          <img 
            alt="Blueprint" 
            className="w-full h-full object-cover opacity-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj5O6tpaDcBtbszy1Y_0WojtLKOT6JkjF5AHKiglzJkMNNOkop7NFdpcG2ERyzsjetCHxmkGUSU5piqYJ9_2wsVfKo-rtrZZSsu_hRpuVkgFye9yDutAYjdidr1WvrziutdFo7QYt7rCvZvfj4ETcpCOIDpm0c9yIF91IOF3xOL1-1nfHb4dpLwx7WVNfaGnkdaBtR6XHSvbDo38Ce3n4Bji24T0uyl_IAyzOYW4fiMMfMlTnYpLX8qv0W6SXG-to7DvzvKgBlZ8I" 
          />
        </motion.div>
        <motion.div 
          style={{ y: contentY }}
          className="relative z-20 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-primary text-xs font-bold tracking-widest uppercase font-body border border-blue-100">
              <ShieldCheck size={14} />
              Industry Certified Accuracy
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-slate-900 font-headline text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight min-h-[2.2em] md:min-h-[2.2em]">
              Precision Engineering. <br/>
              <span className="text-primary">
                <Typewriter phrases={phrases} />
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-body">
              Australia's leading experts in Water & Sewer Estimating with a 24-48h turnaround. Reducing risk and ensuring compliance for Sydney's most complex projects.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Link to="/request" className="bg-primary text-white px-8 py-4 rounded-md font-bold text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 font-body">
                Request a BOQ
              </Link>
              <Link to="/services/detail" className="border border-slate-200 bg-white text-slate-700 px-8 py-4 rounded-md font-bold text-base hover:bg-slate-50 transition-all font-body">
                Our Services
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
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
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-primary to-blue-400"
                  ></motion.div>
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
        </motion.div>
      </section>

      <section className="py-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-body">Trusted by Tier 1 Engineering Firms & Developers</p>
        </div>
        <div className="relative flex overflow-x-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 30, 
              ease: "linear" 
            }}
            className="flex items-center gap-24 whitespace-nowrap opacity-40 grayscale font-headline pr-24"
          >
            {[
              "CIVILNET", "HYDRAFLOW", "SYD_WATER_A", "PRECISE_CON", "AUST_INFRA", "URBAN_FLOW", "INFRA_CORE", "WATER_TECH"
            ].map((partner, i) => (
              <div key={i} className="text-2xl font-black text-primary tracking-tighter">{partner}</div>
            ))}
            {/* Duplicate for infinite loop */}
            {[
              "CIVILNET", "HYDRAFLOW", "SYD_WATER_A", "PRECISE_CON", "AUST_INFRA", "URBAN_FLOW", "INFRA_CORE", "WATER_TECH"
            ].map((partner, i) => (
              <div key={`dup-${i}`} className="text-2xl font-black text-primary tracking-tighter">{partner}</div>
            ))}
          </motion.div>
          
          {/* Gradient masks for smooth fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
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
            <div className="md:col-span-4 bg-blue-50 p-10 rounded-xl shadow-sm border border-blue-100 flex flex-col items-start gap-4 text-primary font-body">
              <span className="text-4xl font-headline font-black text-blue-100">02</span>
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-primary shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-headline font-bold text-lg">Sydney Water Accredited</h4>
              <p className="text-xs text-blue-600 uppercase tracking-wider">Certified Compliance Standards</p>
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
            <div className="md:col-span-4 bg-emerald-50 p-10 rounded-xl border border-emerald-100 flex flex-col justify-end text-emerald-900 font-body">
              <p className="text-sm font-medium mb-4 italic text-emerald-800">"The fastest turnaround in the sector without compromising on technical detail."</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-600">Project Director, AustInfra</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">Project Gallery</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-body">A showcase of our precision estimating work across major water and sewer infrastructure projects in Australia.</p>
            <div className="h-1.5 w-24 bg-primary mx-auto mt-6"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "sewer-trunk-renewal",
                title: "Sewer Trunk Renewal",
                location: "Parramatta, NSW",
                description: "Comprehensive BOQ for a 2.4km major sewer trunk renewal involving complex micro-tunnelling sections.",
                image: "https://picsum.photos/seed/sewer1/800/600"
              },
              {
                id: "potable-water-network",
                title: "Potable Water Network",
                location: "Western Sydney, NSW",
                description: "Detailed hydraulic valuation and estimation for a new residential precinct's potable water network.",
                image: "https://picsum.photos/seed/water1/800/600"
              },
              {
                id: "stormwater-detention-basin",
                title: "Stormwater Detention Basin",
                location: "Liverpool, NSW",
                description: "Precision estimating for a large-scale OSD basin with integrated water quality treatment systems.",
                image: "https://picsum.photos/seed/storm1/800/600"
              },
              {
                id: "sewer-pump-station",
                title: "Sewer Pump Station",
                location: "Blacktown, NSW",
                description: "Full mechanical and civil component estimation for a Type 60 Sydney Water accredited pump station.",
                image: "https://picsum.photos/seed/pump1/800/600"
              },
              {
                id: "recycled-water-mains",
                title: "Recycled Water Mains",
                location: "Penrith, NSW",
                description: "Detailed BOQ for 5km of recycled water mains serving industrial and residential developments.",
                image: "https://picsum.photos/seed/recycled1/800/600"
              },
              {
                id: "trunk-water-renewal",
                title: "Trunk Water Renewal",
                location: "Bankstown, NSW",
                description: "Strategic estimation for a critical trunk water main renewal under major arterial roads.",
                image: "https://picsum.photos/seed/trunk1/800/600"
              }
            ].map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg bg-slate-50"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle gradient overlay that's always there but faint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 bg-white relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline font-bold text-primary text-lg group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider">{project.location}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-body line-clamp-2">
                    {project.description}
                  </p>
                </div>
                
                {/* Improved Hover Overlay */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
                  <div className="absolute inset-0 bg-primary/90 backdrop-blur-[2px] flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <motion.div 
                      initial={false}
                      animate={{ y: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-300 mb-2">
                        <Plus size={20} />
                      </div>
                      <h4 className="text-white font-headline font-bold text-xl">{project.title}</h4>
                      <p className="text-blue-100/80 font-body text-xs leading-relaxed">
                        Precision estimating delivered with 99.8% accuracy. Click to view technical specifications and project metrics.
                      </p>
                      <div className="pt-2">
                        <Link 
                          to={`/projects/${project.id}`} 
                          className="inline-flex items-center gap-2 bg-blue-400 text-primary px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300"
                        >
                          View Case Study <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
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
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-12 md:p-20 text-center relative overflow-hidden shadow-xl shadow-blue-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">Ready to secure your project's accuracy?</h2>
            <p className="text-slate-600 text-lg mb-12 max-w-2xl mx-auto font-body">Download our rate card or request a Bill of Quantities today for a 48h guaranteed response.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-body">
              <Link to="/request" className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Request a BOQ</Link>
              <button className="bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-xl font-bold text-base hover:bg-slate-50 transition-all">Download Rate Card</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
