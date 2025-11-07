import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'PUT') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

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
    
    const body = await readBody(event)
    const { submissionIds, status, reason } = body
    
    if (!submissionIds || !Array.isArray(submissionIds) || submissionIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'IDs das inscrições são obrigatórios'
      })
    }
    
    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Status inválido'
      })
    }

    // Atualizar status das inscrições
    const updatedSubmissions = await prisma.eventFormSubmission.updateMany({
      where: {
        id: {
          in: submissionIds.map((id: string) => parseInt(id))
        }
      },
      data: {
        status,
        updatedAt: new Date(),
        ...(reason && { adminNotes: reason })
      }
    })

    // Buscar dados das inscrições para notificações
    const submissions = await prisma.eventFormSubmission.findMany({
      where: {
        id: {
          in: submissionIds.map((id: string) => parseInt(id))
        }
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        },
        event: {
          select: {
            title: true,
            slug: true
          }
        }
      }
    })

    // TODO: Implementar notificações por email aqui
    // Para cada submission, enviar email de acordo com o status
    
    return {
      success: true,
      updated: updatedSubmissions.count,
      message: `${updatedSubmissions.count} inscrições atualizadas`
    }

  } catch (error) {
    console.error('Erro ao atualizar status das inscrições:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
