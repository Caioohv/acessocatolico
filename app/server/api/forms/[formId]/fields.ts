import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, readBody, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const formId = getRouterParam(event, 'formId')

  if (!formId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Form ID is required'
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

  // Check if user can manage this form
  const form = await prisma.eventForm.findUnique({
    where: { id: formId },
    include: {
      event: {
        select: { organizerId: true }
      }
    }
  })

  if (!form) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Form not found'
    })
  }

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || form.event.organizerId === userId

  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Permission denied'
    })
  }

  if (method === 'POST') {
    // Add field to form
    const body = await readBody(event)
    const { 
      type, name, label, placeholder, helpText, isRequired, 
      minLength, maxLength, pattern, options, 
      showIfField, showIfValue, order, group 
    } = body

    // Validate required fields
    if (!type || !name || !label) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Type, name, and label are required'
      })
    }

    // Get current max order
    const maxOrderField = await prisma.eventFormField.findFirst({
      where: { formId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const nextOrder = order ?? ((maxOrderField?.order ?? 0) + 1)

    const field = await prisma.eventFormField.create({
      data: {
        formId,
        type,
        name,
        label,
        placeholder,
        helpText,
        isRequired: isRequired ?? false,
        minLength,
        maxLength,
        pattern,
        options: options ? options : null,
        showIfField,
        showIfValue,
        order: nextOrder,
        group
      }
    })

    return field
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
