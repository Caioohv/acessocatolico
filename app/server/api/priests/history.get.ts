import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, getQuery } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== 'GET') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    const query = getQuery(event)
    const registrationId = query.registrationId as string

    if (!registrationId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'registrationId é obrigatório'
      })
    }

    // Get approval history
    const history = await prisma.priestApprovalHistory.findMany({
      where: { registrationId },
      orderBy: { createdAt: 'desc' }
    })

    // Get current registration data
    const registration = await prisma.priestRegistration.findUnique({
      where: { id: registrationId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        statusUpdatedAt: true,
        createdAt: true
      }
    })

    if (!registration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cadastro não encontrado'
      })
    }

    return {
      success: true,
      data: {
        registration,
        history: history.map(item => ({
          id: item.id,
          fromStatus: item.fromStatus,
          toStatus: item.toStatus,
          comments: item.comments,
          adminEmail: item.adminEmail,
          createdAt: item.createdAt
        }))
      }
    }

  } catch (error) {
    console.error('Error fetching approval history:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
