<template>
  <div class="space-y-6">
    
    <!-- Submission Header -->
    <div class="flex items-start justify-between">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-2">
          {{ getParticipantName(submission) }}
        </h4>
        <div class="space-y-1 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:envelope" class="h-4 w-4" />
            <span>{{ getParticipantEmail(submission) }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:calendar" class="h-4 w-4" />
            <span>Inscrito em {{ formatDate(submission.submittedAt) }}</span>
          </div>
          <div v-if="submission.updatedAt !== submission.submittedAt" class="flex items-center space-x-2">
            <Icon name="heroicons:arrow-path" class="h-4 w-4" />
            <span>Atualizado em {{ formatDate(submission.updatedAt) }}</span>
          </div>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <UBadge
          :color="getStatusColor(submission.status)"
          variant="subtle"
          size="lg"
        >
          {{ getStatusLabel(submission.status) }}
        </UBadge>
      </div>
    </div>

    <!-- Status Update Section -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h5 class="text-sm font-medium text-gray-900 mb-3">
        Atualizar Status
      </h5>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Novo status
          </label>
          <USelectMenu
            v-model="newStatus"
            :options="statusOptions"
            placeholder="Selecione um status"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Motivo (opcional)
          </label>
          <UInput
            v-model="statusReason"
            placeholder="Ex: Documentação pendente..."
          />
        </div>
      </div>
      
      <div class="flex items-center space-x-3 mt-4">
        <UButton
          @click="updateStatus"
          :loading="updating"
          :disabled="!newStatus || newStatus === submission.status"
          color="primary"
        >
          <Icon name="heroicons:check" class="h-4 w-4 mr-2" />
          Atualizar Status
        </UButton>
        
        <UButton
          v-if="newStatus && newStatus !== submission.status"
          @click="resetStatusForm"
          variant="outline"
          color="gray"
        >
          Cancelar
        </UButton>
      </div>
    </div>

    <!-- Form Responses -->
    <div>
      <h5 class="text-lg font-medium text-gray-900 mb-4">
        Respostas do Formulário
      </h5>
      
      <div v-if="!submission.responses || submission.responses.length === 0" class="text-center py-8 text-gray-500">
        <Icon name="heroicons:document-text" class="h-8 w-8 mx-auto mb-2" />
        <p>Nenhuma resposta encontrada</p>
      </div>
      
      <div v-else class="space-y-4">
        <div
          v-for="response in sortedResponses"
          :key="response.id"
          class="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h6 class="font-medium text-gray-900">
                {{ response.field?.label || 'Campo sem nome' }}
                <span v-if="response.field?.required" class="text-red-500 ml-1">*</span>
              </h6>
              <p v-if="response.field?.helpText" class="text-sm text-gray-600 mt-1">
                {{ response.field.helpText }}
              </p>
            </div>
            
            <UBadge variant="outline" color="gray" size="xs">
              {{ getFieldTypeLabel(response.field?.type) }}
            </UBadge>
          </div>
          
          <div class="mt-3">
            <!-- Text responses -->
            <div v-if="['TEXT', 'TEXTAREA', 'EMAIL', 'PHONE', 'NUMBER'].includes(response.field?.type)">
              <p v-if="response.value" class="text-gray-900">
                {{ response.value }}
              </p>
              <p v-else class="text-gray-400 italic">Não respondido</p>
            </div>
            
            <!-- Date responses -->
            <div v-else-if="response.field?.type === 'DATE'">
              <p v-if="response.value" class="text-gray-900">
                {{ formatDateValue(response.value) }}
              </p>
              <p v-else class="text-gray-400 italic">Não respondido</p>
            </div>
            
            <!-- Select responses -->
            <div v-else-if="['SELECT', 'CHECKBOX'].includes(response.field?.type)">
              <div v-if="response.value" class="flex flex-wrap gap-2">
                <UBadge
                  v-for="value in parseSelectValue(response.value)"
                  :key="value"
                  color="blue"
                  variant="subtle"
                >
                  {{ getOptionLabel(response.field, value) }}
                </UBadge>
              </div>
              <p v-else class="text-gray-400 italic">Não respondido</p>
            </div>
            
            <!-- File responses -->
            <div v-else-if="response.field?.type === 'FILE'">
              <div v-if="response.value" class="flex items-center space-x-2">
                <Icon name="heroicons:document" class="h-5 w-5 text-gray-400" />
                <a 
                  :href="response.value"
                  target="_blank"
                  class="text-blue-600 hover:text-blue-800 underline"
                >
                  Ver arquivo
                </a>
              </div>
              <p v-else class="text-gray-400 italic">Nenhum arquivo enviado</p>
            </div>
            
            <!-- Unknown field type -->
            <div v-else>
              <p class="text-gray-900">{{ response.value || 'Não respondido' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Status History (if available) -->
    <div v-if="submission.statusHistory && submission.statusHistory.length > 0">
      <h5 class="text-lg font-medium text-gray-900 mb-4">
        Histórico de Status
      </h5>
      
      <div class="space-y-3">
        <div
          v-for="history in submission.statusHistory"
          :key="history.id"
          class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex-shrink-0">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">
                Status alterado para {{ getStatusLabel(history.status) }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatDate(history.createdAt) }}
              </p>
            </div>
            <p v-if="history.reason" class="text-sm text-gray-600 mt-1">
              {{ history.reason }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
      <UButton
        variant="outline"
        color="gray"
        @click="$emit('close')"
      >
        Fechar
      </UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  submission: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-status', 'close'])

// Composables
const { showToast } = useToast()

// State
const updating = ref(false)
const newStatus = ref('')
const statusReason = ref('')

// Options
const statusOptions = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'APPROVED', label: 'Aprovada' },
  { value: 'REJECTED', label: 'Rejeitada' },
  { value: 'INCOMPLETE', label: 'Incompleta' }
]

const fieldTypeLabels = {
  TEXT: 'Texto',
  TEXTAREA: 'Texto Longo',
  EMAIL: 'E-mail',
  PHONE: 'Telefone',
  NUMBER: 'Número',
  DATE: 'Data',
  SELECT: 'Seleção Única',
  CHECKBOX: 'Múltipla Escolha',
  FILE: 'Arquivo'
}

// Computed
const sortedResponses = computed(() => {
  if (!props.submission.responses) return []
  
  return [...props.submission.responses].sort((a, b) => {
    const orderA = a.field?.order || 999
    const orderB = b.field?.order || 999
    return orderA - orderB
  })
})

// Methods
async function updateStatus() {
  if (!newStatus.value || newStatus.value === props.submission.status) return
  
  try {
    updating.value = true
    
    await emit('update-status', props.submission.id, newStatus.value, statusReason.value)
    
    // Reset form
    resetStatusForm()
    
    showToast('Status atualizado com sucesso!', 'success')
  } catch (error) {
    console.error('Error updating status:', error)
    showToast('Erro ao atualizar status', 'error')
  } finally {
    updating.value = false
  }
}

function resetStatusForm() {
  newStatus.value = ''
  statusReason.value = ''
}

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

function getFieldTypeLabel(type) {
  return fieldTypeLabels[type] || type
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

function formatDateValue(dateStr) {
  if (!dateStr) return ''
  
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function parseSelectValue(value) {
  if (!value) return []
  
  try {
    // Try to parse as JSON array (for multiple values)
    return JSON.parse(value)
  } catch {
    // Single value
    return [value]
  }
}

function getOptionLabel(field, value) {
  if (!field?.options) return value
  
  const option = field.options.find(opt => opt.value === value)
  return option?.label || value
}

// Initialize status on mount
onMounted(() => {
  newStatus.value = props.submission.status
})
</script>
