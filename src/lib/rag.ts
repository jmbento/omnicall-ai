import 'server-only';
import { gemini } from './gemini';
import { db, Document } from './supabase-server';

/**
 * RAG (Retrieval-Augmented Generation) Logic
 * Server-side only for security
 */
export const rag = {
  /**
   * Process and store a document with embeddings
   */
  async ingestDocument(
    userId: string,
    cartridgeId: string,
    filename: string,
    content: string
  ): Promise<void> {
    // Split content into chunks (simple split by paragraphs)
    const chunks = content.split(/\n\n+/).filter((c) => c.trim().length > 50);
    
    for (const chunk of chunks) {
      const embedding = await gemini.generateEmbedding(chunk);
      
      await db.saveDocument({
        user_id: userId,
        cartridge_id: cartridgeId,
        filename,
        content: chunk,
        embedding,
      });
    }
  },

  /**
   * Retrieve relevant context for a query
   */
  async getContext(cartridgeId: string, query: string, limit = 5): Promise<string> {
    const queryEmbedding = await gemini.generateEmbedding(query);
    const documents = await db.searchDocuments(cartridgeId, queryEmbedding, limit);
    
    if (documents.length === 0) {
      return '';
    }
    
    const context = documents.map((d) => d.content).join('\n\n---\n\n');
    return `
      [CONTEXTO RELEVANTE DOS DOCUMENTOS]
      ${context}
      [FIM DO CONTEXTO]
    `;
  },

  /**
   * Generate response with RAG context
   */
  async generateWithContext(
    cartridgeId: string,
    userMessage: string,
    systemInstruction: string
  ): Promise<string> {
    const context = await this.getContext(cartridgeId, userMessage);
    
    const enhancedInstruction = `
      ${systemInstruction}
      
      ${context}
      
      Use o contexto acima para responder de forma precisa. 
      Se a informação não estiver no contexto, responda com base no seu conhecimento geral,
      mas indique quando não tiver certeza.
    `;
    
    return gemini.generateText(userMessage, enhancedInstruction);
  },
};

export type RAGClient = typeof rag;
