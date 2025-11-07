import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRouterParam, getHeader, getQuery, createError, setHeader } from 'h3'

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
    select: { organizerId: true, title: true }
  })

  if (!eventData) throw createError({ statusCode: 404, statusMessage: 'Event not found' })

  const canManage = user.role === 'ADMIN' || user.role === 'PRIEST' || eventData.organizerId === userId
  if (!canManage) throw createError({ statusCode: 403, statusMessage: 'Permission denied' })

  // Get export format
  const query = getQuery(event)
  const format = (query.format as string) || 'csv'

  if (!['csv', 'xlsx'].includes(format)) {
    throw createError({ statusCode: 400, statusMessage: 'Format must be csv or xlsx' })
  }

  // Get form and submissions
  const form = await prisma.eventForm.findUnique({
    where: { eventId },
    include: {
      fields: {
        orderBy: { order: 'asc' }
      },
      submissions: {
        where: { status: { in: ['APPROVED', 'PENDING'] } },
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
        },
        orderBy: { submittedAt: 'desc' }
      }
    }
  })

  if (!form) throw createError({ statusCode: 404, statusMessage: 'Event form not found' })

  // Build CSV data
  const headers = [
    'Nome',
    'Email', 
    'Status',
    'Data de Inscrição',
    ...form.fields.map(field => field.label)
  ]

  const rows = form.submissions.map(submission => {
    const responseMap = new Map(
      submission.responses.map(r => [r.field.name, r.value])
    )

    const userName = submission.user 
      ? `${submission.user.profile?.firstName || ''} ${submission.user.profile?.lastName || ''}`.trim()
      : submission.name || 'N/A'

    return [
      userName,
      submission.email || submission.user?.email || 'N/A',
      submission.status,
      submission.submittedAt.toLocaleDateString('pt-BR'),
      ...form.fields.map(field => {
        const value = responseMap.get(field.name)
        if (value === null || value === undefined) return ''
        
        // Handle different field types
        if (typeof value === 'object') {
          return Array.isArray(value) ? value.join(', ') : JSON.stringify(value)
        }
        return String(value)
      })
    ]
  })

  if (format === 'csv') {
    // Generate CSV
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => 
        typeof cell === 'string' && cell.includes(',') 
          ? `"${cell.replace(/"/g, '""')}"` 
          : cell
      ).join(','))
    ].join('\n')

    // Set headers for file download
    setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
    setHeader(event, 'Content-Disposition', `attachment; filename="inscricoes-${eventData.title.replace(/[^a-zA-Z0-9]/g, '-')}.csv"`)
    
    // Add BOM for Excel compatibility with UTF-8
    return '\ufeff' + csvContent
  }

  // For XLSX format, we'd need to install a library like 'xlsx'
  // For now, return CSV with XLSX content-type as fallback
  throw createError({ 
    statusCode: 501, 
    statusMessage: 'XLSX format not implemented yet. Use CSV format.' 
  })
})
