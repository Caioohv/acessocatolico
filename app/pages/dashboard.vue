<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <UIcon name="i-heroicons-cross" class="h-8 w-8 text-primary-600 mr-3" />
            <h1 class="text-xl font-semibold text-gray-900">AcessoCatólico</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-700">
              Olá, {{ user?.profile?.firstName }}!
            </div>
            <UButton 
              color="primary" 
              variant="ghost" 
              @click="handleLogout"
              :loading="loading"
            >
              Sair
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg p-8">
          <div class="text-center">
            <UIcon name="i-heroicons-home" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Bem-vindo ao Dashboard!
            </h2>
            <p class="text-gray-600 mb-6">
              Sistema de autenticação funcionando perfeitamente.
            </p>
            
            <!-- User Info Card -->
            <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Suas Informações
              </h3>
              <div class="space-y-2 text-left">
                <p><strong>Email:</strong> {{ user?.email }}</p>
                <p><strong>Role:</strong> {{ user?.role }}</p>
                <p><strong>Nome:</strong> {{ user?.profile?.firstName }} {{ user?.profile?.lastName }}</p>
                <p><strong>Email Verificado:</strong> {{ user?.emailVerified ? 'Sim' : 'Não' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  middleware: 'auth'
})

// Auth composable  
const { user, logout } = useAuth()
const router = useRouter()

// Component state
const loading = ref(false)

// Handle logout
const handleLogout = async () => {
  try {
    loading.value = true
    await logout()
    await router.push('/')
  } catch (error) {
    console.error('Erro no logout:', error)
  } finally {
    loading.value = false
  }
}
</script>
