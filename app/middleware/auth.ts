export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()
  
  // If not logged in, redirect to login
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
