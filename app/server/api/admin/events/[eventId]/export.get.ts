import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { eventId, format = 'csv' } = getQuery(event)
  
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
    
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID do evento é obrigatório'
      })
    }

    // Buscar inscrições do evento
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        eventId: parseInt(eventId as string)
      },
      include: {
        user: {
          select: {
            email: true,
            phone: true
          }
        },
        responses: {
          include: {
            field: {
              select: {
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

    if (format === 'csv') {
      // Gerar CSV
      const headers = ['Nome', 'Email', 'Telefone', 'Status', 'Data de Inscrição']
      
      // Adicionar headers dos campos do formulário
      const formFields = new Set<string>()
      submissions.forEach(submission => {
        submission.responses.forEach(response => {
          formFields.add(response.field.label)
        })
      })
      
      headers.push(...Array.from(formFields))
      
      let csvContent = headers.join(',') + '\n'
      
      submissions.forEach(submission => {
        const row = [
          `"${submission.participantName || ''}"`,
          `"${submission.user?.email || submission.participantEmail || ''}"`,
          `"${submission.user?.phone || submission.participantPhone || ''}"`,
          `"${submission.status}"`,
          `"${submission.submittedAt.toLocaleDateString('pt-BR')}"`
        ]
        
        // Adicionar respostas dos campos
        Array.from(formFields).forEach(fieldLabel => {
          const response = submission.responses.find(r => r.field.label === fieldLabel)
          row.push(`"${response?.value || ''}"`)
        })
        
        csvContent += row.join(',') + '\n'
      })
      
      setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
      setHeader(event, 'Content-Disposition', `attachment; filename="inscricoes-evento-${eventId}.csv"`)
      
      // Adicionar BOM para UTF-8 (para Excel)
      return '\ufeff' + csvContent
    }
    
    // Retornar JSON por padrão
    return {
      submissions,
      total: submissions.length,
      exportedAt: new Date()
    }

  } catch (error) {
    console.error('Erro ao exportar inscrições:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
