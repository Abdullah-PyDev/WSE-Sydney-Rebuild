import React from 'react';
import { motion } from 'motion/react';
import { 
  PencilRuler as ArchitectureIcon, 
  Landmark as AccountBalanceIcon, 
  Cpu as PrecisionManufacturingIcon, 
  CheckCircle as VerifiedIcon, 
  Droplets as WaterDropIcon 
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
      <header className="pt-12 pb-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8"
          >
            <div className="mb-6 inline-flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-xs">
              <span className="h-px w-8 bg-slate-900"></span>
              Our Pedigree
            </div>
            <h1 className="font-extrabold text-5xl md:text-7xl text-slate-900 leading-tight tracking-tighter mb-8">
              Bridging the gap between <span className="text-blue-600">technical drawings</span> and cost reality.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              At WSE Sydney, we don't just estimate; we engineer financial certainty into the fluid complexity of water and sewer infrastructure.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 flex justify-start lg:justify-end pb-4"
          >
            <div className="bg-slate-50 p-8 rounded-xl border-l-4 border-slate-900">
              <div className="text-4xl font-extrabold text-slate-900 mb-1">15+</div>
              <div className="text-sm uppercase tracking-wider text-slate-600">Years Industry Expertise</div>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="bg-slate-50 py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-xl"></div>
              <div className="relative z-10 overflow-hidden rounded-xl bg-white shadow-xl aspect-[4/5]">
                <img 
                  alt="Shoaib Saeed" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDotnxBm3KUiIGpk5CLXJbWBaIA1l2Di8miHieAk1u8qDN3LPvCOjvWc19sZZK5Ih6fL9SIqZPStZJkASkmiaIn5UINMeus_T8V92RRc-6Kv7H3mUcVbzmbW5n63hxa0Ef9RpBzRJlXFu-Zzk0Hd72g9spNODXLZpfeCVkqGwk9UHwsYt16nZ6eijDKjd957Kdx8VnSzpgPxP3SI4qtwiovIX_VZlJUNusmi7btcnv4n0LGeLCp260-eQdTdX6KsFHC9O43oJ0m-iU" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-slate-900 opacity-5 rounded-full blur-3xl"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 relative"
            >
              <div className="flex items-center gap-6 relative z-10">
                <div>
                  <h2 className="font-bold text-4xl text-slate-900 mb-2">Shoaib Saeed</h2>
                  <div className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Founder & Principal Estimator</div>
                </div>
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-slate-200 p-2 flex items-center justify-center shrink-0">
                  <img 
                    src="/logo.png" 
                    alt="WSE Sydney" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Shoaib Saeed founded WSE Sydney with a singular vision: to eliminate the ambiguity that often exists between civil engineering design and the actual cost of execution. 
                </p>
                <p>
                  With a background deeply rooted in major Sydney water infrastructure projects, Shoaib brings a rigorous analytical approach to every BOQ. His philosophy centers on "The Precision Monolith"—creating estimates that stand as unshakeable foundations for large-scale development projects.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <div className="text-blue-600 mb-4">
                    <Architecture size={24} />
                  </div>
                  <div className="font-bold text-slate-900">Technical Depth</div>
                  <div className="text-xs text-slate-500 mt-1">Specializing in Sydney Water standards and compliance.</div>
                </div>
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <div className="text-blue-600 mb-4">
                    <AccountBalance size={24} />
                  </div>
                  <div className="font-bold text-slate-900">Fiscal Integrity</div>
                  <div className="text-xs text-slate-500 mt-1">Transparent cost modeling for Tier 1 contractors.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Client Testimonials</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Hear from the industry leaders who trust WSE Sydney for their infrastructure estimating needs.</p>
          </div>
          
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-bold text-3xl text-slate-900 mb-4">Our Engineering Core</h2>
          <div className="h-1 w-20 bg-slate-900"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-slate-50 text-slate-900 p-12 rounded-xl flex flex-col justify-between border border-slate-200"
          >
            <PrecisionManufacturing className="text-slate-300 mb-12" size={48} />
            <div>
              <h3 className="font-bold text-3xl mb-4">Precision First</h3>
              <p className="text-slate-600 max-w-md">We reject the 'rough estimate' culture. Our data is derived from granular analysis of pipe diameter, soil variance, and hydraulic load factors.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-xl flex flex-col justify-between"
          >
            <Verified className="text-slate-900 mb-8" size={32} />
            <div>
              <h4 className="font-bold text-xl text-slate-900 mb-2">Compliance</h4>
              <p className="text-sm text-slate-600">100% adherence to Australian Standards and local council water regulations.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 p-8 rounded-xl flex flex-col justify-between text-white"
          >
            <WaterDrop className="text-white mb-8" size={32} />
            <div>
              <h4 className="font-bold text-xl mb-2">Fluidity</h4>
              <p className="text-sm text-slate-300">Agile response times to design changes, ensuring project timelines remain intact.</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-slate-50 p-12 rounded-xl flex items-center gap-12"
          >
            <div className="hidden md:block w-48 h-32 rounded-lg overflow-hidden shrink-0">
              <img 
                alt="Pipes" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkpXIQsyi2bDthtOtpCULtWuqGob2vJ3LLKaNm3kaei8i8naFwVKcj9yhk4mk5kXk2_WUc07ekHbApqnDDRuf_psi90eqLYPiJT6uTC3lmjZjLsosIAodSvY27-pls4o5pr6ZZBSY5OPX8LlqEgqaSo4TK8MT-r9llzMVO3GV-mhyXH9Y1XIqS8YNrWQzKAJM0mFgvhqju-KZaBusaWzgHZbUF6ttjkL1rZbRpKa5w95K5EG0ny_1ZANUpiqnmg4hN0MADQI5dKDk" 
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-900 mb-3">Sydney Local. Global Standards.</h3>
              <p className="text-slate-600">Based in Bankstown, we serve the entire Sydney basin with international-grade estimating methodologies used by global civil firms.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

// Removed mock components at the bottom as they are now at the top
export default About;
