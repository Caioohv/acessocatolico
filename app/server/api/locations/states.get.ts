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
    const { mockStates } = await import('../parishes/mock-data')
    return { states: mockStates }
  } catch (error) {
    console.error('Error fetching states:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
