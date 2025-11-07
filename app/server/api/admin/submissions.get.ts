import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { eventId, status, search, page = 1, limit = 50 } = getQuery(event)
  
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
      where.eventId = parseInt(eventId as string)
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
            firstName: {
              contains: search as string,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            lastName: {
              contains: search as string,
              mode: 'insensitive'
            }
          }
        }
      ]
    }

    // Buscar total de registros
    const total = await prisma.eventFormSubmission.count({ where })
    
    // Buscar inscrições com paginação
    const submissionData = await prisma.eventFormSubmission.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true
          }
        },
        event: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: {
        submittedAt: 'desc'
      }
    })

    return {
      submissions: submissionData,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    }

  } catch (error) {
    console.error('Erro na API de inscrições:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
