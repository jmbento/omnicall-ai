
import React from 'react';
import { motion } from 'framer-motion';
import { useOmniStore } from '@/store';
import { 
  ConciergeBell, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles,
  Check
} from 'lucide-react';

const THEMES: Record<string, string> = {
  'h-concierge-1': 'from-amber-500/20 to-yellow-600/20 text-amber-500 border-amber-500/30',
  'f-bank-1': 'from-blue-500/20 to-cyan-600/20 text-blue-400 border-blue-500/30',
  'r-checkout-1': 'from-pink-500/20 to-rose-600/20 text-pink-400 border-pink-500/30'
};

const CartridgeMarketplace: React.FC = () => {
  const { cartridges, selectedCartridgeId, setSelectedCartridge } = useOmniStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Fix: Explicitly cast the easing array to a 4-number tuple [number, number, number, number]
  // to satisfy the Framer Motion Easing type which expects a BezierDefinition for cubic-bezier values.
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
          <Sparkles className="w-3 h-3" />
          Intelligence Selection
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white">Cartridge Marketplace</h2>
        <p className="text-slate-400 font-medium max-w-2xl leading-relaxed">
          Escolha o núcleo de inteligência especializado para o seu canal de atendimento. 
          Cada cartucho possui treinamento setorial e Action Engine pré-configurado.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {cartridges.map((cartridge) => {
          const Icon = cartridge.icon;
          const isSelected = selectedCartridgeId === cartridge.id;
          const theme = THEMES[cartridge.id] || 'from-indigo-500/20 to-cyan-600/20 text-indigo-400 border-indigo-500/30';

          return (
            <motion.button
              key={cartridge.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCartridge(cartridge.id)}
              className={`
                relative flex flex-col text-left p-8 rounded-[2.5rem] border transition-all duration-500 group overflow-hidden
                ${isSelected 
                  ? 'bg-white/[0.05] border-white/20 shadow-2xl shadow-black/40' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'}
              `}
            >
              {/* Theme Gradient Background (Subtle) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${theme} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className={`
                    w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-500
                    bg-gradient-to-br ${theme} shadow-lg
                  `}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  {isSelected && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#020617]"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                    {cartridge.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed group-hover:text-slate-400 transition-colors">
                    {cartridge.description}
                  </p>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {cartridge.capabilities.slice(0, 2).map((cap, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 border border-white/5">
                        {cap}
                      </span>
                    ))}
                  </div>

                  <div className={`
                    w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all duration-300
                    ${isSelected 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'}
                  `}>
                    {isSelected ? 'Cartridge Active' : 'Activate Context'}
                    {!isSelected && <ArrowRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-4 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]"
      >
        <span className="w-12 h-px bg-white/5" />
        Enterprise-Grade Context Sandboxing Active
        <span className="w-12 h-px bg-white/5" />
      </motion.div>
    </div>
  );
};

export default CartridgeMarketplace;
