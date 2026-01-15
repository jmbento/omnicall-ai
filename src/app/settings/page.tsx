'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Settings,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  Shield,
  Save,
  Check,
  ArrowLeft,
  Bot,
  Loader2,
  Globe,
  Key,
  Webhook,
} from 'lucide-react';

interface UserSettings {
  // Email Settings
  email: string;
  emailNotifications: boolean;
  emailDailyReport: boolean;
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  emailFrom: string;
  
  // Phone/WhatsApp Settings
  phoneNumber: string;
  whatsappEnabled: boolean;
  whatsappBusinessId: string;
  whatsappAccessToken: string;
  whatsappVerifyToken: string;
  
  // Notifications
  notifyOnNewCall: boolean;
  notifyOnLowCredits: boolean;
  lowCreditsThreshold: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'whatsapp' | 'notifications' | 'api'>('email');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [settings, setSettings] = useState<UserSettings>({
    email: '',
    emailNotifications: true,
    emailDailyReport: false,
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: '',
    phoneNumber: '',
    whatsappEnabled: false,
    whatsappBusinessId: '',
    whatsappAccessToken: '',
    whatsappVerifyToken: 'omnicall-verify',
    notifyOnNewCall: true,
    notifyOnLowCredits: true,
    lowCreditsThreshold: 50,
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // TODO: Salvar no Supabase via API
    // await fetch('/api/settings', { method: 'POST', body: JSON.stringify(settings) });
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSettings = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notificações', icon: <Bell className="w-4 h-4" /> },
    { id: 'api', label: 'API & Webhooks', icon: <Webhook className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold">Configurações</h1>
                <p className="text-xs text-slate-400">Gerenciar conta e integrações</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-medium transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* Content */}
          <main className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6"
            >
              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Configurações de Email</h2>
                    <p className="text-sm text-slate-400">Configure seu email para enviar e receber notificações</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Principal</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSettings('email', e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                      />
                      <p className="text-xs text-slate-500 mt-1">Usado para receber relatórios e alertas</p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-400" />
                        Configuração SMTP (Envio de Emails)
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Servidor SMTP</label>
                          <input
                            type="text"
                            value={settings.smtpHost}
                            onChange={(e) => updateSettings('smtpHost', e.target.value)}
                            placeholder="smtp.gmail.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Porta</label>
                          <input
                            type="text"
                            value={settings.smtpPort}
                            onChange={(e) => updateSettings('smtpPort', e.target.value)}
                            placeholder="587"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Usuário SMTP</label>
                          <input
                            type="text"
                            value={settings.smtpUser}
                            onChange={(e) => updateSettings('smtpUser', e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Senha SMTP</label>
                          <input
                            type="password"
                            value={settings.smtpPassword}
                            onChange={(e) => updateSettings('smtpPassword', e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">Email Remetente</label>
                          <input
                            type="email"
                            value={settings.emailFrom}
                            onChange={(e) => updateSettings('emailFrom', e.target.value)}
                            placeholder="noreply@suaempresa.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => updateSettings('emailNotifications', e.target.checked)}
                          className="w-5 h-5 rounded bg-white/5 border-white/20 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span>Receber notificações por email</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailDailyReport}
                          onChange={(e) => updateSettings('emailDailyReport', e.target.checked)}
                          className="w-5 h-5 rounded bg-white/5 border-white/20 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span>Receber relatório diário de atendimentos</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp Settings */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Configurações WhatsApp</h2>
                    <p className="text-sm text-slate-400">Configure seu número para automação de chat via WhatsApp Business API</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Número de Telefone</label>
                      <div className="flex gap-2">
                        <select className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none">
                          <option value="+55">🇧🇷 +55</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+351">🇵🇹 +351</option>
                        </select>
                        <input
                          type="tel"
                          value={settings.phoneNumber}
                          onChange={(e) => updateSettings('phoneNumber', e.target.value)}
                          placeholder="21 99999-9999"
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Número registrado no WhatsApp Business</p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <label className="flex items-center gap-3 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          checked={settings.whatsappEnabled}
                          onChange={(e) => updateSettings('whatsappEnabled', e.target.checked)}
                          className="w-5 h-5 rounded bg-white/5 border-white/20 text-indigo-500 focus:ring-indigo-500"
                        />
                        <div>
                          <span className="font-medium">Ativar integração WhatsApp</span>
                          <p className="text-xs text-slate-500">Responde automaticamente mensagens via IA</p>
                        </div>
                      </label>
                    </div>

                    {settings.whatsappEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 border-t border-white/10 pt-4"
                      >
                        <h3 className="font-semibold flex items-center gap-2">
                          <Key className="w-4 h-4 text-green-400" />
                          Credenciais Meta/WhatsApp Business API
                        </h3>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number ID</label>
                          <input
                            type="text"
                            value={settings.whatsappBusinessId}
                            onChange={(e) => updateSettings('whatsappBusinessId', e.target.value)}
                            placeholder="1234567890123456"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none font-mono text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Access Token</label>
                          <input
                            type="password"
                            value={settings.whatsappAccessToken}
                            onChange={(e) => updateSettings('whatsappAccessToken', e.target.value)}
                            placeholder="EAAG..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none font-mono text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Verify Token (Webhook)</label>
                          <input
                            type="text"
                            value={settings.whatsappVerifyToken}
                            onChange={(e) => updateSettings('whatsappVerifyToken', e.target.value)}
                            placeholder="omnicall-verify"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none font-mono text-sm"
                          />
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                          <h4 className="font-semibold text-green-400 mb-2">URL do Webhook</h4>
                          <code className="block bg-black/30 p-3 rounded-lg text-sm break-all">
                            https://nextjs-temp-woad.vercel.app/api/whatsapp
                          </code>
                          <p className="text-xs text-slate-400 mt-2">
                            Cole esta URL no Meta Business Suite → WhatsApp → Configuration → Webhook
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">Notificações</h2>
                    <p className="text-sm text-slate-400">Configure quando e como receber alertas</p>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <span className="font-medium">Nova chamada recebida</span>
                          <p className="text-xs text-slate-500">Alerta quando uma nova conversa iniciar</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifyOnNewCall}
                        onChange={(e) => updateSettings('notifyOnNewCall', e.target.checked)}
                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-indigo-500 focus:ring-indigo-500"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <span className="font-medium">Créditos baixos</span>
                          <p className="text-xs text-slate-500">Alerta quando créditos estiverem acabando</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.notifyOnLowCredits}
                        onChange={(e) => updateSettings('notifyOnLowCredits', e.target.checked)}
                        className="w-5 h-5 rounded bg-white/5 border-white/20 text-indigo-500 focus:ring-indigo-500"
                      />
                    </label>

                    {settings.notifyOnLowCredits && (
                      <div className="pl-4 border-l-2 border-amber-500/30">
                        <label className="block text-sm font-medium mb-2">Alertar quando créditos forem abaixo de:</label>
                        <input
                          type="number"
                          value={settings.lowCreditsThreshold}
                          onChange={(e) => updateSettings('lowCreditsThreshold', parseInt(e.target.value))}
                          className="w-32 px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
                        />
                        <span className="ml-2 text-slate-400">créditos</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* API Settings */}
              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">API & Webhooks</h2>
                    <p className="text-sm text-slate-400">Endpoints para integração com sistemas externos</p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        Endpoints Disponíveis
                      </h3>
                      
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">GET</span>
                            <code className="ml-2 text-sm">/api/credits?userId=...</code>
                          </div>
                          <span className="text-xs text-slate-500">Consultar saldo</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">POST</span>
                            <code className="ml-2 text-sm">/api/calls</code>
                          </div>
                          <span className="text-xs text-slate-500">Iniciar chamada</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">POST</span>
                            <code className="ml-2 text-sm">/api/embeddings</code>
                          </div>
                          <span className="text-xs text-slate-500">Upload documento RAG</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">WEBHOOK</span>
                            <code className="ml-2 text-sm">/api/whatsapp</code>
                          </div>
                          <span className="text-xs text-slate-500">WhatsApp Business</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                          <div>
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">WEBHOOK</span>
                            <code className="ml-2 text-sm">/api/stripe/webhook</code>
                          </div>
                          <span className="text-xs text-slate-500">Stripe Payments</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                      <h4 className="font-semibold text-indigo-400 mb-2">Base URL</h4>
                      <code className="block bg-black/30 p-3 rounded-lg text-sm">
                        https://nextjs-temp-woad.vercel.app
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
