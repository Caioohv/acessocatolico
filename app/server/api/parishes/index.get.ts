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
    
    const {
      page = '1',
      limit = '12',
      search,
      stateId,
      cityId,
      neighborhoodId,
      dioceseId
    } = query as {
      page?: string
      limit?: string
      search?: string
      stateId?: string
      cityId?: string
      neighborhoodId?: string
      dioceseId?: string
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (stateId) where.stateId = stateId
    if (cityId) where.cityId = cityId
    if (neighborhoodId) where.neighborhoodId = neighborhoodId
    if (dioceseId) where.dioceseId = dioceseId

    // Get parishes with related data
    const [parishes, total] = await Promise.all([
      prisma.parish.findMany({
        where,
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
            where: {
              isMain: true
            },
            take: 1
          },
          contacts: true,
          masses: {
            orderBy: [
              { dayOfWeek: 'asc' },
              { time: 'asc' }
            ]
          },
          _count: {
            select: {
              events: true,
              ministries: true
            }
          }
        },
        orderBy: [
          { name: 'asc' }
        ],
        skip,
        take: limitNum
      }),
      prisma.parish.count({ where })
    ])

    const totalPages = Math.ceil(total / limitNum)
    const hasNext = pageNum < totalPages
    const hasPrev = pageNum > 1

    return {
      parishes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    }
  } catch (error) {
    console.error('Error fetching parishes:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
