<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div class="flex items-center space-x-4">
            <NuxtLink 
              :to="`/eventos/${eventData?.slug || eventId}`"
              class="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Icon name="heroicons:arrow-left" class="h-5 w-5 mr-2" />
              Voltar ao evento
            </NuxtLink>
            <div class="border-l border-gray-300 pl-4">
              <h1 class="text-2xl font-bold text-gray-900">
                Inscrições do Evento
              </h1>
              <p class="text-sm text-gray-600 mt-1">
                {{ eventData?.title || 'Carregando...' }}
              </p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <UButton
              variant="outline"
              color="gray"
              @click="refreshSubmissions"
              :loading="loading"
            >
              <Icon name="heroicons:arrow-path" class="h-4 w-4 mr-2" />
              Atualizar
            </UButton>
            
            <UDropdown :items="exportMenuItems">
              <UButton
                variant="outline"
                color="blue"
                trailing-icon="heroicons:chevron-down-20-solid"
                :disabled="submissions.length === 0"
              >
                <Icon name="heroicons:arrow-down-tray" class="h-4 w-4 mr-2" />
                Exportar
              </UButton>
            </UDropdown>
            
            <UButton
              color="primary"
              @click="navigateTo(`/admin/eventos/${eventId}/formulario`)"
            >
              <Icon name="heroicons:cog-6-tooth" class="h-4 w-4 mr-2" />
              Configurar Formulário
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <Icon name="heroicons:document-text" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total de Inscrições</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <Icon name="heroicons:clock" class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Pendentes</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <Icon name="heroicons:check-circle" class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Aprovadas</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.approved }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <Icon name="heroicons:x-circle" class="h-6 w-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Rejeitadas</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.rejected }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Buscar inscrições
            </label>
            <UInput
              v-model="filters.search"
              placeholder="Nome, email, respostas..."
              icon="heroicons:magnifying-glass"
              @input="debouncedSearch"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <USelectMenu
              v-model="filters.status"
              :options="statusOptions"
              placeholder="Todos os status"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Data de inscrição
            </label>
            <UInput
              v-model="filters.dateFrom"
              type="date"
              placeholder="De"
            />
          </div>
          
          <div class="flex items-end space-x-2">
            <UButton
              variant="outline"
              color="gray"
              @click="clearFilters"
              class="flex-1"
            >
              <Icon name="heroicons:x-mark" class="h-4 w-4 mr-2" />
              Limpar
            </UButton>
          </div>
        </div>
        
        <!-- Bulk Actions -->
        <div v-if="selectedSubmissions.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              {{ selectedSubmissions.length }} inscrições selecionadas
            </div>
            
            <div class="flex items-center space-x-2">
              <UButton
                variant="outline"
                color="green"
                size="sm"
                @click="bulkUpdateStatus('APPROVED')"
                :loading="bulkUpdating"
              >
                <Icon name="heroicons:check" class="h-4 w-4 mr-1" />
                Aprovar selecionadas
              </UButton>
              
              <UButton
                variant="outline"
                color="red"
                size="sm"
                @click="bulkUpdateStatus('REJECTED')"
                :loading="bulkUpdating"
              >
                <Icon name="heroicons:x-mark" class="h-4 w-4 mr-1" />
                Rejeitar selecionadas
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Submissions List -->
      <div class="bg-white rounded-lg border border-gray-200">
        <div v-if="loading && submissions.length === 0" class="p-6">
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex items-center space-x-4">
              <USkeleton class="h-4 w-4" />
              <USkeleton class="h-4 w-1/4" />
              <USkeleton class="h-4 w-1/6" />
              <USkeleton class="h-4 w-1/6" />
              <USkeleton class="h-4 w-1/6" />
            </div>
          </div>
        </div>

        <div v-else-if="submissions.length === 0" class="text-center py-12">
          <Icon name="heroicons:inbox" class="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma inscrição encontrada</h3>
          <p class="text-gray-600 mb-6">
            {{ hasFilters ? 'Tente ajustar os filtros de busca' : 'Ainda não há inscrições para este evento' }}
          </p>
        </div>

        <div v-else>
          <!-- Table Header -->
          <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <div class="flex items-center space-x-4">
              <UCheckbox
                :checked="allSelected"
                :indeterminate="someSelected"
                @change="toggleSelectAll"
              />
              <div class="grid grid-cols-6 gap-4 w-full text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="col-span-2">Participante</div>
                <div>Status</div>
                <div>Data de Inscrição</div>
                <div>Última Atualização</div>
                <div>Ações</div>
              </div>
            </div>
          </div>

          <!-- Table Body -->
          <div class="divide-y divide-gray-200">
            <div
              v-for="submission in submissions"
              :key="submission.id"
              class="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <UCheckbox
                  :checked="selectedSubmissions.includes(submission.id)"
                  @change="toggleSubmissionSelection(submission.id)"
                />
                
                <div class="grid grid-cols-6 gap-4 w-full">
                  <!-- Participant Info -->
                  <div class="col-span-2">
                    <div class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <span class="text-sm font-medium text-gray-600">
                            {{ getInitials(submission.user?.profile?.firstName, submission.user?.profile?.lastName) }}
                          </span>
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="text-sm font-medium text-gray-900 truncate">
                          {{ getParticipantName(submission) }}
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                          {{ getParticipantEmail(submission) }}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Status -->
                  <div>
                    <UBadge
                      :color="getStatusColor(submission.status)"
                      variant="subtle"
                    >
                      {{ getStatusLabel(submission.status) }}
                    </UBadge>
                  </div>
                  
                  <!-- Submission Date -->
                  <div class="text-sm text-gray-600">
                    {{ formatDate(submission.submittedAt) }}
                  </div>
                  
                  <!-- Last Update -->
                  <div class="text-sm text-gray-600">
                    {{ formatDate(submission.updatedAt) }}
                  </div>
                  
                  <!-- Actions -->
                  <div>
                    <UDropdown :items="getSubmissionActions(submission)">
                      <UButton
                        variant="ghost"
                        color="gray"
                        trailing-icon="heroicons:chevron-down-20-solid"
                        size="sm"
                      >
                        Ações
                      </UButton>
                    </UDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Mostrando {{ ((pagination.page - 1) * pagination.limit) + 1 }} até 
                {{ Math.min(pagination.page * pagination.limit, pagination.total) }} 
                de {{ pagination.total }} inscrições
              </div>
              
              <UPagination
                v-model="pagination.page"
                :page-count="pagination.limit"
                :total="pagination.total"
                @update:model-value="loadSubmissions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Submission Details Modal -->
    <UModal v-model="showDetailsModal" :ui="{ width: 'max-w-4xl' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Detalhes da Inscrição</h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="heroicons:x-mark-20-solid"
              @click="showDetailsModal = false"
            />
          </div>
        </template>

        <SubmissionDetails
          v-if="selectedSubmission"
          :submission="selectedSubmission"
          @update-status="updateSubmissionStatus"
          @close="showDetailsModal = false"
        />
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
// Meta and middleware
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

// Route params
const route = useRoute()
const eventId = computed(() => route.params.eventId)

// Composables
const { showToast } = useToast()

// State
const loading = ref(true)
const bulkUpdating = ref(false)
const eventData = ref(null)
const submissions = ref([])
const selectedSubmissions = ref([])
const selectedSubmission = ref(null)
const showDetailsModal = ref(false)

// Filters and pagination
const filters = ref({
  search: '',
  status: '',
  dateFrom: '',
  dateTo: ''
})

const pagination = ref({
  page: 1,
  limit: 20,
  total: 0
})

// Stats
const stats = ref({
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
  incomplete: 0
})

// Options
const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'PENDING', label: 'Pendente' },
  { value: 'APPROVED', label: 'Aprovada' },
  { value: 'REJECTED', label: 'Rejeitada' },
  { value: 'INCOMPLETE', label: 'Incompleta' }
]

const exportMenuItems = [
  [{
    label: 'Exportar como CSV',
    icon: 'heroicons:document-arrow-down',
    click: () => exportSubmissions('csv')
  }],
  [{
    label: 'Exportar como XLSX',
    icon: 'heroicons:table-cells',
    click: () => exportSubmissions('xlsx')
  }]
]

// Computed
const hasFilters = computed(() => {
  return filters.value.search || filters.value.status || filters.value.dateFrom
})

const allSelected = computed(() => {
  return submissions.value.length > 0 && selectedSubmissions.value.length === submissions.value.length
})

const someSelected = computed(() => {
  return selectedSubmissions.value.length > 0 && selectedSubmissions.value.length < submissions.value.length
})

// Debounced search
const debouncedSearch = useDebounceFn(() => {
  pagination.value.page = 1
  loadSubmissions()
}, 300)

// Load data
async function loadSubmissions() {
  try {
    loading.value = true
    
    const params = new URLSearchParams({
      eventId: eventId.value.toString(),
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString()
    })
    
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.status) params.append('status', filters.value.status)
    if (filters.value.dateFrom) params.append('dateFrom', filters.value.dateFrom)
    if (filters.value.dateTo) params.append('dateTo', filters.value.dateTo)
    
    const { auth } = useAuth()
    const response = await $fetch(`/api/admin/submissions?${params}`, {
      headers: {
        authorization: `Bearer ${auth.value.token}`
      }
    })
    
    submissions.value = response.submissions
    pagination.value = { ...pagination.value, ...response.pagination }
    
    // Calcular estatísticas localmente
    stats.value = {
      total: response.submissions.length,
      pending: response.submissions.filter(s => s.status === 'PENDING').length,
      approved: response.submissions.filter(s => s.status === 'APPROVED').length,
      rejected: response.submissions.filter(s => s.status === 'REJECTED').length,
      incomplete: response.submissions.filter(s => s.status === 'INCOMPLETE').length
    }
  } catch (error) {
    console.error('Error loading submissions:', error)
    showToast('Erro ao carregar inscrições', 'error')
  } finally {
    loading.value = false
  }
}

async function loadEventData() {
  try {
    const { data } = await $fetch(`/api/events/${eventId.value}`)
    eventData.value = data
  } catch (error) {
    console.error('Error loading event:', error)
  }
}

// Actions
function toggleSelectAll() {
  if (allSelected.value) {
    selectedSubmissions.value = []
  } else {
    selectedSubmissions.value = submissions.value.map(s => s.id)
  }
}

function toggleSubmissionSelection(submissionId) {
  const index = selectedSubmissions.value.indexOf(submissionId)
  if (index >= 0) {
    selectedSubmissions.value.splice(index, 1)
  } else {
    selectedSubmissions.value.push(submissionId)
  }
}

function viewSubmissionDetails(submission) {
  selectedSubmission.value = submission
  showDetailsModal.value = true
}

async function updateSubmissionStatus(submissionId, status, reason = '') {
  try {
    const { success } = await $fetch(`/api/forms/submissions/${submissionId}/status`, {
      method: 'PUT',
      body: { status, reason }
    })
    
    if (success) {
      // Update local submission
      const submission = submissions.value.find(s => s.id === submissionId)
      if (submission) {
        submission.status = status
        submission.updatedAt = new Date().toISOString()
      }
      
      // Update stats
      await loadSubmissions()
      
      showToast(`Inscrição ${getStatusLabel(status).toLowerCase()} com sucesso!`, 'success')
    }
  } catch (error) {
    console.error('Error updating submission status:', error)
    showToast('Erro ao atualizar status da inscrição', 'error')
  }
}

async function bulkUpdateStatus(status) {
  if (selectedSubmissions.value.length === 0) return
  
  try {
    bulkUpdating.value = true
    
    const { auth } = useAuth()
    const response = await $fetch('/api/admin/submissions/bulk-update', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${auth.value.token}`
      },
      body: {
        submissionIds: selectedSubmissions.value,
        status,
        reason: '' // TODO: Add reason modal if needed
      }
    })
    
    if (response.success) {
      selectedSubmissions.value = []
      await loadSubmissions() // Reload data
      showToast(`${response.updated} inscrições atualizadas!`, 'success')
    }
  } catch (error) {
    console.error('Error bulk updating submissions:', error)
    showToast('Erro ao atualizar inscrições em lote', 'error')
  } finally {
    bulkUpdating.value = false
  }
}

async function exportSubmissions(format) {
  try {
    const { auth } = useAuth()
    const params = new URLSearchParams({
      eventId: eventId.value.toString(),
      format
    })
    
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.status) params.append('status', filters.value.status)
    if (filters.value.dateFrom) params.append('dateFrom', filters.value.dateFrom)
    if (filters.value.dateTo) params.append('dateTo', filters.value.dateTo)
    
    const response = await fetch(`/api/admin/events/${eventId.value}/export?${params}`, {
      headers: {
        authorization: `Bearer ${auth.value.token}`
      }
    })
    
    if (!response.ok) throw new Error('Export failed')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscricoes-${eventData.value?.title || eventId.value}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    showToast('Arquivo exportado com sucesso!', 'success')
  } catch (error) {
    console.error('Error exporting submissions:', error)
    showToast('Erro ao exportar inscrições', 'error')
  }
}

function getSubmissionActions(submission) {
  return [
    [{
      label: 'Ver detalhes',
      icon: 'heroicons:eye',
      click: () => viewSubmissionDetails(submission)
    }],
    [{
      label: 'Aprovar',
      icon: 'heroicons:check-circle',
      click: () => updateSubmissionStatus(submission.id, 'APPROVED'),
      disabled: submission.status === 'APPROVED'
    }],
    [{
      label: 'Rejeitar',
      icon: 'heroicons:x-circle',
      click: () => updateSubmissionStatus(submission.id, 'REJECTED'),
      disabled: submission.status === 'REJECTED'
    }],
    [{
      label: 'Marcar como incompleta',
      icon: 'heroicons:exclamation-triangle',
      click: () => updateSubmissionStatus(submission.id, 'INCOMPLETE'),
      disabled: submission.status === 'INCOMPLETE'
    }]
  ]
}

// Helper functions
function getParticipantName(submission) {
  if (submission.user?.profile) {
    return `${submission.user.profile.firstName} ${submission.user.profile.lastName}`.trim()
  }
  
  // Try to get name from form responses
  const nameResponse = submission.responses?.find(r => 
    r.field?.label?.toLowerCase().includes('nome') ||
    r.field?.type === 'TEXT' && r.field?.order === 1
  )
  
  return nameResponse?.value || 'Nome não informado'
}

function getParticipantEmail(submission) {
  if (submission.user?.email) {
    return submission.user.email
  }
  
  // Try to get email from form responses
  const emailResponse = submission.responses?.find(r => 
    r.field?.type === 'EMAIL'
  )
  
  return emailResponse?.value || 'Email não informado'
}

function getInitials(firstName, lastName) {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  return '??'
}

function getStatusColor(status) {
  const colors = {
    PENDING: 'yellow',
    APPROVED: 'green',
    REJECTED: 'red',
    INCOMPLETE: 'orange'
  }
  return colors[status] || 'gray'
}

function getStatusLabel(status) {
  const labels = {
    PENDING: 'Pendente',
    APPROVED: 'Aprovada',
    REJECTED: 'Rejeitada',
    INCOMPLETE: 'Incompleta'
  }
  return labels[status] || status
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function refreshSubmissions() {
  loadSubmissions()
}

function clearFilters() {
  filters.value = {
    search: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  }
  pagination.value.page = 1
  loadSubmissions()
}

// Watch filters
watch(
  () => [filters.value.status, filters.value.dateFrom, filters.value.dateTo],
  () => {
    pagination.value.page = 1
    loadSubmissions()
  }
)

// Load data on mount
onMounted(async () => {
  await Promise.all([
    loadEventData(),
    loadSubmissions()
  ])
})
</script>
