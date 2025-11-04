<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 font-serif">
        Dashboard
      </h1>
      <p class="mt-1 text-sm text-gray-600">
        Bem-vindo, {{ user?.profile?.firstName }}! Aqui você pode gerenciar suas atividades.
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Welcome Card -->
      <UCard class="sacred-shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UAvatar
              :src="user?.profile?.avatar"
              :alt="user?.profile?.firstName"
              size="md"
            />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Bem-vindo</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ user?.profile?.firstName }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- Role Card -->
      <UCard class="border-l-4 border-primary-500">
        <div class="flex items-center">
          <UIcon name="i-heroicons-shield-check-20-solid" class="h-8 w-8 text-primary-600" />
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Papel</p>
            <p class="text-lg font-semibold text-primary-700">
              {{ getRoleLabel(user?.role) }}
            </p>
          </div>
        </div>
      </UCard>

      <!-- Quick Action Card -->
      <UCard class="border-l-4 border-secondary-500">
        <div class="flex items-center">
          <UIcon name="i-heroicons-plus-circle-20-solid" class="h-8 w-8 text-secondary-600" />
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Ações rápidas</p>
            <p class="text-lg font-semibold text-secondary-700">
              Disponível
            </p>
          </div>
        </div>
      </UCard>

      <!-- Status Card -->
      <UCard class="border-l-4 border-success-500">
        <div class="flex items-center">
          <UIcon name="i-heroicons-check-circle-20-solid" class="h-8 w-8 text-success-600" />
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Status</p>
            <p class="text-lg font-semibold text-success-700">
              Ativo
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Role-specific content -->
    <div v-if="hasMinimumRole('ORGANIZER')" class="space-y-6">
      <h2 class="text-xl font-semibold text-gray-900 font-serif">
        Gestão de Eventos
      </h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Events -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Eventos Recentes</h3>
              <UButton size="sm" variant="outline" to="/dashboard/events">
                Ver todos
              </UButton>
            </div>
          </template>
          
          <div class="space-y-3">
            <div class="text-center py-8 text-gray-500">
              <UIcon name="i-heroicons-calendar-days-20-solid" class="h-8 w-8 mx-auto mb-2" />
              <p>Nenhum evento encontrado</p>
              <UButton class="mt-3" size="sm" to="/dashboard/events/create">
                Criar primeiro evento
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- Quick Actions -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-medium text-gray-900">Ações Rápidas</h3>
          </template>
          
          <div class="space-y-3">
            <UButton block variant="outline" to="/dashboard/events/create">
              <template #leading>
                <UIcon name="i-heroicons-plus-20-solid" />
              </template>
              Criar Evento
            </UButton>
            
            <UButton block variant="outline" to="/dashboard/ministries">
              <template #leading>
                <UIcon name="i-heroicons-user-group-20-solid" />
              </template>
              Gerenciar Ministérios
            </UButton>
            
            <UButton v-if="hasMinimumRole('PRIEST')" block variant="outline" to="/dashboard/parishes">
              <template #leading>
                <UIcon name="i-heroicons-building-library-20-solid" />
              </template>
              Gerenciar Paróquias
            </UButton>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Basic user content -->
    <div v-else class="space-y-6">
      <h2 class="text-xl font-semibold text-gray-900 font-serif">
        Suas Atividades
      </h2>
      
      <UCard>
        <div class="text-center py-12">
          <UIcon name="i-heroicons-heart-20-solid" class="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Bem-vindo à comunidade!
          </h3>
          <p class="text-gray-600 mb-6">
            Explore paróquias, participe de eventos e fortaleça sua fé.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/parishes">
              <template #leading>
                <UIcon name="i-heroicons-building-library-20-solid" />
              </template>
              Encontrar Paróquias
            </UButton>
            <UButton variant="outline" to="/events">
              <template #leading>
                <UIcon name="i-heroicons-calendar-days-20-solid" />
              </template>
              Ver Eventos
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout
definePageMeta({
  middleware: 'auth'
})

// Composables
const { user } = useAuth()
const { hasMinimumRole } = usePermissions()
const { setBreadcrumbs } = useAppState()

// Set breadcrumbs
setBreadcrumbs([
  { label: 'Início', to: '/' },
  { label: 'Dashboard' }
])

// Methods
const getRoleLabel = (role?: string) => {
  const roleLabels: Record<string, string> = {
    'ADMIN': 'Administrador',
    'PRIEST': 'Padre',
    'ORGANIZER': 'Organizador',
    'MEMBER': 'Membro',
    'VISITOR': 'Visitante'
  }
  return roleLabels[role || ''] || role
}
</script>
