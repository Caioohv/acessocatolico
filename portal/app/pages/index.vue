<script setup lang="ts">
/**
 * / — home do portal.
 * Página raiz que tem prioridade sobre o catch-all `[...slug].vue` no caminho
 * `/`. Abre com a section `HeroHome` (proposta de valor + CTA). Novas sections
 * da home entram abaixo dela nesta página.
 */
useSeoMeta({
  title: 'Acesso Católico',
  description:
    'Horários de missa e confissão, eventos e comunidades da sua região, reunidos em um portal gratuito e sempre atualizado.',
  ogTitle: 'Acesso Católico',
  ogDescription:
    'Horários de missa e confissão, eventos e comunidades da sua região, reunidos em um portal gratuito e sempre atualizado.',
  ogType: 'website',
})
</script>

<template>
  <div class="home">
    <HeroHome />
    <ShortcutsHome />
    <LatestPosts />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  padding-block: var(--space-8) var(--space-16);
}
</style>
