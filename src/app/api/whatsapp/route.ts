import { NextRequest, NextResponse } from 'next/server';
import { gemini } from '@/lib/gemini';
import { db } from '@/lib/supabase-server';
import { rag } from '@/lib/rag';

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'omnicall-verify';

// Webhook verification (GET)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    console.log('[WhatsApp] Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// Receive messages (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Meta/WhatsApp Cloud API format
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 'no_messages' });
    }

    for (const message of messages) {
      const phoneNumber = message.from;
      const messageText = message.text?.body || '';
      const messageType = message.type;
      
      console.log(`[WhatsApp] Message from ${phoneNumber}: ${messageText}`);
      
      // Get or create session
      // In production, lookup user by phone number
      const userId = `whatsapp_${phoneNumber}`;
      const cartridgeId = 'default'; // Could be mapped based on phone number or first message
      
      // Check credits
      const credits = await db.getCredits(userId);
      if (credits <= 0) {
        await sendWhatsAppMessage(phoneNumber, 
          '⚠️ Você não possui créditos suficientes. Acesse nossa plataforma para recarregar.'
        );
        continue;
      }
      
      // Create call record
      const session = await db.createSession(userId, cartridgeId);
      const call = await db.createCall({
        user_id: userId,
        cartridge_id: cartridgeId,
        session_id: session?.id,
        phone_number: phoneNumber,
        channel: 'whatsapp',
        status: 'active',
        credits_used: 1,
      });
      
      // Save user message
      if (session) {
        await db.saveMessage(session.id, 'user', messageText);
      }
      
      // Generate AI response with RAG context
      const systemInstruction = `
        Você é um assistente virtual da OmniCall AI.
        Responda de forma profissional, empática e objetiva.
        Se não souber algo, diga que vai verificar e retornar.
      `;
      
      const aiResponse = await rag.generateWithContext(
        cartridgeId,
        messageText,
        systemInstruction
      );
      
      // Save AI response
      if (session) {
        await db.saveMessage(session.id, 'model', aiResponse);
      }
      
      // Send response via WhatsApp
      await sendWhatsAppMessage(phoneNumber, aiResponse);
      
      // Deduct credits
      await db.deductCredits(userId, 1);
      
      console.log(`[WhatsApp] Response sent to ${phoneNumber}`);
    }
    
    return NextResponse.json({ status: 'processed' });
  } catch (error) {
    console.error('[WhatsApp] Error processing message:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

// Helper to send WhatsApp message
async function sendWhatsAppMessage(to: string, text: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  
  if (!phoneNumberId || !accessToken) {
    console.error('[WhatsApp] Missing configuration');
    return;
  }
  
  try {
    await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: text },
        }),
      }
    );
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
  }
}
