/**
 * analytics.client.ts — Plugin de coleta de pageviews (client-side only).
 *
 * Dispara um evento `pageview` para `POST /api/track` em CADA navegação de
 * rota, incluindo a carga inicial da página. Por ser `.client.ts`, nunca
 * executa no servidor (sem duplo disparo na hidratação).
 *
 * Design:
 *   - `router.afterEach` garante que o path já está resolvido quando o evento
 *     é enviado (navegação concluída, sem interferência no ciclo de loading).
 *   - `void $fetch(...)` — disparo "fire and forget": o tracking não bloqueia
 *     a UI nem propaga erros para o usuário em caso de falha do endpoint.
 *   - O `referrer` aproveita `document.referrer` quando disponível, que é
 *     resetado pelo navegador automaticamente a cada navegação SPA para cadeia
 *     de referência externa; para navegações internas fica vazio — comportamento
 *     correto (referrer interno não é PII relevante para o endpoint).
 */
export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach((to) => {
    // Fire-and-forget: não bloqueia a navegação nem propaga erros.
    void $fetch('/api/track', {
      method: 'POST',
      body: {
        type: 'pageview',
        path: to.path,
        referrer: document.referrer || undefined,
      },
    }).catch(() => {
      // Silencia falhas de rede/servidor: o tracking nunca deve
      // interromper a experiência do usuário.
    })
  })
})
