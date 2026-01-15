
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWidgetStore } from '../store/widgetStore';
import HotelBookingCard from './widgets/HotelBookingCard';
import BankBalanceCard from './widgets/BankBalanceCard';
import ProductShowcase from './widgets/ProductShowcase';
import { X } from 'lucide-react';

const DynamicWidgetArea: React.FC = () => {
  const { activeWidget, widgetData, clearWidget } = useWidgetStore();

  if (!activeWidget) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="w-full h-full flex flex-col gap-4 p-8 bg-white/[0.01] border-l border-white/5 overflow-y-auto custom-scrollbar"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Smart Widget</h4>
          <button 
            onClick={clearWidget}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeWidget === 'hotel' && <HotelBookingCard data={widgetData} />}
        {activeWidget === 'bank' && <BankBalanceCard data={widgetData} />}
        {activeWidget === 'retail' && <ProductShowcase data={widgetData} />}

        <div className="mt-auto p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
          <p className="text-[10px] font-bold text-indigo-400/60 leading-relaxed text-center">
            Este card foi gerado dinamicamente via Generative UI baseado na ação da IA.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DynamicWidgetArea;
