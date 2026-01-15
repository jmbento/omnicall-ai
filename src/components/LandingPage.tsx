import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Smartphone,
  Phone,
  Clock,
  CheckCircle,
  MessageSquare,
  Camera,
  Bell,
  Hotel,
  Landmark,
  ShoppingBag,
  HeartPulse,
  Zap,
  Shield,
  FileText,
  Globe,
  Mail,
  User,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

// ============================================
// ANIMATION COMPONENTS
// ============================================

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// DATA
// ============================================

const STATS = [
  { icon: <Zap className="w-6 h-6" />, value: '500', label: 'Créditos de Teste', color: '#f59e0b' },
  { icon: <Phone className="w-6 h-6" />, value: '4', label: 'Cartuchos Disponíveis', color: '#6366f1' },
  { icon: <CheckCircle className="w-6 h-6" />, value: '12', label: 'Chamadas Incluídas', color: '#10b981' },
  { icon: <Clock className="w-6 h-6" />, value: '--', label: 'Tempo Médio/Chamada', color: '#06b6d4' },
];

const CARTRIDGES = [
  {
    id: 'hotel-pro',
    name: 'Hotel Pro',
    category: 'HOSPITALITY',
    description: 'Assistência completa para hóspedes com integração PMS',
    icon: <Hotel className="w-7 h-7" />,
    color: '#f59e0b',
    tags: ['Room Service', 'Reservations', 'Concierge', 'PMS Integration'],
    price: 299,
  },
  {
    id: 'gov-assist',
    name: 'Gov Assist',
    category: 'GOVERNMENT',
    description: 'Atendimento ao cidadão para órgãos governamentais',
    icon: <Landmark className="w-7 h-7" />,
    color: '#06b6d4',
    tags: ['CPF Lookup', 'Tax Queries', 'Document Status', 'Citizen DB'],
    price: 499,
  },
  {
    id: 'retail-pulse',
    name: 'Retail Pulse',
    category: 'RETAIL',
    description: 'Vendas consultivas com integração ERP e pagamentos',
    icon: <ShoppingBag className="w-7 h-7" />,
    color: '#ec4899',
    tags: ['Inventory Check', 'Payment Links', 'Promos', 'ERP Sync'],
    price: 120,
  },
  {
    id: 'health-care',
    name: 'Health Care Connect',
    category: 'HEALTHCARE',
    description: 'Triagem inteligente e gestão de resultados de exames',
    icon: <HeartPulse className="w-7 h-7" />,
    color: '#10b981',
    tags: ['Triage AI', 'Lab Results', 'Appointments', 'HIPAA Ready'],
    price: 300,
  },
];

const FEATURES_CONSOLE = [
  { icon: <CheckCircle className="w-6 h-6" />, title: 'Priorize o que Importa', desc: 'Fila inteligente organiza automaticamente por urgência' },
  { icon: <FileText className="w-6 h-6" />, title: 'Histórico Completo', desc: 'Acesse todo contexto de cada atendimento' },
  { icon: <MessageSquare className="w-6 h-6" />, title: 'Brain Logs em Tempo Real', desc: 'Acompanhe o raciocínio da IA e intervenha quando necessário' },
];

const FEATURES_MOBILE = [
  { icon: <FileText className="w-6 h-6" />, title: 'Composer Rápido', desc: 'Crie respostas em segundos com sugestões da IA' },
  { icon: <Camera className="w-6 h-6" />, title: 'Compartilhe Screenshots', desc: 'De screenshot para atendimento em poucos toques' },
  { icon: <Bell className="w-6 h-6" />, title: 'Notificações Inteligentes', desc: 'Seja alertado apenas sobre o que realmente importa' },
];

// ============================================
// MAIN COMPONENT
// ============================================

interface MobileAppPageProps {
  onEnterApp?: () => void;
}

export default function MobileAppPage({ onEnterApp }: MobileAppPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 text-2xl font-bold">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <span>OmniCall AI</span>
            </a>
            <ul className="hidden md:flex gap-8">
              <li><button onClick={() => scrollToSection('dashboard')} className="text-sm text-slate-400 hover:text-white transition-colors">Dashboard</button></li>
              <li><button onClick={() => scrollToSection('console')} className="text-sm text-slate-400 hover:text-white transition-colors">Console</button></li>
              <li><button onClick={() => scrollToSection('store')} className="text-sm text-slate-400 hover:text-white transition-colors">Store</button></li>
              <li><button onClick={() => scrollToSection('status')} className="text-sm text-slate-400 hover:text-white transition-colors">Status</button></li>
            </ul>
            <a href="#download" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              Download
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
          >
            Inteligência de Atendimento<br />no Seu Bolso
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            Gestão completa de chamadas e cartuchos especializados. Disponível para iOS e Android.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => alert('📱 Para instalar:\n\n• iPhone/Safari: Toque em "Compartilhar" → "Adicionar à Tela de Início"\n\n• Android/Chrome: Toque no menu (⋮) → "Instalar aplicativo"')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
            >
              <Smartphone className="w-5 h-5" />
              Instalar no Celular
            </button>
            <button
              onClick={onEnterApp}
              className="px-8 py-4 rounded-xl bg-[#1a1a24] border border-white/10 font-semibold hover:bg-[#252535] hover:border-indigo-500 transition-all"
            >
              Ver Demo
            </button>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Stats Section */}
      <section id="dashboard" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Controle Total da Sua Operação</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Acompanhe métricas essenciais do seu negócio em tempo real. Tudo sincronizado entre todos os seus dispositivos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <FadeInWhenVisible key={stat.label} delay={index * 0.1}>
                <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8 hover:bg-[#252535] hover:border-indigo-500 hover:-translate-y-1 transition-all cursor-pointer text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: `${stat.color}33`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-extrabold mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Console Features Section */}
      <section id="console" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-extrabold mb-6">Gerencie Cada Interação com Precisão</h3>
                <p className="text-lg text-slate-400 mb-8">
                  Visualize chamadas em andamento, aguardando resposta ou concluídas. Toque para agir, deslize para arquivar.
                </p>
                <ul className="space-y-4">
                  {FEATURES_CONSOLE.map((feature) => (
                    <li key={feature.title} className="flex gap-4 py-4 border-b border-white/10 last:border-0">
                      <span className="text-indigo-400 shrink-0">{feature.icon}</span>
                      <div>
                        <strong className="block font-semibold">{feature.title}</strong>
                        <span className="text-sm text-slate-400">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-6 h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <img
                  src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/9e0b2e01-1ad2-4204-99ee-fc4b091cdfc0"
                  alt="Console Screenshot"
                  className="max-w-full h-auto rounded-2xl relative z-10"
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Mobile Composer Section */}
      <section className="py-20 bg-indigo-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-[#1a1a24] border border-white/10 rounded-3xl p-6 h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
                <img
                  src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/ad3c1fab-998d-4764-9bb2-8bee579f63c3"
                  alt="Mobile Screenshot"
                  className="max-w-full h-auto rounded-2xl relative z-10"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-4xl font-extrabold mb-6">Atenda de Qualquer Lugar</h3>
                <p className="text-lg text-slate-400 mb-8">
                  Interface ergonômica projetada para produtividade móvel. Escreva respostas, acompanhe logs do sistema e tome decisões informadas em segundos.
                </p>
                <ul className="space-y-4">
                  {FEATURES_MOBILE.map((feature) => (
                    <li key={feature.title} className="flex gap-4 py-4 border-b border-white/10 last:border-0">
                      <span className="text-purple-400 shrink-0">{feature.icon}</span>
                      <div>
                        <strong className="block font-semibold">{feature.title}</strong>
                        <span className="text-sm text-slate-400">{feature.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Cartridge Store Section */}
      <section id="store" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Especialize Sua IA para Cada Necessidade</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Instale módulos de inteligência especializados para diferentes setores. Cada cartucho adiciona conhecimento específico e integrações prontas para usar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARTRIDGES.map((cartridge, index) => (
              <FadeInWhenVisible key={cartridge.id} delay={index * 0.1}>
                <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8 hover:bg-[#252535] hover:border-indigo-500 hover:-translate-y-1 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${cartridge.color}33`, color: cartridge.color }}
                    >
                      {cartridge.icon}
                    </div>
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: cartridge.color }}
                  >
                    {cartridge.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{cartridge.name}</h3>
                  <p className="text-sm text-slate-400 mb-5">{cartridge.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cartridge.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-xs rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-extrabold">{cartridge.price}</div>
                      <div className="text-sm text-slate-400">créditos</div>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                      Comprar
                    </button>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* AI Status Section */}
      <section id="status" className="py-20 bg-purple-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Performance e Confiabilidade Garantidas</h2>
            <p className="text-lg text-slate-400">Monitore o status e a performance da sua IA em tempo real</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeInWhenVisible delay={0}>
              <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Modelo Principal</div>
                  <div className="text-2xl font-bold text-emerald-400">Operacional</div>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-2">Latência Média</div>
                <div className="text-2xl font-bold">124ms</div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-[#1a1a24] border border-white/10 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-2">Precisão</div>
                <div className="text-2xl font-bold">98.7%</div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-extrabold mb-6">Conectado 24/7. Ou Apenas 9h às 18h.</h3>
                <p className="text-lg text-slate-400 mb-8">
                  Mantenha-se informado sem ser sobrecarregado. Defina quando quer estar disponível.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4 py-4 border-b border-white/10">
                    <Bell className="w-6 h-6 text-cyan-400 shrink-0" />
                    <div>
                      <strong className="block font-semibold">Notificações em Tempo Real</strong>
                      <span className="text-sm text-slate-400">Seja alertado sobre chamadas prioritárias instantaneamente</span>
                    </div>
                  </li>
                  <li className="flex gap-4 py-4 border-b border-white/10">
                    <Clock className="w-6 h-6 text-cyan-400 shrink-0" />
                    <div>
                      <strong className="block font-semibold">Agenda de Notificações</strong>
                      <span className="text-sm text-slate-400">Configure horários específicos para receber alertas</span>
                    </div>
                  </li>
                  <li className="flex gap-4 py-4">
                    <Shield className="w-6 h-6 text-cyan-400 shrink-0" />
                    <div>
                      <strong className="block font-semibold">Filtros Inteligentes</strong>
                      <span className="text-sm text-slate-400">Receba apenas notificações relevantes para você</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-6 h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
                <img
                  src="https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/bd9f25b0-6e7d-4fd7-899e-8f83f41b4f3c"
                  alt="Notifications Screenshot"
                  className="max-w-full h-auto rounded-2xl relative z-10"
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-indigo-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInWhenVisible>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl font-extrabold mb-6">
                  Comece Grátis.
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Sem Cartão de Crédito.
                  </span>
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  Cadastre-se e receba 500 créditos grátis para testar todos os recursos. 
                  Cancele quando quiser.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>500 créditos grátis para começar</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Acesso a todos os 4 cartuchos</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Suporte prioritário por 14 dias</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Integração WhatsApp Business inclusa</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-8 md:p-10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-2xl font-bold mb-3">Cadastro Realizado!</h4>
                    <p className="text-slate-400">
                      Enviamos um email para <strong className="text-white">{formData.email}</strong>
                      <br />com os próximos passos.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">Criar Conta Grátis</h4>
                      <p className="text-sm text-slate-400">Leva menos de 1 minuto</p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="email"
                          placeholder="Seu melhor email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="WhatsApp (opcional)"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-4 bg-[#0a0a0f] border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Criando sua conta...
                        </>
                      ) : (
                        <>
                          Começar Agora
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-slate-500">
                      Ao criar uma conta, você concorda com nossos{' '}
                      <a href="#" className="text-indigo-400 hover:underline">Termos de Uso</a>{' '}
                      e{' '}
                      <a href="#" className="text-indigo-400 hover:underline">Política de Privacidade</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer CTA */}
      <section id="download" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeInWhenVisible>
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-[2rem] p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
                Pronto Para Revolucionar<br />Seu Atendimento?
              </h2>
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <button
                  onClick={() => alert('📱 Para instalar:\n\n• iPhone/Safari: Toque em "Compartilhar" → "Adicionar à Tela de Início"\n\n• Android/Chrome: Toque no menu (⋮) → "Instalar aplicativo"')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all"
                >
                  <Smartphone className="w-5 h-5" />
                  Instalar no Celular
                </button>
                <button
                  onClick={onEnterApp}
                  className="px-8 py-4 rounded-xl bg-[#1a1a24] border border-white/10 font-semibold hover:bg-[#252535] hover:border-indigo-500 transition-all"
                >
                  Acessar Plataforma
                </button>
              </div>
              <p className="text-slate-400">Disponível como PWA para iOS e Android</p>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ul className="flex flex-wrap gap-8 justify-center mb-6">
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Documentação</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Suporte</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Contato</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacidade</a></li>
          </ul>
          <p className="text-sm text-slate-400">© 2026 OmniCall AI. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
