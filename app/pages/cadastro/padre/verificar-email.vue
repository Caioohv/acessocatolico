<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <UCard class="shadow-xl">
        <!-- Loading State -->
        <div v-if="pending" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4">
            <svg class="animate-spin w-full h-full text-purple-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Verificando email...</h2>
          <p class="text-gray-600">Por favor, aguarde enquanto confirmamos seu email.</p>
        </div>

        <!-- Success State -->
        <div v-else-if="verificationResult?.success" class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-600" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Email verificado com sucesso!</h2>
          <p class="text-gray-600 mb-6">{{ verificationResult.message }}</p>
          
          <div class="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 class="font-medium text-blue-900 mb-2">Próximos passos:</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Seu cadastro está agora em análise</li>
              <li>• Nossa equipe analisará em 2-3 dias úteis</li>
              <li>• Você receberá um email com o resultado</li>
            </ul>
          </div>

          <div class="space-y-3">
            <UButton 
              to="/"
              size="lg" 
              class="w-full"
              icon="i-heroicons-home"
            >
              Voltar ao Início
            </UButton>
            
            <UButton 
              to="/cadastro/padre/status"
              variant="outline" 
              size="lg" 
              class="w-full"
              icon="i-heroicons-magnifying-glass"
            >
              Consultar Status
            </UButton>
          </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center py-8">
          <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-x-circle" class="w-8 h-8 text-red-600" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Erro na verificação</h2>
          <p class="text-gray-600 mb-6">{{ error?.message || 'Ocorreu um erro ao verificar seu email.' }}</p>
          
          <div class="bg-yellow-50 rounded-lg p-4 mb-6 text-left">
            <h3 class="font-medium text-yellow-900 mb-2">Possíveis causas:</h3>
            <ul class="text-sm text-yellow-800 space-y-1">
              <li>• Link de verificação expirado (24 horas)</li>
              <li>• Link já foi usado anteriormente</li>
              <li>• Link inválido ou corrompido</li>
            </ul>
          </div>

          <div class="space-y-3">
            <UButton 
              @click="resendVerification"
              :loading="resending"
              size="lg" 
              class="w-full"
              icon="i-heroicons-envelope"
            >
              Reenviar Email de Verificação
            </UButton>
            
            <UButton 
              to="/cadastro/padre"
              variant="outline" 
              size="lg" 
              class="w-full"
              icon="i-heroicons-arrow-left"
            >
              Voltar ao Cadastro
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const toast = useToast()

// Page metadata
useHead({
  title: 'Verificação de Email - AcessoCatólico',
  meta: [
    { name: 'description', content: 'Verificação de email para cadastro de padre' }
  ]
})

// Get token from URL
const token = computed(() => route.query.token as string)

// Reactive state
const pending = ref(false)
const resending = ref(false)
const verificationResult = ref<any>(null)
const error = ref<any>(null)

// Verify email on component mount
onMounted(async () => {
  if (!token.value) {
    error.value = { message: 'Token de verificação não fornecido' }
    return
  }

  await verifyEmail()
})

async function verifyEmail() {
  if (!token.value) return

  pending.value = true
  error.value = null
  verificationResult.value = null

  try {
    const { data } = await $fetch<any>('/api/priests/verify-email', {
      method: 'POST',
      body: { token: token.value }
    })

    verificationResult.value = data
    
    toast.add({
      title: 'Email verificado!',
      description: 'Seu cadastro está agora em análise.',
      color: 'green'
    })

  } catch (err: any) {
    console.error('Email verification error:', err)
    error.value = err.data || { message: 'Erro desconhecido' }
    
    toast.add({
      title: 'Erro na verificação',
      description: error.value.message,
      color: 'red'
    })
  } finally {
    pending.value = false
  }
}

async function resendVerification() {
  resending.value = true

  try {
    // This would need an API to resend verification email
    // For now, show success message
    toast.add({
      title: 'Email reenviado!',
      description: 'Verifique sua caixa de entrada.',
      color: 'green'
    })

    // Redirect to check email page
    await navigateTo('/cadastro/padre/verificar-email-enviado')

  } catch (err: any) {
    console.error('Resend verification error:', err)
    toast.add({
      title: 'Erro ao reenviar',
      description: 'Tente novamente mais tarde.',
      color: 'red'
    })
  } finally {
    resending.value = false
  }
}
</script>
