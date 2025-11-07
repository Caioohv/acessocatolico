<template>
  <div class="waiting-list-management">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Fila de Espera</h1>
        <p class="page-description">
          Gerencie a fila de espera para o evento "{{ eventTitle }}"
        </p>
      </div>
      <div class="header-actions">
        <UButton
          @click="promoteFromWaitingList"
          :loading="promoting"
          color="primary"
          icon="i-heroicons-arrow-up"
        >
          Promover Automático
        </UButton>
        <UButton
          @click="refreshWaitingList"
          :loading="loading"
          variant="outline"
          icon="i-heroicons-arrow-path"
        >
          Atualizar
        </UButton>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <UIcon name="i-heroicons-users" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ waitingList.length }}</div>
          <div class="stat-label">Na Fila de Espera</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <UIcon name="i-heroicons-check-circle" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ promotedCount }}</div>
          <div class="stat-label">Já Promovidos</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">
          <UIcon name="i-heroicons-clock" />
        </div>
        <div class="stat-content">
          <div class="stat-number">{{ availableSlots }}</div>
          <div class="stat-label">Vagas Disponíveis</div>
        </div>
      </div>
    </div>

    <!-- Lista da Fila de Espera -->
    <div class="waiting-list-section">
      <div class="section-header">
        <h2>Participantes na Fila</h2>
        <p v-if="waitingList.length === 0" class="empty-message">
          Nenhum participante na fila de espera no momento.
        </p>
      </div>

      <div v-if="waitingList.length > 0" class="waiting-list">
        <div
          v-for="(entry, index) in sortedWaitingList"
          :key="entry.id"
          class="waiting-list-item"
          :class="{ 'high-priority': entry.priority > 0 }"
        >
          <div class="position-badge">
            <span class="position-number">#{{ entry.position }}</span>
            <div v-if="entry.priority > 0" class="priority-indicator">
              <UIcon name="i-heroicons-star" />
              <span>{{ entry.priority }}</span>
            </div>
          </div>

          <div class="participant-info">
            <div class="participant-avatar">
              <img
                v-if="entry.user.profile?.avatar"
                :src="entry.user.profile.avatar"
                :alt="participantName(entry.user)"
                class="avatar-image"
              />
              <div v-else class="avatar-placeholder">
                {{ participantInitials(entry.user) }}
              </div>
            </div>
            
            <div class="participant-details">
              <div class="participant-name">{{ participantName(entry.user) }}</div>
              <div class="participant-email">{{ entry.user.email }}</div>
              <div class="participant-meta">
                <span class="joined-date">
                  Entrou em {{ formatDate(entry.joinedAt) }}
                </span>
                <div class="notification-prefs">
                  <UBadge v-if="entry.notifyEmail" color="blue" size="xs">
                    Email
                  </UBadge>
                  <UBadge v-if="entry.notifySms" color="green" size="xs">
                    SMS
                  </UBadge>
                </div>
              </div>
            </div>
          </div>

          <div class="waiting-actions">
            <UButton
              size="sm"
              @click="promoteIndividual(entry)"
              :loading="promotingIndividual === entry.id"
              color="primary"
            >
              Promover
            </UButton>
            
            <UButton
              size="sm"
              variant="outline"
              @click="editPriority(entry)"
            >
              Prioridade
            </UButton>
            
            <UButton
              size="sm"
              variant="ghost"
              color="red"
              @click="removeFromWaitingList(entry)"
            >
              Remover
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Histórico de Promoções -->
    <div v-if="promotedList.length > 0" class="promoted-section">
      <div class="section-header">
        <h2>Participantes Promovidos</h2>
        <p>Histórico de promoções da fila de espera.</p>
      </div>

      <div class="promoted-list">
        <div
          v-for="entry in promotedList"
          :key="entry.id"
          class="promoted-item"
        >
          <div class="participant-info">
            <div class="participant-avatar small">
              <img
                v-if="entry.user.profile?.avatar"
                :src="entry.user.profile.avatar"
                :alt="participantName(entry.user)"
                class="avatar-image"
              />
              <div v-else class="avatar-placeholder">
                {{ participantInitials(entry.user) }}
              </div>
            </div>
            
            <div class="participant-details">
              <div class="participant-name">{{ participantName(entry.user) }}</div>
              <div class="promotion-date">
                Promovido em {{ formatDate(entry.promotedAt) }}
              </div>
            </div>
          </div>

          <div class="promotion-badge">
            <UBadge color="green">
              <UIcon name="i-heroicons-check" />
              Promovido
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: Editar Prioridade -->
    <UModal v-model="showPriorityModal">
      <div class="modal-content">
        <h3>Editar Prioridade</h3>
        <p>Defina a prioridade para {{ selectedEntry?.user.email }}</p>
        
        <UFormGroup label="Prioridade (0 = normal, valores maiores = maior prioridade)">
          <UInput
            v-model.number="newPriority"
            type="number"
            min="0"
            max="10"
            placeholder="0"
          />
        </UFormGroup>

        <div class="modal-actions">
          <UButton
            variant="ghost"
            @click="showPriorityModal = false"
          >
            Cancelar
          </UButton>
          <UButton
            color="primary"
            @click="updatePriority"
            :loading="updatingPriority"
          >
            Salvar
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Metadata
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

// Props/Params
const route = useRoute()
const eventId = route.params.id as string

// Composables
const toast = useToast()

// Estados reativas
const loading = ref(false)
const promoting = ref(false)
const promotingIndividual = ref<string | null>(null)
const updatingPriority = ref(false)
const showPriorityModal = ref(false)
const selectedEntry = ref<any>(null)
const newPriority = ref(0)

const waitingList = ref<any[]>([])
const promotedList = ref<any[]>([])
const eventTitle = ref('')
const availableSlots = ref(0)

// Computed
const promotedCount = computed(() => promotedList.value.length)

const sortedWaitingList = computed(() => {
  return [...waitingList.value].sort((a, b) => {
    // Primeiro por prioridade (maior primeiro)
    if (a.priority !== b.priority) {
      return b.priority - a.priority
    }
    // Depois por posição (menor primeiro)
    return a.position - b.position
  })
})

// Métodos
const loadWaitingList = async () => {
  try {
    loading.value = true
    
    const response = await $fetch(`/api/admin/events/${eventId}/waiting-list`)
    
    waitingList.value = response.waiting || []
    promotedList.value = response.promoted || []
    availableSlots.value = response.availableSlots || 0
    
    // Buscar informações do evento
    const event = await $fetch(`/api/events/${eventId}`)
    eventTitle.value = event.title
  } catch (error) {
    console.error('Erro ao carregar fila de espera:', error)
    toast.add({
      title: 'Erro',
      description: 'Erro ao carregar fila de espera',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

const refreshWaitingList = () => {
  loadWaitingList()
}

const promoteFromWaitingList = async () => {
  try {
    promoting.value = true
    
    const response = await $fetch(`/api/admin/events/${eventId}/waiting-list/promote`, {
      method: 'POST'
    })
    
    toast.add({
      title: 'Sucesso',
      description: response.message,
      color: 'green'
    })
    
    await loadWaitingList()
  } catch (error) {
    console.error('Erro na promoção automática:', error)
    toast.add({
      title: 'Erro',
      description: 'Erro ao promover participantes',
      color: 'red'
    })
  } finally {
    promoting.value = false
  }
}

const promoteIndividual = async (entry: any) => {
  try {
    promotingIndividual.value = entry.id
    
    await $fetch(`/api/admin/events/${eventId}/waiting-list`, {
      method: 'PUT',
      body: {
        userId: entry.userId,
        action: 'promote'
      }
    })
    
    toast.add({
      title: 'Sucesso',
      description: `${participantName(entry.user)} foi promovido da fila de espera`,
      color: 'green'
    })
    
    await loadWaitingList()
  } catch (error) {
    console.error('Erro ao promover participante:', error)
    toast.add({
      title: 'Erro',
      description: 'Erro ao promover participante',
      color: 'red'
    })
  } finally {
    promotingIndividual.value = null
  }
}

const editPriority = (entry: any) => {
  selectedEntry.value = entry
  newPriority.value = entry.priority
  showPriorityModal.value = true
}

const updatePriority = async () => {
  if (!selectedEntry.value) return
  
  try {
    updatingPriority.value = true
    
    await $fetch(`/api/admin/events/${eventId}/waiting-list`, {
      method: 'PUT',
      body: {
        userId: selectedEntry.value.userId,
        action: 'update_priority',
        priority: newPriority.value
      }
    })
    
    toast.add({
      title: 'Sucesso',
      description: 'Prioridade atualizada',
      color: 'green'
    })
    
    showPriorityModal.value = false
    await loadWaitingList()
  } catch (error) {
    console.error('Erro ao atualizar prioridade:', error)
    toast.add({
      title: 'Erro',
      description: 'Erro ao atualizar prioridade',
      color: 'red'
    })
  } finally {
    updatingPriority.value = false
  }
}

const removeFromWaitingList = async (entry: any) => {
  if (!confirm(`Tem certeza que deseja remover ${participantName(entry.user)} da fila de espera?`)) {
    return
  }
  
  try {
    await $fetch(`/api/admin/events/${eventId}/waiting-list`, {
      method: 'DELETE',
      body: {
        userId: entry.userId
      }
    })
    
    toast.add({
      title: 'Sucesso',
      description: `${participantName(entry.user)} foi removido da fila de espera`,
      color: 'green'
    })
    
    await loadWaitingList()
  } catch (error) {
    console.error('Erro ao remover da fila:', error)
    toast.add({
      title: 'Erro',
      description: 'Erro ao remover da fila de espera',
      color: 'red'
    })
  }
}

// Utilitários
const participantName = (user: any) => {
  const profile = user.profile
  if (profile?.firstName && profile?.lastName) {
    return `${profile.firstName} ${profile.lastName}`
  }
  return user.email.split('@')[0]
}

const participantInitials = (user: any) => {
  const name = participantName(user)
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Ciclo de vida
onMounted(() => {
  loadWaitingList()
})
</script>

<style scoped>
.waiting-list-management {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.page-description {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--color-primary-50);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.waiting-list-section,
.promoted-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--color-text-secondary);
}

.empty-message {
  color: var(--color-text-secondary);
  font-style: italic;
}

.waiting-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.waiting-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-gray-50);
}

.waiting-list-item.high-priority {
  border-color: var(--color-yellow-300);
  background: var(--color-yellow-50);
}

.position-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 60px;
}

.position-number {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.priority-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-yellow-600);
  font-size: 0.75rem;
}

.participant-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.participant-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.participant-avatar.small {
  width: 32px;
  height: 32px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.participant-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.participant-email {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.participant-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.joined-date {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.notification-prefs {
  display: flex;
  gap: 0.5rem;
}

.waiting-actions {
  display: flex;
  gap: 0.5rem;
}

.promoted-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.promoted-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--color-green-50);
  border: 1px solid var(--color-green-200);
  border-radius: 6px;
}

.promotion-date {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.promotion-badge {
  display: flex;
  align-items: center;
}

.modal-content {
  padding: 2rem;
}

.modal-content h3 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-content p {
  margin-bottom: 1.5rem;
  color: var(--color-text-secondary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .waiting-list-management {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: stretch;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .waiting-list-item {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .participant-info {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .waiting-actions {
    justify-content: center;
  }
}
</style>
