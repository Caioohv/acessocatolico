import { createError, defineEventHandler, getMethod, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Always use mock data for development/demonstration
    console.log('Using mock parish data for development')
    const { mockParishes } = await import('./mock-data')
    
    const query = getQuery(event)
    const {
      page = '1',
      limit = '12',
      search,
      stateId,
      cityId,
      neighborhoodId,
      dioceseId
    } = query as {
      page?: string
      limit?: string
      search?: string
      stateId?: string
      cityId?: string
      neighborhoodId?: string
      dioceseId?: string
    }

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    let filteredParishes = mockParishes
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredParishes = filteredParishes.filter(parish =>
        parish.name.toLowerCase().includes(searchLower) ||
        parish.description?.toLowerCase().includes(searchLower) ||
        parish.address.toLowerCase().includes(searchLower)
      )
    }
    
    // Apply location filters (simplified for mock data)
    if (stateId) {
      filteredParishes = filteredParishes.filter(parish => parish.state.id === stateId)
    }
    if (cityId) {
      filteredParishes = filteredParishes.filter(parish => parish.city.id === cityId)
    }
    if (neighborhoodId) {
      filteredParishes = filteredParishes.filter(parish => parish.neighborhood?.id === neighborhoodId)
    }
    if (dioceseId) {
      filteredParishes = filteredParishes.filter(parish => parish.diocese.id === dioceseId)
    }

    const total = filteredParishes.length
    const parishes = filteredParishes.slice(skip, skip + limitNum)
    const totalPages = Math.ceil(total / limitNum)

    return {
      parishes,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    }
  } catch (error) {
    console.error('Error fetching parishes:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro interno do servidor'
    })
  }
})
