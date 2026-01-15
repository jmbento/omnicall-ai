import React, { useState } from 'react';
import { useOmniStore } from '@/store';
import { useWidgetStore } from '../store/widgetStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Phone, 
  Monitor, 
  Clock, 
  User, 
  Smile, 
  Meh, 
  Frown,
  Send,
  MoreVertical,
  Globe,
  Layers,
  Activity,
  Mic,
  MicOff,
  Radio,
  Cpu,
  Loader2,
  Database,
  Calendar,
  Wallet
} from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';
import DynamicWidgetArea from './DynamicWidgetArea';
import AudioVisualizer from './visualizer/AudioVisualizer';

const LiveMonitorView: React.FC = () => {
  const { sessions, cartridges } = useOmniStore();
  const { activeWidget } = useWidgetStore();
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0]?.id);
  
  const activeSession = sessions.find(s => s.id === selectedSessionId);
  const activeCartridge = cartridges.find(c => c.id === activeSession?.activeCartridgeId);

  // Use the new consolidated hook
  const { 
    isLive, 
    isConnecting, 
    activeTool, 
    activeStream, 
    startLiveSession, 
    stopLiveSession 
  } = useGeminiLive({ cartridge: activeCartridge });

  return (
    <div className="h-full flex gap-6">
      <div className="w-96 flex flex-col gap-4">
        <h2 className="text-xl font-black tracking-tight mb-2">Active Sessions ({sessions.length})</h2>
        <div className="space-y-3">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSessionId(s.id)}
              className={`
                w-full text-left p-4 rounded-2xl border transition-all duration-300
                ${selectedSessionId === s.id 
                  ? 'bg-indigo-600/10 border-indigo-500/30' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.customerName}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{s.id}</p>
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  {s.channel === 'whatsapp' && <MessageSquare className="w-4 h-4 text-emerald-400" />}
                  {s.channel === 'voice_kiosk' && <Phone className="w-4 h-4 text-sky-400" />}
                  {s.channel === 'webchat' && <Monitor className="w-4 h-4 text-indigo-400" />}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-3 h-3" /> Online
                </div>
                <div className={`
                  flex items-center gap-1.5 px-2 py-1 rounded-full border
                  ${s.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    s.sentiment === 'negative' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    'bg-slate-500/10 text-slate-400 border-slate-500/20'}
                `}>
                  {s.sentiment === 'positive' && <Smile className="w-3 h-3" />}
                  {s.sentiment === 'neutral' && <Meh className="w-3 h-3" />}
                  {s.sentiment === 'negative' && <Frown className="w-3 h-3" />}
                  {s.sentiment}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={`flex-grow flex bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative transition-all duration-500 ${activeWidget ? 'gap-0' : ''}`}>
        <div className="flex-grow flex flex-col relative h-full min-w-0">
          <AnimatePresence>
            {activeTool && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-amber-500/20 border border-amber-500/30 backdrop-blur-xl rounded-2xl flex items-center gap-4 shadow-2xl shadow-amber-500/20"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center animate-pulse">
                  {activeTool === 'checkRoomAvailability' && <Calendar className="w-5 h-5 text-white" />}
                  {activeTool === 'lookupAccountBalance' && <Wallet className="w-5 h-5 text-white" />}
                  {activeTool === 'recoverAbandonedCart' && <Database className="w-5 h-5 text-white" />}
                  {!['checkRoomAvailability', 'lookupAccountBalance', 'recoverAbandonedCart'].includes(activeTool) && <Cpu className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-xs font-black text-amber-500 uppercase tracking-widest leading-none mb-1">Action Engine</p>
                  <p className="text-sm font-bold text-white">Running {activeTool}...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {activeSession ? (
            <>
              {/* Header */}
              <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg relative">
                    <User className="w-6 h-6 text-white" />
                    {isLive && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#020617]"></span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-black">{activeSession.customerName}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3" /> {activeSession.language}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3 h-3" /> {activeCartridge?.name || 'Generic AI'}
                      </span>
                      {isLive && (
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Activity className="w-3 h-3 animate-pulse" /> Live Stream
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isLive ? (
                    <button 
                      onClick={startLiveSession}
                      disabled={isConnecting}
                      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all"
                    >
                      {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
                      {isConnecting ? 'Linking...' : 'Iniciar Simulação Voz'}
                    </button>
                  ) : (
                    <button 
                      onClick={stopLiveSession}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-600/10 text-red-500 border border-red-500/20 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-600/20 transition-all"
                    >
                      <MicOff className="w-4 h-4" /> Parar IA
                    </button>
                  )}
                  <button className="p-2.5 text-slate-500 hover:text-white bg-white/5 rounded-xl border border-white/10 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Transcript Area */}
              <div className="flex-grow p-8 overflow-y-auto space-y-6 flex flex-col custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.98]">
                {activeSession.transcript.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`
                      max-w-[75%] p-4 rounded-2xl text-sm font-medium leading-relaxed
                      ${msg.role === 'model' 
                        ? 'bg-indigo-600 self-start text-white shadow-[0_10px_30px_rgba(79,70,229,0.2)]' 
                        : msg.role === 'system'
                          ? 'bg-white/5 border border-amber-500/20 self-center text-amber-400 text-[11px] font-bold py-2 px-4 italic'
                          : 'bg-white/5 self-end text-slate-200 border border-white/5 backdrop-blur-md'}
                    `}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role !== 'system' && (
                      <div className={`text-[10px] mt-2 font-bold opacity-60 flex items-center gap-2 ${msg.role === 'model' ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {msg.role === 'model' ? 'OmniBrain' : 'Customer'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </motion.div>
                ))}
                {activeSession.transcript.length === 0 && !isConnecting && (
                  <div className="flex-grow flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <Activity className="w-16 h-16 opacity-10 animate-pulse" />
                    <p className="font-bold uppercase tracking-widest text-[10px] opacity-40">Ready for Live Interaction</p>
                  </div>
                )}
                {isConnecting && (
                  <div className="flex-grow flex flex-col items-center justify-center text-slate-600 space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin opacity-20" />
                    <p className="font-bold uppercase tracking-widest text-[10px] opacity-40">Establishing Neural Link...</p>
                  </div>
                )}
              </div>

              {/* Visualizer and Input Bar */}
              <div className="p-8 bg-white/[0.01] border-t border-white/5 backdrop-blur-xl mt-auto space-y-6">
                <AudioVisualizer stream={activeStream} isActive={isLive} />
                
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-[1.5rem] group focus-within:border-indigo-500/50 transition-all duration-300">
                  <input 
                    type="text" 
                    placeholder="Interceptar conversa (Chat)..." 
                    className="bg-transparent border-none text-sm outline-none w-full text-slate-200 placeholder:text-slate-600 font-medium"
                  />
                  <button className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-slate-600 p-10">
              <Activity className="w-20 h-20 opacity-10 mb-4" />
              <h3 className="text-xl font-black">No Active Session Selected</h3>
              <p className="font-medium text-slate-500">Pick a user on the left to monitor the AI flow in real-time.</p>
            </div>
          )}
        </div>

        {/* Generative UI Lateral Screen */}
        <AnimatePresence>
          {activeWidget && (
            <div className="w-[450px] shrink-0 border-l border-white/10 bg-white/[0.01]">
              <DynamicWidgetArea />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveMonitorView;