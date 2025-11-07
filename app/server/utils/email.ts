import nodemailer from 'nodemailer'

interface EmailData {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

// Create transporter
let transporter: nodemailer.Transporter | null = null

async function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransporter(emailConfig)
  }
  return transporter
}

/**
 * Real email service using Nodemailer
 * Falls back to mock for development if SMTP not configured
 * @param emailData Email configuration
 */
export async function sendEmail(emailData: EmailData): Promise<void> {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('📧 [EMAIL MOCK] SMTP not configured, using mock:', {
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.template,
        data: emailData.data
      })
      return
    }

    const transport = await getTransporter()
    const template = emailTemplates[emailData.template as keyof typeof emailTemplates]
    
    if (!template) {
      throw new Error(`Template not found: ${emailData.template}`)
    }

    const htmlContent = template.html(emailData.data)
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: emailData.to,
      subject: template.subject,
      html: htmlContent
    }

    await transport.sendMail(mailOptions)
    
    console.log('📧 [EMAIL SENT] Email sent successfully to:', emailData.to)
    
  } catch (error) {
    console.error('📧 [EMAIL ERROR] Failed to send email:', error)
    
    // In development, log as mock instead of failing
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 [EMAIL FALLBACK] Using mock due to error:', {
        to: emailData.to,
        subject: emailData.subject,
        template: emailData.template
      })
    } else {
      throw error
    }
  }
}

/**
 * Função auxiliar para enviar notificações específicas de eventos
 */
export async function sendNotificationEmail(options: {
  to: string
  type: string
  data: Record<string, any>
}): Promise<void> {
  await sendEmail({
    to: options.to,
    subject: '', // Will be set by template
    template: options.type,
    data: options.data
  })
}

/**
 * Professional HTML email templates
 */
export const emailTemplates = {
  'priest-registration-verification': {
    subject: 'Confirme seu email - Cadastro de Padre | AcessoCatólico',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmação de Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8B5CF6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #8B5CF6; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AcessoCatólico</h1>
            <p>Confirmação de Email</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Obrigado por se cadastrar como padre na plataforma AcessoCatólico.</p>
            <p>Para confirmar seu email e ativar seu cadastro, clique no botão abaixo:</p>
            <p style="text-align: center;">
              <a href="${data.verificationLink}" class="button">Confirmar Email</a>
            </p>
            <p><strong>Número de Ordenação:</strong> ${data.ordinationNumber}</p>
            <p><strong>Diocese:</strong> ${data.diocese}</p>
            <p>Se você não solicitou este cadastro, pode ignorar este email com segurança.</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
            <p>Este é um email automático, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'priest-registration-approved': {
    subject: 'Cadastro Aprovado - Bem-vindo ao AcessoCatólico!',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cadastro Aprovado</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .credentials { background: #e6f7ff; padding: 15px; border-left: 4px solid #10B981; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Parabéns!</h1>
            <p>Seu cadastro foi aprovado</p>
          </div>
          <div class="content">
            <h2>Olá, Padre ${data.name}!</h2>
            <p>É com grande alegria que informamos que seu cadastro foi <strong>aprovado</strong> por nossa equipe de moderação.</p>
            
            <div class="credentials">
              <h3>Suas credenciais de acesso:</h3>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Senha temporária:</strong> ${data.tempPassword}</p>
              <p><em>Por favor, altere sua senha no primeiro acesso por questões de segurança.</em></p>
            </div>
            
            <p style="text-align: center;">
              <a href="${data.loginLink}" class="button">Acessar Plataforma</a>
            </p>
            
            <h3>Próximos passos:</h3>
            <ul>
              <li>Complete seu perfil com informações adicionais</li>
              <li>Conecte-se à sua paróquia</li>
              <li>Explore as funcionalidades da plataforma</li>
            </ul>
            
            <p>Bem-vindo à comunidade AcessoCatólico!</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'priest-registration-rejected': {
    subject: 'Cadastro Necessita Revisão - AcessoCatólico',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Revisão Necessária</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F59E0B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #F59E0B; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .comments { background: #fff3cd; padding: 15px; border-left: 4px solid #F59E0B; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Revisão Necessária</h1>
            <p>Seu cadastro precisa de alguns ajustes</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Agradecemos seu interesse em se cadastrar na plataforma AcessoCatólico.</p>
            <p>Após análise, identificamos alguns pontos que precisam ser revisados em seu cadastro:</p>
            
            <div class="comments">
              <h3>Comentários da revisão:</h3>
              <p>${data.comments}</p>
            </div>
            
            <p>Por favor, acesse seu cadastro e faça as correções necessárias. Nossa equipe analisará novamente assim que você submeter as alterações.</p>
            
            <p style="text-align: center;">
              <a href="${data.editLink}" class="button">Editar Cadastro</a>
            </p>
            
            <p>Se você tiver dúvidas, entre em contato conosco através do email suporte@acessocatolico.com.br</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'priest-registration-under-review': {
    subject: 'Cadastro em Análise - AcessoCatólico',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cadastro em Análise</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6366F1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Cadastro Recebido</h1>
            <p>Análise em andamento</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Seu cadastro foi recebido com sucesso e está agora em análise por nossa equipe de moderação.</p>
            <p><strong>Tempo estimado:</strong> 2-3 dias úteis</p>
            <p>Você receberá um email assim que a análise for concluída.</p>
            <p>Agradecemos sua paciência!</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'waiting_list_promotion': {
    subject: 'Vaga Disponível! Você foi promovido da fila de espera',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Promoção da Fila de Espera</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10B981; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .highlight { background: #d1fae5; padding: 15px; border-left: 4px solid #10B981; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Boa Notícia!</h1>
            <p>Uma vaga ficou disponível!</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Temos uma excelente notícia! Uma vaga ficou disponível no evento e você foi automaticamente promovido da fila de espera.</p>
            
            <div class="highlight">
              <h3>📅 ${data.eventTitle}</h3>
              <p><strong>Data:</strong> ${new Date(data.eventDate).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><strong>Sua posição anterior:</strong> #${data.previousPosition} na fila</p>
            </div>
            
            <p>Sua inscrição foi automaticamente aprovada. Você receberá em breve mais informações sobre o evento.</p>
            
            <p>Agradecemos sua paciência e esperamos vê-lo no evento!</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'event_reminder_24h': {
    subject: 'Lembrete: Seu evento é amanhã!',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Lembrete de Evento</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F59E0B; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .event-details { background: #fef3c7; padding: 15px; border-left: 4px solid #F59E0B; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Lembrete</h1>
            <p>Seu evento é amanhã!</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Esperamos que esteja ansioso! Seu evento é amanhã.</p>
            
            <div class="event-details">
              <h3>📅 ${data.eventTitle}</h3>
              <p><strong>Data:</strong> ${new Date(data.eventDate).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              ${data.eventLocation ? `<p><strong>Local:</strong> ${data.eventLocation}</p>` : ''}
            </div>
            
            <p>Não esqueça de chegar um pouco mais cedo. Até lá!</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
  'event_reminder_7d': {
    subject: 'Lembrete: Seu evento é na próxima semana',
    html: (data: any) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Lembrete de Evento</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6366F1; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .event-details { background: #e0e7ff; padding: 15px; border-left: 4px solid #6366F1; margin: 15px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📆 Lembrete</h1>
            <p>Seu evento se aproxima!</p>
          </div>
          <div class="content">
            <h2>Olá, ${data.name}!</h2>
            <p>Queremos lembrar que seu evento está chegando!</p>
            
            <div class="event-details">
              <h3>📅 ${data.eventTitle}</h3>
              <p><strong>Data:</strong> ${new Date(data.eventDate).toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              ${data.eventLocation ? `<p><strong>Local:</strong> ${data.eventLocation}</p>` : ''}
              <p><strong>Faltam:</strong> ${data.daysUntilEvent} dias</p>
            </div>
            
            <p>Comece a se preparar! Enviaremos outro lembrete mais próximo à data.</p>
          </div>
          <div class="footer">
            <p>© 2024 AcessoCatólico - Conectando a Comunidade Católica</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}

export default { sendEmail, emailTemplates }
