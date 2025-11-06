import type { EventStatus } from '@prisma/client'

interface EventData {
  title: string
  description: string
  content?: string
  startDate: string
  endDate?: string
  timezone?: string
  location: string
  address?: string
  coordinates?: string
  isOnline?: boolean
  onlineUrl?: string
  maxParticipants?: number
  minParticipants?: number
  price?: number
  currency?: string
  category: string
  tags?: string[]
  targetAudience?: string[]
  ageMin?: number
  ageMax?: number
  registrationRequired?: boolean
  registrationStart?: string
  registrationEnd?: string
  requiresApproval?: boolean
  customForm?: any
  isPublic?: boolean
  isFeatured?: boolean
  coverImage?: string
  gallery?: string[]
  attachments?: Array<{ name: string; url: string; type: string }>
  parishId?: string
  cityId?: string
  metaTitle?: string
  metaDescription?: string
}

interface Event {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  startDate: string
  endDate?: string
  timezone: string
  location: string
  address?: string
  coordinates?: string
  isOnline: boolean
  onlineUrl?: string
  maxParticipants?: number
  minParticipants: number
  price?: number
  currency: string
  category: string
  tags?: string[]
  targetAudience?: string[]
  ageMin?: number
  ageMax?: number
  registrationRequired: boolean
  registrationStart?: string
  registrationEnd?: string
  requiresApproval: boolean
  customForm?: any
  status: EventStatus
  isPublic: boolean
  isFeatured: boolean
  coverImage?: string
  gallery?: string[]
  attachments?: Array<{ name: string; url: string; type: string }>
  organizer: {
    id: string
    profile?: {
      firstName: string
      lastName: string
    }
  }
  parish?: {
    id: string
    name: string
  }
  city?: {
    id: string
    name: string
  }
  registrations?: Array<{
    id: string
    status: string
    user: {
      id: string
      profile?: {
        firstName: string
        lastName: string
      }
    }
  }>
  _count?: {
    registrations: number
  }
  viewCount: number
  shareCount: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

interface EventFilters {
  page?: number
  limit?: number
  search?: string
  category?: string
  status?: EventStatus
  organizerId?: string
  parishId?: string
  cityId?: string
  startDate?: string
  endDate?: string
  isPublic?: boolean
  isFeatured?: boolean
}

export const useEvents = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Create a new event
   */
  const createEvent = async (data: EventData): Promise<{ success: boolean; event?: Event; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        event: Event
      }>('/api/events', {
        method: 'POST',
        body: data
      })

      return {
        success: response.success,
        event: response.event,
        message: response.message
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao criar evento'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing event
   */
  const updateEvent = async (id: string, data: Partial<EventData>): Promise<{ success: boolean; event?: Event; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        event: Event
      }>(`/api/events/${id}`, {
        method: 'PUT',
        body: data
      })

      return {
        success: response.success,
        event: response.event,
        message: response.message
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao atualizar evento'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get events with filters and pagination
   */
  const getEvents = async (filters?: EventFilters) => {
    loading.value = true
    error.value = null
    
    try {
      const queryParams = new URLSearchParams()
      
      if (filters?.page) queryParams.append('page', filters.page.toString())
      if (filters?.limit) queryParams.append('limit', filters.limit.toString())
      if (filters?.search) queryParams.append('search', filters.search)
      if (filters?.category) queryParams.append('category', filters.category)
      if (filters?.status) queryParams.append('status', filters.status)
      if (filters?.organizerId) queryParams.append('organizerId', filters.organizerId)
      if (filters?.parishId) queryParams.append('parishId', filters.parishId)
      if (filters?.cityId) queryParams.append('cityId', filters.cityId)
      if (filters?.startDate) queryParams.append('startDate', filters.startDate)
      if (filters?.endDate) queryParams.append('endDate', filters.endDate)
      if (filters?.isPublic !== undefined) queryParams.append('isPublic', filters.isPublic.toString())
      if (filters?.isFeatured !== undefined) queryParams.append('isFeatured', filters.isFeatured.toString())

      const url = '/api/events' + (queryParams.toString() ? `?${queryParams.toString()}` : '')
      
      const response = await $fetch<{
        success: boolean
        data: {
          events: Event[]
          pagination: any
        }
      }>(url)

      events.value = response.data.events
      totalEvents.value = response.data.pagination.total
      totalPages.value = response.data.pagination.pages

      return response.data
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao buscar eventos'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get a single event by ID or slug
   */
  const getEvent = async (idOrSlug: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        data: Event & {
          registrationCount?: number
          userRegistration?: any
        }
      }>(`/api/events/${idOrSlug}`)

      event.value = response.data
      registrationCount.value = response.data.registrationCount || 0
      userRegistration.value = response.data.userRegistration || null

      return response.data
    } catch (err: any) {
      if (err.status === 404) {
        event.value = null
        return null
      }
      
      const errorMessage = err.data?.message || err.message || 'Erro ao buscar evento'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete an event
   */
  const deleteEvent = async (id: string): Promise<{ success: boolean; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`/api/events/${id}`, {
        method: 'DELETE'
      })

      return response
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao excluir evento'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload event cover image
   */
  const uploadCoverImage = async (eventId: string, file: File): Promise<{ success: boolean; imageUrl?: string; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const formData = new FormData()
      formData.append('eventId', eventId)
      formData.append('file', file)

      const response = await $fetch<{
        success: boolean
        message: string
        imageUrl: string
      }>('/api/events/upload-cover', {
        method: 'POST',
        body: formData
      })

      return response
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao enviar imagem'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload event gallery images
   */
  const uploadGalleryImages = async (eventId: string, files: File[]): Promise<{ success: boolean; imageUrls?: string[]; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const formData = new FormData()
      formData.append('eventId', eventId)
      
      files.forEach((file, index) => {
        formData.append(`files`, file)
      })

      const response = await $fetch<{
        success: boolean
        message: string
        imageUrls: string[]
      }>('/api/events/upload-gallery', {
        method: 'POST',
        body: formData
      })

      return response
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao enviar imagens'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get event categories
   */
  const getCategories = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        data: Array<{ category: string; count: number }>
      }>('/api/events/categories')

      categories.value = response.data
      return response.data
    } catch (err: any) {
      console.error('Error fetching categories:', err)
      categories.value = []
      return []
    }
  }

  /**
   * Generate event slug from title
   */
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
      .substring(0, 50) // Limit length
  }

  /**
   * Format event status for display
   */
  const formatStatus = (status: EventStatus): string => {
    const statusMap = {
      DRAFT: 'Rascunho',
      PUBLISHED: 'Publicado',
      CANCELLED: 'Cancelado',
      COMPLETED: 'Concluído'
    }
    return statusMap[status] || status
  }

  /**
   * Get status color for UI
   */
  const getStatusColor = (status: EventStatus): string => {
    const colors = {
      DRAFT: 'gray',
      PUBLISHED: 'green',
      CANCELLED: 'red',
      COMPLETED: 'blue'
    }
    return colors[status] || 'gray'
  }

  /**
   * Check if event registration is open
   */
  const isRegistrationOpen = (event: Event): boolean => {
    const now = new Date()
    const startDate = event.registrationStart ? new Date(event.registrationStart) : new Date(event.createdAt)
    const endDate = event.registrationEnd ? new Date(event.registrationEnd) : new Date(event.startDate)
    
    return event.registrationRequired && 
           event.status === 'PUBLISHED' &&
           now >= startDate && 
           now <= endDate &&
           (!event.maxParticipants || (event._count?.registrations || 0) < event.maxParticipants)
  }

  /**
   * Calculate days until event
   */
  const getDaysUntilEvent = (event: Event): number => {
    const now = new Date()
    const eventDate = new Date(event.startDate)
    const diffTime = eventDate.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  /**
   * Register user for event
   */
  const registerForEvent = async (eventId: string) => {
    try {
      loading.value = true
      const response = await $fetch(`/api/events/${eventId}/register`, {
        method: 'POST'
      }) as any
      userRegistration.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao se inscrever no evento'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get event comments
   */
  const getEventComments = async (eventId: string) => {
    try {
      const response = await $fetch(`/api/events/${eventId}/comments`) as any
      comments.value = response.data || []
      return response.data
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao carregar comentários'
      throw err
    }
  }

  /**
   * Add comment to event
   */
  const addEventComment = async (eventId: string, content: string) => {
    try {
      const response = await $fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        body: { content }
      }) as any
      return response.data
    } catch (err: any) {
      error.value = err.data?.message || 'Erro ao adicionar comentário'
      throw err
    }
  }

  // Reactive state for single event view
  const event = ref<Event | null>(null)
  const userRegistration = ref<any>(null)
  const registrationCount = ref(0)
  const comments = ref<any[]>([])
  const events = ref<Event[]>([])
  const categories = ref<any[]>([])
  const totalEvents = ref(0)
  const totalPages = ref(0)

  return {
    // State
    event: readonly(event),
    events: readonly(events),
    categories: readonly(categories),
    userRegistration: readonly(userRegistration),
    registrationCount: readonly(registrationCount),
    comments: readonly(comments),
    totalEvents: readonly(totalEvents),
    totalPages: readonly(totalPages),
    loading: readonly(loading),
    error: readonly(error),
    
    // Methods
    createEvent,
    updateEvent,
    getEvents,
    getEvent,
    deleteEvent,
    uploadCoverImage,
    uploadGalleryImages,
    getCategories,
    registerForEvent,
    getEventComments,
    addEventComment,
    generateSlug,
    formatStatus,
    getStatusColor,
    isRegistrationOpen,
    getDaysUntilEvent
  }
}
