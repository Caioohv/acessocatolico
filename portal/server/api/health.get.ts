/**
 * GET /api/health — probe de liveness/readiness do container (portal).
 *
 * Rota deliberadamente barata: não toca no banco nem renderiza páginas, só
 * confirma que o processo Nitro está de pé e respondendo. É o alvo do
 * healthcheck do docker-compose. Resposta nunca cacheada.
 */
export default defineEventHandler((event) => {
  setResponseHeader(event, 'cache-control', 'no-store')
  return { ok: true }
})
