<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Global Loading Overlay -->
    <LoadingOverlay
      :show="isLoading"
      :message="loadingMessage"
    />

    <!-- Header -->
    <AppHeader
      :navigation="navigation"
      :show-search="showSearch"
    />

    <!-- Main Content Area -->
    <div class="flex">
      <!-- Sidebar (conditional) -->
      <AppSidebar
        v-if="showSidebar"
        :navigation="sidebarNavigation"
        :title="sidebarTitle"
      />

      <!-- Main Content -->
      <main class="flex-1 min-w-0">
        <!-- Breadcrumbs -->
        <div v-if="showBreadcrumbs" class="bg-white border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <AppBreadcrumbs :auto-generate="autoBreadcrumbs" />
          </div>
        </div>

        <!-- Page Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <slot />
        </div>
      </main>
    </div>

    <!-- Footer -->
    <AppFooter v-if="showFooter" />

    <!-- Toast notifications handled by Nuxt UI -->
  </div>
</template>

<script setup lang="ts">
interface NavigationItem {
  name: string
  href: string
  icon: string
  roles?: string[]
}

interface Props {
  showSidebar?: boolean
  showFooter?: boolean
  showBreadcrumbs?: boolean
  showSearch?: boolean
  autoBreadcrumbs?: boolean
  sidebarTitle?: string
  navigation?: NavigationItem[]
  sidebarNavigation?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  showSidebar: false,
  showFooter: true,
  showBreadcrumbs: true,
  showSearch: false,
  autoBreadcrumbs: true
})

// Composables
const { isLoading, loadingMessage } = useAppState()
// Toast notifications handled by Nuxt UI
const { user } = useAuth()

// Default navigation
const navigation = computed(() => props.navigation || [
  { name: 'Início', href: '/', icon: 'i-heroicons-home-20-solid' },
  { name: 'Paróquias', href: '/parishes', icon: 'i-heroicons-building-library-20-solid' },
  { name: 'Eventos', href: '/events', icon: 'i-heroicons-calendar-days-20-solid' },
  { name: 'Ministérios', href: '/ministries', icon: 'i-heroicons-user-group-20-solid' }
])

// Default sidebar navigation
const sidebarNavigation = computed(() => props.sidebarNavigation || [
  {
    title: 'Principal',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: 'i-heroicons-squares-2x2-20-solid', roles: ['ORGANIZER'] },
      { name: 'Meu Perfil', href: '/profile', icon: 'i-heroicons-user-circle-20-solid' }
    ]
  },
  {
    title: 'Gestão',
    items: [
      { name: 'Paróquias', href: '/dashboard/parishes', icon: 'i-heroicons-building-library-20-solid', roles: ['PRIEST'] },
      { name: 'Eventos', href: '/dashboard/events', icon: 'i-heroicons-calendar-days-20-solid', roles: ['ORGANIZER'] },
      { name: 'Ministérios', href: '/dashboard/ministries', icon: 'i-heroicons-user-group-20-solid', roles: ['ORGANIZER'] },
      { name: 'Usuários', href: '/dashboard/users', icon: 'i-heroicons-users-20-solid', roles: ['ADMIN'] }
    ]
  }
])
</script>
