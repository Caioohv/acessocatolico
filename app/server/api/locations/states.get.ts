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
    const states = await prisma.state.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            parishes: true
          }
        }
      }
    })

    return { states }
  } catch (error) {
    console.error('Error fetching states:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
