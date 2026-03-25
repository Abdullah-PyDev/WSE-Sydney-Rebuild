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
    <main className="pt-24 md:pt-28 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Info */}
        <section className="lg:col-span-5 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 text-surface-tint mb-4 md:mb-6"
          >
            <CheckCircle2 className="fill-surface-tint text-white w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-headline">Industry Standard Precision</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-primary leading-tight tracking-tighter mb-4 md:mb-6 font-headline"
          >
            Professional BOQ <br className="hidden md:block"/>
            <span className="text-surface-tint">Estimating Portal.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-md font-body"
          >
            Upload your technical drawings and receive a comprehensive Water and Sewer Bill of Quantities within 24-48 hours. Guaranteed.
          </motion.p>

          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start space-x-4 p-4 md:p-6 rounded-xl bg-surface-container-low border border-outline-variant"
            >
              <div className="bg-primary p-2 md:p-3 rounded-lg text-white shrink-0">
                <FileText className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-headline text-sm md:text-base">Sample BOQ Output</h4>
                <p className="text-xs md:text-sm text-on-surface-variant mb-2 md:mb-3 font-body">See the level of detail and precision you can expect from our estimators.</p>
                <button 
                  onClick={handleDownloadSample}
                  className="inline-flex items-center text-[10px] md:text-xs font-bold text-surface-tint hover:underline cursor-pointer bg-transparent border-none p-0 uppercase tracking-widest font-headline"
                >
                  Download Sample BOQ (PDF)
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start space-x-4 p-4 md:p-6 rounded-xl bg-surface-container-low border border-outline-variant"
            >
              <div className="bg-primary p-2 md:p-3 rounded-lg text-white shrink-0">
                <Zap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-headline text-sm md:text-base">24-48 Hour Turnaround</h4>
                <p className="text-xs md:text-sm text-on-surface-variant font-body">Rapid response for urgent tender deadlines and project kick-offs.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start space-x-4 p-4 md:p-6 rounded-xl bg-surface-container-low border border-outline-variant"
            >
              <div className="bg-primary p-2 md:p-3 rounded-lg text-white shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-primary font-headline text-sm md:text-base">Sydney Water Compliance</h4>
                <p className="text-xs md:text-sm text-on-surface-variant font-body">Accurate estimating meeting all local regulatory and utility standards.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Right Column: Form */}
        <section className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest p-6 md:p-8 lg:p-12 rounded-2xl shadow-xl border border-outline-variant relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            {isSubmitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 font-headline">Submission Received</h2>
                <p className="text-sm md:text-base text-on-surface-variant mb-6 md:mb-8 font-body">
                  Your request has been logged. A project estimator will review your documents and contact you shortly.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary text-white px-6 md:px-8 py-3 rounded-md font-bold hover:bg-primary-container transition-all font-headline text-sm md:text-base"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8 md:mb-12">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-1 md:mb-2 font-headline text-xs md:text-base">1</div>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-primary font-headline">Info</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-outline-variant mx-2 md:mx-4 mb-4 md:mb-6"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center font-bold mb-1 md:mb-2 font-headline text-xs md:text-base">2</div>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">Drawings</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-outline-variant mx-2 md:mx-4 mb-4 md:mb-6"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center font-bold mb-1 md:mb-2 font-headline text-xs md:text-base">3</div>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">Review</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 md:p-4 rounded-lg flex items-center gap-2 md:gap-3 text-xs md:text-sm font-body">
                      <AlertCircle className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="flex flex-col space-y-1 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Full Name</label>
                      <input 
                        required 
                        name="fullName"
                        className="bg-surface-container-low border border-outline-variant rounded-lg p-3 md:p-4 text-sm focus:bg-white focus:ring-2 focus:ring-surface-tint transition-all outline-none font-body" 
                        placeholder="John Doe" 
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 md:space-y-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Company Name</label>
                      <input 
                        required 
                        name="companyName"
                        className="bg-surface-container-low border border-outline-variant rounded-lg p-3 md:p-4 text-sm focus:bg-white focus:ring-2 focus:ring-surface-tint transition-all outline-none font-body" 
                        placeholder="Construction Ltd" 
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 md:space-y-2 md:col-span-2">
                      <label className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Project Address / Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4 md:w-[18px] md:h-[18px]" />
                        <input 
                          required 
                          name="address"
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 md:p-4 pl-10 md:pl-12 text-sm focus:bg-white focus:ring-2 focus:ring-surface-tint transition-all outline-none font-body" 
                          placeholder="Street, Suburb, NSW" 
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Drawing Upload (.PDF, .DWG)</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center transition-colors cursor-pointer ${dragActive ? 'border-surface-tint bg-surface-tint/5' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container transition-all'}`}
                    >
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.dwg,.doc,.docx,.xls,.xlsx,.jpg,.png"
                      />
                      <Upload className="text-surface-tint mb-3 md:mb-4 w-8 h-8 md:w-10 md:h-10" />
                      <p className="text-xs md:text-sm font-bold text-primary font-headline text-center">Drag and drop technical files here</p>
                      <p className="text-[10px] md:text-xs text-on-surface-variant mt-1 md:text-center font-body">Maximum file size 50MB per upload</p>
                      <button 
                        className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-white text-primary text-[10px] md:text-xs font-bold rounded-md border border-outline-variant hover:bg-surface-container-low transition-all font-headline" 
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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 font-headline">Selected Files ({files.length})</p>
                          <div className="grid grid-cols-1 gap-2">
                            {files.map((file, index) => (
                              <motion.div 
                                key={`${file.name}-${index}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="flex items-center justify-between p-3 bg-surface-container-low border border-outline-variant rounded-lg group"
                              >
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <FileIcon className="w-5 h-5 text-surface-tint flex-shrink-0" />
                                  <span className="text-sm text-primary truncate font-medium font-body">{file.name}</span>
                                  <span className="text-[10px] text-on-surface-variant font-body">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                  }}
                                  className="p-1 text-on-surface-variant hover:text-red-600 transition-colors"
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

                  <div className="flex flex-col space-y-1 md:space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Scope of Work Brief</label>
                    <textarea 
                      name="notes"
                      className="bg-surface-container-low border border-outline-variant rounded-lg p-3 md:p-4 text-sm focus:bg-white focus:ring-2 focus:ring-surface-tint transition-all outline-none font-body" 
                      placeholder="Briefly describe the water or sewer infrastructure requirements..." 
                      rows={4}
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-3 p-3 md:p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                    <input name="urgent" className="w-4 h-4 md:w-5 md:h-5 rounded text-primary border-outline-variant focus:ring-primary" id="urgent" type="checkbox"/>
                    <label className="text-xs md:text-sm font-bold text-primary font-headline" htmlFor="urgent">Mark as Urgent (Required within 24 hours)</label>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center pt-4 md:pt-6 gap-4 md:gap-6">
                    <p className="text-[9px] md:text-[10px] text-on-surface-variant max-w-xs italic font-body text-center md:text-left">By submitting, you agree to our terms of service regarding data handling and engineering estimates.</p>
                    <button 
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-primary text-white font-bold px-8 md:px-10 py-3 md:py-4 rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-headline uppercase tracking-widest text-[10px] md:text-xs" 
                      type="submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="animate-spin w-[18px] h-[18px] md:w-5 md:h-5" />
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
      <section className="mt-20 md:mt-32">
        <h2 className="text-center font-extrabold text-2xl md:text-3xl text-primary mb-10 md:mb-16 font-headline tracking-tighter">The Estimating Lifecycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-low p-8 md:p-10 rounded-2xl relative overflow-hidden group border border-outline-variant"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileSearch className="w-[72px] h-[72px] md:w-24 md:h-24" />
            </div>
            <span className="inline-block px-3 py-1 bg-primary text-white text-[9px] md:text-[10px] font-bold rounded-full mb-4 font-headline tracking-widest">PHASE 01</span>
            <h3 className="font-bold text-lg md:text-xl text-primary mb-3 md:mb-4 font-headline">Digitization</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">Our system scans your drawings for key infrastructure markers including pipe lengths, manhole depths, and material types.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-low p-8 md:p-10 rounded-2xl relative overflow-hidden group border border-outline-variant"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Calculator className="w-[72px] h-[72px] md:w-24 md:h-24" />
            </div>
            <span className="inline-block px-3 py-1 bg-primary text-white text-[9px] md:text-[10px] font-bold rounded-full mb-4 font-headline tracking-widest">PHASE 02</span>
            <h3 className="font-bold text-lg md:text-xl text-primary mb-3 md:mb-4 font-headline">Expert Review</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">Certified estimators verify the digital scan, applying real-time market rates for materials and Sydney-specific labor costs.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-low p-8 md:p-10 rounded-2xl relative overflow-hidden group border border-outline-variant"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Mail className="w-[72px] h-[72px] md:w-24 md:h-24" />
            </div>
            <span className="inline-block px-3 py-1 bg-primary text-white text-[9px] md:text-[10px] font-bold rounded-full mb-4 font-headline tracking-widest">PHASE 03</span>
            <h3 className="font-bold text-lg md:text-xl text-primary mb-3 md:mb-4 font-headline">Delivery</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-body leading-relaxed">A professional PDF and Excel Bill of Quantities is sent to your dashboard, ready for your tender submission.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default RequestBOQ;

