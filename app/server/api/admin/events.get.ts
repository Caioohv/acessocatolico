import { PrismaClient } from '@prisma/client'
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
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
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true }
    })
    
    if (!user || !['ADMIN', 'PRIEST'].includes(user.role)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado'
      })
    }

    // Parâmetros de query
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = (query.search as string) || ''
    const status = (query.status as string) || ''
    const formStatus = (query.formStatus as string) || ''

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {}

    // Filtro de busca
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filtro de status do evento
    if (status) {
      where.status = status
    }

    // Filtro de formulário
    if (formStatus) {
      switch (formStatus) {
        case 'with_form':
          where.form = { isNot: null }
          break
        case 'without_form':
          where.form = null
          break
        case 'active_form':
          where.form = { isActive: true }
          break
        case 'inactive_form':
          where.form = { isActive: false }
          break
      }
    }

    // Se o usuário é padre, só pode ver seus eventos
    if (user.role === 'PRIEST') {
      where.organizerId = user.id
    }

    // Buscar eventos com contagens
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organizer: {
            select: {
              id: true,
              role: true,
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
              id: true,
              title: true,
              isActive: true,
              opensAt: true,
              closesAt: true,
              _count: {
                select: {
                  submissions: true
                }
              }
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.event.count({ where })
    ])

    return {
      success: true,
      data: {
        events,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Error fetching admin events:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
