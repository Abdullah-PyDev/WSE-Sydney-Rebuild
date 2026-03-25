import React from 'react';
import { motion } from 'motion/react';
import QuickEstimator from '../components/QuickEstimator';
import { 
  Calculator, 
  ShieldCheck, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  BarChart3,
  FileText
} from 'lucide-react';

const Estimator = () => {
  return (
    <main className="pt-24 md:pt-28 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-12 md:mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 text-surface-tint mb-4 md:mb-6"
        >
          <Calculator size={14} className="fill-surface-tint text-white" />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-headline">Instant ROM Estimating</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold text-primary leading-tight tracking-tighter mb-6 font-headline"
        >
          Project Cost <br/>
          <span className="text-surface-tint">Intelligence.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto font-body"
        >
          Leverage our proprietary data engine to generate instant Rough Order of Magnitude (ROM) estimates for Sydney's water, sewer, and stormwater infrastructure.
        </motion.p>
      </section>

      {/* Estimator Component */}
      <section className="mb-16 md:mb-32">
        <QuickEstimator />
      </section>

      {/* Why Use Our Estimator? */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-16 md:mb-32">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-8 font-headline tracking-tighter">
            Why Use Our <br/>
            <span className="text-surface-tint">ROM Estimator?</span>
          </h2>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                title: 'Data-Driven Accuracy',
                desc: 'Our algorithms are calibrated against thousands of historical Sydney infrastructure projects and current market rates.',
                icon: BarChart3
              },
              {
                title: 'Instant Tender Support',
                desc: 'Get immediate cost ranges to support your initial tender feasibility studies and budget planning.',
                icon: Clock
              },
              {
                title: 'Sydney Water Standards',
                desc: 'Calculations account for the specific technical requirements and compliance costs of Sydney Water infrastructure.',
                icon: ShieldCheck
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-primary/5 p-3 rounded-xl text-primary flex-shrink-0">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary font-headline text-base md:text-lg">{item.title}</h4>
                  <p className="text-on-surface-variant text-xs md:text-sm font-body leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl md:rounded-3xl p-8 md:p-12 border border-outline-variant relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-extrabold text-primary mb-6 font-headline tracking-tighter">The Precision Difference</h3>
            <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed mb-8">
              While our ROM estimator provides a valuable starting point, infrastructure projects in Sydney often face unique challenges like complex traffic management, heritage constraints, and varying utility relocation requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                'Detailed Material Take-offs',
                'Site-Specific Labor Analysis',
                'Risk & Contingency Modeling',
                'Subcontractor Quote Integration'
              ].map(item => (
                <div key={item} className="flex items-center space-x-3">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span className="text-xs md:text-sm font-bold text-primary font-headline">{item}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.href = '/request'}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl font-headline flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 text-sm md:text-base"
            >
              <FileText size={18} />
              <span>Request Full BOQ Estimate</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary rounded-2xl md:rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 font-headline tracking-tighter leading-tight">
            Ready for a Professional <br/>
            Bill of Quantities?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 md:mb-12 font-body">
            Upload your technical drawings and receive a comprehensive, tender-ready estimate within 24-48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button 
              onClick={() => window.location.href = '/request'}
              className="w-full sm:w-auto bg-white text-primary px-10 py-4 rounded-xl font-bold font-headline hover:scale-105 transition-all shadow-xl"
            >
              Upload Drawings Now
            </button>
            <button 
              onClick={() => window.location.href = '/request'}
              className="text-white font-bold font-headline hover:underline"
            >
              View Sample BOQ
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Estimator;
