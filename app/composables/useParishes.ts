import type { City, Diocese, Neighborhood, Parish, State } from '@prisma/client'

interface ParishWithRelations extends Parish {
  state: State
  city: City
  neighborhood?: Neighborhood | null
  diocese: Diocese
  priests: Array<{
    id: string
    isMain: boolean
    user: {
      id: string
      email: string
      role: string
      profile: {
        firstName: string
        lastName: string
        phone?: string | null
        avatar?: string | null
        bio?: string | null
      }
    }
  }>
  contacts: Array<{
    id: string
    type: string
    value: string
  }>
  masses: Array<{
    id: string
    dayOfWeek: number
    time: string
    type: string
    language: string
    description?: string | null
  }>
  _count: {
    events: number
    ministries: number
  }
}

interface ParishFilters {
  search?: string
  stateId?: string
  cityId?: string
  neighborhoodId?: string
  dioceseId?: string
}

interface ParishPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface LocationOption {
  id: string
  name: string
  _count?: {
    parishes: number
  }
}

export const useParishes = () => {
  // State
  const parishes = ref<ParishWithRelations[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref<ParishPagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })

  // Filter options
  const states = ref<LocationOption[]>([])
  const cities = ref<LocationOption[]>([])
  const neighborhoods = ref<LocationOption[]>([])
  const dioceses = ref<LocationOption[]>([])
  
  // Current filters
  const filters = ref<ParishFilters>({})

  // Load parishes with filters
  const loadParishes = async (page = 1, newFilters?: ParishFilters) => {
    try {
      loading.value = true
      error.value = null

      // Update filters if provided
      if (newFilters !== undefined) {
        filters.value = { ...newFilters }
      }

      const query = new URLSearchParams({
        page: page.toString(),
        limit: pagination.value.limit.toString()
      })

      // Add filters to query
      if (filters.value.search) query.append('search', filters.value.search)
      if (filters.value.stateId) query.append('stateId', filters.value.stateId)
      if (filters.value.cityId) query.append('cityId', filters.value.cityId)
      if (filters.value.neighborhoodId) query.append('neighborhoodId', filters.value.neighborhoodId)
      if (filters.value.dioceseId) query.append('dioceseId', filters.value.dioceseId)

      const response = await $fetch<{
        parishes: ParishWithRelations[]
        pagination: ParishPagination
      }>(`/api/parishes?${query.toString()}`)

      parishes.value = response.parishes
      pagination.value = response.pagination
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar paróquias'
      console.error('Error loading parishes:', err)
    } finally {
      loading.value = false
    }
  }

  // Load a single parish
  const loadParish = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const parish = await $fetch<ParishWithRelations>(`/api/parishes/${id}`)
      return parish
    } catch (err: any) {
      error.value = err.message || 'Erro ao carregar paróquia'
      console.error('Error loading parish:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Load location options
  const loadStates = async () => {
    try {
      const { states: statesList } = await $fetch<{ states: LocationOption[] }>('/api/locations/states')
      states.value = statesList
    } catch (err) {
      console.error('Error loading states:', err)
    }
  }

  const loadCities = async (stateId: string) => {
    try {
      const { cities: citiesList } = await $fetch<{ cities: LocationOption[] }>(`/api/locations/cities?stateId=${stateId}`)
      cities.value = citiesList
    } catch (err) {
      console.error('Error loading cities:', err)
    }
  }

  const loadNeighborhoods = async (cityId: string) => {
    try {
      const { neighborhoods: neighborhoodsList } = await $fetch<{ neighborhoods: LocationOption[] }>(`/api/locations/neighborhoods?cityId=${cityId}`)
      neighborhoods.value = neighborhoodsList
    } catch (err) {
      console.error('Error loading neighborhoods:', err)
    }
  }

  const loadDioceses = async () => {
    try {
      const { dioceses: diocesesList } = await $fetch<{ dioceses: LocationOption[] }>('/api/locations/dioceses')
      dioceses.value = diocesesList
    } catch (err) {
      console.error('Error loading dioceses:', err)
    }
  }

  // Navigation methods
  const nextPage = () => {
    if (pagination.value.hasNext) {
      loadParishes(pagination.value.page + 1)
    }
  }

  const prevPage = () => {
    if (pagination.value.hasPrev) {
      loadParishes(pagination.value.page - 1)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      loadParishes(page)
    }
  }

  // Utility methods
  const clearFilters = () => {
    filters.value = {}
    cities.value = []
    neighborhoods.value = []
    loadParishes(1)
  }

  const getMassSchedule = (masses: ParishWithRelations['masses']) => {
    const schedule: Record<number, Array<{ time: string; type: string; description?: string | null }>> = {}
    
    masses.forEach(mass => {
      if (!schedule[mass.dayOfWeek]) {
        schedule[mass.dayOfWeek] = []
      }
      schedule[mass.dayOfWeek].push({
        time: mass.time,
        type: mass.type,
        description: mass.description
      })
    })

    return schedule
  }

  const getDayName = (dayOfWeek: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return days[dayOfWeek] || ''
  }

  const getMainPriest = (priests: ParishWithRelations['priests']) => {
    return priests.find(priest => priest.isMain)
  }

  const getSocialContact = (contacts: ParishWithRelations['contacts'], type: string) => {
    return contacts.find(contact => contact.type === type)
  }

  return {
    // State
    parishes,
    loading,
    error,
    pagination,
    states,
    cities,
    neighborhoods,
    dioceses,
    filters,

    // Methods
    loadParishes,
    loadParish,
    loadStates,
    loadCities,
    loadNeighborhoods,
    loadDioceses,
    nextPage,
    prevPage,
    goToPage,
    clearFilters,

    // Utilities
    getMassSchedule,
    getDayName,
    getMainPriest,
    getSocialContact
  }
}
