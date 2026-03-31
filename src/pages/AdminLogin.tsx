import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      toast.success('Welcome back, Admin');
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] border border-outline-variant p-8 md:p-12 shadow-2xl shadow-primary/5">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-primary/5 text-primary rounded-[2rem] flex items-center justify-center mb-6 border border-primary/10">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-headline font-black text-primary tracking-tighter text-center">
              WSE <span className="text-surface-tint">ADMIN</span>
            </h1>
            <p className="text-on-surface-variant text-sm font-body mt-2">Secure access to management dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-2xl font-headline font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-outline-variant text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-on-surface-variant text-xs font-bold hover:text-primary transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
