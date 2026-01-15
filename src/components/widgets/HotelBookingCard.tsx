
import React from 'react';
import { Calendar, MapPin, Star, User, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const HotelBookingCard = ({ data }: { data: any }) => {
  if (!data) return null;
  const result = data.result || data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
    >
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 block mb-1">Reservation Details</span>
            <h3 className="text-xl font-black text-white leading-tight">Grand Omni Palace</h3>
          </div>
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
        <div className="flex items-center gap-2 text-white/80 text-xs font-bold">
          <MapPin className="w-3 h-3" />
          Dubai, UAE • Beachfront Drive
        </div>
      </div>

      <div className="p-6 space-y-6 relative">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Room Type</span>
            <p className="text-sm font-bold text-white capitalize">{result.roomType || 'Deluxe Suite'}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Capacity</span>
            <p className="text-sm font-bold text-white">2 Adults, 1 Child</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-white/5 border-dashed">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg"><Calendar className="w-4 h-4 text-indigo-400" /></div>
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Check-in</span>
              <span className="text-xs font-bold text-white">{result.date || 'Jan 15, 2025'}</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 rounded-lg"><Coffee className="w-4 h-4 text-indigo-400" /></div>
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Service</span>
              <span className="text-xs font-bold text-white">Breakfast Incl.</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Status</span>
            <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${result.available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {result.available ? 'Available' : 'Sold Out'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-white">${result.price || 450}</span>
            <span className="text-[10px] font-bold text-slate-500 block">per night</span>
          </div>
        </div>
      </div>
      
      {/* Ticket Cutout Effect */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-r border-white/10" />
      <div className="absolute top-1/2 right-0 translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-l border-white/10" />
    </motion.div>
  );
};

export default HotelBookingCard;
