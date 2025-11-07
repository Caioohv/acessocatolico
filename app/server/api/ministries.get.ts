import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { parishId, isActive = true, hasLeader, minLevel } = query

    // Construir filtros
    const where: any = {}
    
    if (parishId) {
      where.parishId = parishId
    }
    
    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }
    
    if (hasLeader !== undefined) {
      if (hasLeader === 'true') {
        where.leaderId = { not: null }
      } else {
        where.leaderId = null
      }
    }
    
    if (minLevel) {
      where.minLevel = minLevel
    }

    const ministries = await prisma.ministry.findMany({
      where,
      include: {
        parish: true,
        leader: {
          include: {
            profile: true
          }
        },
        members: {
          include: {
            user: {
              include: {
                profile: true
              }
            },
            participant: true
          }
        },
        services: {
          include: {
            assignments: {
              where: {
                scheduledFor: {
                  gte: new Date()
                }
              },
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
            }
          }
        },
        _count: {
          select: {
            members: true,
            services: true,
            assignments: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return ministries
  } catch (error) {
    console.error('Erro ao buscar ministérios:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
