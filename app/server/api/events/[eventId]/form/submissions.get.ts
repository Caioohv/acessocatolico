import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, getQuery, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'GET') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })

  const eventId = getRouterParam(event, 'eventId')
  if (!eventId) throw createError({ statusCode: 400, statusMessage: 'Event ID required' })

  // Auth middleware
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Token required' })

  let userId: string
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: string }
    userId = decoded.userId
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }

  // Check permissions
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  const eventData = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  })

  if (!eventData) throw createError({ statusCode: 404, statusMessage: 'Event not found' })

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || eventData.organizerId === userId
  if (!canManage) throw createError({ statusCode: 403, statusMessage: 'Permission denied' })

  // Get query parameters
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = Math.min(parseInt(query.limit as string) || 20, 100)
  const status = query.status as string
  const search = query.search as string

  const skip = (page - 1) * limit

  // Build where clause
  const whereClause: any = {
    form: {
      eventId
    }
  }

  if (status && ['PENDING', 'APPROVED', 'REJECTED', 'INCOMPLETE'].includes(status)) {
    whereClause.status = status
  }

  if (search) {
    whereClause.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { user: { profile: { firstName: { contains: search, mode: 'insensitive' } } } },
      { user: { profile: { lastName: { contains: search, mode: 'insensitive' } } } }
    ]
  }

  // Get submissions with pagination
  const [submissions, total] = await Promise.all([
    prisma.eventFormSubmission.findMany({
      where: whereClause,
      include: {
        user: {
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        responses: {
          include: {
            field: {
              select: {
                id: true,
                name: true,
                label: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: { submittedAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.eventFormSubmission.count({ where: whereClause })
  ])

  const totalPages = Math.ceil(total / limit)

  return {
    submissions,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasMore: page < totalPages
    }
  }
})
