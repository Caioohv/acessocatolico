import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, readBody, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const eventId = getRouterParam(event, 'eventId')

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Event ID is required'
    })
  }

  // Auth middleware
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token required'
    })
  }

  let userId: string
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: string }
    userId = decoded.userId
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }

  // Check user permissions
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true }
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Check if user is admin or event organizer
  const eventData = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId: true }
  })

  if (!eventData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Event not found'
    })
  }

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || eventData.organizerId === userId

  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Permission denied'
    })
  }

  if (method === 'GET') {
    // Get event form
    const form = await prisma.eventForm.findUnique({
      where: { eventId },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        },
        submissions: {
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
                field: true
              }
            }
          }
        }
      }
    })

    return form
  }

  if (method === 'POST') {
    // Create form
    const body = await readBody(event)
    const { title, description, isActive, allowMultipleSubmissions, requiresApproval, opensAt, closesAt } = body

    const form = await prisma.eventForm.create({
      data: {
        eventId,
        title: title || 'Formulário de Inscrição',
        description,
        isActive: isActive ?? true,
        allowMultipleSubmissions: allowMultipleSubmissions ?? false,
        requiresApproval: requiresApproval ?? false,
        opensAt: opensAt ? new Date(opensAt) : null,
        closesAt: closesAt ? new Date(closesAt) : null
      },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        }
      }
    })

    return form
  }

  if (method === 'PUT') {
    // Update form
    const body = await readBody(event)
    const { title, description, isActive, allowMultipleSubmissions, requiresApproval, opensAt, closesAt } = body

    const form = await prisma.eventForm.update({
      where: { eventId },
      data: {
        title,
        description,
        isActive,
        allowMultipleSubmissions,
        requiresApproval,
        opensAt: opensAt ? new Date(opensAt) : null,
        closesAt: closesAt ? new Date(closesAt) : null
      },
      include: {
        fields: {
          orderBy: { order: 'asc' }
        }
      }
    })

    return form
  }

  if (method === 'DELETE') {
    // Delete form (cascade will delete fields and submissions)
    await prisma.eventForm.delete({
      where: { eventId }
    })

    return { success: true }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
