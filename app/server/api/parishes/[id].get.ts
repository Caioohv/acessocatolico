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
    const parishId = getRouterParam(event, 'id')
    
    if (!parishId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID da paróquia é obrigatório'
      })
    }

    const parish = await prisma.parish.findUnique({
      where: { id: parishId },
      include: {
        state: true,
        city: true,
        neighborhood: true,
        diocese: true,
        priests: {
          include: {
            user: {
              include: {
                profile: true
              }
            }
          },
          orderBy: [
            { isMain: 'desc' },
            { createdAt: 'asc' }
          ]
        },
        contacts: true,
        masses: {
          where: { isActive: true },
          orderBy: [
            { dayOfWeek: 'asc' },
            { time: 'asc' }
          ]
        },
        events: {
          where: {
            endDate: {
              gte: new Date()
            }
          },
          orderBy: { startDate: 'asc' },
          take: 5
        },
        ministries: {
          include: {
            _count: {
              select: {
                members: true
              }
            }
          }
        },
        _count: {
          select: {
            events: true,
            ministries: true
          }
        }
      }
    })

    if (!parish) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Paróquia não encontrada'
      })
    }

    return parish
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching parish:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
