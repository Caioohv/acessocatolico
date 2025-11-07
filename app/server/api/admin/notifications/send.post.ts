import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'
import * as nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { submissionIds, type, subject, message } = body
  
  try {
    // Verificar autenticação
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token de acesso requerido'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Verificar permissões (admin ou padre)
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    // Buscar dados das inscrições
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        form: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                slug: true,
                startDate: true,
                location: true
              }
            }
          }
        }
      }
    })

    // Configurar transporter de email
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const emailsSent = []
    const emailsError = []

    // Enviar emails
    for (const submission of submissions) {
      try {
        const userEmail = submission.user?.email || submission.email
        const userName = submission.user?.profile?.firstName 
          ? `${submission.user.profile.firstName} ${submission.user.profile.lastName || ''}`
          : submission.name || 'Participante'

        if (!userEmail) {
          emailsError.push({
            submissionId: submission.id,
            error: 'Email não encontrado'
          })
          continue
        }

        const emailContent = generateEmailContent(type, {
          userName,
          eventTitle: submission.form.event.title,
          eventDate: submission.form.event.startDate,
          eventLocation: submission.form.event.location,
          customMessage: message,
          submissionId: submission.id
        })

        await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: userEmail,
          subject: subject || emailContent.subject,
          html: emailContent.html,
          text: emailContent.text
        })

        emailsSent.push({
          submissionId: submission.id,
          email: userEmail,
          name: userName
        })

        // Log da notificação
        await prisma.eventNotificationLog.create({
          data: {
            eventId: submission.form.event.id,
            userId: submission.userId,
            type: type as any,
            email: userEmail,
            subject: subject || emailContent.subject,
            status: 'SENT',
            sentAt: new Date()
          }
        })

      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError)
        emailsError.push({
          submissionId: submission.id,
          error: emailError.message
        })
      }
    }

    return {
      success: true,
      sent: emailsSent.length,
      errors: emailsError.length,
      details: {
        sent: emailsSent,
        errors: emailsError
      }
    }

  } catch (error) {
    console.error('Erro ao enviar notificações:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})

function generateEmailContent(type: string, data: any) {
  const templates = {
    'REGISTRATION_APPROVED': {
      subject: `✅ Inscrição aprovada - ${data.eventTitle}`,
      html: `
        <h2>Inscrição Aprovada!</h2>
        <p>Olá ${data.userName},</p>
        <p>Sua inscrição para o evento <strong>${data.eventTitle}</strong> foi aprovada!</p>
        ${data.eventDate ? `<p><strong>Data:</strong> ${formatDate(data.eventDate)}</p>` : ''}
        ${data.eventLocation ? `<p><strong>Local:</strong> ${data.eventLocation}</p>` : ''}
        ${data.customMessage ? `<div><p><strong>Mensagem:</strong></p><p>${data.customMessage}</p></div>` : ''}
        <p>Aguardamos você no evento!</p>
      `,
      text: `Inscrição Aprovada! Olá ${data.userName}, sua inscrição para o evento ${data.eventTitle} foi aprovada!`
    },
    'REGISTRATION_REJECTED': {
      subject: `❌ Inscrição não aprovada - ${data.eventTitle}`,
      html: `
        <h2>Inscrição Não Aprovada</h2>
        <p>Olá ${data.userName},</p>
        <p>Infelizmente sua inscrição para o evento <strong>${data.eventTitle}</strong> não foi aprovada.</p>
        ${data.customMessage ? `<div><p><strong>Motivo:</strong></p><p>${data.customMessage}</p></div>` : ''}
        <p>Agradecemos seu interesse e esperamos vê-lo em futuros eventos.</p>
      `,
      text: `Inscrição não aprovada. Olá ${data.userName}, sua inscrição para o evento ${data.eventTitle} não foi aprovada.`
    },
    'CUSTOM': {
      subject: `📧 ${data.eventTitle}`,
      html: `
        <h2>${data.eventTitle}</h2>
        <p>Olá ${data.userName},</p>
        ${data.customMessage ? `<div><p>${data.customMessage}</p></div>` : ''}
      `,
      text: `${data.eventTitle} - ${data.customMessage || ''}`
    }
  }

  return templates[type] || templates['CUSTOM']
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}
