export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()
  
  // If already logged in, redirect to dashboard
  if (isLoggedIn.value) {
    return navigateTo('/dashboard')
  }
})
