import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:absolute md:bottom-10 md:right-10 z-50 p-4 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 w-full md:w-96 md:bottom-6 md:right-6 lg:bottom-10 lg:right-10 h-[80vh] md:h-[600px] z-50 flex flex-col bg-white/90 dark:bg-[#161B22]/90 backdrop-blur-3xl shadow-2xl dark:shadow-purple-500/10 md:rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-transparent">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                  AI
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Study Assistant</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-gray-400 dark:text-slate-500 ml-2">12:05 PM</span>
                <div className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm">
                  Hi Adi! You have a Calculus assignment due tomorrow. Would you like me to schedule a 2-hour focus block for it?
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-transparent">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  className="w-full bg-gray-100 dark:bg-[#0D1117] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 px-4 py-3 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-transparent dark:border-white/5"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
