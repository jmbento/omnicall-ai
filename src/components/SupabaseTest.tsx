
import React, { useState, useEffect, useCallback } from 'react';
import { supabase, updateSupabaseConfig, getSupabaseConfig } from '@/lib/supabase';
import { Database, CheckCircle2, XCircle, Loader2, Zap, Link, Key } from 'lucide-react';

const SupabaseTest: React.FC = () => {
  const config = getSupabaseConfig();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [url, setUrl] = useState(config.url);
  const [apiKey, setApiKey] = useState(config.key);

  // Debounced update of the Supabase client
  useEffect(() => {
    const handler = setTimeout(() => {
      if (url && apiKey) {
        updateSupabaseConfig(url, apiKey);
        setMessage('Configuração do cliente atualizada.');
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [url, apiKey]);

  const testConnection = async () => {
    setStatus('loading');
    setMessage('Verificando link neural com Supabase...');

    try {
      // Tentativa de leitura simples na tabela cartridges para testar conexão
      const { data, error } = await supabase
        .from('cartridges')
        .select('name')
        .limit(1);

      if (error) throw error;

      setStatus('success');
      setMessage(`Conectado! Link ativo com o banco de dados.`);
    } catch (err: any) {
      setStatus('error');
      setMessage(`Falha no Link: ${err.message || 'Erro de autenticação ou URL inválida'}`);
    }
  };

  return (
    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-2xl max-w-sm shadow-2xl space-y-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-indigo-600/20 rounded-2xl flex items-center justify-center border border-indigo-500/20">
          <Database className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h4 className="text-sm font-black text-white tracking-tight leading-none mb-1">Supabase Config</h4>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Connectivity Parameters</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Link className="w-3.5 h-3.5" />
          </div>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Supabase URL"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[11px] font-medium text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            <Key className="w-3.5 h-3.5" />
          </div>
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Anon/Public Key"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[11px] font-medium text-slate-200 placeholder:text-slate-600 focus:border-indigo-500/50 outline-none transition-all"
          />
        </div>
      </div>

      <button
        onClick={testConnection}
        disabled={status === 'loading'}
        className={`
          w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
          flex items-center justify-center gap-2 shadow-lg
          ${status === 'loading' 
            ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5' 
            : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20 active:scale-95 border border-indigo-400/30'}
        `}
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        {status === 'loading' ? 'Checking...' : 'Test Connection'}
      </button>

      {status !== 'idle' && (
        <div className={`p-3 rounded-lg flex items-start gap-2 text-[10px] font-bold border animate-in fade-in slide-in-from-bottom-1 ${
          status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
          status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
          'bg-white/5 text-slate-400 border-white/10'
        }`}>
          {status === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {status === 'error' && <XCircle className="w-4 h-4 shrink-0" />}
          <span className="leading-tight">{message}</span>
        </div>
      )}
    </div>
  );
};

export default SupabaseTest;
