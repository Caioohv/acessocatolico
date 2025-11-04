export default defineNuxtRouteMiddleware((to) => {
  const { user, hasRole } = useAuth()
  
  // Check if user is logged in
  if (!user.value) {
    return navigateTo('/login')
  }
  
  // Check role-based access
  const protectedRoutes = {
    '/admin': ['ADMIN'],
    '/dashboard/priest': ['PRIEST', 'ADMIN'],
    '/dashboard/organizer': ['ORGANIZER', 'PRIEST', 'ADMIN']
  }
  
  const routePath = to.path
  const requiredRoles = protectedRoutes[routePath as keyof typeof protectedRoutes]
  
  if (requiredRoles && !requiredRoles.some(role => hasRole(role as any))) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Acesso negado'
    })
  }
})
