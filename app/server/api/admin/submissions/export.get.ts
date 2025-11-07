import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { eventId, format = 'csv', status, search } = getQuery(event)
  
  try {
    // Verificar autenticação
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token de acesso requerido'
      })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Verificar permissões (admin ou padre)
    if (!decoded.isAdmin && !decoded.isPriest) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    // Construir filtros
    const where: any = {}
    
    if (eventId) {
      where.form = {
        eventId: eventId
      }
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        {
          user: {
            email: {
              contains: search as string,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            profile: {
              firstName: {
                contains: search as string,
                mode: 'insensitive'
              }
            }
          }
        },
        {
          user: {
            profile: {
              lastName: {
                contains: search as string,
                mode: 'insensitive'
              }
            }
          }
        }
      ]
    }

    // Buscar inscrições
    const submissions = await prisma.eventFormSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                phone: true
              }
            }
          }
        },
        form: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                slug: true
              }
            },
            fields: {
              select: {
                id: true,
                label: true,
                type: true,
                required: true
              },
              orderBy: {
                order: 'asc'
              }
            }
          }
        },
        responses: {
          include: {
            field: {
              select: {
                id: true,
                label: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })

    // Preparar dados para exportação
    const exportData = submissions.map(submission => {
      const baseData = {
        'ID': submission.id,
        'Nome': submission.user?.profile?.firstName + ' ' + submission.user?.profile?.lastName || submission.name || 'N/A',
        'Email': submission.user?.email || submission.email || 'N/A',
        'Telefone': submission.user?.profile?.phone || submission.phone || 'N/A',
        'Status': getStatusLabel(submission.status),
        'Data de Inscrição': formatDate(submission.submittedAt),
        'Última Atualização': formatDate(submission.updatedAt)
      }

      // Adicionar respostas dos campos customizados
      submission.responses.forEach(response => {
        baseData[response.field.label] = formatResponseValue(response.value, response.field.type)
      })

      return baseData
    })

    if (format === 'csv') {
      // Gerar CSV
      const csv = generateCSV(exportData)
      
      setHeader(event, 'Content-Type', 'text/csv')
      setHeader(event, 'Content-Disposition', `attachment; filename="inscricoes-${eventId || 'all'}-${new Date().toISOString().split('T')[0]}.csv"`)
      
      return csv
    } else if (format === 'json') {
      return {
        data: exportData,
        total: submissions.length,
        exportedAt: new Date().toISOString()
      }
    }

  } catch (error) {
    console.error('Erro ao exportar inscrições:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})

function getStatusLabel(status: string): string {
  const statusMap = {
    'PENDING': 'Pendente',
    'APPROVED': 'Aprovada',
    'REJECTED': 'Rejeitada',
    'INCOMPLETE': 'Incompleta'
  }
  return statusMap[status] || status
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

function formatResponseValue(value: any, fieldType: string): string {
  if (value === null || value === undefined) return 'N/A'
  
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    return JSON.stringify(value)
  }
  
  return String(value)
}

function generateCSV(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header] || ''
        // Escape quotes and wrap in quotes if contains comma or quote
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')
  
  return csvContent
}
