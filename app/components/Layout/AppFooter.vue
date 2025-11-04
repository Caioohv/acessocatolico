<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Logo and description -->
        <div class="space-y-8 xl:col-span-1">
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-cross-20-solid" class="h-8 w-8 text-secondary-400" />
            <div>
              <h3 class="text-xl font-bold font-serif text-white">
                AcessoCatólico
              </h3>
              <p class="text-sm text-gray-400">Unidos na fé</p>
            </div>
          </div>
          <p class="text-gray-300 text-base max-w-md">
            Conectando católicos pelo Brasil. Encontre paróquias, participe de eventos 
            e fortaleça sua caminhada na fé.
          </p>
          <div class="flex space-x-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              class="text-gray-400 hover:text-secondary-400 transition-colors"
              :aria-label="social.name"
            >
              <UIcon :name="social.icon" class="h-6 w-6" />
            </a>
          </div>
        </div>

        <!-- Links sections -->
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Platform section -->
            <div>
              <h4 class="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Plataforma
              </h4>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in platformLinks" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Community section -->
            <div class="mt-12 md:mt-0">
              <h4 class="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Comunidade
              </h4>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in communityLinks" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Support section -->
            <div>
              <h4 class="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Suporte
              </h4>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in supportLinks" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Legal section -->
            <div class="mt-12 md:mt-0">
              <h4 class="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                Legal
              </h4>
              <ul role="list" class="mt-4 space-y-4">
                <li v-for="item in legalLinks" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    class="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter signup -->
      <div class="mt-12 pt-8 border-t border-gray-700">
        <div class="md:flex md:items-center md:justify-between">
          <div class="md:flex-1">
            <h4 class="text-lg font-semibold text-white">
              Receba nossa newsletter
            </h4>
            <p class="mt-2 text-gray-300">
              Fique por dentro dos eventos e novidades da comunidade católica.
            </p>
          </div>
          <div class="mt-6 md:mt-0 md:ml-8">
            <form @submit.prevent="subscribeNewsletter" class="flex">
              <UInput
                v-model="newsletterEmail"
                type="email"
                placeholder="Seu email"
                required
                class="min-w-0 flex-1"
                :ui="{ 
                  base: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-secondary-400 focus:ring-secondary-400'
                }"
              />
              <UButton
                type="submit"
                :loading="subscribing"
                class="ml-3 bg-secondary-500 hover:bg-secondary-600"
              >
                Inscrever
              </UButton>
            </form>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-700 md:flex md:items-center md:justify-between">
        <div class="flex space-x-6 md:order-2">
          <NuxtLink
            v-for="item in footerNavigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
        </div>
        <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; {{ currentYear }} AcessoCatólico. Feito com ❤️ para a comunidade católica brasileira.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// State
const newsletterEmail = ref('')
const subscribing = ref(false)

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Data
const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'i-simple-icons-facebook'
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'i-simple-icons-instagram'
  },
  {
    name: 'Twitter',
    href: '#',
    icon: 'i-simple-icons-twitter'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'i-simple-icons-youtube'
  }
]

const platformLinks = [
  { name: 'Paróquias', href: '/parishes' },
  { name: 'Eventos', href: '/events' },
  { name: 'Ministérios', href: '/ministries' },
  { name: 'Agendamentos', href: '/appointments' }
]

const communityLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Testemunhos', href: '/testimonials' },
  { name: 'Oração', href: '/prayers' },
  { name: 'Santos do Dia', href: '/saints' }
]

const supportLinks = [
  { name: 'Central de Ajuda', href: '/help' },
  { name: 'Contato', href: '/contact' },
  { name: 'Suporte Técnico', href: '/support' },
  { name: 'Status', href: '/status' }
]

const legalLinks = [
  { name: 'Privacidade', href: '/privacy' },
  { name: 'Termos', href: '/terms' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'LGPD', href: '/lgpd' }
]

const footerNavigation = [
  { name: 'Sobre', href: '/about' },
  { name: 'Imprensa', href: '/press' },
  { name: 'Carreiras', href: '/careers' }
]

// Methods
const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  subscribing.value = true
  
  try {
    // TODO: Implementar assinatura da newsletter
    await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay
    
    const { setSuccess } = useAppState()
    setSuccess('Obrigado! Você foi inscrito na nossa newsletter.')
    newsletterEmail.value = ''
  } catch (error) {
    const { setError } = useAppState()
    setError('Erro ao inscrever na newsletter. Tente novamente.')
  } finally {
    subscribing.value = false
  }
}
</script>
