import nodemailer from 'nodemailer';
import { supabaseAdmin } from './supabase-server';

export async function sendEmail(userId: string, options: { subject: string; text?: string; html?: string }) {
  try {
    // 1. Buscar configurações SMTP do usuário no Supabase
    const { data: settings, error } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !settings || !settings.smtp_host) {
      console.warn(`[Email] No SMTP settings found for user ${userId}. Falling back to default or skipping.`);
      // Opcional: usar um SMTP padrão do sistema
      return false;
    }

    // 2. Criar transporter com as configurações do usuário
    const transporter = nodemailer.createTransport({
      host: settings.smtp_host,
      port: parseInt(settings.smtp_port || '587'),
      secure: settings.smtp_port === '465',
      auth: {
        user: settings.smtp_user,
        pass: settings.smtp_password, // Lembrar de lidar com criptografia em prod
      },
    });

    // 3. Enviar email
    const info = await transporter.sendMail({
      from: settings.email_from || settings.smtp_user,
      to: settings.email,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log(`[Email] Message sent: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error('[Email] Error sending email:', err);
    return false;
  }
}

export async function sendDailyReport(userId: string, calls: any[]) {
  const dateStr = new Date().toLocaleDateString('pt-BR');
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
      <h1 style="color: #6366f1;">Relatório Diário OmniCall AI</h1>
      <p>Olá, aqui está o resumo dos seus atendimentos em ${dateStr}:</p>
      
      <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin: 0; font-size: 24px;">${calls.length}</h2>
        <p style="margin: 0; color: #64748b;">Chamadas realizadas hoje</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
            <th style="padding: 10px;">Cartucho</th>
            <th style="padding: 10px;">Duração</th>
            <th style="padding: 10px;">Créditos</th>
          </tr>
        </thead>
        <tbody>
          ${calls.map(call => `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px;">${call.cartridge_id}</td>
              <td style="padding: 10px;">${Math.floor(call.duration_seconds / 60)}min ${call.duration_seconds % 60}s</td>
              <td style="padding: 10px;">${call.credits_used}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
        Este é um email automático enviado por OmniCall AI.
      </p>
    </div>
  `;

  return sendEmail(userId, {
    subject: `Resumo de Atendimentos - ${dateStr}`,
    html,
  });
}
