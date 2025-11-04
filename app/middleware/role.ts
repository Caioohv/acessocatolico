export default defineNuxtRouteMiddleware((to, from) => {
  const { user, hasRole } = useAuth()
  
  // Check if user is logged in
  if (!user.value) {
    return navigateTo('/login')
  }
  
  // Role hierarchy: ADMIN can access everything, PRIEST can access organizer stuff, etc.
  const roleHierarchy = {
    'ADMIN': ['ADMIN', 'PRIEST', 'ORGANIZER', 'MEMBER', 'VISITOR'],
    'PRIEST': ['PRIEST', 'ORGANIZER', 'MEMBER', 'VISITOR'],
    'ORGANIZER': ['ORGANIZER', 'MEMBER', 'VISITOR'],
    'MEMBER': ['MEMBER', 'VISITOR'],
    'VISITOR': ['VISITOR']
  }
  
  // Protected routes and their minimum required roles
  const protectedRoutes: Record<string, string[]> = {
    '/admin': ['ADMIN'],
    '/dashboard/admin': ['ADMIN'],
    '/dashboard/priest': ['PRIEST'],
    '/dashboard/organizer': ['ORGANIZER'],
    '/parishes/manage': ['PRIEST'],
    '/events/create': ['ORGANIZER'],
    '/events/manage': ['ORGANIZER'],
    '/ministries/manage': ['ORGANIZER'],
    '/schedules/manage': ['ORGANIZER']
  }
  
  const routePath = to.path
  
  // Check for exact match first
  let requiredRoles = protectedRoutes[routePath]
  
  // If no exact match, check for pattern matches
  if (!requiredRoles) {
    for (const [pattern, roles] of Object.entries(protectedRoutes)) {
      if (routePath.startsWith(pattern)) {
        requiredRoles = roles
        break
      }
    }
  }
  
  // If route requires specific roles, check permissions
  if (requiredRoles) {
    const userRole = user.value.role
    const allowedRoles = roleHierarchy[userRole] || [userRole]
    
    const hasPermission = requiredRoles.some(role => allowedRoles.includes(role))
    
    if (!hasPermission) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Acesso negado - Permissões insuficientes'
      })
    }
  }
})
