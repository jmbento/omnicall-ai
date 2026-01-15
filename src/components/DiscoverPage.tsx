import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark,
  Hotel,
  ShoppingBag,
  HeartPulse,
  Globe,
  CalendarCheck,
  Receipt,
  FileSearch,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  ArrowRight,
  Smartphone,
} from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  cta: string;
  targetCartridge: string;
}

interface PowerGridItem {
  icon: React.ReactNode;
  label: string;
  gradient: string;
}

// ============================================
// DATA
// ============================================

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'gov',
    title: 'Transforme sua Cidade.',
    subtitle: 'Atendimento ao cidadão 24/7 com integração federal.',
    icon: <Landmark className="w-16 h-16" />,
    gradient: 'linear-gradient(135deg, oklch(0.5 0.2 250), oklch(0.4 0.25 220))',
    cta: 'Ver Gov Assist',
    targetCartridge: 'gov-assist',
  },
  {
    id: 'hotel',
    title: 'O Concierge 5 Estrelas.',
    subtitle: 'Room service, reservas e check-in por voz.',
    icon: <Hotel className="w-16 h-16" />,
    gradient: 'linear-gradient(135deg, oklch(0.7 0.18 85), oklch(0.6 0.2 70))',
    cta: 'Ver Hotel Pro',
    targetCartridge: 'hotel-pro',
  },
  {
    id: 'retail',
    title: 'Vendas enquanto você dorme.',
    subtitle: 'Catálogo inteligente e checkout integrado.',
    icon: <ShoppingBag className="w-16 h-16" />,
    gradient: 'linear-gradient(135deg, oklch(0.6 0.25 15), oklch(0.65 0.22 350))',
    cta: 'Ver Retail Pulse',
    targetCartridge: 'retail-pulse',
  },
  {
    id: 'health',
    title: 'Saúde Conectada.',
    subtitle: 'Triagem inteligente e resultados instantâneos.',
    icon: <HeartPulse className="w-16 h-16" />,
    gradient: 'linear-gradient(135deg, oklch(0.65 0.2 160), oklch(0.6 0.18 180))',
    cta: 'Ver Health Care',
    targetCartridge: 'health-care',
  },
];

const POWER_GRID: PowerGridItem[] = [
  {
    icon: <Globe className="w-7 h-7" />,
    label: 'Falar 8 Idiomas',
    gradient: 'linear-gradient(135deg, oklch(0.6 0.2 250), oklch(0.5 0.22 280))',
  },
  {
    icon: <CalendarCheck className="w-7 h-7" />,
    label: 'Agendar Reuniões',
    gradient: 'linear-gradient(135deg, oklch(0.65 0.25 15), oklch(0.6 0.22 30))',
  },
  {
    icon: <Receipt className="w-7 h-7" />,
    label: 'Cobrar Faturas',
    gradient: 'linear-gradient(135deg, oklch(0.7 0.2 160), oklch(0.65 0.18 145))',
  },
  {
    icon: <FileSearch className="w-7 h-7" />,
    label: 'Ler Documentos',
    gradient: 'linear-gradient(135deg, oklch(0.7 0.18 85), oklch(0.65 0.2 70))',
  },
];

const TICKER_ITEMS = [
  '🚀 +14.000 atendimentos realizados hoje',
  '🌍 8 idiomas ativos em tempo real',
  '⚡ 0.4s tempo médio de resposta',
  '🏆 98.7% de precisão nas respostas',
  '📱 WhatsApp, Telefone e Kiosks',
];

// ============================================
// COMPONENTS
// ============================================

interface DiscoverPageProps {
  onNavigateToCartridge: (cartridgeId: string) => void;
  onNavigateToStore: () => void;
  onNavigateToMobileApp?: () => void;
}

export default function DiscoverPage({ onNavigateToCartridge, onNavigateToStore, onNavigateToMobileApp }: DiscoverPageProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [greeting, setGreeting] = useState('Bom dia');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Bom dia');
    else if (hour >= 12 && hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % FEATURE_CARDS.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + FEATURE_CARDS.length) % FEATURE_CARDS.length);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextCard, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full p-4 md:p-8 space-y-8 overflow-auto custom-scrollbar">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {greeting},{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Visionário.
          </span>
        </h1>
        <p className="text-text-secondary text-lg">O que vamos automatizar hoje?</p>
      </motion.div>

      {/* Hero Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="relative h-[280px] md:h-[320px] rounded-3xl p-8 flex flex-col justify-between overflow-hidden"
              style={{ background: FEATURE_CARDS[currentCard].gradient }}
            >
              {/* Background Icon */}
              <div className="absolute right-4 bottom-4 opacity-20 text-white transform scale-150">
                {FEATURE_CARDS[currentCard].icon}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 text-white">
                  {FEATURE_CARDS[currentCard].icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {FEATURE_CARDS[currentCard].title}
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  {FEATURE_CARDS[currentCard].subtitle}
                </p>
              </div>

              <button
                onClick={() => onNavigateToCartridge(FEATURE_CARDS[currentCard].targetCartridge)}
                className="relative z-10 w-fit px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                {FEATURE_CARDS[currentCard].cta}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {FEATURE_CARDS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentCard ? 'w-8 bg-brand-primary' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevCard}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextCard}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Power Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Superpoderes
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POWER_GRID.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-4 rounded-2xl overflow-hidden cursor-pointer group"
              style={{ background: item.gradient }}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center text-center gap-2 text-white">
                {item.icon}
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Quick Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <button
          onClick={onNavigateToStore}
          className="w-full p-6 rounded-2xl glass-card hover:bg-white/5 transition-all group flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-bold text-white">Explorar Cartuchos</h4>
              <p className="text-sm text-text-secondary">4 inteligências disponíveis</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-text-muted group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </motion.section>

      {/* Mobile App CTA */}
      {onNavigateToMobileApp && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={onNavigateToMobileApp}
            className="w-full p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-bold text-white">Baixar App Mobile</h4>
                <p className="text-sm text-white/70">Disponível para iOS e Android</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </motion.section>
      )}

      {/* Social Proof Ticker */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="overflow-hidden py-4"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span
              key={index}
              className="mx-8 text-sm text-text-secondary font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
