import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Send,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { submitBOQRequest } from '../lib/api';

import { useLocation } from 'react-router-dom';

const RequestBOQ = () => {
  const location = useLocation();
  const isEmbed = new URLSearchParams(location.search).get('embed') === 'true';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'water',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitBOQRequest({
        ...formData,
        file: null // No file in simplified form
      });
      toast.success('Your BOQ request has been submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'water',
        description: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`${isEmbed ? 'pt-8' : 'pt-24 md:pt-28'} pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto`}>
      <section className="text-center mb-12 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 text-surface-tint mb-4 md:mb-6"
        >
          <FileText size={14} className="fill-surface-tint text-white" />
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-headline">Professional Estimating Services</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-extrabold text-primary leading-tight tracking-tighter mb-6 font-headline"
        >
          Request <br/>
          <span className="text-surface-tint">BOQ Services.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto font-body"
        >
          Partner with Australia's leading experts in Water & Sewer Estimating. Provide your project details below to start the process.
        </motion.p>
      </section>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all"
                  placeholder="+61 400 000 000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all"
                  placeholder="Engineering Firm Pty Ltd"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Project Type</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all"
              >
                <option value="water">Water Mains</option>
                <option value="sewer">Sewer Mains</option>
                <option value="stormwater">Stormwater</option>
                <option value="other">Other Infrastructure</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Project Description & Requirements</label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none transition-all resize-none"
                placeholder="Please describe your project and any specific BOQ requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white font-bold py-5 rounded-2xl font-headline flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit BOQ Request</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Expert Review',
              desc: 'Our senior estimators will contact you to discuss your project specifics.',
              icon: ShieldCheck
            },
            {
              title: 'Fast Turnaround',
              desc: 'Receive your comprehensive, tender-ready BOQ within 24-48 hours.',
              icon: Clock
            },
            {
              title: 'Sydney Water Standards',
              desc: 'Every estimate is guaranteed to meet all regulatory and compliance benchmarks.',
              icon: CheckCircle2
            }
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="bg-primary/5 w-12 h-12 rounded-2xl text-primary flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} />
              </div>
              <h4 className="font-bold text-primary font-headline text-sm mb-2">{item.title}</h4>
              <p className="text-on-surface-variant text-[11px] font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RequestBOQ;
