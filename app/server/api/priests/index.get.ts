import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod, getQuery } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const query = getQuery(event)
    const {
      page = '1',
      limit = '10',
      status,
      search
    } = query as {
      page?: string
      limit?: string
      status?: string
      search?: string
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Build where clause
    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { cpf: { contains: search } },
        { ordinationNumber: { contains: search } }
      ]
    }

    // Get registrations with pagination
    const [registrations, total] = await Promise.all([
      prisma.priestRegistration.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          ordinationDiocese: true,
          documents: {
            select: {
              id: true,
              type: true,
              status: true,
              uploadedAt: true
            }
          },
          approvalHistory: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              fromStatus: true,
              toStatus: true,
              comments: true,
              createdAt: true,
              adminEmail: true
            }
          }
        }
      }),
      prisma.priestRegistration.count({ where })
    ])

    const totalPages = Math.ceil(total / limitNum)

    return {
      success: true,
      data: {
        registrations: registrations.map(reg => ({
          id: reg.id,
          firstName: reg.firstName,
          lastName: reg.lastName,
          email: reg.email,
          phone: reg.phone,
          cpf: reg.cpf,
          ordinationNumber: reg.ordinationNumber,
          ordinationDate: reg.ordinationDate,
          ordinationDiocese: reg.ordinationDiocese,
          status: reg.status,
          statusUpdatedAt: reg.statusUpdatedAt,
          emailVerified: reg.emailVerified,
          createdAt: reg.createdAt,
          updatedAt: reg.updatedAt,
          documentsCount: reg.documents.length,
          lastAction: reg.approvalHistory[0] || null
        })),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    }

  } catch (error) {
    console.error('Error fetching priest registrations:', error)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
