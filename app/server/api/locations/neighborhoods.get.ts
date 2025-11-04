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
    const { cityId } = query as { cityId?: string }

    // Use mock data for development
    const { mockNeighborhoods } = await import('../parishes/mock-data')
    
    let neighborhoods = mockNeighborhoods
    if (cityId) {
      neighborhoods = mockNeighborhoods.filter(neighborhood => neighborhood.cityId === cityId)
    }
    
    return { neighborhoods }
  } catch (error: any) {
    console.error('Error fetching neighborhoods:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
