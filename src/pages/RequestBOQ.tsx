import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Zap, 
  FileText, 
  MapPin, 
  Upload, 
  Calculator, 
  Send,
  Clock,
  ShieldCheck,
  FileSearch,
  Mail,
  AlertCircle,
  X,
  FileIcon
} from 'lucide-react';

const RequestBOQ = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    // Add files to formData
    files.forEach(file => {
      formData.append('files', file);
    });
    
    // Explicitly set isUrgent as a string for the server
    const urgentCheckbox = e.currentTarget.elements.namedItem('urgent') as HTMLInputElement;
    formData.set('isUrgent', urgentCheckbox.checked.toString());

    try {
      console.log('Submitting BOQ form data...');
      const response = await fetch('/api/send-boq', {
        method: 'POST',
        body: formData, // Sending as FormData
      });
      console.log('Response received:', response.status, response.statusText);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          throw new Error(result.error || 'Failed to send request');
        } else {
          const text = await response.text();
          console.error('Non-JSON error response:', text);
          throw new Error(`Server error: ${response.status} ${response.statusText}. Please try again later.`);
        }
      }

      setIsSubmitted(true);
      setFiles([]);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDownloadSample = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/sample-boq.pdf');
      if (!response.ok) throw new Error('Failed to fetch sample BOQ');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sample-boq.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading sample BOQ:', error);
      // Fallback to direct link if fetch fails
      window.open('/sample-boq.pdf', '_blank');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Info */}
        <section className="lg:col-span-5 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 text-blue-600 mb-6"
          >
            <CheckCircle2 size={16} className="fill-blue-600 text-white" />
            <span className="text-xs font-semibold uppercase tracking-widest">Industry Standard Precision</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            Professional BOQ <br/>
            <span className="text-blue-600">Estimating Portal.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg leading-relaxed mb-10 max-w-md"
          >
            Upload your technical drawings and receive a comprehensive Water and Sewer Bill of Quantities within 24-48 hours. Guaranteed.
          </motion.p>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50"
            >
              <div className="bg-slate-900 p-3 rounded-lg text-white">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Sample BOQ Output</h4>
                <p className="text-sm text-slate-600 mb-3">See the level of detail and precision you can expect from our estimators.</p>
                <button 
                  onClick={handleDownloadSample}
                  className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Download Sample BOQ (PDF)
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50"
            >
              <div className="bg-slate-900 p-3 rounded-lg text-white">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">24-48 Hour Turnaround</h4>
                <p className="text-sm text-slate-600">Rapid response for urgent tender deadlines and project kick-offs.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50"
            >
              <div className="bg-slate-900 p-3 rounded-lg text-white">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Sydney Water Compliance</h4>
                <p className="text-sm text-slate-600">Accurate estimating meeting all local regulatory and utility standards.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Right Column: Form */}
        <section className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 lg:p-12 rounded-xl shadow-sm border-l-4 border-slate-900"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Received</h2>
                <p className="text-slate-600 mb-8">
                  Your request has been logged. A project estimator will review your documents and contact you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-slate-900 text-white px-8 py-3 rounded-md font-bold hover:bg-slate-800 transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold mb-2">1</div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-900">Project Info</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-slate-100 mx-4 mb-6"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center font-bold mb-2">2</div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Drawings</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-slate-100 mx-4 mb-6"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center font-bold mb-2">3</div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg flex items-center gap-3 text-sm">
                      <AlertCircle size={18} />
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase">Full Name</label>
                      <input 
                        required 
                        name="fullName"
                        className="bg-slate-50 border-none rounded-sm p-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                        placeholder="John Doe" 
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase">Company Name</label>
                      <input 
                        required 
                        name="companyName"
                        className="bg-slate-50 border-none rounded-sm p-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                        placeholder="Construction Ltd" 
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-900 uppercase">Project Address / Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required 
                          name="address"
                          className="w-full bg-slate-50 border-none rounded-sm p-4 pl-12 text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                          placeholder="Street, Suburb, NSW" 
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase">Drawing Upload (.PDF, .DWG)</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                    >
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.dwg,.doc,.docx,.xls,.xlsx,.jpg,.png"
                      />
                      <Upload className="text-4xl text-blue-600 mb-4" size={40} />
                      <p className="text-sm font-semibold text-slate-900">Drag and drop technical files here</p>
                      <p className="text-xs text-slate-500 mt-2">Maximum file size 50MB per upload</p>
                      <button 
                        className="mt-6 px-6 py-2 bg-white text-slate-900 text-xs font-bold rounded-md border border-slate-200 hover:bg-slate-50 transition-all" 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Browse Files
                      </button>
                    </div>

                    {/* File List */}
                    <AnimatePresence>
                      {files.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-2"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Selected Files ({files.length})</p>
                          <div className="grid grid-cols-1 gap-2">
                            {files.map((file, index) => (
                              <motion.div 
                                key={`${file.name}-${index}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group"
                              >
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <FileIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                  <span className="text-sm text-slate-900 truncate font-medium">{file.name}</span>
                                  <span className="text-[10px] text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                  }}
                                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-bold text-slate-900 uppercase">Scope of Work Brief</label>
                    <textarea 
                      name="notes"
                      className="bg-slate-50 border-none rounded-sm p-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none" 
                      placeholder="Briefly describe the water or sewer infrastructure requirements..." 
                      rows={4}
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                    <input name="urgent" className="w-5 h-5 rounded text-slate-900 border-slate-300 focus:ring-slate-900" id="urgent" type="checkbox"/>
                    <label className="text-sm font-semibold text-slate-900" htmlFor="urgent">Mark as Urgent (Required within 24 hours)</label>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-6">
                    <p className="text-xs text-slate-500 max-w-xs italic">By submitting, you agree to our terms of service regarding data handling and engineering estimates.</p>
                    <button 
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-slate-900 text-white font-bold px-10 py-4 rounded-md shadow-lg shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                      type="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        'Generate Request'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </section>
      </div>

      {/* Estimating Lifecycle Section */}
      <section className="mt-32">
        <h2 className="text-center font-extrabold text-3xl text-slate-900 mb-16">The Estimating Lifecycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileSearch size={96} />
            </div>
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full mb-4">PHASE 01</span>
            <h3 className="font-bold text-xl text-slate-900 mb-4">Digitization</h3>
            <p className="text-sm text-slate-600">Our system scans your drawings for key infrastructure markers including pipe lengths, manhole depths, and material types.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Calculator size={96} />
            </div>
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full mb-4">PHASE 02</span>
            <h3 className="font-bold text-xl text-slate-900 mb-4">Expert Review</h3>
            <p className="text-sm text-slate-600">Certified estimators verify the digital scan, applying real-time market rates for materials and Sydney-specific labor costs.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Mail size={96} />
            </div>
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full mb-4">PHASE 03</span>
            <h3 className="font-bold text-xl text-slate-900 mb-4">Delivery</h3>
            <p className="text-sm text-slate-600">A professional PDF and Excel Bill of Quantities is sent to your dashboard, ready for your tender submission.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RequestBOQ;

