<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Redefinir senha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Digite sua nova senha
        </p>
      </div>
      
      <form v-if="!success" class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="password" class="sr-only">Nova senha</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Nova senha"
            />
          </div>
          
          <div>
            <label for="confirmPassword" class="sr-only">Confirmar nova senha</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Confirmar nova senha"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <span v-if="loading">Redefinindo...</span>
            <span v-else>Redefinir senha</span>
          </button>
        </div>
      </form>
      
      <div v-else class="text-center space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
          <p class="text-green-800">
            Senha alterada com sucesso!
          </p>
        </div>
        
        <NuxtLink
          to="/login"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Fazer login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

const route = useRoute()
const token = route.query.token as string

const form = reactive({
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')
const success = ref(false)

// Check if token is present
if (!token) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Token de recuperação não encontrado'
  })
}

const handleResetPassword = async () => {
  error.value = ''
  
  if (!form.password || !form.confirmPassword) {
    error.value = 'Preencha todos os campos'
    return
  }
  
  if (form.password !== form.confirmPassword) {
    error.value = 'As senhas não coincidem'
    return
  }
  
  if (form.password.length < 6) {
    error.value = 'A senha deve ter no mínimo 6 caracteres'
    return
  }
  
  loading.value = true
  
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: {
        token,
        password: form.password,
        confirmPassword: form.confirmPassword
      }
    })
    
    success.value = true
  } catch (err: any) {
    error.value = err.data?.message || 'Erro ao redefinir senha'
  }
  
  loading.value = false
}
</script>
