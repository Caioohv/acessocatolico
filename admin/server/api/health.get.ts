/**
 * GET /api/health — probe de liveness/readiness do container (admin).
 *
 * Rota deliberadamente barata: não toca no banco nem exige sessão (o
 * `auth.global` é middleware de ROTA de página, não roda em `/api/*`), só
 * confirma que o processo Nitro está de pé. É o alvo do healthcheck do
 * docker-compose. Resposta nunca cacheada.
 */
export default defineEventHandler((event) => {
  setResponseHeader(event, 'cache-control', 'no-store')
  return { ok: true }
})
