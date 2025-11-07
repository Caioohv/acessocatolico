import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, readBody, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'PUT') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })

  const formId = getRouterParam(event, 'formId')
  if (!formId) throw createError({ statusCode: 400, statusMessage: 'Form ID required' })

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

  const form = await prisma.eventForm.findUnique({
    where: { id: formId },
    include: { event: { select: { organizerId: true } } }
  })

  if (!form) throw createError({ statusCode: 404, statusMessage: 'Form not found' })

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || form.event.organizerId === userId
  if (!canManage) throw createError({ statusCode: 403, statusMessage: 'Permission denied' })

  // Update field orders
  const body = await readBody(event)
  const { fieldOrders } = body as { fieldOrders: { id: string, order: number }[] }

  if (!fieldOrders || !Array.isArray(fieldOrders)) {
    throw createError({ statusCode: 400, statusMessage: 'fieldOrders array is required' })
  }

  // Update each field order in transaction
  await prisma.$transaction(
    fieldOrders.map(({ id, order }) =>
      prisma.eventFormField.update({
        where: { id, formId }, // Ensure field belongs to this form
        data: { order }
      })
    )
  )

  // Return updated fields
  const updatedFields = await prisma.eventFormField.findMany({
    where: { formId },
    orderBy: { order: 'asc' }
  })

  return updatedFields
})
