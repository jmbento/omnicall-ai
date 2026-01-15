import 'server-only';
import { GoogleGenAI } from '@google/genai';

// Server-only Gemini client
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const gemini = {
  /**
   * Generate text completion
   */
  async generateText(prompt: string, systemInstruction?: string) {
    const model = genAI.models.get('gemini-2.0-flash');
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: systemInstruction,
    });
    
    return result.response?.text() || '';
  },

  /**
   * Generate embeddings for RAG
   */
  async generateEmbedding(text: string): Promise<number[]> {
    const model = genAI.models.get('text-embedding-004');
    
    const result = await model.embedContent({
      content: { parts: [{ text }] },
    });
    
    return result.embedding?.values || [];
  },

  /**
   * Chat with context (for cartridge conversations)
   */
  async chat(
    messages: { role: 'user' | 'model'; content: string }[],
    systemInstruction: string
  ) {
    const model = genAI.models.get('gemini-2.0-flash');
    
    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));
    
    const result = await model.generateContent({
      contents,
      systemInstruction,
    });
    
    return result.response?.text() || '';
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
