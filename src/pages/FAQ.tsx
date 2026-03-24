import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  FileText, 
  Clock, 
  ShieldCheck, 
  MessageSquare 
} from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-outline-variant last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`font-headline font-bold text-lg md:text-xl transition-colors ${isOpen ? 'text-surface-tint' : 'text-primary group-hover:text-surface-tint'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-surface-tint text-white rotate-180' : 'bg-surface-container-low text-primary group-hover:bg-surface-tint group-hover:text-white'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="pb-8 text-on-surface-variant leading-relaxed font-body text-base md:text-lg max-w-3xl">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "What information do you need to provide an accurate BOQ?",
      answer: "To provide a precise Bill of Quantities, we typically require the full Civil/Hydraulic design set (IFC or Tender drawings), Project Specifications, Geotechnical reports (if available), and any specific Sydney Water or local council requirements relevant to the site."
    },
    {
      question: "How long does it take to receive a completed estimate?",
      answer: "Standard turnaround time is 3-5 business days for small to medium projects. For large-scale infrastructure or complex multi-stage developments, we provide a custom timeline, usually between 7-10 business days. We also offer expedited services for urgent tender deadlines."
    },
    {
      question: "Do you specialize in specific types of water infrastructure?",
      answer: "Yes, our core expertise lies in Sydney Water infrastructure, including sewer main extensions, potable water reticulation, recycled water systems, and complex pump station estimating. We are deeply familiar with WSAA standards and Sydney Water's specific technical requirements."
    },
    {
      question: "How accurate are your estimates compared to actual construction costs?",
      answer: "Our estimates are engineered for precision. We use current market rates for materials and labor, adjusted for the specific site conditions and project complexity. Most of our clients report a variance of less than 5% between our BOQs and the final construction costs."
    },
    {
      question: "Can you assist with design changes during the tender process?",
      answer: "Absolutely. We understand that designs are often fluid. We provide rapid revisions to our BOQs when design updates occur, ensuring your tender remains accurate and competitive right up to the submission deadline."
    },
    {
      question: "What format do you provide the Bill of Quantities in?",
      answer: "We provide BOQs in professional PDF format for presentation and Excel format for your internal cost modeling. We can also adapt our output to match your specific company tender templates if required."
    }
  ];

  return (
    <main className="pt-24">
      <header className="pt-8 md:pt-12 pb-12 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <div className="mb-4 md:mb-6 inline-flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest text-[10px] md:text-xs">
            <span className="h-px w-6 md:w-8 bg-primary"></span>
            Knowledge Base
          </div>
          <h1 className="font-headline font-extrabold text-4xl md:text-7xl text-primary leading-tight tracking-tighter mb-6 md:mb-8">
            Frequently Asked <span className="text-surface-tint">Questions</span>.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-body">
            Everything you need to know about our estimating process, timelines, and technical standards.
          </p>
        </motion.div>
      </header>

      <section className="bg-surface-container-low py-12 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant">
              <HelpCircle className="text-surface-tint mb-4 md:mb-6" size={32} md:size={40} />
              <h3 className="font-headline font-bold text-xl md:text-2xl text-primary mb-4">Still have questions?</h3>
              <p className="text-on-surface-variant text-sm md:text-base font-body mb-6 md:mb-8">
                If you can't find the answer you're looking for, please feel free to reach out to our team directly.
              </p>
              <a 
                href="/request" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-body font-bold hover:bg-surface-tint transition-colors w-full justify-center text-sm md:text-base"
              >
                <MessageSquare size={18} />
                Contact Support
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">Detailed BOQs</h4>
                  <p className="text-xs text-on-surface-variant font-body">Granular breakdown of every project component.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">Fast Turnaround</h4>
                  <p className="text-xs text-on-surface-variant font-body">Meeting your tight tender deadlines every time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">WSAA Standards</h4>
                  <p className="text-xs text-on-surface-variant font-body">Full compliance with Australian water standards.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-sm border border-outline-variant">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={`faq-${index}`}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl mb-6 md:mb-8 leading-tight">
            Ready to secure your next project with <span className="text-surface-tint">engineered certainty</span>?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-12 font-body max-w-2xl mx-auto">
            Join the Tier 1 contractors who trust WSE Sydney for their most critical infrastructure estimates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/request" 
              className="bg-white text-primary px-10 py-4 rounded-full font-headline font-bold text-base md:text-lg hover:bg-surface-tint hover:text-white transition-all shadow-xl text-center"
            >
              Request a BOQ
            </a>
            <a 
              href="/services" 
              className="border border-white/30 text-white px-10 py-4 rounded-full font-headline font-bold text-base md:text-lg hover:bg-white/10 transition-all text-center"
            >
              Our Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
