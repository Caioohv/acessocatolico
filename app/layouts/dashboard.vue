<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Global Loading Overlay -->
    <LoadingOverlay
      :show="isLoading"
      :message="loadingMessage"
    />

    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area with Sidebar -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <AppSidebar
        title="Dashboard"
        :navigation="dashboardNavigation"
      />

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <!-- Breadcrumbs -->
        <div class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <AppBreadcrumbs auto-generate />
          </div>
        </div>

        <!-- Page Content -->
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { isLoading, loadingMessage } = useAppState()
const { user } = useAuth()
const { hasMinimumRole } = usePermissions()

// Dashboard navigation based on user role
const dashboardNavigation = computed(() => {
  const sections = [
    {
      title: 'Visão Geral',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-squares-2x2-20-solid' },
        { name: 'Meu Perfil', href: '/profile', icon: 'i-heroicons-user-circle-20-solid' }
      ]
    }
  ]

  // Add management section based on role
  const managementItems = []

  if (hasMinimumRole('ORGANIZER')) {
    managementItems.push(
      { name: 'Eventos', href: '/dashboard/events', icon: 'i-heroicons-calendar-days-20-solid' },
      { name: 'Ministérios', href: '/dashboard/ministries', icon: 'i-heroicons-user-group-20-solid' }
    )
  }

  if (hasMinimumRole('PRIEST')) {
    managementItems.push(
      { name: 'Paróquias', href: '/dashboard/parishes', icon: 'i-heroicons-building-library-20-solid' },
      { name: 'Agendamentos', href: '/dashboard/appointments', icon: 'i-heroicons-calendar-20-solid' }
    )
  }

  if (hasMinimumRole('ADMIN')) {
    managementItems.push(
      { name: 'Usuários', href: '/dashboard/users', icon: 'i-heroicons-users-20-solid' },
      { name: 'Configurações', href: '/dashboard/settings', icon: 'i-heroicons-cog-6-tooth-20-solid' }
    )
  }

  if (managementItems.length > 0) {
    sections.push({
      title: 'Gestão',
      items: managementItems
    })
  }

  // Add analytics section for organizers and above
  if (hasMinimumRole('ORGANIZER')) {
    sections.push({
      title: 'Relatórios',
      items: [
        { name: 'Analytics', href: '/dashboard/analytics', icon: 'i-heroicons-chart-bar-20-solid' },
        { name: 'Relatórios', href: '/dashboard/reports', icon: 'i-heroicons-document-chart-bar-20-solid' }
      ]
    })
  }

  return sections
})

// Middleware to ensure user is logged in
definePageMeta({
  middleware: 'auth'
})
</script>
