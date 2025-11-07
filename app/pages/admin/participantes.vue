<template>
  <div class="admin-participants">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Sistema de Classificação de Participantes</h1>
        <p class="page-description">
          Gerencie perfis, níveis, badges e promoções dos participantes
        </p>
      </div>
      <div class="header-actions">
        <UButton
          icon="i-heroicons-plus"
          @click="showCreateBadgeModal = true"
          color="primary"
        >
          Criar Badge
        </UButton>
      </div>
    </div>

    <!-- Tabs -->
    <UTabs v-model="activeTab" :items="tabs" class="main-tabs">
      <!-- Tab 1: Participantes -->
      <template #participants>
        <div class="participants-section">
          <!-- Filtros -->
          <div class="filters-section">
            <div class="filters-grid">
              <UInput
                v-model="filters.search"
                placeholder="Buscar participantes..."
                icon="i-heroicons-magnifying-glass"
                @input="debouncedSearch"
              />
              <USelect
                v-model="filters.level"
                :options="levelOptions"
                placeholder="Filtrar por nível"
              />
              <USelect
                v-model="filters.role"
                :options="roleOptions"
                placeholder="Filtrar por função"
              />
              <UButton
                @click="clearFilters"
                variant="ghost"
                icon="i-heroicons-x-mark"
              >
                Limpar
              </UButton>
            </div>
          </div>

          <!-- Lista de Participantes -->
          <div class="participants-grid">
            <div
              v-for="participant in participants"
              :key="participant.id"
              class="participant-card"
            >
              <div class="participant-header">
                <div class="participant-avatar">
                  <img
                    v-if="participant.user.profile?.avatar"
                    :src="participant.user.profile.avatar"
                    :alt="participantName(participant)"
                    class="avatar-image"
                  />
                  <div v-else class="avatar-placeholder">
                    {{ participantInitials(participant) }}
                  </div>
                </div>
                <div class="participant-info">
                  <h3 class="participant-name">{{ participantName(participant) }}</h3>
                  <p class="participant-email">{{ participant.user.email }}</p>
                </div>
              </div>

              <div class="participant-stats">
                <div class="stat-item">
                  <span class="stat-label">Nível:</span>
                  <UBadge :color="getLevelColor(participant.level)">
                    {{ getLevelLabel(participant.level) }}
                  </UBadge>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Função:</span>
                  <UBadge color="gray">
                    {{ getRoleLabel(participant.role) }}
                  </UBadge>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Eventos:</span>
                  <span class="stat-value">{{ participant.totalEvents }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Horas:</span>
                  <span class="stat-value">{{ participant.totalHours }}h</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Pontos:</span>
                  <span class="stat-value">{{ participant.points }}</span>
                </div>
              </div>

              <div class="participant-badges">
                <h4>Badges ({{ participant.badges.length }})</h4>
                <div class="badges-grid">
                  <div
                    v-for="participantBadge in participant.badges.slice(0, 3)"
                    :key="participantBadge.id"
                    class="badge-item"
                    :title="participantBadge.badge.name"
                  >
                    <div
                      class="badge-icon"
                      :style="{ backgroundColor: participantBadge.badge.color }"
                    >
                      <UIcon
                        v-if="participantBadge.badge.iconUrl"
                        :name="participantBadge.badge.iconUrl"
                      />
                      <span v-else>🏆</span>
                    </div>
                  </div>
                  <div v-if="participant.badges.length > 3" class="more-badges">
                    +{{ participant.badges.length - 3 }}
                  </div>
                </div>
              </div>

              <div class="participant-actions">
                <UButton
                  size="sm"
                  variant="ghost"
                  @click="showParticipantDetails(participant)"
                >
                  Ver Detalhes
                </UButton>
                <UButton
                  size="sm"
                  color="primary"
                  @click="showPromoteModal(participant)"
                >
                  Promover
                </UButton>
                <UButton
                  size="sm"
                  variant="outline"
                  @click="showAwardBadgeModal(participant)"
                >
                  Atribuir Badge
                </UButton>
              </div>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Carregando participantes...</p>
          </div>

          <!-- Empty state -->
          <div v-else-if="participants.length === 0" class="empty-state">
            <UIcon name="i-heroicons-users" class="empty-icon" />
            <h3>Nenhum participante encontrado</h3>
            <p>Não há participantes cadastrados no sistema ainda.</p>
          </div>
        </div>
      </template>

      <!-- Tab 2: Badges -->
      <template #badges>
        <div class="badges-section">
          <div class="badges-grid">
            <div
              v-for="badge in badges"
              :key="badge.id"
              class="badge-card"
            >
              <div class="badge-header">
                <div
                  class="badge-icon-large"
                  :style="{ backgroundColor: badge.color }"
                >
                  <UIcon
                    v-if="badge.iconUrl"
                    :name="badge.iconUrl"
                    size="24"
                  />
                  <span v-else class="default-icon">🏆</span>
                </div>
                <div class="badge-info">
                  <h3 class="badge-name">{{ badge.name }}</h3>
                  <p class="badge-type">{{ getBadgeTypeLabel(badge.type) }}</p>
                </div>
              </div>

              <p class="badge-description">{{ badge.description }}</p>

              <div class="badge-stats">
                <div class="stat">
                  <span class="stat-label">Atribuído:</span>
                  <span class="stat-value">{{ badge.totalAwarded }} vezes</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Auto-atribuição:</span>
                  <UBadge :color="badge.isAutoAwarded ? 'green' : 'gray'">
                    {{ badge.isAutoAwarded ? 'Sim' : 'Não' }}
                  </UBadge>
                </div>
                <div class="stat">
                  <span class="stat-label">Status:</span>
                  <UBadge :color="badge.isActive ? 'green' : 'red'">
                    {{ badge.isActive ? 'Ativo' : 'Inativo' }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Tab 3: Ministérios -->
      <template #ministries>
        <div class="ministries-section">
          <div class="ministries-grid">
            <div
              v-for="ministry in ministries"
              :key="ministry.id"
              class="ministry-card"
            >
              <div class="ministry-header">
                <h3 class="ministry-name">{{ ministry.name }}</h3>
                <UBadge :color="ministry.isActive ? 'green' : 'red'">
                  {{ ministry.isActive ? 'Ativo' : 'Inativo' }}
                </UBadge>
              </div>

              <p class="ministry-description">{{ ministry.description }}</p>

              <div class="ministry-stats">
                <div class="stat">
                  <span class="stat-label">Membros:</span>
                  <span class="stat-value">{{ ministry._count.members }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Serviços:</span>
                  <span class="stat-value">{{ ministry._count.services }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Nível mínimo:</span>
                  <UBadge :color="getLevelColor(ministry.minLevel)">
                    {{ getLevelLabel(ministry.minLevel) }}
                  </UBadge>
                </div>
              </div>

              <div v-if="ministry.leader" class="ministry-leader">
                <h4>Líder:</h4>
                <p>{{ ministry.leader.profile?.firstName }} {{ ministry.leader.profile?.lastName }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UTabs>

    <!-- Modal: Criar Badge -->
    <UModal v-model="showCreateBadgeModal">
      <div class="modal-content">
        <h2>Criar Novo Badge</h2>
        <form @submit.prevent="createNewBadge">
          <div class="form-grid">
            <UFormGroup label="Nome" required>
              <UInput
                v-model="newBadge.name"
                placeholder="Nome do badge"
                required
              />
            </UFormGroup>

            <UFormGroup label="Tipo" required>
              <USelect
                v-model="newBadge.type"
                :options="badgeTypeOptions"
                placeholder="Selecionar tipo"
                required
              />
            </UFormGroup>

            <UFormGroup label="Cor">
              <UInput
                v-model="newBadge.color"
                type="color"
                placeholder="#6B7280"
              />
            </UFormGroup>

            <UFormGroup label="Ícone URL">
              <UInput
                v-model="newBadge.iconUrl"
                placeholder="heroicons:trophy"
              />
            </UFormGroup>
          </div>

          <UFormGroup label="Descrição" required>
            <UTextarea
              v-model="newBadge.description"
              placeholder="Descrição detalhada do badge..."
              required
            />
          </UFormGroup>

          <UCheckbox
            v-model="newBadge.isAutoAwarded"
            label="Atribuição automática"
          />

          <div class="modal-actions">
            <UButton
              type="button"
              variant="ghost"
              @click="showCreateBadgeModal = false"
            >
              Cancelar
            </UButton>
            <UButton
              type="submit"
              color="primary"
              :loading="loading"
            >
              Criar Badge
            </UButton>
          </div>
        </form>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// Metadata
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  title: 'Sistema de Participantes - Admin'
})

// Composables
const { 
  participants, 
  badges, 
  ministries, 
  loading, 
  error,
  fetchParticipants,
  fetchBadges,
  fetchMinistries,
  createBadge,
  awardBadge,
  promoteParticipant,
  getLevelLabel,
  getRoleLabel,
  getBadgeTypeLabel
} = useParticipants()

const toast = useToast()

// Estados reativas
const activeTab = ref(0)
const showCreateBadgeModal = ref(false)

// Filtros
const filters = reactive({
  search: '',
  level: '',
  role: ''
})

// Formulário de badge
const newBadge = reactive({
  name: '',
  description: '',
  type: '',
  iconUrl: '',
  color: '#6B7280',
  isAutoAwarded: false
})

// Configurações
const tabs = [
  { key: 'participants', label: 'Participantes' },
  { key: 'badges', label: 'Badges' },
  { key: 'ministries', label: 'Ministérios' }
]

const levelOptions = [
  { label: 'Todos os níveis', value: '' },
  { label: 'Novato', value: 'NOVICE' },
  { label: 'Servo', value: 'SERVANT' },
  { label: 'Líder', value: 'LEADER' }
]

const roleOptions = [
  { label: 'Todas as funções', value: '' },
  { label: 'Membro', value: 'MEMBER' },
  { label: 'Servo', value: 'SERVANT' },
  { label: 'Líder', value: 'LEADER' },
  { label: 'Responsável', value: 'MINISTRY_HEAD' }
]

const badgeTypeOptions = [
  { label: 'Participação', value: 'PARTICIPATION' },
  { label: 'Conquista', value: 'ACHIEVEMENT' },
  { label: 'Liderança', value: 'LEADERSHIP' },
  { label: 'Serviço', value: 'SERVICE' },
  { label: 'Especial', value: 'SPECIAL' }
]

// Métodos
const loadData = async () => {
  try {
    await Promise.all([
      fetchParticipants(filters),
      fetchBadges(),
      fetchMinistries()
    ])
  } catch (err) {
    toast.add({
      title: 'Erro',
      description: 'Erro ao carregar dados',
      color: 'red'
    })
  }
}

const debouncedSearch = useDebounceFn(() => {
  fetchParticipants(filters)
}, 500)

const clearFilters = () => {
  filters.search = ''
  filters.level = ''
  filters.role = ''
  fetchParticipants()
}

const createNewBadge = async () => {
  try {
    await createBadge(newBadge)
    
    // Reset form
    Object.assign(newBadge, {
      name: '',
      description: '',
      type: '',
      iconUrl: '',
      color: '#6B7280',
      isAutoAwarded: false
    })
    
    showCreateBadgeModal.value = false
    
    toast.add({
      title: 'Sucesso',
      description: 'Badge criado com sucesso!',
      color: 'green'
    })
    
    await fetchBadges()
  } catch (err) {
    toast.add({
      title: 'Erro',
      description: 'Erro ao criar badge',
      color: 'red'
    })
  }
}

// Utilitários
const participantName = (participant: any) => {
  const profile = participant.user.profile
  if (profile?.firstName && profile?.lastName) {
    return `${profile.firstName} ${profile.lastName}`
  }
  return participant.user.email.split('@')[0]
}

const participantInitials = (participant: any) => {
  const name = participantName(participant)
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getLevelColor = (level: string) => {
  const colors = {
    'NOVICE': 'gray',
    'SERVANT': 'blue',
    'LEADER': 'green'
  }
  return colors[level as keyof typeof colors] || 'gray'
}

const showParticipantDetails = (participant: any) => {
  // TODO: Implementar modal de detalhes
  console.log('Show details for:', participant)
}

const showPromoteModal = (participant: any) => {
  // TODO: Implementar modal de promoção
  console.log('Promote:', participant)
}

const showAwardBadgeModal = (participant: any) => {
  // TODO: Implementar modal de atribuição de badge
  console.log('Award badge to:', participant)
}

// Ciclo de vida
onMounted(() => {
  loadData()
})

// Watchers
watch(() => filters.level, () => {
  fetchParticipants(filters)
})

watch(() => filters.role, () => {
  fetchParticipants(filters)
})
</script>

<style scoped>
.admin-participants {
  padding: 2rem;
  max-width: 1400px;
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

.main-tabs {
  margin-bottom: 2rem;
}

.filters-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filters-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.participants-grid,
.badges-grid,
.ministries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.participant-card,
.badge-card,
.ministry-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.participant-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.participant-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
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
  font-size: 1.2rem;
}

.participant-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.participant-email {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.participant-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.stat-value {
  font-weight: 500;
  color: var(--color-text-primary);
}

.participant-badges {
  margin-bottom: 1rem;
}

.participant-badges h4 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
}

.badges-grid {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.badge-item {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.more-badges {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.participant-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.badge-icon-large {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.badge-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.badge-type {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.badge-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.badge-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ministry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.ministry-name {
  font-weight: 600;
}

.ministry-description {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.ministry-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ministry-leader h4 {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.modal-content {
  padding: 2rem;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .admin-participants {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .participants-grid,
  .badges-grid,
  .ministries-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
