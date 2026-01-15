
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Client Initialization
 * Refactored to allow dynamic updates from the UI.
 */

let supabaseUrl = 'https://usijibfcxqiqnuktevcu.supabase.co';
let supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaWppYmZjeHFpcW51a3RldmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2NzAyOTYsImV4cCI6MjA4MzI0NjI5Nn0.mVNl7_rDvXRvGtkZYLqSEFECrdImZ38VjNl3bcOdE20';

// We export an object that can be updated, or provide a way to get the current instance.
// For simplicity in this MVP, we re-assign a let variable and export a getter.

export let supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const updateSupabaseConfig = (url: string, key: string) => {
  if (!url || !key) return;
  supabaseUrl = url;
  supabaseAnonKey = key;
  supabase = createClient(supabaseUrl, supabaseAnonKey);
};

export const getSupabaseConfig = () => ({
  url: supabaseUrl,
  key: supabaseAnonKey
});
