/**
 * Rate limiter em memória (fixed window) — auto-importado pelo Nitro.
 *
 * Um único container `app` (portal) por trás do Caddy, então um Map em processo
 * basta. Não é distribuído: com mais de uma réplica, migrar para store
 * compartilhado. Reinícios zeram as janelas (aceitável para janelas curtas).
 */

interface Bucket {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

let callsSinceSweep = 0
const SWEEP_EVERY = 500

function sweep(now: number): void {
  for (const [key, bucket] of store) {
    if (now >= bucket.resetAt) store.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter: number
}

/**
 * Contabiliza uma tentativa para `key` e diz se passou do limite.
 *
 * @param key       identificador da janela (ex.: `track:<ip>`).
 * @param limit     máximo de requisições por janela.
 * @param windowMs  duração da janela em ms.
 */
export function hitRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()

  if (++callsSinceSweep >= SWEEP_EVERY) {
    callsSinceSweep = 0
    sweep(now)
  }

  const bucket = store.get(key)

  if (!bucket || now >= bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, retryAfter: 0 }
  }

  bucket.count++

  if (bucket.count > limit) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  return { allowed: true, remaining: limit - bucket.count, retryAfter: 0 }
}
