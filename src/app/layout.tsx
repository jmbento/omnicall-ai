import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OmniCall AI | Inteligência Neural de Atendimento',
  description:
    'Plataforma de atendimento inteligente com IA generativa. Cartuchos especializados para cada setor.',
  keywords: ['atendimento', 'ia', 'whatsapp', 'chatbot', 'omnichannel'],
  openGraph: {
    title: 'OmniCall AI',
    description: 'Inteligência de Atendimento Neural',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-[#0a0a0f] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
