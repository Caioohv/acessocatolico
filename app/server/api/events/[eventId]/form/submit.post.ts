import { PrismaClient } from '@prisma/client'
import { defineEventHandler, getMethod, getRouterParam, readBody, createError, getHeader } from 'h3'
import { verify } from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'POST') throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })

  const eventId = getRouterParam(event, 'eventId')
  if (!eventId) throw createError({ statusCode: 400, statusMessage: 'Event ID required' })

  const body = await readBody(event)
  const { data, userInfo } = body as { data: any, userInfo?: { email?: string, name?: string, phone?: string } }

  // Load form
  const form = await prisma.eventForm.findUnique({
    where: { eventId },
    include: {
      fields: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!form) throw createError({ statusCode: 404, statusMessage: 'Form not found' })

  // Check form open/close
  const now = new Date()
  if (form.opensAt && now < form.opensAt) throw createError({ statusCode: 400, statusMessage: 'Form not open yet' })
  if (form.closesAt && now > form.closesAt) throw createError({ statusCode: 400, statusMessage: 'Form closed' })

  // Validate fields
  const errors: Record<string,string> = {}
  for (const field of form.fields) {
    if (field.isRequired) {
      const value = data[field.name]
      if (value === undefined || value === null || value === '') {
        errors[field.name] = `${field.label} é obrigatório`
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors }
  }

  // Find user if token present
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')
  let userId: string | null = null
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET as string) as any
      if (decoded?.userId) userId = decoded.userId
    } catch (err) {
      // ignore
    }
  }

  // If form doesn't allow anonymous and no userId and no userInfo.email
  if (!form.allowMultipleSubmissions && !userId && !userInfo?.email) {
    throw createError({ statusCode: 403, statusMessage: 'Authentication required or provide email' })
  }

  // Create submission
  const submission = await prisma.eventFormSubmission.create({
    data: {
      formId: form.id,
      userId: userId ?? undefined,
      email: userInfo?.email,
      name: userInfo?.name,
      phone: userInfo?.phone,
      status: form.requiresApproval ? 'PENDING' : 'APPROVED'
    }
  })

  // Save responses
  for (const field of form.fields) {
    const value = data[field.name]
    if (value === undefined) continue

    await prisma.eventFormResponse.create({
      data: {
        submissionId: submission.id,
        fieldId: field.id,
        value: typeof value === 'object' ? value : value
      }
    })
  }

  // If form requires approval, notify admins/organizers (TODO: implement notifications)

  return { status: 'ok', submissionId: submission.id }
})
