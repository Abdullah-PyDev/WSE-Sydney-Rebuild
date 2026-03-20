import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, ShieldCheck, BarChart3, Clock, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const projectsData = {
  "sewer-trunk-renewal": {
    title: "Sewer Trunk Renewal",
    location: "Parramatta, NSW",
    date: "Oct 2023",
    description: "This project involved the comprehensive Bill of Quantities (BOQ) for a 2.4km major sewer trunk renewal. The project was particularly challenging due to its route through high-density urban areas, requiring complex micro-tunnelling sections to minimize surface disruption. WSE Sydney provided precise material take-offs and risk assessments that allowed the client to secure the tender with a highly competitive yet technically sound bid.",
    metrics: [
      { label: "Pipeline Length", value: "2.4km", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.9%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "48 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/sewer1/1200/800",
      "https://picsum.photos/seed/sewer2/1200/800",
      "https://picsum.photos/seed/sewer3/1200/800"
    ]
  },
  "potable-water-network": {
    title: "Potable Water Network",
    location: "Western Sydney, NSW",
    date: "Jan 2024",
    description: "WSE Sydney was engaged to provide a detailed hydraulic valuation and estimation for a new residential precinct's potable water network. The scope included trunk mains, reticulation pipes, and pressure reducing valves. Our team worked closely with the developers to ensure all estimations met Sydney Water's rigorous standards while optimizing material costs through precise engineering analysis.",
    metrics: [
      { label: "Network Size", value: "15km", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.8%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "36 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/water1/1200/800",
      "https://picsum.photos/seed/water2/1200/800",
      "https://picsum.photos/seed/water3/1200/800"
    ]
  },
  "stormwater-detention-basin": {
    title: "Stormwater Detention Basin",
    location: "Liverpool, NSW",
    date: "Dec 2023",
    description: "This project required precision estimating for a large-scale On-site Stormwater Detention (OSD) basin. The design featured integrated water quality treatment systems, including bio-retention swales and gross pollutant traps. WSE's detailed BOQ accounted for complex excavation volumes, specialized filtration media, and structural concrete components, providing the client with a robust financial roadmap for construction.",
    metrics: [
      { label: "Basin Capacity", value: "5,000m³", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.7%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "24 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/storm1/1200/800",
      "https://picsum.photos/seed/storm2/1200/800",
      "https://picsum.photos/seed/storm3/1200/800"
    ]
  },
  "sewer-pump-station": {
    title: "Sewer Pump Station",
    location: "Blacktown, NSW",
    date: "Feb 2024",
    description: "WSE provided a full mechanical and civil component estimation for a Type 60 Sydney Water accredited pump station. The project involved intricate detailing of wet well structures, valve pits, and electrical control systems. Our expertise in Sydney Water standards ensured that every component was accurately costed and compliant, reducing the risk of variations during the construction phase.",
    metrics: [
      { label: "Station Type", value: "Type 60", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.9%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "48 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/pump1/1200/800",
      "https://picsum.photos/seed/pump2/1200/800",
      "https://picsum.photos/seed/pump3/1200/800"
    ]
  },
  "recycled-water-mains": {
    title: "Recycled Water Mains",
    location: "Penrith, NSW",
    date: "Mar 2024",
    description: "Detailed BOQ for 5km of recycled water mains serving industrial and residential developments. The project required careful coordination with existing utility services and detailed estimation of specialized purple-pipe infrastructure. WSE's accurate take-offs helped the client manage procurement efficiently and stay within budget for this critical sustainability project.",
    metrics: [
      { label: "Mains Length", value: "5km", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.8%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "24 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/recycled1/1200/800",
      "https://picsum.photos/seed/recycled2/1200/800",
      "https://picsum.photos/seed/recycled3/1200/800"
    ]
  },
  "trunk-water-renewal": {
    title: "Trunk Water Renewal",
    location: "Bankstown, NSW",
    date: "Nov 2023",
    description: "Strategic estimation for a critical trunk water main renewal under major arterial roads. This project involved high-pressure steel mains and complex connection points. WSE Sydney provided detailed methodology-based costing that accounted for night works, traffic management requirements, and specialized welding procedures, ensuring a realistic and competitive estimate.",
    metrics: [
      { label: "Pipe Diameter", value: "600mm", icon: <BarChart3 size={20} /> },
      { label: "Accuracy Rate", value: "99.9%", icon: <ShieldCheck size={20} /> },
      { label: "Turnaround", value: "48 Hours", icon: <Clock size={20} /> }
    ],
    images: [
      "https://picsum.photos/seed/trunk1/1200/800",
      "https://picsum.photos/seed/trunk2/1200/800",
      "https://picsum.photos/seed/trunk3/1200/800"
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData[id as keyof typeof projectsData];
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="pt-32 pb-20 px-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">Project Not Found</h1>
        <Link to="/services" className="text-blue-600 font-bold hover:underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <main className="pt-20">
      <section className="bg-primary py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/services" className="inline-flex items-center gap-2 text-blue-300 font-bold text-sm uppercase tracking-widest mb-8 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-white font-headline text-4xl md:text-6xl font-extrabold mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-6 text-blue-100/70 font-body text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-400" /> {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-400" /> {project.date}
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl">
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-2">Project Status</p>
              <p className="text-white font-headline font-bold text-xl">Completed & Verified</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="font-headline text-2xl font-bold text-primary">Project Overview</h2>
                <p className="text-slate-600 leading-relaxed font-body text-lg">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-4">
                      {metric.icon}
                    </div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{metric.label}</p>
                    <p className="text-primary font-headline font-black text-2xl">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <h2 className="font-headline text-2xl font-bold text-primary">Project Visuals</h2>
                <div className="grid gap-6">
                  {project.images.map((img, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="rounded-2xl overflow-hidden shadow-lg group cursor-zoom-in relative"
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 sticky top-32">
                <h3 className="font-headline text-xl font-bold text-primary mb-6">Need a similar estimate?</h3>
                <p className="text-slate-600 text-sm mb-8 font-body">
                  Our team of Sydney Water accredited estimators can provide a detailed BOQ for your next infrastructure project within 48 hours.
                </p>
                <Link to="/request" className="block w-full bg-primary text-white text-center py-4 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mb-4">
                  Request a BOQ
                </Link>
                <button className="block w-full border border-slate-200 text-primary text-center py-4 rounded-lg font-bold hover:bg-white transition-all">
                  Download Capability Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Gallery */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {project.images.length > 1 && (
                <>
                  <button 
                    className="absolute left-0 md:-left-16 text-white/50 hover:text-white transition-colors p-2"
                    onClick={() => setSelectedImageIndex((prev) => (prev! - 1 + project.images.length) % project.images.length)}
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button 
                    className="absolute right-0 md:-right-16 text-white/50 hover:text-white transition-colors p-2"
                    onClick={() => setSelectedImageIndex((prev) => (prev! + 1) % project.images.length)}
                  >
                    <ChevronRight size={48} />
                  </button>
                </>
              )}

              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={project.images[selectedImageIndex]} 
                  alt={`${project.title} gallery`} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-white/70 font-body text-sm">
                  Image {selectedImageIndex + 1} of {project.images.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectDetail;
