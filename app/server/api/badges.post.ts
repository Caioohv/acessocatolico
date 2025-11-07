import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { 
      name, 
      description, 
      type, 
      iconUrl, 
      color, 
      criteria, 
      isAutoAwarded 
    } = body

    // Validações básicas
    if (!name || !description || !type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nome, descrição e tipo são obrigatórios'
      })
    }

    // Criar badge
    const badge = await prisma.badge.create({
      data: {
        name,
        description,
        type,
        iconUrl,
        color: color || '#6B7280',
        criteria: criteria ? JSON.stringify(criteria) : JSON.stringify({}),
        isAutoAwarded: isAutoAwarded || false
      }
    })

    return badge
  } catch (error) {
    console.error('Erro ao criar badge:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
