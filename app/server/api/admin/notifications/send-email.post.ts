import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { to, subject, html, type } = body
    
    if (!to || !subject || !html) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Campos obrigatórios: to, subject, html'
      })
    }

    // Templates de email baseados no tipo
    let emailHtml = html
    
    if (type === 'submission_approved') {
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A5568;">Inscrição Aprovada!</h2>
          <p>Sua inscrição foi aprovada com sucesso.</p>
          ${html}
          <hr style="margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Esta é uma mensagem automática do AcessoCatólico.
          </p>
        </div>
      `
    } else if (type === 'submission_rejected') {
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E53E3E;">Inscrição Não Aprovada</h2>
          <p>Infelizmente sua inscrição não foi aprovada.</p>
          ${html}
          <hr style="margin: 20px 0;">
          <p style="color: #718096; font-size: 12px;">
            Esta é uma mensagem automática do AcessoCatólico.
          </p>
        </div>
      `
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"AcessoCatólico" <noreply@acessocatolico.com.br>',
      to,
      subject,
      html: emailHtml
    })

    return {
      success: true,
      message: 'Email enviado com sucesso'
    }

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao enviar email'
    })
  }
})
