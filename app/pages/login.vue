<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 text-center">
          <UIcon name="i-heroicons-cross" class="h-12 w-12 text-primary-600" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou 
          <NuxtLink to="/register" class="font-medium text-primary-600 hover:text-primary-500">
            crie uma nova conta
          </NuxtLink>
        </p>
      </div>
      
      <UForm :schema="loginSchema" :state="form" @submit="handleLogin" class="mt-8 space-y-6">
        <div class="space-y-4">
          <UFormGroup label="Email" name="email" required>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="seu@email.com"
              icon="i-heroicons-envelope"
            />
          </UFormGroup>
          
          <UFormGroup label="Senha" name="password" required>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Digite sua senha"
              icon="i-heroicons-lock-closed"
            />
          </UFormGroup>
        </div>

        <div class="flex items-center justify-between">
          <UCheckbox v-model="form.remember" label="Lembrar de mim" />
          
          <NuxtLink to="/forgot-password" class="text-sm text-primary-600 hover:text-primary-500">
            Esqueceu a senha?
          </NuxtLink>
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="loading"
          :disabled="loading"
        >
          Entrar
        </UButton>
      </UForm>        <UAlert
        v-if="error"
        color="primary"
        variant="soft"
        :title="error"
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'primary', variant: 'link' }"
        @close="error = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

// Meta
definePageMeta({
  layout: false
})

// Auth composable
const { login } = useAuth()
const router = useRouter()

// Form schema
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

// Form state
const form = reactive({
  email: '',
  password: '',
  remember: false
})

// Component state
const loading = ref(false)
const error = ref<string | null>(null)

// Handle login
const handleLogin = async () => {
  try {
    loading.value = true
    error.value = null
    
    const result = await login(form.email, form.password)
    
    if (result.success) {
      await router.push('/dashboard')
    } else {
      error.value = result.error
    }
  } catch (err: any) {
    error.value = err.message || 'Erro no login'  
  } finally {
    loading.value = false
  }
}
</script>
