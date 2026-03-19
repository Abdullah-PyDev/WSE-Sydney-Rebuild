import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "WSE Sydney has consistently delivered accurate BOQs for our most complex sewer pump station projects. Their 24-hour turnaround is unmatched in the industry.",
    author: "Mark Thompson",
    role: "Senior Project Manager",
    company: "CivilNet"
  },
  {
    quote: "The level of detail in their hydraulic valuations is exceptional. We've seen a significant reduction in tender risks since partnering with Shoaib and his team.",
    author: "Sarah Jenkins",
    role: "Principal Engineer",
    company: "HydraFlow"
  },
  {
    quote: "Reliable, compliant, and professional. WSE Sydney is our go-to for all Sydney Water accredited estimating requirements.",
    author: "David Chen",
    role: "Director",
    company: "PreciseCon"
  },
  {
    quote: "Their national capability allowed us to streamline our estimating process across Sydney and Melbourne offices seamlessly.",
    author: "Elena Rodriguez",
    role: "Infrastructure Lead",
    company: "AustInfra"
  },
  {
    quote: "The precision of their stormwater take-offs saved us thousands in procurement errors on our latest Western Sydney development.",
    author: "James Wilson",
    role: "Construction Director",
    company: "Apex Civil"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto px-4">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 md:p-16">
        {/* Decorative Quote Icon */}
        <div className="absolute top-8 left-8 text-primary/5 pointer-events-none">
          <Quote size={120} strokeWidth={1} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <p className="text-2xl md:text-4xl font-headline font-bold text-primary mb-10 leading-[1.3] tracking-tight italic">
              "{testimonials[currentIndex].quote}"
            </p>
            
            <div className="flex items-center gap-6 pt-8 border-t border-slate-100">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-white font-headline text-2xl font-black shrink-0">
                {testimonials[currentIndex].author.charAt(0)}
              </div>
              <div className="font-body">
                <h4 className="font-headline font-extrabold text-primary text-xl tracking-tight">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-slate-500 text-sm font-medium">
                  {testimonials[currentIndex].role} at <span className="text-blue-600 font-bold">{testimonials[currentIndex].company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button 
            onClick={prev}
            className="p-3 rounded-full bg-slate-50 text-primary hover:bg-primary hover:text-white transition-all shadow-sm border border-slate-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="p-3 rounded-full bg-slate-50 text-primary hover:bg-primary hover:text-white transition-all shadow-sm border border-slate-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-primary w-12' : 'bg-slate-200 w-4'}`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
