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
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-surface-container-high rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant touch-none"
          >
            {/* Header - Drag Handle */}
            <div className="bg-linear-to-r from-chatbot-primary to-blue-700 p-4 flex items-center justify-between text-white shadow-md cursor-move select-none">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">WSE Sydney Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] opacity-90">Always online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1.5 rounded-full transition-all active:scale-90"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-chatbot-primary text-white' : 'bg-surface-container-low text-chatbot-primary border border-outline-variant'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm shadow-sm transition-all ${
                      msg.role === 'user' 
                        ? 'bg-chatbot-primary text-white rounded-tr-none' 
                        : 'bg-white text-on-surface rounded-tl-none border border-outline-variant'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-2xl rounded-tl-none border border-outline-variant">
                      <Loader2 size={16} className="animate-spin text-primary" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-surface border-t border-outline-variant flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Sydney Water standards..."
                className="flex-1 bg-surface-container-low border border-outline rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-chatbot-primary text-white p-2.5 rounded-full disabled:opacity-50 hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-linear-to-br from-chatbot-primary to-blue-700 text-white w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(37,99,235,0.4)] flex items-center justify-center hover:shadow-[0_8px_30px_rgb(37,99,235,0.6)] transition-all relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={28} /> : <WSEIcon size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
