import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, readBody, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'PUT') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })

  const submissionId = getRouterParam(event, 'submissionId')
  if (!submissionId) throw createError({ statusCode: 400, statusMessage: 'Submission ID required' })

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

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || submission.form.event.organizerId === userId
  if (!canManage) throw createError({ statusCode: 403, statusMessage: 'Permission denied' })

  // Update status
  const body = await readBody(event)
  const { status, rejectedReason } = body

  if (!['PENDING', 'APPROVED', 'REJECTED', 'INCOMPLETE'].includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid status' })
  }

  if (status === 'REJECTED' && !rejectedReason) {
    throw createError({ statusCode: 400, statusMessage: 'Rejected reason is required when rejecting' })
  }

  const updatedSubmission = await prisma.eventFormSubmission.update({
    where: { id: submissionId },
    data: {
      status,
      rejectedReason: status === 'REJECTED' ? rejectedReason : null,
      approvedBy: ['APPROVED', 'REJECTED'].includes(status) ? userId : null,
      approvedAt: ['APPROVED', 'REJECTED'].includes(status) ? new Date() : null
    },
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
      }
    }
  })

  // TODO: Send notification email based on status change
  // if (status === 'APPROVED') {
  //   await sendApprovalEmail(updatedSubmission)
  // } else if (status === 'REJECTED') {
  //   await sendRejectionEmail(updatedSubmission, rejectedReason)
  // }

  return updatedSubmission
})
