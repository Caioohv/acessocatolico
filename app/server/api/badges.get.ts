import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { page = 1, limit = 20, type, isActive = true } = query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    // Construir filtros
    const where: any = {}
    
    if (type) {
      where.type = type
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    const [badges, total] = await Promise.all([
      prisma.badge.findMany({
        where,
        skip,
        take,
        include: {
          participants: {
            include: {
              participant: {
                include: {
                  user: {
                    include: {
                      profile: true
                    }
                  }
                }
              }
            }
          },
          _count: {
            select: {
              participants: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      }),
      prisma.badge.count({ where })
    ])

    return {
      data: badges,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    }
  } catch (error) {
    console.error('Erro ao buscar badges:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
