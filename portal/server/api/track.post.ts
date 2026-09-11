import { createHash } from 'node:crypto'
import { prisma } from '@acesso/db'

/**
 * POST /api/track — endpoint único de coleta de analytics first-party (Fase 1).
 *
 * Grava um `AnalyticsEvent` no banco sem expor PII. O `sessionId` é um hash
 * rotativo derivado de: dia UTC (rotação diária), IP do cliente e User-Agent —
 * nenhum desses valores é armazenado; apenas o hash SHA-256 vai para o banco.
 *
 * Body JSON esperado:
 *   - `type`     {string} — "pageview" | "product_click" | "article_read"
 *   - `path`     {string} — rota da página (ex.: "/loja", "/blog/post-slug")
 *   - `targetId` {string?} — id do produto (product_click) ou slug do artigo
 *                            (article_read); omitir em pageview
 *   - `referrer` {string?} — document.referrer do cliente
 *
 * Resposta em SUCESSO:  { ok: true }
 * Resposta em FALHA:    { ok: true }  ← igual, para não quebrar a página
 *
 * Um erro de banco é registrado no console do servidor e silenciado para o
 * cliente. Segue o mesmo padrão de try/catch + fallback gracioso dos outros
 * endpoints do portal (GET /api/products, GET /api/products/categories).
 */

const VALID_TYPES = new Set(['pageview', 'product_click', 'article_read'])

/**
 * Deriva um sessionId pseudônimo e sem PII.
 *
 * Combina três fontes que, por si só, identificariam o usuário, e as colapsa
 * num único hash SHA-256 de 64 chars. A rotação diária (UTC) garante que o
 * mesmo navegador gere IDs distintos em dias diferentes — sem cookie de sessão,
 * sem rastreamento cross-day.
 */
function deriveSessionId(event: H3Event): string {
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    getRequestHeader(event, 'x-real-ip') ??
    ''

  const ua = getRequestHeader(event, 'user-agent') ?? ''

  // Rotação diária: "2026-09-10" (UTC)
  const day = new Date().toISOString().slice(0, 10)

  return createHash('sha256').update(`${day}:${ip}:${ua}`).digest('hex')
}

export default defineEventHandler(async (event: H3Event): Promise<{ ok: boolean }> => {
  // Lê e valida o body antes de tocar no banco.
  let body: unknown
  try {
    body = await readBody(event)
  } catch {
    // Body malformado — aceita silenciosamente (não quebra a página).
    return { ok: true }
  }

  if (!body || typeof body !== 'object') return { ok: true }

  const { type, path, targetId, referrer } = body as Record<string, unknown>

  // Validação leve: `type` e `path` são obrigatórios; ignorar silenciosamente
  // se ausentes ou inválidos — o tracker JS não deve travar o carregamento da
  // página por uma resposta 4xx.
  if (typeof type !== 'string' || !VALID_TYPES.has(type)) return { ok: true }
  if (typeof path !== 'string' || !path) return { ok: true }

  const sessionId = deriveSessionId(event)

  try {
    await prisma.analyticsEvent.create({
      data: {
        type,
        path: path.slice(0, 2048), // guarda contra payloads anormalmente longos
        targetId: typeof targetId === 'string' ? targetId.slice(0, 512) : null,
        sessionId,
        referrer: typeof referrer === 'string' ? referrer.slice(0, 2048) : null,
      },
    })
  } catch (error) {
    // Falha de banco: registra no servidor, nunca vaza para o cliente.
    // A resposta continua { ok: true } para não quebrar a página.
    console.error('[POST /api/track] falha ao gravar AnalyticsEvent:', error)
  }

  return { ok: true }
})
