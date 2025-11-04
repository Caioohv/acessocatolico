// Types
type UserRole = 'ADMIN' | 'PRIEST' | 'ORGANIZER' | 'MEMBER' | 'VISITOR'

interface AuthUser {
  id: string
  email: string
  role: UserRole
  profile?: {
    firstName: string
    lastName: string
    avatar?: string
  }
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  
  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch<{ user: AuthUser; token: string }>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      
      user.value = data.user
      
      // Set token in cookie
      const tokenCookie = useCookie('auth-token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      tokenCookie.value = data.token
      
      await navigateTo('/dashboard')
      return { success: true }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Erro ao fazer login'
      }
    }
  }
  
  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) => {
    try {
      const data = await $fetch<{ user: AuthUser; token: string }>('/api/auth/register', {
        method: 'POST',
        body: userData
      })
      
      user.value = data.user
      
      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = data.token
      
      await navigateTo('/dashboard')
      return { success: true }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Erro ao criar conta'
      }
    }
  }
  
  const logout = async () => {
    user.value = null
    const tokenCookie = useCookie('auth-token')
    tokenCookie.value = null
    await navigateTo('/')
  }
  
  const fetchUser = async () => {
    try {
      const data = await $fetch<AuthUser>('/api/auth/me')
      user.value = data
    } catch (error) {
      user.value = null
    }
  }
  
  const hasRole = (role: UserRole) => {
    return user.value?.role === role
  }
  
  const isAdmin = computed(() => hasRole('ADMIN'))
  const isPriest = computed(() => hasRole('PRIEST'))
  const isOrganizer = computed(() => hasRole('ORGANIZER'))
  const isMember = computed(() => hasRole('MEMBER'))
  
  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isPriest,
    isOrganizer,
    isMember,
    login,
    register,
    logout,
    fetchUser,
    hasRole
  }
}
