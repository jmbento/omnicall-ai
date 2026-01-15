import { supabase } from '../lib/supabase';

/**
 * Chat Persistence Service
 * Handles interaction with Supabase to store sessions and message logs.
 * Design Principle: "Fail-safe & Non-blocking". 
 * Voice interactions take priority over database persistence.
 */
export const chatPersistence = {
  /**
   * Creates a new session record in the database.
   * Returns the database UUID for the session.
   */
  async createNewSession(userId: string, cartridgeId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          user_id: userId,
          cartridge_id: cartridgeId,
          status: 'active',
          created_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) {
        console.error('[Persistence] Error creating session:', error.message);
        return null;
      }

      return data?.id || null;
    } catch (err) {
      console.error('[Persistence] Critical failure creating session:', err);
      return null;
    }
  },

  /**
   * Persists a message to the database.
   * This is fire-and-forget; it doesn't wait for the response to avoid latency.
   */
  persistMessage(sessionId: string | null, role: 'user' | 'model' | 'system', content: string): void {
    if (!sessionId || !content.trim()) return;

    // Async block without await to keep it non-blocking for the UI/Audio stream
    (async () => {
      try {
        const { error } = await supabase
          .from('messages')
          .insert({
            session_id: sessionId,
            role: role,
            content: content.trim(),
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error('[Persistence] Error saving message:', error.message);
        }
      } catch (err) {
        console.error('[Persistence] Critical failure saving message:', err);
      }
    })();
  }
};