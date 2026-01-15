import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase-server';
import Stripe from 'stripe';

// Lazy Stripe initialization
let stripeInstance: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-12-15.clover',
    });
  }
  return stripeInstance;
}

// GET: Get user credits
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  
  try {
    const balance = await db.getCredits(userId);
    
    return NextResponse.json({
      userId,
      balance,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Credits] Error fetching credits:', error);
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
  }
}

// POST: Add credits or create checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, amount, priceId } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    
    // Admin add credits directly
    if (action === 'add' && amount) {
      await db.addCredits(userId, amount);
      const newBalance = await db.getCredits(userId);
      
      return NextResponse.json({
        success: true,
        creditsAdded: amount,
        newBalance,
      });
    }
    
    // Create Stripe checkout session
    if (action === 'checkout' && priceId) {
      const creditPackages: Record<string, { credits: number; name: string }> = {
        'price_500': { credits: 500, name: 'Pacote Starter' },
        'price_2000': { credits: 2000, name: 'Pacote Pro' },
        'price_5000': { credits: 5000, name: 'Pacote Business' },
      };
      
      const pkg = creditPackages[priceId];
      if (!pkg) {
        return NextResponse.json({ error: 'Invalid price ID' }, { status: 400 });
      }
      
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card', 'boleto', 'pix'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
        metadata: {
          userId,
          credits: pkg.credits.toString(),
        },
      });
      
      return NextResponse.json({
        checkoutUrl: session.url,
        sessionId: session.id,
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('[Credits] Error:', error);
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}

// PATCH: Deduct credits
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, reason } = body;
    
    if (!userId || !amount) {
      return NextResponse.json(
        { error: 'userId and amount are required' },
        { status: 400 }
      );
    }
    
    const success = await db.deductCredits(userId, amount);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }
    
    const newBalance = await db.getCredits(userId);
    
    return NextResponse.json({
      success: true,
      deducted: amount,
      reason,
      newBalance,
    });
  } catch (error) {
    console.error('[Credits] Error deducting credits:', error);
    return NextResponse.json({ error: 'Deduction failed' }, { status: 500 });
  }
}
