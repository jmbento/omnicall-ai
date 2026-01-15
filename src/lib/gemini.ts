import 'server-only';
import { GoogleGenAI } from '@google/genai';

// Lazy initialization to avoid build-time errors
let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export const gemini = {
  /**
   * Generate text completion
   */
  async generateText(prompt: string, systemInstruction?: string) {
    const ai = getGenAI();
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    return result.text || '';
  },

  /**
   * Generate embeddings for RAG
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const ai = getGenAI();
    const result = await ai.models.embedContent({
      model: 'text-embedding-004',
      contents: text,
    });
    
    return result.embeddings?.[0]?.values || [];
  },

  /**
   * Chat with context (for cartridge conversations)
   */
  async chat(
    messages: { role: 'user' | 'model'; content: string }[],
    systemInstruction: string
  ) {
    const ai = getGenAI();
    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));
    
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        systemInstruction,
      },
    });
    
    return result.text || '';
  },

  /**
   * Analyze intent from user message
   */
  async analyzeIntent(message: string, cartridgeContext: string) {
    const prompt = `
      Analyze the following user message and extract:
      1. Intent (booking, inquiry, complaint, purchase, other)
      2. Sentiment (positive, neutral, negative)
      3. Urgency (low, medium, high)
      4. Key entities mentioned
      
      Context: ${cartridgeContext}
      Message: "${message}"
      
      Respond in JSON format.
    `;
    
    const response = await this.generateText(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return { intent: 'other', sentiment: 'neutral', urgency: 'low', entities: [] };
    }
  },
};

export type GeminiClient = typeof gemini;
