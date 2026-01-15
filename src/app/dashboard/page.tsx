'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  Store,
  MessageSquare,
  Bot,
  Phone,
  CreditCard,
  Activity,
  Clock,
  Check,
  Loader2,
  Plus,
  X,
  Wand2,
  Settings,
  ShoppingCart,
  Hotel,
  Landmark,
  ShoppingBag,
  HeartPulse,
  Compass,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';

// Types
type View = 'discover' | 'dashboard' | 'store' | 'console';

interface Cartridge {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  themeColor: string;
  category: string;
  features: string[];
}

// Data
const CARTRIDGES: Cartridge[] = [
  {
    id: 'hotel-pro',
    name: 'Hotel Pro',
    description: 'Gestão inteligente de reservas e atendimento hoteleiro.',
    price: 299,
    icon: <Hotel className="w-8 h-8" />,
    themeColor: '#f59e0b',
    category: 'Hotelaria',
    features: ['Reservas', 'Check-in', 'Room Service'],
  },
  {
    id: 'gov-assist',
    name: 'Gov Assist',
    description: 'Atendimento cidadão para serviços públicos.',
    price: 499,
    icon: <Landmark className="w-8 h-8" />,
    themeColor: '#3b82f6',
    category: 'Governo',
    features: ['Agendamentos', 'Documentos', 'Protocolos'],
  },
  {
    id: 'retail-pulse',
    name: 'Retail Pulse',
    description: 'Vendas e suporte para e-commerce.',
    price: 120,
    icon: <ShoppingBag className="w-8 h-8" />,
    themeColor: '#ef4444',
    category: 'Varejo',
    features: ['Pedidos', 'Trocas', 'Carrinho'],
  },
  {
    id: 'health-connect',
    name: 'Health Care',
    description: 'Agendamento e triagem para clínicas.',
    price: 300,
    icon: <HeartPulse className="w-8 h-8" />,
    themeColor: '#10b981',
    category: 'Saúde',
    features: ['Consultas', 'Exames', 'Receitas'],
  },
];

// Sidebar Component
function Sidebar({ 
  activeView, 
  onNavigate, 
  credits 
}: { 
  activeView: View; 
  onNavigate: (v: View) => void;
  credits: number;
}) {
  const navItems = [
    { id: 'discover' as View, icon: <Compass className="w-5 h-5" />, label: 'Explorar' },
    { id: 'dashboard' as View, icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'store' as View, icon: <Store className="w-5 h-5" />, label: 'Store' },
    { id: 'console' as View, icon: <MessageSquare className="w-5 h-5" />, label: 'Console' },
  ];
  
  return (
    <aside className="w-64 bg-[#0f0f14] border-r border-white/10 flex flex-col h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold">OmniCall AI</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all',
              activeView === item.id
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'hover:bg-white/5 text-slate-400 hover:text-white'
            )}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
        
        {/* Settings Link */}
        <Link
          href="/settings"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all hover:bg-white/5 text-slate-400 hover:text-white"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Link>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white uppercase">
            U
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Usuário</div>
            <div className="text-xs text-slate-400">{credits} créditos</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Dashboard View
function DashboardView({ credits, callsCount }: { credits: number; callsCount: number }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Créditos', value: credits.toString(), icon: <CreditCard className="w-5 h-5" />, color: '#f59e0b' },
          { label: 'Chamadas Hoje', value: callsCount.toString(), icon: <Phone className="w-5 h-5" />, color: '#10b981' },
          { label: 'Tempo Médio', value: '--', icon: <Clock className="w-5 h-5" />, color: '#6366f1' },
          { label: 'Cartuchos', value: '4', icon: <Bot className="w-5 h-5" />, color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 shadow-sm hover:border-white/20 transition-all">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Atividade Recente
          </h3>
          <div className="text-center py-8 text-slate-400">
            Nenhuma atividade ainda. Inicie uma conversa!
          </div>
        </div>
        
        <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-400" />
            Cartuchos Ativos
          </h3>
          <div className="space-y-3">
            {CARTRIDGES.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${c.themeColor}20`, color: c.themeColor }}
                >
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.category}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Store View
function StoreView() {
  const [showCreator, setShowCreator] = useState(false);
  const [installedCartridges, setInstalledCartridges] = useState<string[]>([]);
  
  const handleInstall = (id: string) => {
    if (!installedCartridges.includes(id)) {
      setInstalledCartridges([...installedCartridges, id]);
    }
  };
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cartridge Store</h1>
          <p className="text-slate-400">Instale módulos de inteligência especializados</p>
        </div>
        <button
          onClick={() => setShowCreator(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Criar Meu Cartucho
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARTRIDGES.map((cartridge) => {
          const isInstalled = installedCartridges.includes(cartridge.id);
          
          return (
            <motion.div
              key={cartridge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                'bg-[#1a1a24] border rounded-2xl p-6 transition-all',
                isInstalled ? 'border-2' : 'border-white/10 hover:border-white/20'
              )}
              style={{ borderColor: isInstalled ? cartridge.themeColor : undefined }}
            >
              {isInstalled && (
                <div
                  className="inline-block px-2 py-1 rounded-lg text-xs font-bold mb-4"
                  style={{ backgroundColor: cartridge.themeColor }}
                >
                  INSTALADO
                </div>
              )}
              
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${cartridge.themeColor}20`, color: cartridge.themeColor }}
              >
                {cartridge.icon}
              </div>
              
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: cartridge.themeColor }}>
                {cartridge.category}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{cartridge.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{cartridge.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {cartridge.features.map((f) => (
                  <span key={f} className="px-2 py-1 text-xs rounded-lg bg-white/5 text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-2xl font-bold">{cartridge.price}</span>
                  <span className="text-slate-400 ml-1">créditos</span>
                </div>
                
                {isInstalled ? (
                  <button disabled className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Instalado
                  </button>
                ) : (
                  <button
                    onClick={() => handleInstall(cartridge.id)}
                    className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-medium flex items-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Creator Modal */}
      <AnimatePresence>
        {showCreator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCreator(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#1a1a24] border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Criar Cartucho Personalizado</h3>
                </div>
                <button onClick={() => setShowCreator(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Cartucho</label>
                  <input
                    type="text"
                    placeholder="Ex: Clínica Veterinária Pro"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Setor</label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none">
                    <option>Selecione...</option>
                    <option>Saúde</option>
                    <option>Varejo</option>
                    <option>Serviços</option>
                    <option>Educação</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    rows={3}
                    placeholder="Descreva o que este cartucho fará..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-purple-500 outline-none resize-none"
                  />
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                <Wand2 className="w-5 h-5" />
                Criar Cartucho
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Console View
function ConsoleView() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Olá! Sou a IA do OmniCall. Como posso ajudar?' },
      ]);
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">Console de Atendimento</h1>
        <p className="text-sm text-slate-400">Converse com a IA</p>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            Envie uma mensagem para começar
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={clsx(
                  'max-w-[80%] p-4 rounded-2xl',
                  msg.role === 'user'
                    ? 'ml-auto bg-indigo-500'
                    : 'bg-[#1a1a24] border border-white/10'
                )}
              >
                {msg.content}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-6 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-medium transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

// Discover View
function DiscoverView({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bom dia! 👋</h1>
        <p className="text-slate-400">O que você quer fazer hoje?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Iniciar Conversa', icon: <MessageSquare className="w-8 h-8" />, view: 'console' as View, color: '#6366f1' },
          { label: 'Ver Cartuchos', icon: <Store className="w-8 h-8" />, view: 'store' as View, color: '#8b5cf6' },
          { label: 'Dashboard', icon: <LayoutDashboard className="w-8 h-8" />, view: 'dashboard' as View, color: '#10b981' },
          { label: 'Criar Cartucho', icon: <Wand2 className="w-8 h-8" />, view: 'store' as View, color: '#f59e0b' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.view)}
            className="flex items-center gap-4 p-6 bg-[#1a1a24] border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-all text-left"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${item.color}20`, color: item.color }}
            >
              {item.icon}
            </div>
            <div>
              <div className="font-semibold text-lg">{item.label}</div>
              <div className="text-sm text-slate-400">Clique para acessar</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Page
export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>('discover');
  const [credits, setCredits] = useState<number>(0);
  const [callsCount, setCallsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const userId = 'test-user-001'; // Em produção, viria do Auth

  useEffect(() => {
    async function fetchData() {
      try {
        const [creditsRes, callsRes] = await Promise.all([
          fetch(`/api/credits?userId=${userId}`),
          fetch(`/api/calls?userId=${userId}`)
        ]);
        
        const creditsData = await creditsRes.json();
        const callsData = await callsRes.json();
        
        setCredits(creditsData.balance || 0);
        setCallsCount(callsData.todayCount || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [userId]);
  
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <Sidebar activeView={activeView} onNavigate={setActiveView} credits={credits} />
      
      <main className="flex-1 overflow-auto bg-[#0a0a0f]">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-slate-400 font-medium">Carregando seu universo neural...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeView === 'discover' && (
              <motion.div key="discover" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <DiscoverView onNavigate={setActiveView} />
              </motion.div>
            )}
            {activeView === 'dashboard' && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <DashboardView credits={credits} callsCount={callsCount} />
              </motion.div>
            )}
            {activeView === 'store' && (
              <motion.div key="store" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <StoreView />
              </motion.div>
            )}
            {activeView === 'console' && (
              <motion.div key="console" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                <ConsoleView />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
