<script setup lang="ts">
/**
 * ProductCarousel — organism de trilho horizontal deslizável de produtos.
 * Espelha o `PostCarousel` do blog, mas para os cartões da lojinha: envolve uma
 * lista de `ProductCard` num scroller com scroll-snap nativo (sem bibliotecas),
 * navegável por touch/swipe, por teclado (foco nos links) e pelos botões de
 * `CarouselControls`. Detecta os limites de rolagem para habilitar/desabilitar
 * as setas.
 *
 * Puramente apresentacional: recebe os produtos prontos por prop; só mantém
 * estado local de UI (posição/limites de rolagem). Só tokens de design.
 */
import type { Product } from '../molecules/ProductCard.vue'

interface Props {
  /** Produtos exibidos no trilho. */
  products?: Product[]
  /** Rótulo acessível do trilho (ex.: nome da categoria). */
  label?: string
}
withDefaults(defineProps<Props>(), {
  products: () => [],
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
  <div class="product-carousel">
    <div
      ref="scroller"
      class="product-carousel__scroller"
      @scroll.passive="updateBounds"
    >
      <ul class="product-carousel__list">
        <li v-for="product in products" :key="product.id" class="product-carousel__item">
          <ProductCard :product="product" />
        </li>
      </ul>
    </div>

    <CarouselControls
      v-if="canPrev || canNext"
      class="product-carousel__controls"
      :can-prev="canPrev"
      :can-next="canNext"
      :label="label"
      @prev="scrollByDir(-1)"
      @next="scrollByDir(1)"
    />
  </div>
</template>

<style scoped>
.product-carousel {
  position: relative;
}

/* --- Scroller nativo ------------------------------------------------------ */
.product-carousel__scroller {
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

.product-carousel__scroller::-webkit-scrollbar {
  display: none;
}

.product-carousel__list {
  display: flex;
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  list-style: none;
}

.product-carousel__item {
  flex: 0 0 auto;
  /* Largura fixa do cartão no trilho (mobile-first). */
  width: 17rem;
  scroll-snap-align: start;
}

@media (min-width: 48rem) {
  .product-carousel__item {
    width: 20rem;
  }
}

/* --- Controles ------------------------------------------------------------ */
.product-carousel__controls {
  margin-top: var(--space-4);
}

/* Reduz movimento para quem prefere. */
@media (prefers-reduced-motion: reduce) {
  .product-carousel__scroller {
    scroll-behavior: auto;
  }
}
</style>
