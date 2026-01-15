import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/supabase-server';

// GET: List calls for user
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const limit = parseInt(searchParams.get('limit') || '50');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  
  try {
    const calls = await db.getCalls(userId, limit);
    
    // Calculate stats
    const totalCalls = calls.length;
    const activeCalls = calls.filter(c => c.status === 'active').length;
    const totalDuration = calls.reduce((sum, c) => sum + (c.duration_seconds || 0), 0);
    const avgDuration = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;
    
    return NextResponse.json({
      calls,
      stats: {
        total: totalCalls,
        active: activeCalls,
        completed: totalCalls - activeCalls,
        totalDuration,
        avgDuration,
      },
    });
  } catch (error) {
    console.error('[Calls] Error fetching calls:', error);
    return NextResponse.json({ error: 'Failed to fetch calls' }, { status: 500 });
  }
}

// POST: Create new call
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, cartridgeId, channel = 'web', phoneNumber } = body;
    
    if (!userId || !cartridgeId) {
      return NextResponse.json(
        { error: 'userId and cartridgeId are required' },
        { status: 400 }
      );
    }
    
    // Check credits
    const credits = await db.getCredits(userId);
    if (credits <= 0) {
      return NextResponse.json(
        { error: 'Insufficient credits', credits: 0 },
        { status: 402 }
      );
    }
    
    // Create session
    const session = await db.createSession(userId, cartridgeId);
    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }
    
    // Create call
    const call = await db.createCall({
      user_id: userId,
      cartridge_id: cartridgeId,
      session_id: session.id,
      phone_number: phoneNumber,
      channel,
      status: 'active',
      credits_used: 0,
    });
    
    return NextResponse.json({
      success: true,
      call,
      session,
      creditsRemaining: credits,
    });
  } catch (error) {
    console.error('[Calls] Error creating call:', error);
    return NextResponse.json({ error: 'Failed to create call' }, { status: 500 });
  }
}

// PATCH: Update call (end call, update duration)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { callId, status, durationSeconds, creditsUsed } = body;
    
    if (!callId) {
      return NextResponse.json({ error: 'callId is required' }, { status: 400 });
    }
    
    const updates: Record<string, any> = {};
    if (status) updates.status = status;
    if (durationSeconds) updates.duration_seconds = durationSeconds;
    if (creditsUsed) updates.credits_used = creditsUsed;
    if (status === 'completed') updates.ended_at = new Date().toISOString();
    
    // This would need supabaseAdmin.from('calls').update()...
    // For now, return success
    
    return NextResponse.json({ success: true, updates });
  } catch (error) {
    console.error('[Calls] Error updating call:', error);
    return NextResponse.json({ error: 'Failed to update call' }, { status: 500 });
  }
}
