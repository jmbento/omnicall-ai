
import React from 'react';
import { motion } from 'framer-motion';
import { useChatHistory, HistorySession } from '@/hooks/useChatHistory';
import { MessageSquare, Plus, Clock, History, AlertCircle, ChevronRight } from 'lucide-react';

const SidebarHistory: React.FC = () => {
  const { sessions, isLoading, error, reload } = useChatHistory();

  // Formatação de data amigável simplificada (Intl)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  // Agrupamento por período
  const groupedSessions = sessions.reduce((acc, session) => {
    const period = formatDate(session.created_at);
    if (!acc[period]) acc[period] = [];
    acc[period].push(session);
    return acc;
  }, {} as Record<string, HistorySession[]>);

  const handleLoadSession = (id: string) => {
    console.log('[SaaS History] Loading legacy session context:', id);
    // Aqui integraria com o state global para carregar o transcript
  };

  if (error) {
    return (
      <div className="px-4 py-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-500/50 mx-auto mb-2" />
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sync Error</p>
        <button onClick={reload} className="mt-2 text-indigo-400 text-[10px] font-black underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* New Chat Action */}
      <button 
        onClick={() => window.location.reload()} // Mock reset for MVP
        className="mx-4 mb-6 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all group"
      >
        <Plus className="w-4 h-4 text-indigo-400 group-hover:rotate-90 transition-transform" />
        New Interaction
      </button>

      <div className="flex-grow overflow-y-auto px-4 space-y-6 custom-scrollbar pb-10">
        {isLoading ? (
          // Skeletons pulsantes
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-2 w-12 bg-white/5 rounded" />
                <div className="h-12 w-full bg-white/5 rounded-xl" />
              </div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-12 text-center opacity-40">
            <History className="w-10 h-10 mx-auto mb-4 text-slate-600" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Histórico Vazio</p>
            <p className="text-[9px] mt-1 font-medium">Inicie uma voz para registrar.</p>
          </div>
        ) : (
          Object.entries(groupedSessions).map(([period, items]) => (
            <div key={period} className="space-y-2">
              <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">{period}</h5>
              <div className="space-y-1">
                {items.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleLoadSession(session.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                  >
                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-600/20">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <p className="text-[11px] font-bold text-slate-300 truncate leading-none mb-1">
                        {session.cartridges?.name || 'Agente Genérico'}
                      </p>
                      <p className="text-[9px] text-slate-600 font-medium flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> 
                        {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-slate-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarHistory;
