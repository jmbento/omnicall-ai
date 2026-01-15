'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Smartphone,
  Phone,
  Clock,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Bot,
  MessageSquare,
  Users,
  Sparkles,
} from 'lucide-react';

const STATS = [
  { icon: <Zap className="w-6 h-6" />, value: '500', label: 'Créditos de Teste', color: '#f59e0b' },
  { icon: <Phone className="w-6 h-6" />, value: '4', label: 'Cartuchos Disponíveis', color: '#6366f1' },
  { icon: <CheckCircle className="w-6 h-6" />, value: '12', label: 'Chamadas Incluídas', color: '#10b981' },
  { icon: <Clock className="w-6 h-6" />, value: '--', label: 'Tempo Médio/Chamada', color: '#06b6d4' },
];

const FEATURES = [
  {
    icon: <Bot className="w-8 h-8" />,
    title: 'IA Conversacional',
    description: 'Gemini 2.0 com entendimento contextual profundo e memória de longo prazo.',
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: 'Omnichannel',
    description: 'WhatsApp, Web, Telefone. Todos os canais em uma única plataforma.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Cartuchos Personalizados',
    description: 'Crie IA especializada para seu negócio em minutos.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Enterprise Ready',
    description: 'Segurança, compliance e escalabilidade para empresas.',
  },
];

export default function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">OmniCall AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors font-medium"
            >
              Começar Grátis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">Powered by Gemini 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-tight">
            Inteligência Neural<br />de Atendimento
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Transforme seu atendimento com IA generativa. Cartuchos especializados
            para cada setor do seu negócio.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
              <Smartphone className="w-5 h-5" />
              Acessar Plataforma
            </Link>
            <button
              onClick={() => alert('📱 Para instalar:\n\n• iPhone/Safari: Toque em "Compartilhar" → "Adicionar à Tela de Início"\n\n• Android/Chrome: Toque no menu (⋮) → "Instalar aplicativo"')}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-all"
            >
              Instalar no Celular
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que OmniCall AI?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Tecnologia de ponta para revolucionar seu atendimento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Revolucionar seu Atendimento?
            </h2>
            <p className="text-slate-400 mb-8">
              Comece grátis com 500 créditos. Sem cartão de crédito.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-indigo-500 outline-none"
              />
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Começar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <span className="font-semibold">OmniCall AI</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentação</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
          <div className="text-sm text-slate-500">
            © 2026 OmniCall AI. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
