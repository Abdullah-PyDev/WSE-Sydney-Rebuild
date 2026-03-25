import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  PencilRuler as ArchitectureIcon, 
  Landmark as AccountBalanceIcon, 
  Cpu as PrecisionManufacturingIcon, 
  CheckCircle as VerifiedIcon, 
  Droplets as WaterDropIcon,
  ArrowRight
} from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Architecture = ({ size, className }: { size?: number; className?: string }) => <ArchitectureIcon size={size} className={className} />;
const AccountBalance = ({ size, className }: { size?: number; className?: string }) => <AccountBalanceIcon size={size} className={className} />;
const PrecisionManufacturing = ({ size, className }: { size?: number; className?: string }) => <PrecisionManufacturingIcon size={size} className={className} />;
const Verified = ({ size, className }: { size?: number; className?: string }) => <VerifiedIcon size={size} className={className} />;
const WaterDrop = ({ size, className }: { size?: number; className?: string }) => <WaterDropIcon size={size} className={className} />;

const About = () => {
  return (
    <main className="pt-24">
      <header className="pt-8 md:pt-12 pb-12 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="mb-4 md:mb-6 inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-[11px] md:text-xs">
              <span className="h-px w-6 md:w-8 bg-primary"></span>
              Our Pedigree
            </div>
            <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-primary leading-tight tracking-tighter mb-6 md:mb-8">
              Bridging the gap between <span className="text-surface-tint">technical drawings</span> and cost reality.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-body mb-8">
              At WSE Sydney, we don't just estimate; we engineer financial certainty into the fluid complexity of water and sewer infrastructure.
            </p>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-bold text-sm hover:bg-primary-container transition-all"
            >
              Explore Our Services <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 flex justify-start lg:justify-end pb-4"
          >
            <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border-l-4 border-primary w-full sm:w-auto">
              <div className="text-3xl md:text-4xl font-headline font-extrabold text-primary mb-1">15+</div>
              <div className="text-xs md:text-sm font-body uppercase tracking-wider text-on-surface-variant">Years Industry Expertise</div>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="bg-surface-container-low py-12 md:py-24 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group max-w-md mx-auto lg:max-w-none"
            >
              <div className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 bg-surface-tint/10 rounded-xl"></div>
              <div className="relative z-10 overflow-hidden rounded-xl bg-white shadow-xl aspect-[4/5]">
                <img 
                  alt="Shoaib Saeed" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDotnxBm3KUiIGpk5CLXJbWBaIA1l2Di8miHieAk1u8qDN3LPvCOjvWc19sZZK5Ih6fL9SIqZPStZJkASkmiaIn5UINMeus_T8V92RRc-6Kv7H3mUcVbzmbW5n63hxa0Ef9RpBzRJlXFu-Zzk0Hd72g9spNODXLZpfeCVkqGwk9UHwsYt16nZ6eijDKjd957Kdx8VnSzpgPxP3SI4qtwiovIX_VZlJUNusmi7btcnv4n0LGeLCp260-eQdTdX6KsFHC9O43oJ0m-iU" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 md:w-48 h-32 md:h-48 bg-primary opacity-5 rounded-full blur-3xl"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 md:space-y-8 relative text-center lg:text-left"
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6 relative z-10">
                <div className="order-2 lg:order-1">
                  <h2 className="font-headline font-bold text-3xl md:text-4xl text-primary mb-2">Shoaib Saeed</h2>
                  <div className="text-surface-tint font-body font-semibold tracking-wide uppercase text-xs md:text-sm">Founder & Principal Estimator</div>
                </div>
                <div className="order-1 lg:order-2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-sm border border-slate-100 p-2 flex items-center justify-center shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="WSE Sydney" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 text-on-surface-variant leading-relaxed text-base md:text-lg font-body">
                <p>
                  Shoaib Saeed founded WSE Sydney with a singular vision: to eliminate the ambiguity that often exists between civil engineering design and the actual cost of execution. 
                </p>
                <p>
                  With a background deeply rooted in major Sydney water infrastructure projects, Shoaib brings a rigorous analytical approach to every BOQ. His philosophy centers on "The Precision Monolith"—creating estimates that stand as unshakeable foundations for large-scale development projects.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/services/detail#water" className="bg-surface-container-lowest p-6 rounded-md shadow-sm hover:shadow-md transition-shadow group">
                  <div className="text-surface-tint mb-4 flex justify-center lg:justify-start group-hover:scale-110 transition-transform">
                    <Architecture size={24} />
                  </div>
                  <div className="font-headline font-bold text-primary">Technical Depth</div>
                  <div className="text-xs text-on-surface-variant mt-1 font-body">Specializing in Sydney Water standards and compliance.</div>
                </Link>
                <Link to="/request" className="bg-surface-container-lowest p-6 rounded-md shadow-sm hover:shadow-md transition-shadow group">
                  <div className="text-surface-tint mb-4 flex justify-center lg:justify-start group-hover:scale-110 transition-transform">
                    <AccountBalance size={24} />
                  </div>
                  <div className="font-headline font-bold text-primary">Fiscal Integrity</div>
                  <div className="text-xs text-on-surface-variant mt-1 font-body">Transparent cost modeling for Tier 1 contractors.</div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 bg-surface-container-lowest overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-2xl md:text-4xl font-extrabold text-primary mb-4">Client Testimonials</h2>
            <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mx-auto font-body">Hear from the industry leaders who trust WSE Sydney for their infrastructure estimating needs.</p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-12 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-primary mb-4">Our Engineering Core</h2>
          <div className="h-1 w-20 bg-primary mx-auto md:mx-0"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 font-body">
          <Link 
            to="/services/detail#pipeline"
            className="md:col-span-2 bg-surface-container-low text-primary p-8 md:p-12 rounded-xl flex flex-col justify-between border border-outline-variant hover:border-primary/20 transition-colors group"
          >
            <PrecisionManufacturing className="text-surface-tint/30 mb-8 md:mb-12 group-hover:text-surface-tint/50 transition-colors" size={48} />
            <div>
              <h3 className="font-headline font-bold text-2xl md:text-3xl mb-4">Precision First</h3>
              <p className="text-on-surface-variant text-sm md:text-base max-w-md">We reject the 'rough estimate' culture. Our data is derived from granular analysis of pipe diameter, soil variance, and hydraulic load factors.</p>
            </div>
          </Link>
          <Link 
            to="/faq"
            className="bg-surface-container-low p-6 md:p-8 rounded-xl flex flex-col justify-between hover:bg-surface-container transition-colors group"
          >
            <Verified className="text-primary mb-6 md:mb-8 group-hover:scale-110 transition-transform" size={32} />
            <div>
              <h4 className="font-headline font-bold text-lg md:text-xl text-primary mb-2">Compliance</h4>
              <p className="text-xs md:text-sm text-on-surface-variant">100% adherence to Australian Standards and local council water regulations.</p>
            </div>
          </Link>
          <Link 
            to="/request"
            className="bg-primary p-6 md:p-8 rounded-xl flex flex-col justify-between text-white hover:bg-primary-container transition-colors group"
          >
            <WaterDrop className="text-white mb-6 md:mb-8 group-hover:animate-pulse" size={32} />
            <div>
              <h4 className="font-headline font-bold text-lg md:text-xl mb-2">Fluidity</h4>
              <p className="text-xs md:text-sm text-white/70">Agile response times to design changes, ensuring project timelines remain intact.</p>
            </div>
          </Link>
          <Link 
            to="/locations"
            className="md:col-span-2 bg-surface-container-low p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left hover:bg-surface-container transition-colors group"
          >
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
              <img 
                alt="Pipes" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkpXIQsyi2bDthtOtpCULtWuqGob2vJ3LLKaNm3kaei8i8naFwVKcj9yhk4mk5kXk2_WUc07ekHbApqnDDRuf_psi90eqLYPiJT6uTC3lmjZjLsosIAodSvY27-pls4o5pr6ZZBSY5OPX8LlqEgqaSo4TK8MT-r9llzMVO3GV-mhyXH9Y1XIqS8YNrWQzKAJM0mFgvhqju-KZaBusaWzgHZbUF6ttjkL1rZbRpKa5w95K5EG0ny_1ZANUpiqnmg4hN0MADQI5dKDk" 
              />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl md:text-2xl text-primary mb-3">Sydney Local. Global Standards.</h3>
              <p className="text-sm md:text-base text-on-surface-variant mb-4">Based in Bankstown, we serve the entire Sydney basin with international-grade estimating methodologies used by global civil firms.</p>
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:text-surface-tint transition-colors">
                Contact Our Local Team <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-6">Ready to engineer your next project?</h2>
          <p className="text-white/70 text-lg mb-10 font-body">Join the Tier 1 contractors who trust WSE Sydney for precision infrastructure estimating.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request" className="bg-white text-primary px-10 py-4 rounded-md font-bold hover:bg-blue-50 transition-all shadow-xl shadow-black/20">Request a BOQ</Link>
            <Link to="/services" className="border border-white/30 text-white px-10 py-4 rounded-md font-bold hover:bg-white/10 transition-all">View Our Services</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Removed mock components at the bottom as they are now at the top
export default About;
