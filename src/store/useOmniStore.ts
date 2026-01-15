/**
 * Zustand Store for OmniCall AI
 */

import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

interface OmniState {
  // Credits
  credits: number;
  setCredits: (credits: number) => void;
  deductCredits: (amount: number) => void;
  
  // Active Cartridge
  activeCartridgeId: string | null;
  setActiveCartridge: (id: string | null) => void;
  
  // Messages per cartridge
  messages: Record<string, Message[]>;
  addMessage: (cartridgeId: string, message: Message) => void;
  clearMessages: (cartridgeId: string) => void;
  
  // Installed Cartridges
  installedCartridges: string[];
  installCartridge: (id: string) => void;
  
  // Session
  isSessionActive: boolean;
  setSessionActive: (active: boolean) => void;
}

export const useOmniStore = create<OmniState>((set) => ({
  // Credits
  credits: 500,
  setCredits: (credits) => set({ credits }),
  deductCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),
  
  // Active Cartridge
  activeCartridgeId: null,
  setActiveCartridge: (id) => set({ activeCartridgeId: id }),
  
  // Messages
  messages: {},
  addMessage: (cartridgeId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [cartridgeId]: [...(state.messages[cartridgeId] || []), message],
    },
  })),
  clearMessages: (cartridgeId) => set((state) => ({
    messages: {
      ...state.messages,
      [cartridgeId]: [],
    },
  })),
  
  // Installed Cartridges
  installedCartridges: [],
  installCartridge: (id) => set((state) => ({
    installedCartridges: [...state.installedCartridges, id],
  })),
  
  // Session
  isSessionActive: false,
  setSessionActive: (active) => set({ isSessionActive: active }),
}));

// Widget Store
interface WidgetState {
  activeWidget: string | null;
  widgetData: Record<string, any>;
  setWidget: (type: string, data: any) => void;
  clearWidget: () => void;
}

export const useWidgetStore = create<WidgetState>((set) => ({
  activeWidget: null,
  widgetData: {},
  setWidget: (type, data) => set({ activeWidget: type, widgetData: { ...data } }),
  clearWidget: () => set({ activeWidget: null, widgetData: {} }),
}));
