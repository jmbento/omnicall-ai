import { supabase } from '../lib/supabase';

export interface Cartridge {
  id: string;
  name: string;
  description: string;
  system_instruction: string;
  icon: string;
  theme: string;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  cartridge_id: string;
  status: 'active' | 'completed';
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  created_at: string;
}

/**
 * OmniCall AI Core API Service
 * Handles persistence and retrieval for the omnichannel platform.
 */
export const omniApi = {
  /**
   * Returns the list of all available industry-specific cartridges.
   */
  async getCartridges(): Promise<Cartridge[]> {
    try {
      const { data, error } = await supabase
        .from('cartridges')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching cartridges:', err);
      return [];
    }
  },

  /**
   * Creates a new interaction session for a user and a specific cartridge.
   */
  async createSession(cartridgeId: string, userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          user_id: userId,
          cartridge_id: cartridgeId,
          status: 'active'
        })
        .select('id')
        .single();

      if (error) throw error;
      return data?.id || null;
    } catch (err) {
      console.error('Error creating session:', err);
      return null;
    }
  },

  /**
   * Saves a message (user or AI response) to the database session log.
   */
  async saveMessage(sessionId: string, role: 'user' | 'model' | 'system', content: string): Promise<Message | null> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          session_id: sessionId,
          role: role,
          content: content
        })
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error saving message:', err);
      return null;
    }
  },

  /**
   * Retrieves the full message history for a given session.
   */
  async getMessages(sessionId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching messages history:', err);
      return [];
    }
  }
};