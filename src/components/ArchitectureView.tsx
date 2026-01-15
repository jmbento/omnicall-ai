import React, { useState } from 'react';
import { TECH_STACK } from '@/constants';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Smartphone, Database, Cpu, Palette, Code } from 'lucide-react';
import SupabaseTest from '@/components/SupabaseTest';
import DesignSystemSpec from '@/components/DesignSystemSpec';
import { Button } from '@/components/ui';

const ArchitectureView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'stack' | 'design'>('stack');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Technical Core</h2>
          <p className="text-slate-400 font-medium">Underlying stack, security protocols, and design system powering OmniCall AI.</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
           <button 
             onClick={() => setViewMode('stack')}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'stack' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             <Code className="w-4 h-4" /> Tech Stack
           </button>
           <button 
             onClick={() => setViewMode('design')}
             className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === 'design' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white'}`}
           >
             <Palette className="w-4 h-4" /> Design System
           </button>
        </div>
      </div>

      {viewMode === 'design' ? (
        <DesignSystemSpec />
      ) : (
        <>
          <div className="flex justify-end">
            <SupabaseTest />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH_STACK.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl border border-white/10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tech.colorTheme} flex items-center justify-center shadow-lg`}>
                    {idx === 0 && <Smartphone className="w-6 h-6 text-white" />}
                    {idx === 1 && <Database className="w-6 h-6 text-white" />}
                    {idx === 2 && <Cpu className="w-6 h-6 text-white" />}
                  </div>
                  <h4 className="text-white font-black tracking-tight text-xl">{tech.category}</h4>
                </div>
                <ul className="space-y-4">
                  {tech.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-center gap-3 text-slate-400 text-sm font-bold group cursor-default">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.colorTheme}`}></div>
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative bg-indigo-950/20 border border-indigo-500/20 p-12 rounded-[3rem] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.05]">
              <Shield className="w-64 h-64 text-indigo-400" />
            </div>

            <div className="max-w-4xl relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
                  <Shield className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-4xl font-black text-white tracking-tighter">System Reliability Verdict</h3>
              </div>
              
              <p className="text-2xl text-slate-300 mb-12 leading-relaxed font-medium italic">
                "The infrastructure leverages pgvector for dynamic RAG and multi-tenant data isolation. Each cartridge operates in a sandboxed execution environment, ensuring enterprise-grade privacy and zero latency during high-concurrency spikes."
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <span className="text-slate-500 text-[10px] font-black block mb-2 uppercase tracking-widest">Scalability Target</span>
                  <span className="text-emerald-400 font-extrabold text-xl flex items-center gap-2">
                    10k+ Sessions/sec
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <span className="text-slate-500 text-[10px] font-black block mb-2 uppercase tracking-widest">Deployment Ready</span>
                  <span className="text-white font-extrabold text-xl">Edge Function Core</span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                  <span className="text-slate-500 text-[10px] font-black block mb-2 uppercase tracking-widest">Compliance</span>
                  <span className="text-indigo-400 font-extrabold text-xl">GDPR/SOC2 Vector Store</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ArchitectureView;
