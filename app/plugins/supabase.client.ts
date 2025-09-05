import { createClient } from '@supabase/supabase-js'
import type { Session, User } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        autoRefreshToken: true,
        flowType: 'pkce'
      },
      global: {
        headers: {
          'X-Client-Info': 'acesso-catolico-web'
        }
      }
    }
  )


  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)


  supabase.auth.onAuthStateChange((event, currentSession) => {
    session.value = currentSession
    user.value = currentSession?.user ?? null
    

    if (process.dev) {
      console.log('Auth event:', event, currentSession?.user?.email)
    }
  })

  
  const isAuthenticated = computed(() => !!user.value)
  
  const getCurrentSession = async () => {
    const { data } = await supabase.auth.getSession()
    return data.session
  }

  // Tornar disponível globalmente
  return {
    provide: {
      supabase,
      user: readonly(user),
      session: readonly(session),
      isAuthenticated: readonly(isAuthenticated),
      getCurrentSession
    }
  }
})