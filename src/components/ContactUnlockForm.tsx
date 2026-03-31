import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, ShieldCheck, Loader2, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';

import { apiFetch } from '../lib/api';

interface ContactUnlockFormProps {
  onVerified: () => void;
  title?: string;
  description?: string;
}

const ContactUnlockForm: React.FC<ContactUnlockFormProps> = ({ 
  onVerified, 
  title = "Unlock Estimator Tool",
  description = "To continue using our professional estimating tools, please provide your contact details. This helps us ensure we provide the most relevant data for your project."
}) => {
  const [step, setStep] = useState<'form' | 'code'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting details for verification:', { name, email, phone, company });
      const res = await apiFetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Submission failed');
      }

      toast.success('Verification code sent to your email.');
      setStep('code');
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Verifying code:', code);
      const res = await apiFetch('/api/verify/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Verification failed');
      }

      toast.success('Email verified! The estimator is now unlocked.');
      onVerified();
    } catch (error: any) {
      console.error('Verification error:', error);
      toast.error(error.message || 'Invalid code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-low rounded-2xl border border-outline-variant p-8 max-w-lg mx-auto shadow-xl"
    >
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck size={32} />
      </div>

      <h2 className="text-2xl font-bold text-center text-primary mb-2 font-headline">
        {step === 'form' ? title : 'Verify Your Email'}
      </h2>
      <p className="text-center text-on-surface-variant text-sm mb-8 font-body">
        {step === 'form' 
          ? description 
          : `We've sent a 6-digit verification code to ${email}. Please enter it below to unlock the tool.`}
      </p>

      {step === 'form' ? (
        <form onSubmit={handleSubmitDetails} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-body"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Company (Optional)</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-body"
                  placeholder="Acme Corp"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-body"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none transition-all font-body"
                placeholder="+61 400 000 000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-headline uppercase tracking-widest text-xs mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Sending Code...
              </>
            ) : (
              'Send Verification Code'
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitCode} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline text-center block">6-Digit Code</label>
            <input
              required
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 text-center text-3xl font-bold tracking-[0.5em] focus:ring-2 focus:ring-primary outline-none transition-all font-mono"
              placeholder="000000"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting || code.length !== 6}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-headline uppercase tracking-widest text-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying...
                </>
              ) : (
                'Verify & Unlock'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setStep('form')}
              className="w-full text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors py-2"
            >
              Back to Details
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ContactUnlockForm;
