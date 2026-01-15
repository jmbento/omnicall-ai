import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

// GET: Get user settings
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  
  try {
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return NextResponse.json(data || { user_id: userId });
  } catch (error) {
    console.error('[Settings] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST: Save user settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...settings } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .upsert({
        user_id: userId,
        email: settings.email,
        email_notifications: settings.emailNotifications,
        email_daily_report: settings.emailDailyReport,
        smtp_host: settings.smtpHost,
        smtp_port: settings.smtpPort,
        smtp_user: settings.smtpUser,
        smtp_password: settings.smtpPassword, // Should be encrypted in production
        email_from: settings.emailFrom,
        phone_number: settings.phoneNumber,
        whatsapp_enabled: settings.whatsappEnabled,
        whatsapp_business_id: settings.whatsappBusinessId,
        whatsapp_access_token: settings.whatsappAccessToken, // Should be encrypted
        whatsapp_verify_token: settings.whatsappVerifyToken,
        notify_on_new_call: settings.notifyOnNewCall,
        notify_on_low_credits: settings.notifyOnLowCredits,
        low_credits_threshold: settings.lowCreditsThreshold,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Settings] Error saving:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
