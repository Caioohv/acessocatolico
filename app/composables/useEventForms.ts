import type { 
  EventForm, 
  EventFormField, 
  EventFormSubmission, 
  EventFormResponse,
  EventFormFieldType,
  EventFormSubmissionStatus 
} from '@prisma/client'

interface EventFormWithFields extends EventForm {
  fields: EventFormField[]
  submissions?: EventFormSubmission[]
}

interface EventFormSubmissionWithResponses extends EventFormSubmission {
  responses: EventFormResponse[]
  user?: { 
    profile?: { 
      firstName: string
      lastName: string 
    } 
  }
}

interface FormFieldOption {
  value: string
  label: string
}

interface FormFieldDefinition {
  id?: string
  type: EventFormFieldType
  name: string
  label: string
  placeholder?: string
  helpText?: string
  isRequired: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  options?: FormFieldOption[]
  showIfField?: string
  showIfValue?: string
  order: number
  group?: string
}

interface FormSubmissionData {
  [fieldName: string]: any
}

export const useEventForms = () => {

  // Form management
  const createForm = async (eventId: string, formData: Partial<EventForm>) => {
    return await $fetch<EventForm>(`/api/events/${eventId}/form`, {
      method: 'POST',
      body: formData
    })
  }

  const updateForm = async (eventId: string, formData: Partial<EventForm>) => {
    return await $fetch<EventForm>(`/api/events/${eventId}/form`, {
      method: 'PUT',
      body: formData
    })
  }

  const getForm = async (eventId: string): Promise<EventFormWithFields | null> => {
    try {
      return await $fetch<EventFormWithFields>(`/api/events/${eventId}/form`)
    } catch (error: any) {
      if (error.statusCode === 404) return null
      throw error
    }
  }

  const deleteForm = async (eventId: string) => {
    return await $fetch(`/api/events/${eventId}/form`, {
      method: 'DELETE'
    })
  }

  // Field management
  const addField = async (formId: string, fieldData: FormFieldDefinition) => {
    return await $fetch<EventFormField>(`/api/forms/${formId}/fields`, {
      method: 'POST',
      body: fieldData
    })
  }

  const updateField = async (fieldId: string, fieldData: Partial<FormFieldDefinition>) => {
    return await $fetch<EventFormField>(`/api/forms/fields/${fieldId}`, {
      method: 'PUT',
      body: fieldData
    })
  }

  const deleteField = async (fieldId: string) => {
    return await $fetch(`/api/forms/fields/${fieldId}`, {
      method: 'DELETE'
    })
  }

  const reorderFields = async (formId: string, fieldOrders: { id: string, order: number }[]) => {
    return await $fetch(`/api/forms/${formId}/fields/reorder`, {
      method: 'PUT',
      body: { fieldOrders }
    })
  }

  // Submissions
  const submitForm = async (eventId: string, submissionData: FormSubmissionData, userInfo?: { email: string, name: string, phone?: string }) => {
    return await $fetch<EventFormSubmission>(`/api/events/${eventId}/form/submit`, {
      method: 'POST',
      body: {
        data: submissionData,
        userInfo
      }
    })
  }

  const getSubmissions = async (eventId: string, page = 1, limit = 20, status?: EventFormSubmissionStatus) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })
    
    if (status) {
      params.append('status', status)
    }

    return await $fetch<{
      submissions: EventFormSubmissionWithResponses[]
      total: number
      totalPages: number
      currentPage: number
    }>(`/api/events/${eventId}/form/submissions?${params}`)
  }

  const getSubmission = async (submissionId: string): Promise<EventFormSubmissionWithResponses> => {
    return await $fetch<EventFormSubmissionWithResponses>(`/api/forms/submissions/${submissionId}`)
  }

  const updateSubmissionStatus = async (submissionId: string, status: EventFormSubmissionStatus, rejectedReason?: string) => {
    return await $fetch<EventFormSubmission>(`/api/forms/submissions/${submissionId}/status`, {
      method: 'PUT',
      body: { status, rejectedReason }
    })
  }

  const deleteSubmission = async (submissionId: string) => {
    return await $fetch(`/api/forms/submissions/${submissionId}`, {
      method: 'DELETE'
    })
  }

  // Export submissions
  const exportSubmissions = async (eventId: string, format: 'csv' | 'xlsx' = 'csv') => {
    const response = await $fetch<Blob>(`/api/events/${eventId}/form/export?format=${format}`, {
      responseType: 'blob'
    })
    
    const url = URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.download = `event-registrations.${format}`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Form validation
  const validateField = (field: EventFormField, value: any): string | null => {
    // Required validation
    if (field.isRequired && (!value || value === '')) {
      return `${field.label} é obrigatório`
    }

    if (!value || value === '') return null

    // Type-specific validation
    switch (field.type) {
      case 'EMAIL':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return 'Email inválido'
        }
        break

      case 'PHONE':
        const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/
        if (!phoneRegex.test(value)) {
          return 'Telefone inválido'
        }
        break

      case 'NUMBER':
        if (isNaN(Number(value))) {
          return 'Deve ser um número válido'
        }
        break

      case 'CPF':
        if (!validateCPF(value)) {
          return 'CPF inválido'
        }
        break

      case 'CEP':
        const cepRegex = /^\d{5}-?\d{3}$/
        if (!cepRegex.test(value)) {
          return 'CEP inválido'
        }
        break
    }

    // Length validation
    if (field.minLength && value.length < field.minLength) {
      return `Mínimo de ${field.minLength} caracteres`
    }

    if (field.maxLength && value.length > field.maxLength) {
      return `Máximo de ${field.maxLength} caracteres`
    }

    // Pattern validation
    if (field.pattern) {
      const pattern = new RegExp(field.pattern)
      if (!pattern.test(value)) {
        return 'Formato inválido'
      }
    }

    return null
  }

  const validateForm = (form: EventFormWithFields, data: FormSubmissionData): { [fieldName: string]: string } => {
    const errors: { [fieldName: string]: string } = {}

    for (const field of form.fields) {
      // Check conditional visibility
      if (field.showIfField && field.showIfValue) {
        const conditionFieldValue = data[field.showIfField]
        if (conditionFieldValue !== field.showIfValue) {
          continue // Skip validation for hidden fields
        }
      }

      const error = validateField(field, data[field.name])
      if (error) {
        errors[field.name] = error
      }
    }

    return errors
  }

  // Utility functions
  const getFieldTypeOptions = (): { value: EventFormFieldType, label: string }[] => {
    return [
      { value: 'TEXT', label: 'Texto' },
      { value: 'EMAIL', label: 'Email' },
      { value: 'PHONE', label: 'Telefone' },
      { value: 'NUMBER', label: 'Número' },
      { value: 'DATE', label: 'Data' },
      { value: 'DATETIME', label: 'Data e Hora' },
      { value: 'TIME', label: 'Hora' },
      { value: 'SELECT', label: 'Seleção Única' },
      { value: 'RADIO', label: 'Opções (Radio)' },
      { value: 'CHECKBOX', label: 'Múltipla Escolha' },
      { value: 'MULTISELECT', label: 'Seleção Múltipla' },
      { value: 'TEXTAREA', label: 'Texto Longo' },
      { value: 'FILE', label: 'Arquivo' },
      { value: 'BOOLEAN', label: 'Sim/Não' },
      { value: 'CPF', label: 'CPF' },
      { value: 'RG', label: 'RG' },
      { value: 'CEP', label: 'CEP' }
    ]
  }

  const isFieldVisible = (field: EventFormField, formData: FormSubmissionData): boolean => {
    if (!field.showIfField || !field.showIfValue) return true
    return formData[field.showIfField] === field.showIfValue
  }

  const generateSlug = (label: string): string => {
    return label
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .trim()
  }

  // CPF validation helper
  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '')
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cpf.charAt(10))) return false
    
    return true
  }

  return {
    // Form management
    createForm,
    updateForm,
    getForm,
    deleteForm,
    
    // Field management
    addField,
    updateField,
    deleteField,
    reorderFields,
    
    // Submissions
    submitForm,
    getSubmissions,
    getSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    exportSubmissions,
    
    // Validation
    validateField,
    validateForm,
    
    // Utilities
    getFieldTypeOptions,
    isFieldVisible,
    generateSlug,
    validateCPF
  }
}
