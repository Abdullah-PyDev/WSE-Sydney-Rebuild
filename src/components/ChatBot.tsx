import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2, Bot, User } from 'lucide-react';
import { getGeminiChat } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const WSEIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Blueprint Base */}
    <path d="M3 3h18v18H3z" strokeOpacity="0.3" />
    <path d="M3 9h18M9 3v18" strokeOpacity="0.2" />
    {/* Stylized Pipe/Infrastructure */}
    <path d="M7 12h10" strokeWidth="3" />
    <path d="M7 10v4M17 10v4" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

import Magnetic from './Magnetic';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the WSE Sydney Assistant. How can I help you with your water or sewerage estimating needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = getGeminiChat();
      }

      const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: input });
      const modelMessage: Message = { role: 'model', text: response.text || 'I apologize, I am unable to process that request at the moment.' };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-surface-container-lowest rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant cursor-grab active:cursor-grabbing"
          >
            {/* Header */}
            <div className="bg-primary p-5 flex items-center justify-between text-white select-none">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <WSEIcon size={20} />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm tracking-tight">WSE Sydney Assistant</h3>
                  <p className="text-[10px] font-body uppercase tracking-widest opacity-70">Infrastructure Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-background/50"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-surface-tint text-white' 
                        : 'bg-white text-primary border border-outline-variant'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed font-body ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-on-surface-variant rounded-tl-none border border-outline-variant shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-primary border border-outline-variant flex items-center justify-center shadow-sm">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-outline-variant shadow-sm">
                      <Loader2 size={16} className="animate-spin text-surface-tint" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-white border-t border-outline-variant flex items-center space-x-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sydney Water standards..."
                className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-primary text-white p-3 rounded-xl disabled:opacity-50 hover:bg-primary-container transition-all shadow-md active:scale-95"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Magnetic strength={0.3}>
        <motion.button
          drag
          dragMomentum={false}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          data-cursor-label="CHAT"
          className="bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-container transition-all border-4 border-white/20 cursor-grab active:cursor-grabbing"
        >
          {isOpen ? <X size={32} /> : <WSEIcon size={32} />}
        </motion.button>
      </Magnetic>
    </div>
  );
};

export default ChatBot;
