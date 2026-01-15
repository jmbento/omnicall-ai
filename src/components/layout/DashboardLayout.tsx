import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebar, header }) => {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Immersive Dynamic Orbs Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-blue-600/10 blur-[130px] rounded-full"
        />
      </div>

      {/* Sidebar */}
      {sidebar && (
        <aside className="relative z-20 w-80 flex flex-col bg-white/2 backdrop-blur-3xl border-r border-white/5 h-full shadow-2xl">
          {sidebar}
        </aside>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 grow flex flex-col h-full overflow-hidden">
        {/* Header */}
        {header && (
          <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-white/1 backdrop-blur-md">
            {header}
          </header>
        )}

        {/* Page Content */}
        <div className="grow p-10 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
