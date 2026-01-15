
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface HistorySession {
  id: string;
  created_at: string;
  status: string;
  cartridges: {
    name: string;
    icon: string;
  };
}

export const useChatHistory = () => {
  const [sessions, setSessions] = useState<HistorySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Camada de Segurança: Validar usuário antes da query
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setSessions([]);
        return;
      }

      // Query Relacional: Sessions -> Cartridges
      const { data, error: dbError } = await supabase
        .from('sessions')
        .select(`
          id, 
          created_at, 
          status,
          cartridges (
            name,
            icon
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;

      setSessions((data as any) || []);
    } catch (err: any) {
      console.error('[History Hook] Error:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    sessions,
    isLoading,
    error,
    reload: fetchHistory
  };
};
