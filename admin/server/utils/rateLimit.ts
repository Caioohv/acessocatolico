/**
 * Rate limiter em memória (fixed window) — auto-importado pelo Nitro.
 *
 * Suficiente para o deploy atual: um único container `admin` por trás do Caddy
 * (ver docker-compose.yml). Não é distribuído — se um dia houver mais de uma
 * réplica do admin, trocar por um store compartilhado (Redis/Postgres). Até lá,
 * um Map em processo protege contra brute-force sem dependência extra.
 *
 * O estado vive no processo: reinícios (deploy, OOM) zeram as janelas. Isso é
 * aceitável para o caso de uso (janelas curtas, minutos).
 */

interface Bucket {
  count: number
  /** epoch ms em que a janela expira e a contagem reinicia */
  resetAt: number
}

const store = new Map<string, Bucket>()

// Sweep preguiçoso: a cada N chamadas remove buckets expirados para o Map não
// crescer sem limite sob tráfego de IPs variados (ex.: scan distribuído).
let callsSinceSweep = 0
const SWEEP_EVERY = 500

function sweep(now: number): void {
  for (const [key, bucket] of store) {
    if (now >= bucket.resetAt) store.delete(key)
  }
}

export interface RateLimitResult {
  /** true = requisição dentro do limite; false = estourou (deve virar 429) */
  allowed: boolean
  /** requisições restantes na janela atual (0 quando bloqueado) */
  remaining: number
  /** segundos até a janela reabrir (0 quando permitido) */
  retryAfter: number
}

/**
 * Contabiliza uma tentativa para `key` e diz se ela passa do limite.
 *
 * @param key       identificador da janela (ex.: `login:<ip>`).
 * @param limit     máximo de requisições permitidas por janela.
 * @param windowMs  duração da janela em milissegundos.
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
