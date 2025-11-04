export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  
  // This middleware can be used with a query parameter to check specific roles
  // Example: /some-page?requireRole=PRIEST
  const requiredRole = to.query.requireRole as string
  
  if (requiredRole && user.value) {
    const userRole = user.value.role
    
    // Role hierarchy - higher roles can access lower role pages
    const roleHierarchy: Record<string, number> = {
      'VISITOR': 1,
      'MEMBER': 2,
      'ORGANIZER': 3,
      'PRIEST': 4,
      'ADMIN': 5
    }
    
    const userLevel = roleHierarchy[userRole] || 0
    const requiredLevel = roleHierarchy[requiredRole] || 0
    
    if (userLevel < requiredLevel) {
      throw createError({
        statusCode: 403,
        statusMessage: `Acesso restrito a ${requiredRole}s`
      })
    }
  }
})
