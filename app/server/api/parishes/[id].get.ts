import { defineEventHandler, getMethod, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const parishId = getRouterParam(event, 'id')
    
    if (!parishId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID da paróquia é obrigatório'
      })
    }

    // Use mock data for development
    console.log('Using mock parish data for individual parish')
    const { mockParishes } = await import('./mock-data')
    
    const parish = mockParishes.find(p => p.id === parishId)

    if (!parish) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Paróquia não encontrada'
      })
    }

    return parish
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    console.error('Error fetching parish:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
