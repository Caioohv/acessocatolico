import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, readBody } from 'h3'

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

    // Handle approved status - would create user account
    if (status === 'APPROVED') {
      console.log('📧 [MOCK EMAIL] Approval email would be sent to:', updatedRegistration.email)
      console.log('✅ [APPROVED] Registration approved:', registrationId)
      
      // In a real implementation, this would:
      // 1. Create a User account
      // 2. Generate temporary password
      // 3. Send approval email with login credentials
      // 4. Link PriestRegistration to User
    }

    // Handle rejected status
    if (status === 'REJECTED') {
      console.log('📧 [MOCK EMAIL] Rejection email would be sent to:', updatedRegistration.email)
      console.log('❌ [REJECTED] Registration rejected:', registrationId)
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
