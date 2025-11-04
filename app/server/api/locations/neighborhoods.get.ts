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
    const { cityId } = query as { cityId?: string }

    if (!cityId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'cityId é obrigatório'
      })
    }

    const neighborhoods = await prisma.neighborhood.findMany({
      where: { cityId },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    })

    return { neighborhoods }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching neighborhoods:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
