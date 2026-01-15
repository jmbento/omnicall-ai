import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server-only Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Database types
export interface Session {
  id: string;
  user_id: string;
  cartridge_id: string;
  status: 'active' | 'ended';
  created_at: string;
  ended_at?: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  created_at: string;
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

export interface Document {
  id: string;
  user_id: string;
  cartridge_id: string;
  filename: string;
  content: string;
  embedding: number[];
  created_at: string;
}

// Helper functions
export const db = {
  // Sessions
  async createSession(userId: string, cartridgeId: string): Promise<Session | null> {
    const { data, error } = await supabaseAdmin
      .from('sessions')
      .insert({ user_id: userId, cartridge_id: cartridgeId, status: 'active' })
      .select()
      .single();
    
    if (error) {
      console.error('[DB] Error creating session:', error);
      return null;
    }
    return data;
  },

  // Messages
  async saveMessage(sessionId: string, role: Message['role'], content: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('messages')
      .insert({ session_id: sessionId, role, content });
    
    if (error) console.error('[DB] Error saving message:', error);
  },

  // Credits
  async getCredits(userId: string): Promise<number> {
    const { data } = await supabaseAdmin
      .from('credits')
      .select('balance')
      .eq('user_id', userId)
      .single();
    
    return data?.balance || 0;
  },

  async deductCredits(userId: string, amount: number): Promise<boolean> {
    const current = await this.getCredits(userId);
    if (current < amount) return false;
    
    const { error } = await supabaseAdmin
      .from('credits')
      .update({ balance: current - amount, updated_at: new Date().toISOString() })
      .eq('user_id', userId);
    
    return !error;
  },

  async addCredits(userId: string, amount: number): Promise<void> {
    const current = await this.getCredits(userId);
    await supabaseAdmin
      .from('credits')
      .upsert({ 
        user_id: userId, 
        balance: current + amount, 
        updated_at: new Date().toISOString() 
      });
  },

  // Calls
  async createCall(data: Partial<Call>): Promise<Call | null> {
    const { data: call, error } = await supabaseAdmin
      .from('calls')
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error('[DB] Error creating call:', error);
      return null;
    }
    return call;
  },

  async getCalls(userId: string, limit = 50): Promise<Call[]> {
    const { data } = await supabaseAdmin
      .from('calls')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    return data || [];
  },

  // Documents (for RAG)
  async saveDocument(doc: Partial<Document>): Promise<void> {
    await supabaseAdmin.from('documents').insert(doc);
  },

  async searchDocuments(cartridgeId: string, embedding: number[], limit = 5): Promise<Document[]> {
    // Uses pgvector for similarity search
    const { data } = await supabaseAdmin.rpc('match_documents', {
      query_embedding: embedding,
      match_cartridge_id: cartridgeId,
      match_count: limit,
    });
    
    return data || [];
  },

  // Custom Cartridges
  async getCustomCartridges(userId: string): Promise<CustomCartridge[]> {
    const { data } = await supabaseAdmin
      .from('custom_cartridges')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);
    
    return data || [];
  },

  async createCustomCartridge(cartridge: Partial<CustomCartridge>): Promise<CustomCartridge | null> {
    const { data, error } = await supabaseAdmin
      .from('custom_cartridges')
      .insert(cartridge)
      .select()
      .single();
    
    if (error) {
      console.error('[DB] Error creating cartridge:', error);
      return null;
    }
    return data;
  },
};
