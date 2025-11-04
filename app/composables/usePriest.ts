import type { DocumentType, PriestRegistrationStatus } from '@prisma/client'

interface PriestRegistrationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  cpf: string
  bio?: string
  
  // Ecclesiastical Information
  ordinationNumber: string
  ordinationDate: string
  ordinationDiocese: string
  seminary?: string
  specializations?: string[]
  languages?: string[]
}

interface PriestRegistration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  cpf: string
  ordinationNumber: string
  ordinationDate: string
  ordinationDiocese: {
    id: string
    name: string
  }
  status: PriestRegistrationStatus
  statusUpdatedAt: string
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  documentsCount: number
  lastAction?: {
    fromStatus: PriestRegistrationStatus
    toStatus: PriestRegistrationStatus
    comments?: string
    createdAt: string
    adminEmail?: string
  }
}

interface PriestDocument {
  id: string
  type: DocumentType
  fileName: string
  originalFileName: string
  fileSize: number
  mimeType: string
  status: string
  uploadedAt: string
}

export const usePriest = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Submit priest registration
   */
  const submitRegistration = async (data: PriestRegistrationData): Promise<{ success: boolean; registrationId?: string; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        registrationId: string
        status: PriestRegistrationStatus
      }>('/api/priests/register', {
        method: 'POST',
        body: data
      })

      return {
        success: response.success,
        registrationId: response.registrationId,
        message: response.message
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao submeter cadastro'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload document for priest registration
   */
  const uploadDocument = async (
    registrationId: string, 
    documentType: DocumentType, 
    file: File
  ): Promise<{ success: boolean; document?: PriestDocument; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const formData = new FormData()
      formData.append('registrationId', registrationId)
      formData.append('documentType', documentType)
      formData.append('file', file)

      const response = await $fetch<{
        success: boolean
        message: string
        document: PriestDocument
      }>('/api/priests/upload-document', {
        method: 'POST',
        body: formData
      })

      return {
        success: response.success,
        document: response.document,
        message: response.message
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao enviar documento'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get priest registrations (admin only)
   */
  const getRegistrations = async (params?: {
    page?: number
    limit?: number
    status?: PriestRegistrationStatus
    search?: string
  }): Promise<{
    registrations: PriestRegistration[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
    }
  }> => {
    loading.value = true
    error.value = null
    
    try {
      const query = new URLSearchParams()
      
      if (params?.page) query.append('page', params.page.toString())
      if (params?.limit) query.append('limit', params.limit.toString())
      if (params?.status) query.append('status', params.status)
      if (params?.search) query.append('search', params.search)

      const response = await $fetch<{
        success: boolean
        data: {
          registrations: PriestRegistration[]
          pagination: any
        }
      }>(`/api/priests?${query.toString()}`)

      return response.data
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao buscar cadastros'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update registration status (admin only)
   */
  const updateStatus = async (
    registrationId: string,
    status: PriestRegistrationStatus,
    comments?: string,
    adminEmail?: string
  ): Promise<{ success: boolean; message: string }> => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>('/api/priests/update-status', {
        method: 'PUT',
        body: {
          registrationId,
          status,
          comments,
          adminEmail
        }
      })

      return {
        success: response.success,
        message: response.message
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || err.message || 'Erro ao atualizar status'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Format document type for display
   */
  const formatDocumentType = (type: DocumentType): string => {
    const types = {
      ORDINATION_CERTIFICATE: 'Certidão de Ordenação',
      IDENTITY_DOCUMENT: 'Documento de Identidade',
      RESIDENCE_PROOF: 'Comprovante de Residência',
      RECOMMENDATION_LETTER: 'Carta de Recomendação',
      OTHER: 'Outro'
    }
    return types[type] || type
  }

  /**
   * Format registration status for display
   */
  const formatStatus = (status: PriestRegistrationStatus): string => {
    const statuses = {
      PENDING: 'Pendente',
      UNDER_REVIEW: 'Em Análise',
      APPROVED: 'Aprovado',
      REJECTED: 'Rejeitado',
      REQUIRES_DOCUMENTATION: 'Requer Documentação'
    }
    return statuses[status] || status
  }

  /**
   * Get status color for display
   */
  const getStatusColor = (status: PriestRegistrationStatus): string => {
    const colors = {
      PENDING: 'amber',
      UNDER_REVIEW: 'blue',
      APPROVED: 'green',
      REJECTED: 'red',
      REQUIRES_DOCUMENTATION: 'orange'
    }
    return colors[status] || 'gray'
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    submitRegistration,
    uploadDocument,
    getRegistrations,
    updateStatus,
    formatDocumentType,
    formatStatus,
    getStatusColor
  }
}
