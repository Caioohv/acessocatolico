import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'
import { generatePassword, hashPassword } from '../../utils/crypto'
import { sendEmail } from '../../utils/email'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'PUT') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    const { registrationId, status, comments, adminEmail } = body

    if (!registrationId || !status) {
      throw createError({
        statusCode: 400,
        statusMessage: 'registrationId e status são obrigatórios'
      })
    }

    // Valid statuses
    const validStatuses = ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'REQUIRES_DOCUMENTATION']
    if (!validStatuses.includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Status inválido'
      })
    }

    // Get current registration
    const currentRegistration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId }
    })

    if (!currentRegistration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cadastro não encontrado'
      })
    }

    // Update registration status
    const updatedRegistration = await prisma.priestRegistration.update({
      where: { id: registrationId },
      data: {
        status,
        statusUpdatedAt: new Date(),
        statusUpdatedBy: adminEmail || null,
        reviewComments: comments || null
      },
      include: {
        ordinationDiocese: true
      }
    })

    // Create approval history entry
    await prisma.priestApprovalHistory.create({
      data: {
        registrationId,
        fromStatus: currentRegistration.status,
        toStatus: status as any,
        comments: comments || null,
        adminEmail: adminEmail || null
      }
    })

    // Handle approved status - create user account
    if (status === 'APPROVED') {
      try {
        // Generate temporary password
        const tempPassword = generatePassword()
        const hashedPassword = await hashPassword(tempPassword)
        
        // Create user account with profile
        const user = await prisma.user.create({
          data: {
            email: updatedRegistration.email,
            password: hashedPassword,
            role: 'PRIEST',
            isActive: true,
            emailVerified: true, // Already verified during registration
            profile: {
              create: {
                firstName: updatedRegistration.firstName,
                lastName: updatedRegistration.lastName,
                phone: updatedRegistration.phone,
                bio: updatedRegistration.bio
              }
            }
          },
          include: {
            profile: true
          }
        })

        // Link registration to user
        await prisma.priestRegistration.update({
          where: { id: registrationId },
          data: { userId: user.id }
        })

        // Send approval email with login credentials
        const loginLink = `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/login`
        
        await sendEmail({
          to: updatedRegistration.email,
          subject: 'Cadastro Aprovado - Bem-vindo ao AcessoCatólico!',
          template: 'priest-registration-approved',
          data: {
            name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
            email: updatedRegistration.email,
            tempPassword,
            loginLink
          }
        })

        console.log('✅ [APPROVED] User account created for registration:', registrationId)
        console.log('📧 [EMAIL SENT] Approval email sent to:', updatedRegistration.email)

      } catch (approvalError) {
        console.error('Error handling approval:', approvalError)
        // Rollback status if user creation fails
        await prisma.priestRegistration.update({
          where: { id: registrationId },
          data: {
            status: currentRegistration.status,
            statusUpdatedAt: currentRegistration.statusUpdatedAt,
            reviewComments: 'Erro interno ao criar conta de usuário. Tente novamente.'
          }
        })
        
        throw createError({
          statusCode: 500,
          statusMessage: 'Erro ao criar conta de usuário'
        })
      }
    }

    // Handle rejected status
    if (status === 'REJECTED') {
      try {
        const editLink = `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cadastro/padre/editar?id=${registrationId}`
        
        await sendEmail({
          to: updatedRegistration.email,
          subject: 'Cadastro Necessita Revisão - AcessoCatólico',
          template: 'priest-registration-rejected',
          data: {
            name: `${updatedRegistration.firstName} ${updatedRegistration.lastName}`,
            comments: comments || 'Documentação necessita revisão.',
            editLink
          }
        })

        console.log('❌ [REJECTED] Registration rejected:', registrationId)
        console.log('📧 [EMAIL SENT] Rejection email sent to:', updatedRegistration.email)

      } catch (emailError) {
        console.error('Error sending rejection email:', emailError)
        // Don't fail the whole request if email fails
      }
    }

    return {
      success: true,
      message: `Status atualizado para ${status}`,
      registration: {
        id: updatedRegistration.id,
        status: updatedRegistration.status,
        statusUpdatedAt: updatedRegistration.statusUpdatedAt,
        reviewComments: updatedRegistration.reviewComments
      }
    }

  } catch (error) {
    console.error('Error updating priest registration status:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
