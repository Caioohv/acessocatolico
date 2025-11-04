<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recuperar senha
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Digite seu email para receber um link de recuperação
        </p>
      </div>
      
      <form v-if="!emailSent" class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
        <div>
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            required
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email"
          />
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
            <span v-if="loading">Enviando...</span>
            <span v-else>Enviar link de recuperação</span>
          </button>
        </div>
        
        <div class="text-center">
          <NuxtLink
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            Voltar ao login
          </NuxtLink>
        </div>
      </form>
      
      <div v-else class="text-center space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
          <p class="text-green-800">
            Se o email existir em nossa base, você receberá um link de recuperação em breve.
          </p>
        </div>
        
        <NuxtLink
          to="/login"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
        >
          Voltar ao login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})

const email = ref('')
const loading = ref(false)
const error = ref('')
const emailSent = ref(false)

const handleForgotPassword = async () => {
  error.value = ''
  
  if (!email.value) {
    error.value = 'Email é obrigatório'
    return
  }
  
  loading.value = true
  
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    
    emailSent.value = true
  } catch (err: any) {
    error.value = err.data?.message || 'Erro ao processar solicitação'
  }
  
  loading.value = false
}
</script>
