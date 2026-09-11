<script setup lang="ts">
/**
 * ProductCard — molécula de cartão da lojinha de afiliados (Fase 1).
 * Recebe um produto por prop e renderiza imagem (com fallback de gradiente),
 * categoria via `BaseTag`, título via `BaseHeading`, descrição curta, preço de
 * referência em BRL e um CTA via `BaseButton` que leva ao link de afiliado
 * (abre em nova aba, sem passar contexto de navegação: `noopener noreferrer
 * nofollow`). Compõe apenas os átomos existentes e consome só tokens de design.
 *
 * O CTA é a ação primária do cartão — por isso o cartão inteiro NÃO é um link
 * estendido: evita interativos aninhados e mantém o clique previsível.
 */

/** Formato público de um produto, espelha o contrato de `GET /api/products`. */
export interface Product {
  /** Identificador estável do produto. */
  id: string
  /** Nome do produto. */
  title: string
  /** Descrição curta exibida no corpo do cartão. */
  description: string
  /** Preço de referência (string de exibição, ex.: `R$ 49,90`). */
  priceRef: string
  /** Categoria do produto (ex.: `Terços`). */
  category: string
  /** URL de afiliado — destino do CTA. */
  affiliateUrl: string
  /** URL da imagem do produto. */
  imageUrl: string
}

interface Props {
  /** Produto a ser renderizado. */
  product: Product
}
const props = defineProps<Props>()

const hasImage = computed(() => Boolean(props.product.imageUrl))

const route = useRoute()

/**
 * Dispara `product_click` fire-and-forget: não bloqueia a navegação
 * para o link de afiliado (que abre em `_blank`).
 */
function trackClick() {
  $fetch('/api/track', {
    method: 'POST',
    body: {
      type: 'product_click',
      path: route.path,
      targetId: props.product.id,
    },
  }).catch(() => {
    // Silencioso: falha de rede não deve romper a experiência do usuário.
  })
}

/**
 * Preço em BRL. `priceRef` já costuma vir como string de exibição
 * (`R$ 49,90`); se vier como número puro (`49.90`), formata em BRL.
 */
const price = computed(() => {
  const raw = props.product.priceRef?.trim() ?? ''
  const numeric = Number(raw.replace(',', '.'))
  if (raw !== '' && !Number.isNaN(numeric)) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numeric)
  }
  return raw
})
</script>

<template>
  <article class="product-card">
    <div class="product-card__media" aria-hidden="true">
      <NuxtImg
        v-if="hasImage"
        :src="product.imageUrl"
        :alt="''"
        class="product-card__img"
        loading="lazy"
        sizes="100vw sm:50vw lg:33vw"
      />
      <span v-else class="product-card__media-fallback" />
    </div>

    <div class="product-card__body">
      <BaseTag v-if="product.category" :label="product.category" />

      <BaseHeading :level="3" class="product-card__title">
        {{ product.title }}
      </BaseHeading>

      <p v-if="product.description" class="product-card__desc">
        {{ product.description }}
      </p>

      <div class="product-card__footer">
        <p class="product-card__price">
          <span class="product-card__price-label">Preço de referência</span>
          <span class="product-card__price-value">{{ price }}</span>
        </p>

        <BaseButton
          :href="product.affiliateUrl"
          target="_blank"
          rel="noopener noreferrer nofollow"
          block
          :aria-label="`Ver oferta de ${product.title}`"
          @click="trackClick"
        >
          Ver oferta
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--dur-base) var(--ease-standard),
    border-color var(--dur-base) var(--ease-standard),
    transform var(--dur-base) var(--ease-standard);
}

.product-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* --- Mídia ---------------------------------------------------------------- */
.product-card__media {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--surface-sunken);
}

.product-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__media-fallback {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--brand-tint-quiet), var(--brand-tint));
}

/* --- Corpo ---------------------------------------------------------------- */
.product-card__body {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-5);
}

.product-card__title {
  margin: 0;
}

.product-card__desc {
  margin: 0;
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* --- Rodapé: preço + CTA -------------------------------------------------- */
.product-card__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
  margin-top: auto;
  padding-top: var(--space-3);
}

.product-card__price {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
}

.product-card__price-label {
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  line-height: var(--leading-snug);
}

.product-card__price-value {
  color: var(--text-strong);
  font-family: var(--font-display);
  font-size: var(--text-h4);
  font-weight: var(--weight-bold);
  line-height: var(--leading-snug);
}
</style>
