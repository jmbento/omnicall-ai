import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-indigo-600/20 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-blue-600/15 blur-[130px] rounded-full"
      />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;
