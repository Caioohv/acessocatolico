<script setup lang="ts">
import type { NuxtError } from '#app'

/**
 * error.vue — página de erro global do portal.
 * Exibida automaticamente quando ocorre um erro (ex.: 404). Reutiliza a estrutura
 * visual com TheHeader, AppContainer, BaseHeading, BaseButton e TheFooter.
 */
const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error?.statusCode === 404)

const handleClearError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-layout">
    <TheHeader />

    <AppContainer as="main" class="error-page">
      <div class="error-page__content">
        <span class="error-page__badge">
          {{ isNotFound ? '404' : 'Erro' }}
        </span>

        <BaseHeading :level="1">
          {{ isNotFound ? 'Página não encontrada' : 'Ocorreu um erro inesperado' }}
        </BaseHeading>

        <p class="error-page__description">
          {{
            isNotFound
              ? 'O conteúdo que você procurou não existe mais ou mudou de endereço. Utilize os atalhos abaixo para continuar navegando pelo portal.'
              : 'Não foi possível carregar a página solicitada no momento. Tente novamente mais tarde ou retorne ao início.'
          }}
        </p>

        <div class="error-page__actions">
          <BaseButton variant="primary" @click="handleClearError">
            Voltar para o início
          </BaseButton>
          <BaseButton variant="secondary" to="/blog">
            Ir para o Blog
          </BaseButton>
        </div>
      </div>
    </AppContainer>

    <TheFooter />
  </div>
</template>

<style scoped>
.error-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.error-page {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--space-12) var(--space-16);
}

.error-page__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: var(--measure-prose);
  gap: var(--space-4);
}

.error-page__badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  background: var(--brand-tint-quiet);
  color: var(--brand-strong);
  border-radius: var(--radius-pill);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
}

.error-page__description {
  margin: 0;
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.error-page__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
}
</style>
