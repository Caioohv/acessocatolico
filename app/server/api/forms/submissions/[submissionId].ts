import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const submissionId = getRouterParam(event, 'submissionId')

  if (!submissionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Submission ID is required'
    })
  }

  if (method === 'GET') {
    // Get submission details (can be accessed by submitter or admins)
    const submission = await prisma.eventFormSubmission.findUnique({
      where: { id: submissionId },
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
        },
        form: {
          include: {
            event: {
              select: {
                id: true,
                title: true,
                organizerId: true
              }
            }
          }
        }
      }
    })

    if (!submission) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Submission not found'
      })
    }

    // Check if user can access this submission
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    let userId: string | null = null
    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: string }
        userId = decoded.userId
        
        const user = await prisma.user.findUnique({ where: { id: userId } })
        
        // Allow access if: owner, event organizer, or admin/priest
        const canAccess = 
          submission.userId === userId ||
          submission.form.event.organizerId === userId ||
          (user && ['ADMIN', 'PRIEST'].includes(user.role))

        if (!canAccess) {
          throw createError({
            statusCode: 403,
            statusMessage: 'Access denied'
          })
        }
      } catch (error) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid token'
        })
      }
    } else {
      // For anonymous submissions, allow access (they should have the submission ID)
      // In production, you might want to add additional security measures
      if (submission.userId) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Authentication required'
        })
      }
    }

    return submission
  }

  if (method === 'DELETE') {
    // Delete submission (admin only or event organizer)
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

    // Check permissions
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

    const submission = await prisma.eventFormSubmission.findUnique({
      where: { id: submissionId },
      include: {
        form: {
          include: {
            event: {
              select: { organizerId: true }
            }
          }
        }
      }
    })

    if (!submission) throw createError({ statusCode: 404, statusMessage: 'Submission not found' })

    const canDelete = user.role === 'ADMIN' || user.role === 'PRIEST' || submission.form.event.organizerId === userId
    if (!canDelete) throw createError({ statusCode: 403, statusMessage: 'Permission denied' })

    // Delete submission (cascade will delete responses)
    await prisma.eventFormSubmission.delete({
      where: { id: submissionId }
    })

    return { success: true }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
