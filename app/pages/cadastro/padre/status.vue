<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Status do Cadastro</h1>
        <p class="text-gray-600">Consulte o andamento do seu cadastro de padre</p>
      </div>

      <!-- Search Form -->
      <UCard class="mb-8 shadow-lg">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5 text-purple-600" />
            <h2 class="text-lg font-semibold">Consultar Status</h2>
          </div>
        </template>

        <UForm @submit="searchRegistration" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormGroup label="Email" required>
              <UInput 
                v-model="searchForm.email" 
                type="email" 
                placeholder="seu.email@exemplo.com"
                :disabled="loading"
              />
            </UFormGroup>

            <UFormGroup label="CPF" required>
              <UInput 
                v-model="searchForm.cpf" 
                placeholder="000.000.000-00"
                :disabled="loading"
                @input="formatCPF"
              />
            </UFormGroup>
          </div>

          <div class="flex justify-center">
            <UButton 
              type="submit" 
              :loading="loading"
              size="lg"
              icon="i-heroicons-magnifying-glass"
            >
              Consultar Status
            </UButton>
          </div>
        </UForm>
      </UCard>

      <!-- Registration Details -->
      <div v-if="registration" class="space-y-6">
        <!-- Status Card -->
        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-user" class="w-5 h-5 text-purple-600" />
                <h2 class="text-lg font-semibold">Informações do Cadastro</h2>
              </div>
              <UBadge 
                :color="getStatusColor(registration.status)"
                variant="subtle"
                size="lg"
              >
                {{ formatStatus(registration.status) }}
              </UBadge>
            </div>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div>
                <span class="text-sm font-medium text-gray-500">Nome Completo</span>
                <p class="text-gray-900">{{ registration.firstName }} {{ registration.lastName }}</p>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-500">Email</span>
                <p class="text-gray-900">{{ registration.email }}</p>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-500">Número de Ordenação</span>
                <p class="text-gray-900">{{ registration.ordinationNumber }}</p>
              </div>
            </div>

            <div class="space-y-3">
              <div>
                <span class="text-sm font-medium text-gray-500">Diocese de Ordenação</span>
                <p class="text-gray-900">{{ registration.ordinationDiocese.name }}</p>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-500">Data de Cadastro</span>
                <p class="text-gray-900">{{ formatDate(registration.createdAt) }}</p>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-500">Última Atualização</span>
                <p class="text-gray-900">{{ formatDate(registration.statusUpdatedAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Email Verification Status -->
          <div class="mt-6 p-4 rounded-lg" :class="registration.emailVerified ? 'bg-green-50' : 'bg-yellow-50'">
            <div class="flex items-center gap-3">
              <UIcon 
                :name="registration.emailVerified ? 'i-heroicons-check-circle' : 'i-heroicons-exclamation-triangle'" 
                :class="registration.emailVerified ? 'text-green-600' : 'text-yellow-600'"
                class="w-5 h-5"
              />
              <div>
                <p class="font-medium" :class="registration.emailVerified ? 'text-green-900' : 'text-yellow-900'">
                  {{ registration.emailVerified ? 'Email Verificado' : 'Email Não Verificado' }}
                </p>
                <p class="text-sm" :class="registration.emailVerified ? 'text-green-700' : 'text-yellow-700'">
                  {{ registration.emailVerified 
                    ? 'Seu email foi confirmado com sucesso.' 
                    : 'Verifique sua caixa de entrada e confirme seu email.' 
                  }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Status Timeline -->
        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-purple-600" />
              <h2 class="text-lg font-semibold">Histórico do Processo</h2>
            </div>
          </template>

          <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin w-8 h-8">
              <UIcon name="i-heroicons-arrow-path" class="w-full h-full text-purple-600" />
            </div>
          </div>

          <div v-else-if="history?.length" class="space-y-4">
            <div 
              v-for="(item, index) in history" 
              :key="item.id"
              class="flex gap-4 pb-4"
              :class="{ 'border-b': index < history.length - 1 }"
            >
              <div class="flex flex-col items-center">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="getTimelineIconClass(item.toStatus)"
                >
                  <UIcon :name="getTimelineIcon(item.toStatus)" class="w-4 h-4" />
                </div>
                <div v-if="index < history.length - 1" class="w-0.5 h-8 bg-gray-200 mt-2"></div>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-gray-900">
                    {{ formatStatus(item.toStatus) }}
                  </span>
                  <span class="text-sm text-gray-500">
                    {{ formatDate(item.createdAt) }}
                  </span>
                </div>

                <p v-if="item.comments" class="text-sm text-gray-600 mb-2">
                  {{ item.comments }}
                </p>

                <p v-if="item.adminEmail" class="text-xs text-gray-500">
                  Processado por: {{ item.adminEmail }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500">
            <UIcon name="i-heroicons-clock" class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum histórico disponível ainda</p>
          </div>
        </UCard>

        <!-- Next Steps -->
        <UCard class="shadow-lg">
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 text-purple-600" />
              <h2 class="text-lg font-semibold">Próximos Passos</h2>
            </div>
          </template>

          <div class="prose max-w-none">
            <div v-if="registration.status === 'PENDING'">
              <p class="text-gray-600 mb-4">Seu cadastro foi recebido e está na fila para análise.</p>
              <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Confirme seu email se ainda não o fez</li>
                <li>Aguarde a análise da nossa equipe (2-3 dias úteis)</li>
                <li>Você receberá notificações por email sobre mudanças de status</li>
              </ul>
            </div>

            <div v-else-if="registration.status === 'UNDER_REVIEW'">
              <p class="text-gray-600 mb-4">Sua documentação está sendo analisada pela nossa equipe.</p>
              <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Nossa equipe está verificando seus documentos</li>
                <li>Tempo estimado: 2-3 dias úteis</li>
                <li>Você receberá um email com o resultado</li>
              </ul>
            </div>

            <div v-else-if="registration.status === 'APPROVED'">
              <div class="bg-green-50 p-4 rounded-lg">
                <p class="text-green-800 font-medium mb-2">🎉 Parabéns! Seu cadastro foi aprovado!</p>
                <ul class="list-disc list-inside space-y-2 text-sm text-green-700">
                  <li>Você deve ter recebido um email com suas credenciais de acesso</li>
                  <li>Acesse a plataforma e complete seu perfil</li>
                  <li>Conecte-se à sua paróquia</li>
                </ul>
              </div>
            </div>

            <div v-else-if="registration.status === 'REJECTED'">
              <div class="bg-red-50 p-4 rounded-lg">
                <p class="text-red-800 font-medium mb-2">Cadastro necessita correções</p>
                <ul class="list-disc list-inside space-y-2 text-sm text-red-700">
                  <li>Verifique os comentários da nossa equipe</li>
                  <li>Corrija as informações necessárias</li>
                  <li>Reenvie sua documentação</li>
                </ul>
              </div>
            </div>

            <div v-else-if="registration.status === 'REQUIRES_DOCUMENTATION'">
              <div class="bg-yellow-50 p-4 rounded-lg">
                <p class="text-yellow-800 font-medium mb-2">Documentação adicional necessária</p>
                <ul class="list-disc list-inside space-y-2 text-sm text-yellow-700">
                  <li>Alguns documentos precisam ser atualizados</li>
                  <li>Verifique os comentários específicos</li>
                  <li>Reenvie apenas os documentos solicitados</li>
                </ul>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- No Results -->
      <UCard v-else-if="searched && !registration" class="shadow-lg">
        <div class="text-center py-8">
          <UIcon name="i-heroicons-magnifying-glass-minus" class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Cadastro não encontrado</h3>
          <p class="text-gray-600 mb-6">
            Não encontramos nenhum cadastro com os dados informados.
          </p>
          <div class="space-y-2 text-sm text-gray-500">
            <p>• Verifique se o email e CPF estão corretos</p>
            <p>• Certifique-se de que o cadastro foi submetido</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()

// Page metadata
useHead({
  title: 'Status do Cadastro - AcessoCatólico',
  meta: [
    { name: 'description', content: 'Consulte o status do seu cadastro de padre na plataforma AcessoCatólico' }
  ]
})

// Reactive state
const loading = ref(false)
const searched = ref(false)

const searchForm = reactive({
  email: '',
  cpf: ''
})

const registration = ref<any>(null)
const history = ref<any[]>([])

// Search for registration
async function searchRegistration() {
  if (!searchForm.email || !searchForm.cpf) {
    toast.add({
      title: 'Campos obrigatórios',
      description: 'Por favor, preencha email e CPF.',
      color: 'red'
    })
    return
  }

  loading.value = true
  searched.value = true
  registration.value = null
  history.value = []

  try {
    // This would need a new API endpoint to search by email and CPF
    const response = await $fetch<any>('/api/priests/search', {
      method: 'POST',
      body: {
        email: searchForm.email,
        cpf: searchForm.cpf.replace(/\D/g, '') // Remove formatting
      }
    })

    if (response.success && response.data) {
      registration.value = response.data
      
      // Get approval history
      if (registration.value.id) {
        await loadHistory()
      }
    }

  } catch (error: any) {
    console.error('Search error:', error)
    
    toast.add({
      title: 'Erro na consulta',
      description: error.data?.message || 'Não foi possível consultar o cadastro.',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}

async function loadHistory() {
  if (!registration.value?.id) return

  try {
    const response = await $fetch<any>(`/api/priests/history?registrationId=${registration.value.id}`)
    
    if (response.success && response.data?.history) {
      history.value = response.data.history
    }
  } catch (error) {
    console.error('Error loading history:', error)
    // Don't show error to user, history is optional
  }
}

// Utility functions
function formatCPF(event: any) {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d)/, '$1.$2')
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  searchForm.cpf = value
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatStatus(status: string): string {
  const statusMap = {
    PENDING: 'Pendente',
    UNDER_REVIEW: 'Em Análise',
    APPROVED: 'Aprovado',
    REJECTED: 'Rejeitado',
    REQUIRES_DOCUMENTATION: 'Documentação Necessária'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

function getStatusColor(status: string): string {
  const colors = {
    PENDING: 'amber',
    UNDER_REVIEW: 'blue',
    APPROVED: 'green',
    REJECTED: 'red',
    REQUIRES_DOCUMENTATION: 'orange'
  }
  return colors[status as keyof typeof colors] || 'gray'
}

function getTimelineIcon(status: string): string {
  const icons = {
    PENDING: 'i-heroicons-clock',
    UNDER_REVIEW: 'i-heroicons-eye',
    APPROVED: 'i-heroicons-check-circle',
    REJECTED: 'i-heroicons-x-circle',
    REQUIRES_DOCUMENTATION: 'i-heroicons-document-text'
  }
  return icons[status as keyof typeof icons] || 'i-heroicons-clock'
}

function getTimelineIconClass(status: string): string {
  const classes = {
    PENDING: 'bg-amber-100 text-amber-600',
    UNDER_REVIEW: 'bg-blue-100 text-blue-600',
    APPROVED: 'bg-green-100 text-green-600',
    REJECTED: 'bg-red-100 text-red-600',
    REQUIRES_DOCUMENTATION: 'bg-orange-100 text-orange-600'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-600'
}
</script>
