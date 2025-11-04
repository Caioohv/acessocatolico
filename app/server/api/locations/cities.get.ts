import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const query = getQuery(event)
    const { stateId } = query as { stateId?: string }

    if (!stateId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'stateId é obrigatório'
      })
    }

    const cities = await prisma.city.findMany({
      where: { stateId },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    })

    return { cities }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching cities:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
