<script setup lang="ts">
/**
 * PostCarousel — organism de trilho horizontal deslizável de posts.
 * Envolve uma lista de `PostCard` num scroller com scroll-snap nativo (sem
 * bibliotecas), navegável por touch/swipe, por teclado (foco nos links) e
 * pelos botões de `CarouselControls`. Detecta os limites de rolagem para
 * habilitar/desabilitar as setas.
 *
 * Duas variantes (reuso em vez de um `TrackRail` separado):
 * - `default`: carrossel temático simples.
 * - `track`: Trilha de Formação — cada cartão recebe o `TrackBadge` da sua
 *   etapa (via `post.track.order`) e o trilho ganha uma linha conectora.
 *
 * Puramente apresentacional: recebe os posts prontos por prop; só mantém
 * estado local de UI (posição/limites de rolagem). Só tokens de design.
 */
import type { Post } from '../molecules/PostCard.vue'

interface Props {
  /** Posts exibidos no trilho (já ordenados por quem compõe). */
  posts?: Post[]
  /** `track` ativa badges de etapa e a linha conectora. */
  variant?: 'default' | 'track'
  /** Rótulo acessível do trilho (ex.: nome da categoria/trilha). */
  label?: string
}
withDefaults(defineProps<Props>(), {
  posts: () => [],
  variant: 'default',
  label: undefined,
})

/** Referência ao elemento rolável. */
const scroller = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(false)

/** Recalcula os limites de rolagem (chamado no mount, scroll e resize). */
function updateBounds() {
  const el = scroller.value
  if (!el) return
  // Tolerância de 1px para arredondamentos de layout.
  canPrev.value = el.scrollLeft > 1
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}

/** Rola ~85% da largura visível na direção indicada. */
function scrollByDir(dir: 1 | -1) {
  const el = scroller.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateBounds()
  if (typeof ResizeObserver !== 'undefined' && scroller.value) {
    resizeObserver = new ResizeObserver(updateBounds)
    resizeObserver.observe(scroller.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})
</script>

<template>
  <div class="post-carousel" :class="`post-carousel--${variant}`">
    <div
      ref="scroller"
      class="post-carousel__scroller"
      :class="{ 'post-carousel__scroller--track': variant === 'track' }"
      @scroll.passive="updateBounds"
    >
      <ul class="post-carousel__list">
        <li v-for="post in posts" :key="post.path" class="post-carousel__item">
          <PostCard
            :post="post"
            :step="variant === 'track' ? post.track?.order : undefined"
            :total-steps="variant === 'track' ? post.track?.totalSteps : undefined"
          />
        </li>
      </ul>
    </div>

    <CarouselControls
      v-if="canPrev || canNext"
      class="post-carousel__controls"
      :can-prev="canPrev"
      :can-next="canNext"
      :label="label"
      @prev="scrollByDir(-1)"
      @next="scrollByDir(1)"
    />
  </div>
</template>

<style scoped>
.post-carousel {
  position: relative;
}

/* --- Scroller nativo ------------------------------------------------------ */
.post-carousel__scroller {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  /* Esconde a scrollbar mantendo a rolagem acessível. */
  scrollbar-width: none;
  -ms-overflow-style: none;
  /* Respiro para a sombra/hover dos cartões não ser cortada. */
  margin-inline: calc(-1 * var(--space-1));
  padding-inline: var(--space-1);
  padding-block: var(--space-2);
}

.post-carousel__scroller::-webkit-scrollbar {
  display: none;
}

.post-carousel__list {
  display: flex;
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-carousel__item {
  flex: 0 0 auto;
  /* Largura fixa do cartão no trilho (mobile-first). */
  width: 17rem;
  scroll-snap-align: start;
}

@media (min-width: 48rem) {
  .post-carousel__item {
    width: 20rem;
  }
}

/* --- Variante Trilha: linha conectora alinhada ao meio das capas ----------
   As capas têm aspect-ratio 16/9 e largura fixa por breakpoint, então a altura
   do meio da capa é determinística: item 17rem → capa 9.5625rem → meio 4.78rem.
   O conector é um segmento tracejado que atravessa o gap entre os cartões. */
.post-carousel__scroller--track .post-carousel__item {
  position: relative;
}

.post-carousel__scroller--track .post-carousel__item + .post-carousel__item::before {
  content: '';
  position: absolute;
  top: 4.78rem;
  left: calc(-1 * var(--space-6));
  width: var(--space-6);
  border-top: 2px dashed var(--border-strong);
  pointer-events: none;
}

@media (min-width: 48rem) {
  /* item 20rem → capa 11.25rem → meio 5.625rem */
  .post-carousel__scroller--track .post-carousel__item + .post-carousel__item::before {
    top: 5.625rem;
  }
}

/* --- Controles ------------------------------------------------------------ */
.post-carousel__controls {
  margin-top: var(--space-4);
}

/* Reduz movimento para quem prefere. */
@media (prefers-reduced-motion: reduce) {
  .post-carousel__scroller {
    scroll-behavior: auto;
  }
}
</style>
