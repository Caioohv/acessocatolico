<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <!-- Logo -->
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">A</span>
              </div>
              <span class="ml-2 text-xl font-bold text-gray-900">AcessoCatólico</span>
            </NuxtLink>
            
            <!-- Admin Badge -->
            <div class="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Administração
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              to="/dashboard"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Dashboard
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/eventos"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Eventos
            </NuxtLink>
            
            <NuxtLink 
              to="/admin/padres"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              active-class="text-blue-600 bg-blue-50"
            >
              Padres
            </NuxtLink>

            <!-- User Menu -->
            <UDropdown :items="userMenuItems">
              <div class="flex items-center space-x-3 cursor-pointer">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">
                    {{ userInitials }}
                  </span>
                </div>
                <div class="hidden lg:block">
                  <div class="text-sm font-medium text-gray-900">{{ userName }}</div>
                  <div class="text-xs text-gray-500">{{ userRole }}</div>
                </div>
                <Icon name="heroicons:chevron-down" class="h-4 w-4 text-gray-400" />
              </div>
            </UDropdown>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <UButton
              variant="ghost"
              color="gray"
              icon="heroicons:bars-3"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink 
            to="/dashboard"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            @click="mobileMenuOpen = false"
          >
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/eventos"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            @click="mobileMenuOpen = false"
          >
            Eventos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/padres"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            @click="mobileMenuOpen = false"
          >
            Padres
          </NuxtLink>
        </div>
        
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="px-4 flex items-center">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white font-medium">
                {{ userInitials }}
              </span>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ userName }}</div>
              <div class="text-sm font-medium text-gray-500">{{ userRole }}</div>
            </div>
          </div>
          
          <div class="mt-3 px-2 space-y-1">
            <UButton
              variant="ghost"
              color="gray"
              class="w-full justify-start"
              @click="logout"
            >
              <Icon name="heroicons:arrow-right-on-rectangle" class="h-5 w-5 mr-3" />
              Sair
            </UButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Toast Container -->
    <Teleport to="body">
      <div 
        v-if="toasts.length > 0"
        class="fixed top-20 right-4 z-50 space-y-2"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden',
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'error' ? 'bg-red-500' : 
            toast.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
          ]"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Icon 
                  :name="getToastIcon(toast.type)"
                  class="h-5 w-5 text-white"
                />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-white">
                  {{ toast.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeToast(toast.id)"
                  class="inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <Icon name="heroicons:x-mark" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
// Composables
const { user, logout: authLogout } = useAuth()
const { toasts, removeToast } = useToast()

// State
const mobileMenuOpen = ref(false)

// Computed
const userName = computed(() => {
  if (user.value?.profile) {
    return `${user.value.profile.firstName} ${user.value.profile.lastName}`.trim()
  }
  return user.value?.email || 'Usuário'
})

const userInitials = computed(() => {
  if (user.value?.profile?.firstName && user.value?.profile?.lastName) {
    return `${user.value.profile.firstName.charAt(0)}${user.value.profile.lastName.charAt(0)}`.toUpperCase()
  }
  if (user.value?.email) {
    return user.value.email.charAt(0).toUpperCase()
  }
  return '??'
})

const userRole = computed(() => {
  const roleLabels = {
    ADMIN: 'Administrador',
    PRIEST: 'Padre',
    ORGANIZER: 'Organizador',
    MEMBER: 'Membro'
  }
  return roleLabels[user.value?.role] || 'Usuário'
})

// User menu items
const userMenuItems = [
  [{
    label: 'Perfil',
    icon: 'heroicons:user-circle',
    click: () => navigateTo('/dashboard')
  }],
  [{
    label: 'Configurações',
    icon: 'heroicons:cog-6-tooth',
    click: () => navigateTo('/dashboard')
  }],
  [{
    label: 'Sair',
    icon: 'heroicons:arrow-right-on-rectangle',
    click: logout
  }]
]

// Methods
async function logout() {
  try {
    await authLogout()
    await navigateTo('/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

function getToastIcon(type) {
  const icons = {
    success: 'heroicons:check-circle',
    error: 'heroicons:x-circle',
    warning: 'heroicons:exclamation-triangle',
    info: 'heroicons:information-circle'
  }
  return icons[type] || icons.info
}

// Close mobile menu on route change
watch(() => useRoute().fullPath, () => {
  mobileMenuOpen.value = false
})

// Set page title
useHead({
  titleTemplate: (title) => {
    const baseTitle = 'AcessoCatólico - Administração'
    return title ? `${title} - ${baseTitle}` : baseTitle
  }
})
</script>
