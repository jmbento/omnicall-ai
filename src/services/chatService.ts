
import { supabase } from '../lib/supabase';
import { Session, Message, MessageRole } from '@/types';

export const chatService = {
  /**
   * Creates a new chat session in the database
   */
  async createSession(cartridgeId: string): Promise<{ data: Session | null; error: any }> {
    // Attempt to retrieve the current session to get the authenticated user.
    // getSession is used as a compatible alternative when getUser type definitions are missing.
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return { data: null, error: 'User not authenticated' };
    }

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: session.user.id,
        cartridge_id: cartridgeId,
        status: 'active'
      })
      .select()
      .single();

    return { data, error };
  },

  /**
   * Persists a message to the database log
   */
  async saveMessage(sessionId: string, role: MessageRole, content: string, audioUrl?: string): Promise<{ data: Message | null; error: any }> {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        role: role,
        content: content,
        audio_url: audioUrl || null
      })
      .select()
      .single();

    return { data, error };
  },

  /**
   * Fetches the transcript for a specific session
   */
  async getTranscript(sessionId: string): Promise<{ data: Message[] | null; error: any }> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    return { data, error };
  }
};
