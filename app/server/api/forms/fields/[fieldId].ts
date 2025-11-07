import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, readBody, createError } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const fieldId = getRouterParam(event, 'fieldId')

  if (!fieldId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Field ID is required'
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

  // Get field and check permissions
  const field = await prisma.eventFormField.findUnique({
    where: { id: fieldId },
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

  if (!field) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Field not found'
    })
  }

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || field.form.event.organizerId === userId

  if (!canManage) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Permission denied'
    })
  }

  if (method === 'GET') {
    // Get single field
    return field
  }

  if (method === 'PUT') {
    // Update field
    const body = await readBody(event)
    const { 
      type, name, label, placeholder, helpText, isRequired, 
      minLength, maxLength, pattern, options, 
      showIfField, showIfValue, order, group 
    } = body

    const updatedField = await prisma.eventFormField.update({
      where: { id: fieldId },
      data: {
        type: type ?? field.type,
        name: name ?? field.name,
        label: label ?? field.label,
        placeholder,
        helpText,
        isRequired: isRequired ?? field.isRequired,
        minLength,
        maxLength,
        pattern,
        options: options ? options : field.options,
        showIfField,
        showIfValue,
        order: order ?? field.order,
        group
      }
    })

    return updatedField
  }

  if (method === 'DELETE') {
    // Delete field (will cascade delete responses)
    await prisma.eventFormField.delete({
      where: { id: fieldId }
    })

    return { success: true }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
