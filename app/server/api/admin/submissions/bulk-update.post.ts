import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { submissionIds, status, reason } = body
  
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

    // Validar dados
    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'IDs de inscrições são obrigatórios'
      })
    }

    if (!status || !['APPROVED', 'REJECTED', 'PENDING', 'CANCELLED'].includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Status inválido'
      })
    }

    // Atualizar inscrições
    const updatedSubmissions = await prisma.eventFormSubmission.updateMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      data: {
        status,
        approvedBy: status === 'APPROVED' ? decoded.userId : null,
        approvedAt: status === 'APPROVED' ? new Date() : null,
        rejectedReason: status === 'REJECTED' ? reason : null
      }
    })

    // Buscar dados das inscrições atualizadas para notificações
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                firstName: true,
                lastName: true
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
            }
          }
        }
      }
    })

    // TODO: Enviar notificações por email
    // Para cada inscrição, enviar email de aprovação/rejeição
    
    return {
      success: true,
      updated: updatedSubmissions.count,
      submissions
    }

  } catch (error) {
    console.error('Erro ao atualizar status das inscrições:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
