
import { create } from 'zustand';
import { Cartridge, OmniSession, Message } from '@/types';
import { 
  Hotel, 
  ShoppingCart, 
  Banknote,
  ConciergeBell,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

interface OmniStore {
  cartridges: Cartridge[];
  sessions: OmniSession[];
  activeSessionId: string | null;
  selectedCartridgeId: string | null;
  toggleCartridge: (id: string) => void;
  setSelectedCartridge: (id: string | null) => void;
  setActiveSession: (id: string | null) => void;
  addMessage: (sessionId: string, message: Message) => void;
}

export const useOmniStore = create<OmniStore>((set) => ({
  cartridges: [
    {
      id: 'h-concierge-1',
      name: 'Hotel Concierge Pro',
      icon: ConciergeBell,
      category: 'Hospitality',
      description: 'Gestão de reservas e serviços de quarto com RAG integrado para guias locais.',
      capabilities: ['Check-in', 'Room Service', 'Local Tours'],
      basePrice: 299,
      active: true,
      systemInstruction: "Você é um Concierge de hotel 5 estrelas. Seja extremamente cortês, eficiente e ofereça serviços proativamente (como reserva de tours ou serviço de quarto)."
    },
    {
      id: 'f-bank-1',
      name: 'BankAssist Vector',
      icon: ShieldCheck,
      category: 'Finance',
      description: 'Análise de fraude e transações bancárias seguras com pgvector.',
      capabilities: ['KYC Flow', 'Fraud Alert', 'Statement Analysis'],
      basePrice: 899,
      active: true,
      systemInstruction: "Você é um consultor bancário seguro e sério. Ajude com transações e consultas de extrato, sempre prezando por protocolos de segurança."
    },
    {
      id: 'r-checkout-1',
      name: 'Retail Flow AI',
      icon: ShoppingBag,
      category: 'Retail',
      description: 'Assistente de vendas e controle de estoque omnicanal.',
      capabilities: ['Stock Check', 'Price Query', 'Cart Recovery'],
      basePrice: 199,
      active: false,
      systemInstruction: "Você é um assistente de vendas ágil. Ajude os clientes a encontrar produtos no estoque e finalizar compras rapidamente."
    }
  ],
  sessions: [
    {
      id: 'sess-001',
      customerName: 'Gabriel Oliveira',
      channel: 'whatsapp',
      language: 'pt-BR',
      status: 'active',
      sentiment: 'positive',
      transcript: [
        { id: 'm1', role: 'user', content: 'Quero reservar um quarto para amanhã.', timestamp: new Date() },
        { id: 'm2', role: 'model', content: 'Claro! Temos suítes disponíveis. Deseja vista para o mar?', timestamp: new Date() }
      ],
      activeCartridgeId: 'h-concierge-1'
    },
    {
      id: 'sess-002',
      customerName: 'Sarah Jenkins',
      channel: 'voice_kiosk',
      language: 'en-US',
      status: 'active',
      sentiment: 'neutral',
      transcript: [],
      activeCartridgeId: 'f-bank-1'
    }
  ],
  activeSessionId: null,
  selectedCartridgeId: 'h-concierge-1',
  toggleCartridge: (id) => set((state) => ({
    cartridges: state.cartridges.map(c => c.id === id ? { ...c, active: !c.active } : c)
  })),
  setSelectedCartridge: (id) => set({ selectedCartridgeId: id }),
  setActiveSession: (id) => set({ activeSessionId: id }),
  addMessage: (sessionId, msg) => set((state) => ({
    sessions: state.sessions.map(s => s.id === sessionId ? { ...s, transcript: [...s.transcript, msg] } : s)
  }))
}));
