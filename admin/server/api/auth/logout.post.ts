/**
 * POST /api/auth/logout
 *
 * Clears the sealed session cookie set by nuxt-auth-utils.
 * After this call the session is empty and any middleware protecting
 * routes will redirect the client back to /login.
 */
export default defineEventHandler(async (event) => {
  await clearUserSession(event)
  return { data: { ok: true } }
})
