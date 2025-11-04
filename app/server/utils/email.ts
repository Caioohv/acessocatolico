interface EmailData {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

/**
 * Mock email service for development
 * In production, this would integrate with a real email service like SendGrid, AWS SES, etc.
 * @param emailData Email configuration
 */
export async function sendEmail(emailData: EmailData): Promise<void> {
  // Mock implementation - log to console
  console.log('📧 [EMAIL MOCK] Sending email:', {
    to: emailData.to,
    subject: emailData.subject,
    template: emailData.template,
    data: emailData.data
  })
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // In development, we just log the email content
  console.log('📧 [EMAIL SENT] Email would be sent with:', {
    recipient: emailData.to,
    subject: emailData.subject,
    template: emailData.template
  })
}

/**
 * Mock email templates
 * In production, these would be real HTML email templates
 */
export const emailTemplates = {
  'priest-registration-verification': {
    subject: 'Confirme seu email - Cadastro de Padre | AcessoCatólico',
    html: (data: any) => `
      <h1>Olá, ${data.name}!</h1>
      <p>Obrigado por se cadastrar na plataforma AcessoCatólico.</p>
      <p>Para confirmar seu email e ativar seu cadastro, clique no link abaixo:</p>
      <a href="${data.verificationLink}">Confirmar Email</a>
      <p>Se você não solicitou este cadastro, ignore este email.</p>
      <p>Atenciosamente,<br>Equipe AcessoCatólico</p>
    `
  },
  'priest-registration-approved': {
    subject: 'Cadastro Aprovado - AcessoCatólico',
    html: (data: any) => `
      <h1>Parabéns, ${data.name}!</h1>
      <p>Seu cadastro foi aprovado por nossa equipe.</p>
      <p>Agora você pode acessar a plataforma com suas credenciais:</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Senha temporária:</strong> ${data.tempPassword}</p>
      <p>Por favor, altere sua senha no primeiro acesso.</p>
      <a href="${data.loginLink}">Acessar Plataforma</a>
    `
  },
  'priest-registration-rejected': {
    subject: 'Cadastro Necessita Revisão - AcessoCatólico',
    html: (data: any) => `
      <h1>Olá, ${data.name}!</h1>
      <p>Seu cadastro necessita de alguns ajustes:</p>
      <p><strong>Comentários:</strong> ${data.comments}</p>
      <p>Por favor, acesse seu cadastro e faça as correções necessárias:</p>
      <a href="${data.editLink}">Editar Cadastro</a>
    `
  }
}

export default { sendEmail, emailTemplates }
