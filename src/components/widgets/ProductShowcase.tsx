
import React from 'react';
import { ShoppingBag, Star, Package, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductShowcase = ({ data }: { data: any }) => {
  if (!data) return null;
  const result = data.result || data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl"
    >
      <div className="relative w-full aspect-square rounded-[1.5rem] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 mb-6 flex items-center justify-center overflow-hidden border border-white/5">
        <ShoppingBag className="w-20 h-20 text-indigo-400/40" />
        <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">
          New Arrival
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-black text-white leading-tight mb-1">{result.items?.[0] || 'Premium Tech Gadget'}</h3>
            <div className="flex items-center gap-1 text-amber-400">
              {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
              <Star className="w-3 h-3" />
              <span className="text-[10px] text-slate-500 font-bold ml-1">(4.0)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-white tracking-tighter">R$ {result.totalValue?.toLocaleString('pt-BR') || '299,00'}</p>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">or 12x s/ juros</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <Package className="w-4 h-4 text-emerald-400" />
            In Stock
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            Voucher: {result.discountCode || 'NONE'}
          </div>
        </div>

        <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95">
          Checkout Now
        </button>
      </div>
    </motion.div>
  );
};

export default ProductShowcase;
