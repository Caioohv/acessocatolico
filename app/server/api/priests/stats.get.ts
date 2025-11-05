import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, getMethod } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    if (getMethod(event) !== 'GET') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    // Get registration counts by status
    const statusCounts = await prisma.priestRegistration.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    // Get registrations from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentRegistrations = await prisma.priestRegistration.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    })

    // Get average processing time for approved registrations
    const approvedRegistrations = await prisma.priestRegistration.findMany({
      where: { status: 'APPROVED' },
      select: {
        createdAt: true,
        statusUpdatedAt: true
      }
    })

    const averageProcessingDays = approvedRegistrations.length > 0 
      ? approvedRegistrations.reduce((acc, reg) => {
          const days = Math.round((reg.statusUpdatedAt!.getTime() - reg.createdAt.getTime()) / (1000 * 60 * 60 * 24))
          return acc + days
        }, 0) / approvedRegistrations.length
      : 0

    // Get top dioceses
    const topDioceses = await prisma.priestRegistration.groupBy({
      by: ['ordinationDioceseId'],
      _count: {
        ordinationDioceseId: true
      },
      orderBy: {
        _count: {
          ordinationDioceseId: 'desc'
        }
      },
      take: 5
    })

    // Get diocese names
    const dioceseIds = topDioceses.map(d => d.ordinationDioceseId)
    const dioceses = await prisma.diocese.findMany({
      where: { id: { in: dioceseIds } },
      select: { id: true, name: true }
    })

    const diocesesWithCounts = topDioceses.map(d => ({
      diocese: dioceses.find(diocese => diocese.id === d.ordinationDioceseId)?.name || 'Unknown',
      count: d._count.ordinationDioceseId
    }))

    // Transform status counts to object
    const stats = statusCounts.reduce((acc, item) => {
      acc[item.status.toLowerCase()] = item._count.status
      return acc
    }, {} as Record<string, number>)

    // Add totals
    const total = statusCounts.reduce((acc, item) => acc + item._count.status, 0)

    return {
      success: true,
      data: {
        stats: {
          total,
          pending: stats.pending || 0,
          under_review: stats.under_review || 0,
          approved: stats.approved || 0,
          rejected: stats.rejected || 0,
          requires_documentation: stats.requires_documentation || 0
        },
        recentRegistrations,
        averageProcessingDays: Math.round(averageProcessingDays * 10) / 10,
        topDioceses: diocesesWithCounts
      }
    }

  } catch (error) {
    console.error('Error fetching priest registration stats:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
