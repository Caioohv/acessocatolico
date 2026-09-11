<script setup lang="ts">
/**
 * StoreHero — cabeçalho da lojinha numa faixa roxa (marca).
 * Barra de largura total, na cor da marca, que agrupa o título, a chamada e o
 * aviso de transparência (slot padrão) num só bloco visual. Recebe título e
 * chamada por prop; o aviso vem pelo slot para manter a molécula `AffiliateNotice`
 * reutilizável. O conteúdo é centralizado por `AppContainer`, alinhando-se ao
 * restante da página. Só tokens de design.
 */
interface Props {
  /** Título principal da loja (h1). */
  title: string
  /** Chamada curta abaixo do título. */
  lead?: string
}
withDefaults(defineProps<Props>(), {
  lead: undefined,
})
</script>

<template>
  <section class="store-hero">
    <AppContainer class="store-hero__inner">
      <BaseHeading :level="1" class="store-hero__title">{{ title }}</BaseHeading>
      <p v-if="lead" class="store-hero__lead">{{ lead }}</p>
      <div v-if="$slots.default" class="store-hero__notice">
        <slot />
      </div>
    </AppContainer>
  </section>
</template>

<style scoped>
.store-hero {
  background: var(--surface-brand);
  color: var(--text-on-brand);
}

.store-hero__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-block: var(--space-10) var(--space-8);
}

.store-hero__title {
  color: var(--text-on-brand);
}

.store-hero__lead {
  margin: 0;
  max-width: var(--measure-prose);
  color: var(--brand-tint);
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.store-hero__notice {
  margin-top: var(--space-4);
}

@media (min-width: 48rem) {
  .store-hero__inner {
    padding-block: var(--space-12) var(--space-10);
  }
}
</style>
