
import { FunctionDeclaration, Type } from '@google/genai';

export const toolRegistry: Record<string, Function> = {
  checkRoomAvailability: async (args: { date: string; roomType: string }) => {
    console.log('[Tool] Checking availability for:', args);
    // Mock simulation
    await new Promise(resolve => setTimeout(resolve, 800));
    const isAvailable = Math.random() > 0.3;
    return {
      available: isAvailable,
      price: isAvailable ? Math.floor(Math.random() * 500) + 200 : null,
      message: isAvailable ? "Suítes disponíveis para esta data." : "Infelizmente estamos lotados para este período."
    };
  },
  lookupAccountBalance: async (args: { accountId: string }) => {
    console.log('[Tool] Looking up balance for:', args);
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      balance: (Math.random() * 15000).toFixed(2),
      currency: "BRL",
      status: "Verified",
      lastTransaction: "Transferência recebida via PIX (R$ 450,00)"
    };
  },
  recoverAbandonedCart: async (args: { email: string }) => {
    console.log('[Tool] Recovering cart for:', args);
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      found: true,
      items: ["Smartphone Ultra Z", "Capa Protetora"],
      discountCode: "OFF15",
      totalValue: 3499.00
    };
  }
};

export const functionDeclarations: FunctionDeclaration[] = [
  {
    name: 'checkRoomAvailability',
    parameters: {
      type: Type.OBJECT,
      description: 'Verifica a disponibilidade de quartos em um hotel para uma data específica.',
      properties: {
        date: { type: Type.STRING, description: 'Data da reserva (ISO format)' },
        roomType: { type: Type.STRING, description: 'Tipo do quarto (ex: suite, standard, deluxe)' }
      },
      required: ['date', 'roomType'],
    },
  },
  {
    name: 'lookupAccountBalance',
    parameters: {
      type: Type.OBJECT,
      description: 'Consulta o saldo atual de uma conta bancária autenticada.',
      properties: {
        accountId: { type: Type.STRING, description: 'Identificador único da conta bancária' }
      },
      required: ['accountId'],
    },
  },
  {
    name: 'recoverAbandonedCart',
    parameters: {
      type: Type.OBJECT,
      description: 'Recupera itens de um carrinho de compras abandonado pelo email do cliente.',
      properties: {
        email: { type: Type.STRING, description: 'Email do cliente' }
      },
      required: ['email'],
    },
  }
];
