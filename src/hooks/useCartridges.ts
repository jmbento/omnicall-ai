/**
 * useCartridges - Cartridge Data Fetching Hook
 * Manages fetching, caching, and state of AI cartridges
 */

import { useState, useEffect, useCallback } from 'react';
import { useOmniStore } from '@/store';
import { supabase } from '@/lib/supabase';
import type { Cartridge } from '@/types';

interface UseCartridgesReturn {
  cartridges: Cartridge[];
  loading: boolean;
  error: string | null;
  selectedCartridge: Cartridge | null;
  selectCartridge: (id: string | null) => void;
  toggleCartridge: (id: string) => void;
  refreshCartridges: () => Promise<void>;
  getActiveCartridges: () => Cartridge[];
}

export function useCartridges(): UseCartridgesReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    cartridges,
    selectedCartridgeId,
    setSelectedCartridge,
    toggleCartridge,
  } = useOmniStore();

  // Selected cartridge computed value
  const selectedCartridge = selectedCartridgeId
    ? cartridges.find((c) => c.id === selectedCartridgeId) ?? null
    : null;

  // Fetch cartridges from Supabase (if enabled)
  const refreshCartridges = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('cartridges')
        .select('*')
        .order('category', { ascending: true });

      if (fetchError) {
        // If table doesn't exist, use local defaults silently
        if (fetchError.code === '42P01') {
          console.log('[useCartridges] Using local cartridge data (DB table not configured)');
          return;
        }
        throw fetchError;
      }

      // Data would sync to store here if we had a setCartridges action
      console.log('[useCartridges] Fetched cartridges from DB:', data?.length || 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch cartridges';
      setError(message);
      console.error('[useCartridges] Error:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get only active cartridges
  const getActiveCartridges = useCallback(() => {
    return cartridges.filter((c) => c.active);
  }, [cartridges]);

  // Initial fetch on mount
  useEffect(() => {
    // Only attempt DB fetch if we have a configured supabase
    const fetchOnMount = async () => {
      try {
        await refreshCartridges();
      } catch {
        // Silent fail, using local data
      }
    };
    fetchOnMount();
  }, [refreshCartridges]);

  return {
    cartridges,
    loading,
    error,
    selectedCartridge,
    selectCartridge: setSelectedCartridge,
    toggleCartridge,
    refreshCartridges,
    getActiveCartridges,
  };
}

export default useCartridges;
