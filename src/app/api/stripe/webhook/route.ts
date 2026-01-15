import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/supabase-server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe] Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log(`[Stripe] Event received: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const credits = parseInt(session.metadata?.credits || '0');
      
      if (userId && credits > 0) {
        await db.addCredits(userId, credits);
        console.log(`[Stripe] Added ${credits} credits to user ${userId}`);
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      
      if (userId) {
        // Handle subscription - could add monthly credits
        const planId = subscription.items.data[0]?.price?.id;
        const creditsPerPlan: Record<string, number> = {
          'price_starter': 500,
          'price_pro': 2000,
          'price_enterprise': 10000,
        };
        
        const credits = creditsPerPlan[planId] || 500;
        await db.addCredits(userId, credits);
        console.log(`[Stripe] Subscription active for ${userId}, added ${credits} credits`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;
      console.log(`[Stripe] Subscription cancelled for ${userId}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Stripe] Payment failed for invoice ${invoice.id}`);
      // Could send email notification
      break;
    }

    default:
      console.log(`[Stripe] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Disable body parsing for Stripe webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};
