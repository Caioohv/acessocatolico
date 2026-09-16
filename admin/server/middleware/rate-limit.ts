/**
 * Server middleware — rate limit por IP no POST /api/auth/login.
 *
 * Roda antes de todo handler (Nitro). Só age no endpoint de login; qualquer
 * outra rota passa direto. Limita tentativas por IP numa janela deslizante
 * fixa para conter brute-force de senha.
 *
 * O IP vem de `getRequestIP(event, { xForwardedFor: true })`: em produção o
 * tráfego chega pelo Caddy (rede caddy_net), que injeta o X-Forwarded-For, então
 * usamos o primeiro salto. Como o container só recebe requisições do proxy, o
 * header é confiável neste deploy.
 *
 * Conta TODA tentativa (sucesso ou falha): o middleware roda antes de saber o
 * resultado. É o padrão comum — o limite é generoso o bastante para logins
 * legítimos com erro de digitação, mas fecha a porta para automação.
 */

// 10 tentativas a cada 15 minutos por IP.
const LOGIN_LIMIT = 10
const LOGIN_WINDOW_MS = 15 * 60 * 1000

export default defineEventHandler((event) => {
  if (event.method !== 'POST') return
  if (getRequestURL(event).pathname !== '/api/auth/login') return

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const result = hitRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS)

  if (!result.allowed) {
    setResponseHeader(event, 'Retry-After', String(result.retryAfter))
    throw createError({
      statusCode: 429,
      data: {
        error: {
          code: 'RATE_LIMITED',
          message: 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.',
        },
      },
    })
  }
})
