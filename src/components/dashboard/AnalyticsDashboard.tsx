
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  Tooltip as RechartsTooltip
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Smile, 
  Meh, 
  Frown,
  ConciergeBell,
  ShieldCheck,
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react';

const PERFORMANCE_DATA = [
  { subject: 'Cost Efficiency', OmniCall: 95, Human: 20, Legacy: 40 },
  { subject: 'Speed', OmniCall: 98, Human: 30, Legacy: 60 },
  { subject: 'Empathy', OmniCall: 85, Human: 95, Legacy: 20 },
  { subject: 'Accuracy', OmniCall: 92, Human: 88, Legacy: 50 },
  { subject: 'Availability', OmniCall: 100, Human: 10, Legacy: 70 },
];

const KPI_METRICS = [
  { label: 'Current ROI', value: '+320%', trend: '↑ 12% this week', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Cost per Minute', value: '$0.04', sub: 'vs $1.20 Legacy', trend: '↓ 4% vs last month', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { label: 'First Contact Resolution', value: '88%', trend: '↑ 2.5% vs avg', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { label: 'CSAT Score', value: '4.8/5.0', trend: '↑ 0.2 points', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

const RECENT_SESSIONS = [
  { id: '102', cartridge: 'Hotel Concierge', icon: ConciergeBell, status: 'Solved', duration: '2m 14s', sentiment: 'positive' },
  { id: '105', cartridge: 'BankAssist Vector', icon: ShieldCheck, status: 'Solved', duration: '4m 30s', sentiment: 'neutral' },
  { id: '108', cartridge: 'Retail Flow AI', icon: ShoppingBag, status: 'Escalated', duration: '1m 45s', sentiment: 'negative' },
  { id: '110', cartridge: 'Hotel Concierge', icon: ConciergeBell, status: 'Solved', duration: '3m 12s', sentiment: 'positive' },
  { id: '112', cartridge: 'BankAssist Vector', icon: ShieldCheck, status: 'Solved', duration: '5m 05s', sentiment: 'positive' },
];

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-2 text-white">System Performance & ROI</h2>
          <p className="text-slate-400 font-medium leading-relaxed">Real-time metrics from all active cartridges and sector-specific engines.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all hover:text-white">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_METRICS.map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-4">
              {kpi.label}
            </span>
            <div className="flex items-end justify-between">
              <div>
                <h3 className={`text-4xl font-black tracking-tighter ${kpi.color} mb-1`}>{kpi.value}</h3>
                {kpi.sub && <p className="text-[10px] font-bold text-slate-600 mb-1 uppercase">{kpi.sub}</p>}
                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  {kpi.trend.includes('↑') ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-rose-500" />}
                  {kpi.trend}
                </p>
              </div>
              <div className={`p-3 rounded-2xl ${kpi.bg} border border-white/5 group-hover:scale-110 transition-transform`}>
                {idx === 0 && <TrendingUp className="w-5 h-5 text-emerald-400" />}
                {idx === 1 && <Clock className="w-5 h-5 text-sky-400" />}
                {idx === 2 && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                {idx === 3 && <Smile className="w-5 h-5 text-amber-400" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Chart Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 flex flex-col min-h-[500px]"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight mb-1">Comparative Intel</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Benchmarking vs Legacy</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-sky-400">
                <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" /> OmniCall AI
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-amber-400">
                <div className="w-2 h-2 rounded-full bg-amber-500 border border-amber-500/50" /> Human
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PERFORMANCE_DATA}>
                <PolarGrid stroke="#ffffff" strokeOpacity={0.05} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} 
                />
                <Radar
                  name="OmniCall AI"
                  dataKey="OmniCall"
                  stroke="#38bdf8"
                  fill="#0ea5e9"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
                <Radar
                  name="Human Agent"
                  dataKey="Human"
                  stroke="#fbbf24"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Radar
                  name="Legacy Bot"
                  dataKey="Legacy"
                  stroke="#64748b"
                  fill="#1e293b"
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Feed Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 flex flex-col h-[500px]"
        >
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Latest Activity</h3>
            <button className="text-slate-500 hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow space-y-3 overflow-y-auto custom-scrollbar pr-2">
            {RECENT_SESSIONS.map((session, i) => {
              const Icon = session.icon;
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.05) }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none mb-1">{session.cartridge}</h4>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID: #{session.id} • {session.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                      session.status === 'Solved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {session.status}
                    </span>
                    <div className="text-xl">
                      {session.sentiment === 'positive' && <Smile className="w-5 h-5 text-emerald-400" />}
                      {session.sentiment === 'neutral' && <Meh className="w-5 h-5 text-slate-400" />}
                      {session.sentiment === 'negative' && <Frown className="w-5 h-5 text-rose-400" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button className="mt-4 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-indigo-600/10 hover:text-indigo-400 hover:border-indigo-500/20 transition-all">
            View All Live Sessions
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
