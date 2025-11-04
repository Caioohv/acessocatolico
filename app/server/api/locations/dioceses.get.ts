import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const dioceses = await prisma.diocese.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    })

    return { dioceses }
  } catch (error) {
    console.error('Error fetching dioceses:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
