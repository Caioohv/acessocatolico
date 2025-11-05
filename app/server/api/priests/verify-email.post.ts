import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'
import { sendEmail } from '../../utils/email'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    const body = await readBody(event)
    const { token } = body

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token de verificação é obrigatório'
      })
    }

    // Find registration by token
    const registration = await prisma.priestRegistration.findUnique({
      where: { emailVerificationToken: token },
      include: {
        ordinationDiocese: true
      }
    })

    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Token de verificação inválido ou expirado'
      })
    }

    if (registration.emailVerified) {
      return {
        success: true,
        message: 'Email já foi verificado anteriormente',
        status: registration.status
      }
    }

    // Check if token is not too old (24 hours)
    const tokenAge = Date.now() - (registration.emailVerificationSentAt?.getTime() || 0)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    if (tokenAge > maxAge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Token de verificação expirado. Solicite um novo.'
      })
    }

    // Update registration to verified and under review status
    const updatedRegistration = await prisma.priestRegistration.update({
      where: { id: registration.id },
      data: {
        emailVerified: true,
        status: 'UNDER_REVIEW',
        statusUpdatedAt: new Date(),
        emailVerificationToken: null // Clear token after use
      },
      include: {
        ordinationDiocese: true
      }
    })

    // Create approval history entry
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId: registration.id,
        fromStatus: 'PENDING',
        toStatus: 'UNDER_REVIEW',
        comments: 'Email verificado com sucesso'
      }
    })

    // Send notification to admin (mock for now)
    console.log('📧 [ADMIN NOTIFICATION] New priest registration verified:', {
      name: `${registration.firstName} ${registration.lastName}`,
      email: registration.email,
      diocese: registration.ordinationDiocese.name
    })

    // Send confirmation email to priest
    try {
      await sendEmail({
        to: registration.email,
        subject: 'Email Verificado - Cadastro em Análise',
        template: 'priest-registration-under-review',
        data: {
          name: `${registration.firstName} ${registration.lastName}`,
          email: registration.email
        }
      })
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the whole request if email fails
    }

    return {
      success: true,
      message: 'Email verificado com sucesso! Seu cadastro está agora em análise.',
      status: updatedRegistration.status,
      registration: {
        id: updatedRegistration.id,
        name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
        email: updatedRegistration.email,
        status: updatedRegistration.status,
        statusUpdatedAt: updatedRegistration.statusUpdatedAt
      }
    }

  } catch (error) {
    console.error('Error verifying email:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
