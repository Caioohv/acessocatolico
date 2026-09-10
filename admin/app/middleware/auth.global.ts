/**
 * Global auth middleware — runs on every route navigation.
 *
 * Rule: every route is behind auth EXCEPT /login.
 * Any unauthenticated request to an internal route is redirected to /login.
 */
export default defineNuxtRouteMiddleware((to) => {
  // /login is always public.
  if (to.path === '/login') {
    return
  }

  const { loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/login')
  }
})
