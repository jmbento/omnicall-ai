
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Neural Core] Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-[#020617] p-6 font-sans">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="max-w-md w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Error Glow Background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
              <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>

            <h2 className="text-2xl font-black text-white tracking-tighter mb-4 uppercase">System Malfunction</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 px-4">
              A neural link exception was detected in the UI core. Data integrity is preserved, but a reload is required to resync.
            </p>

            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
              Reload Neural Core
            </button>
            
            <p className="mt-8 text-[9px] font-bold text-slate-700 uppercase tracking-widest">Error Code: {this.state.error?.name || 'CORE_ERR_001'}</p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
