import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { page = 1, limit = 20, level, role, search } = query

    const skip = (Number(page) - 1) * Number(limit)
    const take = Number(limit)

    // Construir filtros
    const where: any = {}
    
    if (level) {
      where.level = level
    }
    
    if (role) {
      where.role = role
    }
    
    if (search) {
      where.OR = [
        {
          user: {
            profile: {
              OR: [
                { firstName: { contains: search as string } },
                { lastName: { contains: search as string } }
              ]
            }
          }
        },
        { bio: { contains: search as string } }
      ]
    }

    const [profiles, total] = await Promise.all([
      prisma.participantProfile.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            include: {
              profile: true
            }
          },
          badges: {
            include: {
              badge: true
            }
          },
          ministryMembers: {
            include: {
              ministry: true
            }
          },
          _count: {
            select: {
              history: true,
              assignments: true
            }
          }
        },
        orderBy: [
          { points: 'desc' },
          { totalHours: 'desc' },
          { joinedAt: 'asc' }
        ]
      }),
      prisma.participantProfile.count({ where })
    ])

    return {
      data: profiles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    }
  } catch (error) {
    console.error('Erro ao buscar perfis de participantes:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
