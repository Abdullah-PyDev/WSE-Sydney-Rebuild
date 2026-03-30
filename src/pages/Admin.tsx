import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Toaster, toast } from 'sonner';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
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
  Maximize2,
  UploadCloud,
  Home
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const MarkdownEditor = ({ value, onChange, onSave, isSaving }: { value: string, onChange: (val: string) => void, onSave: () => void, isSaving: boolean }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-surface-container-low p-2 rounded-t-xl border border-outline-variant">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-surface-container-high rounded text-on-surface-variant"><Bold size={16} /></button>
          <button className="p-2 hover:bg-surface-container-high rounded text-on-surface-variant"><Italic size={16} /></button>
          <button className="p-2 hover:bg-surface-container-high rounded text-on-surface-variant"><Type size={16} /></button>
        </div>
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
        <textarea 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 bg-surface-container-lowest border border-outline-variant rounded-b-xl md:rounded-bl-xl md:rounded-br-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none"
          placeholder="Enter markdown content..."
        />
        <div className="w-full h-full p-4 bg-white border border-outline-variant rounded-b-xl md:rounded-br-xl md:rounded-bl-none overflow-auto prose prose-sm max-w-none">
          <ReactMarkdown>{value || '*Preview will appear here*'}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

interface Submission {
  id: string;
  user_id: string;
  full_name: string;
  company_name: string;
  address: string;
  notes: string;
  is_urgent: boolean;
  status: 'pending' | 'delivered' | 'approved';
  created_at: string;
  final_doc_path?: string;
  files?: any[];
}

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'req-1',
    user_id: 'user-1',
    full_name: 'John Doe',
    company_name: 'Sydney Civil Group',
    address: '123 George St, Sydney NSW 2000',
    notes: 'Please prioritize this.',
    is_urgent: false,
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    final_doc_path: 'mock-path-1',
    files: [{ file_path: 'mock-file-1' }]
  },
  {
    id: 'req-2',
    user_id: 'user-1',
    full_name: 'John Doe',
    company_name: 'Metro Water Solutions',
    address: '456 Pitt St, Sydney NSW 2000',
    notes: 'Urgent request for next week.',
    is_urgent: true,
    status: 'delivered',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    final_doc_path: 'mock-path-2',
    files: [{ file_path: 'mock-file-2' }]
  },
  {
    id: 'req-3',
    user_id: 'user-2',
    full_name: 'Jane Smith',
    company_name: 'Urban Pipeworks',
    address: '789 Macquarie St, Sydney NSW 2000',
    notes: '',
    is_urgent: false,
    status: 'pending',
    created_at: new Date().toISOString(),
    files: [{ file_path: 'mock-file-3' }]
  }
];

const MOCK_CONTENT: Record<string, string> = {
  hero_title: '# Water and Sewer Estimating\n\nPrecision and expertise for your infrastructure projects.',
  about_text: 'We provide comprehensive estimating services for water and sewer systems across Australia.'
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submissions' | 'content'>('dashboard');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});
  const [stats, setStats] = useState({ total: 0, urgent: 0, pending: 0, processed: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'submissions' || activeTab === 'dashboard') {
        const res = await fetch('/api/submissions');
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const mappedSubmissions = data.map((s: any) => ({
          id: s.id.toString(),
          user_id: s.userId.toString(),
          full_name: s.fullName,
          company_name: s.companyName,
          address: s.address,
          notes: s.notes,
          is_urgent: s.isUrgent === 1,
          status: s.status,
          created_at: s.createdAt,
          final_doc_path: s.finalDocName ? `/uploads/${s.finalDocName}` : undefined,
          files: s.fileName ? [{ file_path: `/uploads/${s.fileName}` }] : []
        }));

        setSubmissions(mappedSubmissions);

        const total = mappedSubmissions.length;
        const urgent = mappedSubmissions.filter((s: any) => s.is_urgent).length;
        const pending = mappedSubmissions.filter((s: any) => s.status === 'pending').length;
        const processed = mappedSubmissions.filter((s: any) => s.status === 'delivered' || s.status === 'approved').length;
        setStats({ total, urgent, pending, processed });
      }

      if (activeTab === 'content') {
        const res = await fetch('/api/content');
        const data = await res.json();
        const contentMap: Record<string, string> = {};
        data.forEach((item: any) => {
          contentMap[item.key] = item.value;
        });
        setContent(contentMap);
      }
    } catch (err: any) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: status as any } : s));
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error('Failed to update status');
    }
  };

  const handleFileUpload = async (requestId: string, file: File) => {
    setUploadingId(requestId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/submissions/${requestId}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSubmissions(prev => prev.map(s => s.id === requestId ? { ...s, status: 'delivered', final_doc_path: `/uploads/${data.finalDocName}` } : s));
      toast.success('Final document uploaded');
    } catch (err: any) {
      toast.error('Failed to upload file');
    } finally {
      setUploadingId(null);
    }
  };

  const saveContent = async (key: string) => {
    setSavingKeys(prev => new Set(prev).add(key));
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, value: content[key] })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success(`${key} updated successfully`);
    } catch (err: any) {
      toast.error(`Failed to update ${key}`);
    } finally {
      setSavingKeys(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSubmissions(prev => prev.filter(s => s.id !== id));
      toast.success('Submission deleted');
      setDeleteConfirmId(null);
    } catch (err: any) {
      toast.error('Failed to delete submission');
    }
  };

  const filteredSubmissions = submissions.filter(s => 
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = ['ID', 'Full Name', 'Company Name', 'Address', 'Notes', 'Urgent', 'Status', 'Date'];
    const rows = submissions.map(sub => [
      sub.id,
      `"${sub.full_name.replace(/"/g, '""')}"`,
      `"${sub.company_name.replace(/"/g, '""')}"`,
      `"${sub.address.replace(/"/g, '""')}"`,
      `"${sub.notes.replace(/"/g, '""')}"`,
      sub.is_urgent ? 'Yes' : 'No',
      sub.status,
      new Date(sub.created_at).toLocaleString()
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

  if (loading && submissions.length === 0 && activeTab !== 'content') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest flex">
      <Toaster position="top-right" richColors />
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
          <Link 
            to="/"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-primary hover:bg-primary/5 transition-all"
          >
            <Home size={20} />
            <span className="font-headline font-bold text-sm">Return Home</span>
          </Link>
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

        {activeTab === 'dashboard' && (
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
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-20 text-center text-on-surface-variant font-body">
                        No submissions found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubmissions.map(sub => (
                      <React.Fragment key={sub.id}>
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`hover:bg-surface-container-low/30 transition-colors cursor-pointer ${expandedRow === sub.id ? 'bg-surface-container-low/50' : ''}`}
                          onClick={() => setExpandedRow(expandedRow === sub.id ? null : sub.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="font-headline font-bold text-primary text-sm">{sub.full_name}</div>
                              {sub.is_urgent && (
                                <span className="bg-error-container text-error text-[8px] font-black uppercase px-1.5 py-0.5 rounded tracking-tighter">Urgent</span>
                              )}
                            </div>
                            <div className="text-[10px] text-on-surface-variant font-body">{sub.company_name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              {sub.status === 'pending' ? (
                                <Clock size={12} className="text-surface-tint" />
                              ) : sub.status === 'delivered' ? (
                                <FileCheck size={12} className="text-emerald-500" />
                              ) : (
                                <CheckCircle2 size={12} className="text-emerald-500" />
                              )}
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                sub.status === 'pending' ? 'text-surface-tint' : 'text-emerald-600'
                              }`}>
                                {sub.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[10px] text-on-surface-variant font-mono">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={(e) => { e.stopPropagation(); setExpandedRow(expandedRow === sub.id ? null : sub.id); }}
                                className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-primary"
                              >
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(sub.id); }}
                                className="p-2 hover:bg-error-container hover:text-error rounded-lg transition-colors text-on-surface-variant"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                        <AnimatePresence>
                          {expandedRow === sub.id && (
                            <tr>
                              <td colSpan={4} className="px-4 pb-4">
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                      <div>
                                        <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Project Address</label>
                                        <p className="text-sm text-on-surface font-body">{sub.address}</p>
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Notes</label>
                                        <p className="text-sm text-on-surface font-body italic">"{sub.notes || 'No notes provided'}"</p>
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Attached Files</label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          {sub.files?.map((file: any, idx: number) => (
                                            <button 
                                              key={idx}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (file.file_path) {
                                                  window.open(file.file_path, '_blank');
                                                } else {
                                                  toast.info('File path not available');
                                                }
                                              }}
                                              className="flex items-center gap-2 bg-white border border-outline-variant px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
                                            >
                                              <Download size={14} />
                                              File {idx + 1}
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-6">
                                      <div>
                                        <label className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Actions</label>
                                        <div className="flex flex-wrap gap-3">
                                          {sub.status === 'pending' && (
                                            <div className="w-full space-y-3">
                                              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Upload Final Document</label>
                                              <div className="relative">
                                                <input 
                                                  type="file"
                                                  id={`upload-${sub.id}`}
                                                  className="hidden"
                                                  onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileUpload(sub.id, file);
                                                  }}
                                                />
                                                <label 
                                                  htmlFor={`upload-${sub.id}`}
                                                  className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-headline font-bold uppercase tracking-widest text-xs cursor-pointer hover:scale-[1.02] transition-all shadow-lg shadow-primary/10"
                                                >
                                                  {uploadingId === sub.id ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                  ) : (
                                                    <>
                                                      <UploadCloud size={16} />
                                                      Deliver Final BOQ
                                                    </>
                                                  )}
                                                </label>
                                              </div>
                                            </div>
                                          )}
                                          {sub.status === 'delivered' && (
                                            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 w-full">
                                              <CheckCircle size={16} />
                                              <span className="text-xs font-bold uppercase tracking-wider">Document Delivered - Awaiting User Approval</span>
                                            </div>
                                          )}
                                          {sub.status === 'approved' && (
                                            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-200 w-full">
                                              <CheckCircle2 size={16} />
                                              <span className="text-xs font-bold uppercase tracking-wider">Project Approved & Completed</span>
                                            </div>
                                          )}
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
                  value={content['hero_title'] || ''} 
                  onChange={(val) => setContent(prev => ({ ...prev, hero_title: val }))}
                  onSave={() => saveContent('hero_title')}
                  isSaving={savingKeys.has('hero_title')}
                />
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-3xl p-8">
              <h3 className="text-lg font-headline font-bold text-primary mb-6 flex items-center gap-2">
                <FileText size={20} className="text-surface-tint" />
                About Section
              </h3>
              <div className="space-y-8">
                <MarkdownEditor 
                  value={content['about_text'] || ''} 
                  onChange={(val) => setContent(prev => ({ ...prev, about_text: val }))}
                  onSave={() => saveContent('about_text')}
                  isSaving={savingKeys.has('about_text')}
                />
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
              className="relative bg-white p-8 rounded-3xl shadow-2xl border border-outline-variant w-full max-w-sm"
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
    </div>
  );
};

export default Admin;
