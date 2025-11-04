import { defineEventHandler, getMethod, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Use mock data for development
    const { mockDioceses } = await import('../parishes/mock-data')
    return { dioceses: mockDioceses }
  } catch (error) {
    console.error('Error fetching dioceses:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
