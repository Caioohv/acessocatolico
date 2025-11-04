import { createError, defineEventHandler, getMethod, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const query = getQuery(event)
    const { stateId } = query as { stateId?: string }

    // Use mock data for development
    const { mockCities } = await import('../parishes/mock-data')
    
    let cities = mockCities
    if (stateId) {
      cities = mockCities.filter(city => city.stateId === stateId)
    }
    
    return { cities }
  } catch (error: any) {
    console.error('Error fetching cities:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
