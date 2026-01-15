
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { 
  TrendingDown, 
  Target, 
  Zap, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Shield,
  Cpu,
  Database,
  Smartphone,
  Server
} from 'lucide-react';
import { METRICS, RADAR_DATA, ECONOMY_DATA, JOURNEY_STEPS, TECH_STACK } from '../constants';

type TabType = 'market' | 'journey' | 'technical';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-slate-400 text-xs font-bold mb-1 uppercase tracking-wider">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color || entry.stroke }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OmniCallReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('market');

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <div className="space-y-12">
      {/* Premium Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl max-w-lg mx-auto shadow-inner">
        {(['market', 'journey', 'technical'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              relative flex-1 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-500
              ${activeTab === tab 
                ? 'text-white' 
                : 'text-slate-500 hover:text-slate-300'
              }
            `}
          >
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-indigo-600 rounded-xl shadow-[0_0_25px_rgba(79,70,229,0.3)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">
              {tab === 'market' && 'Market Intel'}
              {tab === 'journey' && 'User Journey'}
              {tab === 'technical' && 'Architecture'}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {activeTab === 'market' && <MarketTab />}
          {activeTab === 'journey' && <JourneyTab />}
          {activeTab === 'technical' && <TechnicalTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const MarketTab: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    {/* KPIs Section */}
    <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/[0.06] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 text-xs font-bold tracking-widest uppercase">{metric.label}</span>
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
              {idx === 0 && <TrendingDown className="w-4 h-4 text-emerald-400" />}
              {idx === 1 && <Target className="w-4 h-4 text-sky-400" />}
              {idx === 2 && <Zap className="w-4 h-4 text-indigo-400" />}
              {idx === 3 && <Globe className="w-4 h-4 text-fuchsia-400" />}
            </div>
          </div>
          <div className={`text-4xl font-extrabold ${metric.trendColor} mb-2 tracking-tight`}>{metric.value}</div>
          <div className="text-slate-500 text-xs font-medium">{metric.subtext}</div>
        </motion.div>
      ))}
    </div>

    {/* Chart 1: Radar Chart */}
    <div className="lg:col-span-5 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
        Competitor Benchmarking
      </h3>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
            <PolarGrid stroke="#334155" strokeOpacity={0.5} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
            <Radar
              name="OmniCall AI"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.5}
              strokeWidth={2}
            />
            <Radar
              name="Traditional Systems"
              dataKey="B"
              stroke="#94a3b8"
              fill="#94a3b8"
              fillOpacity={0.1}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span> 
          OmniCall AI
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="w-2.5 h-2.5 bg-slate-600 rounded-full"></span> 
          Legacy Solutions
        </div>
      </div>
    </div>

    {/* Chart 2: Area Chart */}
    <div className="lg:col-span-7 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        Operational Cost Efficiency
      </h3>
      <div className="flex-grow min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ECONOMY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="quarter" stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#475569" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="savings" 
              name="Efficiency Gain" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSavings)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-8 p-5 bg-indigo-500/[0.03] rounded-2xl border border-indigo-500/10 flex items-start gap-4">
        <div className="bg-indigo-500/10 p-2.5 rounded-xl">
          <Zap className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-1">Differentiator: Sector Intelligence Cartridges</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unlike generic LLM integrations, OmniCall uses pluggable cartridges pre-trained for vertical domains, ensuring 85%+ resolution rates with full data privacy compliance.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const JourneyTab: React.FC = () => (
  <div className="relative">
    {/* Animated background line */}
    <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent z-0 overflow-hidden">
      <motion.div 
        animate={{ x: ['-100%', '100%'] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="w-40 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
      {JOURNEY_STEPS.map((step, idx) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="group h-full"
          >
            <div className="h-full bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:border-indigo-500/40 transition-all duration-500 hover:bg-white/[0.04] shadow-xl flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all duration-500">
                  <Icon className="w-8 h-8 text-indigo-400" />
                </div>
                <span className="text-4xl font-black text-white/[0.03] group-hover:text-white/10 transition-colors duration-500">0{step.id}</span>
              </div>

              <h3 className="text-xl font-extrabold mb-3 text-white tracking-tight">{step.title}</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{step.description}</p>

              <div className="space-y-4 mt-auto">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-xs text-slate-300 font-bold bg-white/5 py-2 px-3 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500/70" />
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const TechnicalTab: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TECH_STACK.map((tech, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tech.colorTheme} flex items-center justify-center opacity-80 shadow-lg`}>
              {idx === 0 && <Smartphone className="w-5 h-5 text-white" />}
              {idx === 1 && <Database className="w-5 h-5 text-white" />}
              {idx === 2 && <Cpu className="w-5 h-5 text-white" />}
            </div>
            <h4 className="text-white font-bold tracking-tight text-lg">{tech.category}</h4>
          </div>
          <ul className="space-y-4">
            {tech.items.map((item, iIdx) => (
              <li key={iIdx} className="flex items-center gap-3 text-slate-400 text-sm font-semibold group cursor-default">
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.colorTheme} group-hover:scale-150 transition-transform`}></span>
                <span className="group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative bg-gradient-to-br from-indigo-950/40 via-slate-900/40 to-slate-900/40 backdrop-blur-3xl border border-indigo-500/20 p-10 rounded-[2.5rem] overflow-hidden group shadow-2xl"
    >
      {/* Decorative overlay */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
        <Shield className="w-64 h-64 text-indigo-400" />
      </div>

      <div className="max-w-3xl relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Shield className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">Lead Architect Verdict</h3>
        </div>
        
        <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium italic">
          "The OmniCall architecture was engineered for industrial scale. By leveraging pgvector at the core, we guarantee absolute data isolation between tenants while enabling lightning-fast semantic retrieval. This isn't just a wrapper; it's a robust AI infrastructure."
        </p>
        
        <div className="flex flex-wrap gap-4">
          <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group/badge hover:bg-white/10 transition-colors">
            <span className="text-slate-500 text-xs font-bold block mb-1 uppercase tracking-widest">Viability Score</span>
            <span className="text-emerald-400 font-extrabold text-lg flex items-center gap-2">
              Highly Feasible
              <CheckCircle2 className="w-5 h-5" />
            </span>
          </div>
          <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group/badge hover:bg-white/10 transition-colors">
            <span className="text-slate-500 text-xs font-bold block mb-1 uppercase tracking-widest">Build Velocity</span>
            <span className="text-white font-extrabold text-lg">60 Days to MVP</span>
          </div>
          <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl group/badge hover:bg-white/10 transition-colors">
            <span className="text-slate-500 text-xs font-bold block mb-1 uppercase tracking-widest">Privacy Standard</span>
            <span className="text-indigo-400 font-extrabold text-lg">Vector-Level Isolation</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

export default OmniCallReport;
