import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Toaster, toast } from 'sonner';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  Save,
  CheckCircle2,
  Search,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  BarChart,
  Users,
  AlertTriangle,
  FileCheck,
  Bold,
  Italic,
  Type,
  Loader2,
  X,
  Maximize2
} from 'lucide-react';

const MarkdownEditor = ({ 
  label, 
  value, 
  onChange, 
  onBlur,
  placeholder,
  isSaving = false
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  onBlur: (val: string) => void;
  placeholder?: string;
  isSaving?: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    
    onChange(newText);
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="block text-xs font-bold text-primary uppercase tracking-widest">{label}</label>
          {isSaving && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-[10px] text-surface-tint font-bold uppercase tracking-wider"
            >
              <Loader2 size={10} className="animate-spin" />
              Saving...
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1 border border-outline-variant/50">
          <button 
            type="button"
            onClick={() => insertText('**', '**')}
            className="p-1.5 hover:bg-white rounded transition-colors text-primary"
            title="Bold"
          >
            <Bold size={14} />
          </button>
          <button 
            type="button"
            onClick={() => insertText('_', '_')}
            className="p-1.5 hover:bg-white rounded transition-colors text-primary"
            title="Italic"
          >
            <Italic size={14} />
          </button>
          <button 
            type="button"
            onClick={() => insertText('# ', '')}
            className="p-1.5 hover:bg-white rounded transition-colors text-primary"
            title="Heading"
          >
            <Type size={14} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea 
          ref={textareaRef}
          className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 h-32 resize-none"
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onBlur={e => onBlur(e.target.value)}
        />
        <div className="w-full bg-slate-50 border border-dashed border-outline-variant rounded-xl px-4 py-3 text-sm font-body h-32 overflow-y-auto prose prose-sm prose-slate max-w-none">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-200 pb-1">Preview</div>
          <ReactMarkdown>{value || ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

interface Submission {
  id: number;
  fullName: string;
  companyName: string;
  address: string;
  notes: string;
  isUrgent: number;
  fileName: string | null;
  fileMimeType: string | null;
  status: 'pending' | 'processed';
  createdAt: string;
}

interface Stats {
  total: number;
  urgent: number;
  pending: number;
  processed: number;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submissions' | 'content'>('dashboard');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [previewSubmission, setPreviewSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [subRes, contentRes, statsRes] = await Promise.all([
        fetch('/api/admin/submissions', { headers }),
        fetch('/api/admin/content'),
        fetch('/api/admin/stats', { headers })
      ]);

      if (subRes.status === 401) {
        handleLogout();
        return;
      }

      const subData = await subRes.json();
      const contentData = await contentRes.json();
      const statsData = await statsRes.json();

      if (subData.success) setSubmissions(subData.submissions);
      if (contentData.success) setContent(contentData.content);
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      setError('Failed to fetch data');
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        toast.success('Login successful');
      } else {
        setError(data.error || 'Login failed');
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
      toast.error('Connection error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setSubmissions([]);
    toast.info('Signed out');
  };

  const updateContent = async (key: string, value: string) => {
    if (content[key] === value) return; // Skip if no change
    
    setSavingKeys(prev => new Set(prev).add(key));
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ key, value })
      });
      if (res.ok) {
        setContent(prev => ({ ...prev, [key]: value }));
        toast.success(`Updated ${key.replace('_', ' ')}`);
      } else {
        toast.error(`Failed to update ${key.replace('_', ' ')}`);
      }
    } catch (err) {
      toast.error('Failed to update content');
    } finally {
      setSavingKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: status as any } : s));
        fetchData(); // Refresh stats
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const deleteSubmission = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        fetchData(); // Refresh stats
        toast.success('Submission deleted');
        setDeleteConfirmId(null);
      } else {
        toast.error('Failed to delete submission');
      }
    } catch (err) {
      toast.error('Failed to delete submission');
    }
  };

  const downloadFile = async (id: number, fileName: string) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/file`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Download started');
      } else {
        toast.error('File not found');
      }
    } catch (err) {
      toast.error('Failed to download file');
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = ['ID', 'Full Name', 'Company Name', 'Address', 'Notes', 'Urgent', 'Status', 'Date'];
    const rows = submissions.map(sub => [
      sub.id,
      `"${sub.fullName.replace(/"/g, '""')}"`,
      `"${sub.companyName.replace(/"/g, '""')}"`,
      `"${sub.address.replace(/"/g, '""')}"`,
      `"${sub.notes.replace(/"/g, '""')}"`,
      sub.isUrgent ? 'Yes' : 'No',
      sub.status,
      new Date(sub.createdAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wse_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
        <Toaster position="top-right" richColors />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-outline-variant w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
              <LayoutDashboard size={32} />
            </div>
            <h1 className="text-2xl font-headline font-extrabold text-primary">Admin Access</h1>
            <p className="text-on-surface-variant text-sm mt-2">Please sign in to manage your portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text"
                value={loginData.username}
                onChange={e => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password"
                value={loginData.password}
                onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            {error && (
              <div className="bg-error-container text-error p-3 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl font-headline hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-outline-variant flex flex-col fixed h-full">
        <div className="p-8 border-b border-outline-variant">
          <h2 className="text-xl font-headline font-black text-primary tracking-tighter">WSE <span className="text-surface-tint">ADMIN</span></h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            <BarChart size={20} />
            <span className="font-headline font-bold text-sm">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('submissions')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'submissions' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            <FileText size={20} />
            <span className="font-headline font-bold text-sm">Submissions</span>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
          >
            <Settings size={20} />
            <span className="font-headline font-bold text-sm">Content Editor</span>
          </button>
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-error hover:bg-error-container/20 transition-all"
          >
            <LogOut size={20} />
            <span className="font-headline font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 md:p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-headline font-extrabold text-primary tracking-tighter">
              {activeTab === 'dashboard' ? 'Overview' : activeTab === 'submissions' ? 'Project Submissions' : 'Website Content'}
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              {activeTab === 'dashboard' ? 'Real-time performance metrics' : activeTab === 'submissions' ? `Managing ${submissions.length} total requests` : 'Update website text and settings in real-time'}
            </p>
          </div>
          
          {activeTab === 'submissions' && (
            <div className="flex items-center gap-4">
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-white border border-outline-variant rounded-full px-6 py-2.5 text-sm font-bold text-primary hover:bg-surface-container-low transition-all"
              >
                <Download size={18} />
                Export CSV
              </button>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                <input 
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-white border border-outline-variant rounded-full pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                />
              </div>
            </div>
          )}
        </header>

        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/5 text-primary rounded-2xl">
                  <Users size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total</span>
              </div>
              <h3 className="text-3xl font-headline font-black text-primary">{stats.total}</h3>
              <p className="text-on-surface-variant text-xs mt-1">Total submissions</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-error-container text-error rounded-2xl">
                  <AlertTriangle size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Urgent</span>
              </div>
              <h3 className="text-3xl font-headline font-black text-error">{stats.urgent}</h3>
              <p className="text-on-surface-variant text-xs mt-1">Requires immediate attention</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-surface-tint/10 text-surface-tint rounded-2xl">
                  <Clock size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Pending</span>
              </div>
              <h3 className="text-3xl font-headline font-black text-surface-tint">{stats.pending}</h3>
              <p className="text-on-surface-variant text-xs mt-1">Awaiting processing</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-outline-variant shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <FileCheck size={24} />
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Processed</span>
              </div>
              <h3 className="text-3xl font-headline font-black text-emerald-700">{stats.processed}</h3>
              <p className="text-on-surface-variant text-xs mt-1">Successfully completed</p>
            </div>
          </div>
        )}

        {activeTab === 'submissions' ? (
          <div className="bg-white border border-outline-variant rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest">Full Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest">Company</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-on-surface-variant font-body">
                        No submissions found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map(sub => (
                      <React.Fragment key={sub.id}>
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setExpandedRow(expandedRow === sub.id ? null : sub.id)}
                          className={`hover:bg-surface-container-low/30 transition-colors cursor-pointer ${expandedRow === sub.id ? 'bg-surface-container-low/50' : ''}`}
                        >
                          <td className="px-6 py-4 text-sm font-bold text-primary">{sub.fullName}</td>
                          <td className="px-6 py-4 text-sm text-on-surface-variant font-body">{sub.companyName}</td>
                          <td className="px-6 py-4 text-xs text-on-surface-variant font-mono">
                            {new Date(sub.createdAt).toLocaleDateString('en-AU', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              {sub.isUrgent === 1 && (
                                <span className="inline-flex items-center gap-1 bg-error-container text-error text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter mb-1">
                                  Urgent
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-tighter ${sub.status === 'processed' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}>
                                {sub.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {sub.fileName && (
                                <button 
                                  onClick={(e) => { e.stopPropagation(); downloadFile(sub.id, sub.fileName!); }}
                                  className="p-2 text-surface-tint hover:bg-surface-tint/10 rounded-lg transition-all"
                                  title="Download Document"
                                >
                                  <Download size={18} />
                                </button>
                              )}
                              <button 
                                onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(sub.id); }}
                                className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                              <ChevronRight size={18} className={`text-on-surface-variant transition-transform ${expandedRow === sub.id ? 'rotate-90' : ''}`} />
                            </div>
                          </td>
                        </motion.tr>
                        <AnimatePresence>
                          {expandedRow === sub.id && (
                            <tr>
                              <td colSpan={5} className="px-0 py-0 border-none">
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-surface-container-lowest"
                                >
                                  <div className="p-8 border-t border-outline-variant grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                      <div>
                                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Project Address</h4>
                                        <p className="text-sm text-on-surface-variant font-body bg-surface-container-low p-4 rounded-xl border border-outline-variant/50">
                                          {sub.address}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Submission Notes</h4>
                                        <p className="text-sm text-on-surface-variant font-body bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 whitespace-pre-wrap">
                                          {sub.notes || "No additional notes provided."}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="space-y-6">
                                      <div>
                                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Actions</h4>
                                        <div className="flex flex-wrap gap-3">
                                          {sub.status === 'pending' ? (
                                            <button 
                                              onClick={() => updateStatus(sub.id, 'processed')}
                                              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                            >
                                              <CheckCircle size={18} />
                                              Mark as Processed
                                            </button>
                                          ) : (
                                            <button 
                                              onClick={() => updateStatus(sub.id, 'pending')}
                                              className="flex items-center gap-2 bg-surface-tint text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-tint/90 transition-all shadow-lg shadow-surface-tint/20"
                                            >
                                              <Clock size={18} />
                                              Revert to Pending
                                            </button>
                                          )}
                                          {sub.fileName && (
                                            <div className="flex gap-3">
                                              <button 
                                                onClick={() => downloadFile(sub.id, sub.fileName!)}
                                                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                              >
                                                <Download size={18} />
                                                Download
                                              </button>
                                              <button 
                                                onClick={() => setPreviewSubmission(sub)}
                                                className="flex items-center gap-2 bg-surface-container text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-container-high transition-all border border-outline-variant"
                                              >
                                                <Eye size={18} />
                                                View
                                              </button>
                                            </div>
                                          )}
                                          <button 
                                            onClick={() => setDeleteConfirmId(sub.id)}
                                            className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-100 transition-all border border-red-100"
                                          >
                                            <Trash2 size={18} />
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                      <div className="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/30">
                                        <div className="flex items-center gap-3 text-on-surface-variant">
                                          <AlertCircle size={16} />
                                          <p className="text-xs font-body">This submission was received via the public BOQ request form.</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'content' ? (
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white border border-outline-variant rounded-3xl p-8">
              <h3 className="text-lg font-headline font-bold text-primary mb-6 flex items-center gap-2">
                <Settings size={20} className="text-surface-tint" />
                Hero Section
              </h3>
              <div className="space-y-8">
                <MarkdownEditor 
                  label="Hero Headline"
                  value={content['hero_headline'] || "Engineering Water Infrastructure with Precision."}
                  onChange={val => setContent(prev => ({ ...prev, hero_headline: val }))}
                  onBlur={val => updateContent('hero_headline', val)}
                  isSaving={savingKeys.has('hero_headline')}
                />
                <MarkdownEditor 
                  label="Hero Subheadline"
                  value={content['hero_subheadline'] || "Sydney's premier specialist in water, sewer, and stormwater estimating. Delivering tender-ready BOQs for Tier 1 contractors and developers."}
                  onChange={val => setContent(prev => ({ ...prev, hero_subheadline: val }))}
                  onBlur={val => updateContent('hero_subheadline', val)}
                  isSaving={savingKeys.has('hero_subheadline')}
                />
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-3xl p-8">
              <h3 className="text-lg font-headline font-bold text-primary mb-6 flex items-center gap-2">
                <AlertCircle size={20} className="text-surface-tint" />
                Contact Info
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Support Email</label>
                  <input 
                    type="email"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue={content['contact_email'] || "f250039@cfd.nu.edu.pk"}
                    onBlur={e => updateContent('contact_email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-widest mb-2">Office Address</label>
                  <input 
                    type="text"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20"
                    defaultValue={content['office_address'] || "Level 24, 100 Mount Street, North Sydney NSW 2060"}
                    onBlur={e => updateContent('office_address', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white p-8 rounded-3xl shadow-2xl border border-outline-variant w-full max-sm"
            >
              <div className="w-12 h-12 bg-error-container text-error rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-headline font-bold text-primary mb-2">Delete Submission?</h3>
              <p className="text-on-surface-variant text-sm font-body mb-8">This action cannot be undone. All project data and files will be permanently removed.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-primary bg-surface-container hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => deleteSubmission(deleteConfirmId)}
                  className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-white bg-error hover:bg-error/90 transition-all shadow-lg shadow-error/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewSubmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewSubmission(null)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-white rounded-[2rem] shadow-2xl border border-outline-variant w-full h-full max-w-6xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-headline font-bold text-primary leading-tight">
                      {previewSubmission.fileName}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-body">
                      Submitted by {previewSubmission.fullName} • {new Date(previewSubmission.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => downloadFile(previewSubmission.id, previewSubmission.fileName!)}
                    className="p-3 text-primary hover:bg-surface-container rounded-xl transition-all"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                  <a 
                    href={`/api/admin/submissions/${previewSubmission.id}/file?token=${encodeURIComponent(token || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-primary hover:bg-surface-container rounded-xl transition-all"
                    title="Open in New Tab"
                  >
                    <Maximize2 size={20} />
                  </a>
                  <div className="w-px h-6 bg-outline-variant mx-2" />
                  <button 
                    onClick={() => setPreviewSubmission(null)}
                    className="p-3 text-on-surface-variant hover:bg-error-container hover:text-error rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-surface-container-low relative">
                {(() => {
                  const mime = previewSubmission.fileMimeType || '';
                  const fileName = previewSubmission.fileName || '';
                  const ext = fileName.split('.').pop()?.toLowerCase();
                  const isImage = mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
                  const isPdf = mime.includes('pdf') || ext === 'pdf';
                  const encodedToken = encodeURIComponent(token || '');
                  const previewUrl = `/api/admin/submissions/${previewSubmission.id}/file?preview=true&token=${encodedToken}`;

                  if (isImage) {
                    return (
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <img 
                          src={previewUrl}
                          alt={fileName || 'Preview'}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    );
                  }

                  if (isPdf) {
                    return (
                      <iframe 
                        src={previewUrl}
                        className="w-full h-full border-none"
                        title="PDF Preview"
                      />
                    );
                  }

                  return (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center text-on-surface-variant mb-6">
                        <FileText size={40} />
                      </div>
                      <h4 className="text-xl font-headline font-bold text-primary mb-2">No Preview Available</h4>
                      <p className="text-on-surface-variant font-body max-w-md mb-8">
                        This file type ({mime || 'unknown'}) cannot be previewed directly in the browser. Please download the file to view its contents.
                      </p>
                      <button 
                        onClick={() => downloadFile(previewSubmission.id, previewSubmission.fileName!)}
                        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20"
                      >
                        <Download size={20} />
                        Download File
                      </button>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Admin;
