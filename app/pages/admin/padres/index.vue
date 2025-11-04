<template>
  <div class="admin-priest-panel">
    <!-- Header -->
    <div class="panel-header">
      <div class="header-content">
        <div class="header-title">
          <Icon name="heroicons:users" class="header-icon" />
          <div>
            <h1>Gerenciamento de Padres</h1>
            <p>Visualize e gerencie os cadastros de padres pendentes</p>
          </div>
        </div>

        <div class="header-actions">
          <UButton @click="refreshData" :loading="refreshing" variant="outline">
            <Icon name="heroicons:arrow-path" />
            Atualizar
          </UButton>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filters-row">
        <UInput v-model="filters.search" placeholder="Buscar por nome, email ou CPF..."
          icon="heroicons:magnifying-glass" class="search-input" @input="debouncedSearch" />

        <USelectMenu v-model="filters.status" :options="statusOptions" placeholder="Todos os status"
          class="status-filter" @update:model-value="fetchRegistrations" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon pending">
          <Icon name="heroicons:clock" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.pending }}</div>
          <div class="stat-label">Pendentes</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon review">
          <Icon name="heroicons:eye" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.underReview }}</div>
          <div class="stat-label">Em Análise</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon approved">
          <Icon name="heroicons:check-circle" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.approved }}</div>
          <div class="stat-label">Aprovados</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon rejected">
          <Icon name="heroicons:x-circle" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ stats.rejected }}</div>
          <div class="stat-label">Rejeitados</div>
        </div>
      </div>
    </div>

    <!-- Registrations Table -->
    <div class="table-section">
      <div class="table-header">
        <h2>Cadastros Recentes</h2>
        <div class="pagination-info" v-if="pagination">
          Mostrando {{ ((pagination.page - 1) * pagination.limit) + 1 }} a
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} de
          {{ pagination.total }} registros
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <Icon name="heroicons:arrow-path" class="loading-icon" />
        <p>Carregando cadastros...</p>
      </div>

      <div v-else-if="registrations.length === 0" class="empty-state">
        <Icon name="heroicons:document-text" class="empty-icon" />
        <h3>Nenhum cadastro encontrado</h3>
        <p>Não há cadastros que correspondam aos filtros selecionados.</p>
      </div>

      <div v-else class="registrations-table">
        <div class="table-header-row">
          <div class="table-cell">Padre</div>
          <div class="table-cell">Email</div>
          <div class="table-cell">Diocese</div>
          <div class="table-cell">Status</div>
          <div class="table-cell">Data</div>
          <div class="table-cell">Ações</div>
        </div>

        <div v-for="registration in registrations" :key="registration.id" class="table-row">
          <div class="table-cell">
            <div class="priest-info">
              <div class="priest-name">
                {{ registration.firstName }} {{ registration.lastName }}
              </div>
              <div class="priest-details">
                CPF: {{ registration.cpf }}
              </div>
            </div>
          </div>

          <div class="table-cell">
            <div class="email-info">
              {{ registration.email }}
              <UBadge v-if="registration.emailVerified" size="xs" color="primary">
                Verificado
              </UBadge>
            </div>
          </div>

          <div class="table-cell">
            {{ registration.ordinationDiocese.name }}
          </div>

          <div class="table-cell">
            <UBadge :color="getStatusColor(registration.status)" variant="soft">
              {{ formatStatus(registration.status) }}
            </UBadge>
          </div>

          <div class="table-cell">
            <div class="date-info">
              <div>{{ formatDate(registration.createdAt) }}</div>
              <div class="date-time">{{ formatTime(registration.createdAt) }}</div>
            </div>
          </div>

          <div class="table-cell">
            <div class="actions-menu">
              <UDropdown :items="getActionItems(registration)">
                <UButton variant="ghost" size="sm">
                  <Icon name="heroicons:ellipsis-horizontal" />
                </UButton>
              </UDropdown>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.totalPages > 1" class="pagination-section">
        <UPagination v-model="currentPage" :page-count="pagination.limit" :total="pagination.total"
          @update:model-value="handlePageChange" />
      </div>
    </div>

    <!-- Status Update Modal -->
    <UModal v-model="statusModal.isOpen" :ui="{ width: 'sm:max-w-md' }">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Atualizar Status</h3>
          <UButton @click="statusModal.isOpen = false" variant="ghost" size="sm">
            <Icon name="heroicons:x-mark" />
          </UButton>
        </div>

        <div class="modal-body">
          <div class="priest-summary">
            <h4>{{ statusModal.registration?.firstName }} {{ statusModal.registration?.lastName }}</h4>
            <p>{{ statusModal.registration?.email }}</p>
          </div>

          <UFormGroup label="Novo Status" required>
            <USelectMenu v-model="statusModal.newStatus" :options="statusUpdateOptions"
              placeholder="Selecione o status" />
          </UFormGroup>

          <UFormGroup label="Comentários">
            <UTextarea v-model="statusModal.comments" placeholder="Comentários sobre a decisão (opcional)" :rows="3" />
          </UFormGroup>
        </div>

        <div class="modal-actions">
          <UButton @click="statusModal.isOpen = false" variant="outline" :disabled="updatingStatus">
            Cancelar
          </UButton>
          <UButton @click="updateRegistrationStatus" :loading="updatingStatus" :disabled="!statusModal.newStatus">
            Atualizar Status
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { PriestRegistrationStatus } from '@prisma/client'

// Page meta
definePageMeta({
  title: 'Painel Administrativo - Cadastro de Padres',
  description: 'Gerencie e aprove cadastros de padres na plataforma AcessoCatólico.',
  middleware: 'auth' // Adicionar middleware de autenticação quando implementado
})

// SEO
useSeoMeta({
  title: 'Painel Administrativo - Cadastro de Padres',
  description: 'Gerencie e aprove cadastros de padres na plataforma AcessoCatólico.'
})

// Composables
const { getRegistrations, updateStatus, formatStatus, getStatusColor } = usePriest()
const toast = useToast()

// Reactive data
const loading = ref(false)
const refreshing = ref(false)
const updatingStatus = ref(false)
const currentPage = ref(1)

const registrations = ref([])
const pagination = ref(null)
const stats = ref({
  pending: 0,
  underReview: 0,
  approved: 0,
  rejected: 0
})

const filters = reactive({
  search: '',
  status: ''
})

const statusModal = reactive({
  isOpen: false,
  registration: null as any,
  newStatus: '',
  comments: ''
})

// Options
const statusOptions = [
  { label: 'Todos os status', value: '' },
  { label: 'Pendente', value: 'PENDING' },
  { label: 'Em Análise', value: 'UNDER_REVIEW' },
  { label: 'Aprovado', value: 'APPROVED' },
  { label: 'Rejeitado', value: 'REJECTED' },
  { label: 'Requer Documentação', value: 'REQUIRES_DOCUMENTATION' }
]

const statusUpdateOptions = [
  { label: 'Em Análise', value: 'UNDER_REVIEW' },
  { label: 'Aprovar', value: 'APPROVED' },
  { label: 'Rejeitar', value: 'REJECTED' },
  { label: 'Solicitar Documentação', value: 'REQUIRES_DOCUMENTATION' }
]

// Methods
const fetchRegistrations = async () => {
  loading.value = true
  try {
    const params: any = {
      page: currentPage.value,
      limit: 10
    }

    if (filters.status) {
      params.status = filters.status
    }

    if (filters.search.trim()) {
      params.search = filters.search.trim()
    }

    const result = await getRegistrations(params)
    registrations.value = result.registrations
    pagination.value = result.pagination

    // Update stats
    updateStats()
  } catch (error: any) {
    toast.add({
      title: 'Erro ao carregar dados',
      description: error.message,
      color: 'ui'
    })
  } finally {
    loading.value = false
  }
}

const updateStats = async () => {
  try {
    // Fetch stats for each status
    const [pending, underReview, approved, rejected] = await Promise.all([
      getRegistrations({ status: 'PENDING' as PriestRegistrationStatus, limit: 1 }),
      getRegistrations({ status: 'UNDER_REVIEW' as PriestRegistrationStatus, limit: 1 }),
      getRegistrations({ status: 'APPROVED' as PriestRegistrationStatus, limit: 1 }),
      getRegistrations({ status: 'REJECTED' as PriestRegistrationStatus, limit: 1 })
    ])

    stats.value = {
      pending: pending.pagination.total,
      underReview: underReview.pagination.total,
      approved: approved.pagination.total,
      rejected: rejected.pagination.total
    }
  } catch (error) {
    console.error('Error updating stats:', error)
  }
}

const refreshData = async () => {
  refreshing.value = true
  try {
    await fetchRegistrations()
  } finally {
    refreshing.value = false
  }
}

const debouncedSearch = useDebounceFn(() => {
  currentPage.value = 1
  fetchRegistrations()
}, 500)

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchRegistrations()
}

const openStatusModal = (registration: any) => {
  statusModal.registration = registration
  statusModal.newStatus = ''
  statusModal.comments = ''
  statusModal.isOpen = true
}

const updateRegistrationStatus = async () => {
  if (!statusModal.registration || !statusModal.newStatus) return

  updatingStatus.value = true
  try {
    await updateStatus(
      statusModal.registration.id,
      statusModal.newStatus as PriestRegistrationStatus,
      statusModal.comments || undefined,
      'admin@acessocatolico.com' // TODO: Get from auth context
    )

    toast.add({
      title: 'Status atualizado',
      description: 'O status do cadastro foi atualizado com sucesso.',
      color: 'primary'
    })

    statusModal.isOpen = false
    await fetchRegistrations()
  } catch (error: any) {
    toast.add({
      title: 'Erro ao atualizar',
      description: error.message,
      color: 'ui'
    })
  } finally {
    updatingStatus.value = false
  }
}

const getActionItems = (registration: any) => [
  [{
    label: 'Ver Detalhes',
    icon: 'heroicons:eye',
    click: () => {
      // TODO: Navigate to detail page
      console.log('View details:', registration.id)
    }
  }],
  [{
    label: 'Atualizar Status',
    icon: 'heroicons:pencil-square',
    click: () => openStatusModal(registration)
  }]
]

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  fetchRegistrations()
})

// Watch filters
watch(() => filters.status, () => {
  currentPage.value = 1
  fetchRegistrations()
})
</script>

<style scoped>
.admin-priest-panel {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.panel-header {
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-title {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-primary-600);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.header-title h1 {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
}

.header-title p {
  color: var(--color-gray-600);
  margin: 0;
}

.filters-section {
  margin-bottom: 2rem;
}

.filters-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.status-filter {
  min-width: 200px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.pending {
  background-color: var(--color-amber-100);
  color: var(--color-amber-600);
}

.stat-icon.review {
  background-color: var(--color-blue-100);
  color: var(--color-blue-600);
}

.stat-icon.approved {
  background-color: var(--color-green-100);
  color: var(--color-green-600);
}

.stat-icon.rejected {
  background-color: var(--color-red-100);
  color: var(--color-red-600);
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--color-gray-900);
}

.stat-label {
  color: var(--color-gray-600);
  font-size: 0.875rem;
}

.table-section {
  background: white;
  border: 1px solid var(--color-gray-200);
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
}

.pagination-info {
  font-size: 0.875rem;
  color: var(--color-gray-600);
}

.loading-state,
.empty-state {
  padding: 3rem;
  text-align: center;
}

.loading-icon {
  width: 2rem;
  height: 2rem;
  color: var(--color-primary-600);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-gray-400);
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: var(--color-gray-600);
  margin: 0;
}

.registrations-table {
  display: flex;
  flex-direction: column;
}

.table-header-row,
.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
}

.table-header-row {
  background-color: var(--color-gray-50);
  font-weight: 600;
  color: var(--color-gray-900);
  font-size: 0.875rem;
}

.table-row {
  border-bottom: 1px solid var(--color-gray-100);
}

.table-row:hover {
  background-color: var(--color-gray-50);
}

.priest-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.priest-name {
  font-weight: 500;
  color: var(--color-gray-900);
}

.priest-details {
  font-size: 0.75rem;
  color: var(--color-gray-600);
}

.email-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-time {
  font-size: 0.75rem;
  color: var(--color-gray-600);
}

.pagination-section {
  padding: 1.5rem;
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: center;
}

.modal-content {
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.priest-summary {
  padding: 1rem;
  background-color: var(--color-gray-50);
  border-radius: 0.5rem;
}

.priest-summary h4 {
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0 0 0.25rem 0;
}

.priest-summary p {
  color: var(--color-gray-600);
  margin: 0;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 767px) {
  .admin-priest-panel {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-header-row,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--color-gray-600);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}
</style>
