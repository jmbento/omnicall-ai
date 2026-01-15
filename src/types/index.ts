/**
 * OmniCall AI Types
 */

export interface Cartridge {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  themeColor: string;
  themeGradient?: string;
  category: string;
  features: string[];
  systemInstruction?: string;
  isCustom?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

export type MessageRole = 'user' | 'model' | 'system';

export interface OmniSession {
  id: string;
  cartridgeId: string;
  messages: Message[];
  createdAt: Date;
  status: 'active' | 'ended';
}

export interface Session {
  id: string;
  user_id: string;
  cartridge_id: string;
  status: 'active' | 'ended';
  created_at: string;
  ended_at?: string;
}

export interface Credit {
  id: string;
  user_id: string;
  balance: number;
  updated_at: string;
}

export interface Call {
  id: string;
  user_id: string;
  cartridge_id: string;
  session_id: string;
  phone_number?: string;
  channel: 'web' | 'whatsapp' | 'phone';
  status: 'active' | 'completed' | 'failed';
  duration_seconds?: number;
  credits_used: number;
  created_at: string;
  ended_at?: string;
}

export interface CustomCartridge {
  id: string;
  user_id: string;
  name: string;
  sector: string;
  description: string;
  greeting: string;
  keywords: string;
  responses: string;
  is_active: boolean;
  created_at: string;
}
