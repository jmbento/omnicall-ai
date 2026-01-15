
import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const BankBalanceCard = ({ data }: { data: any }) => {
  if (!data) return null;
  const result = data.result || data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <ShieldCheck className="w-24 h-24 text-indigo-400" />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">OmniWealth Premium</h4>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Account ID: {result.accountId || '****9821'}</p>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Available Balance</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white tracking-tighter">R$ {result.balance || '42.500,00'}</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2.4%
          </span>
        </div>
      </div>

      {/* Mini Decorative Sparkline */}
      <div className="w-full h-12 mb-8">
        <svg viewBox="0 0 100 20" className="w-full h-full stroke-indigo-500/40 fill-transparent stroke-2">
          <path d="M0,15 Q10,5 20,12 T40,8 T60,14 T80,4 T100,10" strokeLinecap="round" />
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M0,15 Q10,5 20,12 T40,8 T60,14 T80,4 T100,10" 
            className="stroke-indigo-400" 
          />
        </svg>
      </div>

      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
          <span>Last Transaction</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
        <p className="text-xs font-bold text-slate-200">{result.lastTransaction || 'PIX Transfer Recieved'}</p>
      </div>
    </motion.div>
  );
};

export default BankBalanceCard;
