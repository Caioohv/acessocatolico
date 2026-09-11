<script setup lang="ts">
/**
 * ProductForm — create or edit a product.
 *
 * When `productId` is provided the form sends PUT /api/products/:id.
 * Otherwise it sends POST /api/products and redirects to the listing.
 *
 * Design: mobile-first, only design-system tokens, no hardcoded values.
 */

interface ApiError {
  data?: {
    error?: {
      code?: string
      message?: string
      fields?: Record<string, string>
    }
  }
}

interface ProductFields {
  title: string
  description: string
  priceRef: string
  category: string
  affiliateUrl: string
  imageUrl: string
  active: boolean
  showPublic: boolean
  showOrg: boolean
}

const props = defineProps<{
  /** When set the form operates in edit mode. */
  productId?: string
  /** Initial values for edit mode. */
  initial?: Partial<ProductFields>
}>()

const emit = defineEmits<{
  /** Emitted after a successful save with the returned product data. */
  saved: [product: Record<string, unknown>]
}>()

// ── Form state ────────────────────────────────────────────────────────────────
const title = ref(props.initial?.title ?? '')
const description = ref(props.initial?.description ?? '')
const priceRef = ref(props.initial?.priceRef ?? '')
const category = ref(props.initial?.category ?? '')
const affiliateUrl = ref(props.initial?.affiliateUrl ?? '')
const imageUrl = ref(props.initial?.imageUrl ?? '')
const active = ref(props.initial?.active ?? true)
// Fontes da loja. Ao criar (sem `initial`): pública marcada, organizacional não.
const showPublic = ref(props.initial?.showPublic ?? true)
const showOrg = ref(props.initial?.showOrg ?? false)

const loading = ref(false)
const generalError = ref('')
const fieldErrors = ref<Record<string, string>>({})

// ── Submit ────────────────────────────────────────────────────────────────────
async function onSubmit() {
  generalError.value = ''
  fieldErrors.value = {}
  loading.value = true

  const body: ProductFields = {
    title: title.value.trim(),
    description: description.value.trim(),
    priceRef: priceRef.value.trim(),
    category: category.value.trim(),
    affiliateUrl: affiliateUrl.value.trim(),
    imageUrl: imageUrl.value.trim(),
    active: active.value,
    showPublic: showPublic.value,
    showOrg: showOrg.value,
  }

  try {
    const url = props.productId
      ? `/api/products/${props.productId}`
      : '/api/products'
    const method = props.productId ? 'PUT' : 'POST'

    const response = await $fetch<{ data: Record<string, unknown> }>(url, {
      method,
      body,
    })

    emit('saved', response.data)
  }
  catch (err: unknown) {
    const e = err as ApiError
    const apiError = e?.data?.error

    if (apiError?.code === 'VALIDATION_ERROR') {
      fieldErrors.value = apiError.fields ?? {}
      if (!Object.keys(fieldErrors.value).length) {
        generalError.value = apiError.message ?? 'Preencha todos os campos obrigatórios.'
      }
    }
    else if (apiError?.message) {
      generalError.value = apiError.message
    }
    else {
      generalError.value = 'Não foi possível salvar o produto. Tente novamente.'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    class="product-form"
    novalidate
    @submit.prevent="onSubmit"
  >
    <!-- General error banner -->
    <div
      v-if="generalError"
      class="product-form__alert"
      role="alert"
      aria-live="assertive"
    >
      {{ generalError }}
    </div>

    <!-- Title -->
    <div class="product-form__field">
      <label for="pf-title" class="product-form__label">
        Título <span class="product-form__required" aria-hidden="true">*</span>
      </label>
      <input
        id="pf-title"
        v-model="title"
        type="text"
        name="title"
        class="product-form__input"
        :class="{ 'product-form__input--error': fieldErrors.title }"
        placeholder="Ex.: Terço de Madeira Artesanal"
        maxlength="200"
        :disabled="loading"
        :aria-invalid="Boolean(fieldErrors.title)"
        :aria-describedby="fieldErrors.title ? 'pf-title-error' : undefined"
        required
      >
      <span
        v-if="fieldErrors.title"
        id="pf-title-error"
        class="product-form__field-error"
        role="alert"
      >
        {{ fieldErrors.title }}
      </span>
    </div>

    <!-- Description -->
    <div class="product-form__field">
      <label for="pf-description" class="product-form__label">
        Descrição <span class="product-form__required" aria-hidden="true">*</span>
      </label>
      <textarea
        id="pf-description"
        v-model="description"
        name="description"
        class="product-form__textarea"
        :class="{ 'product-form__input--error': fieldErrors.description }"
        placeholder="Descreva brevemente o produto e seus diferenciais."
        rows="4"
        maxlength="1000"
        :disabled="loading"
        :aria-invalid="Boolean(fieldErrors.description)"
        :aria-describedby="fieldErrors.description ? 'pf-description-error' : undefined"
        required
      />
      <span
        v-if="fieldErrors.description"
        id="pf-description-error"
        class="product-form__field-error"
        role="alert"
      >
        {{ fieldErrors.description }}
      </span>
    </div>

    <!-- Two-column row: price + category -->
    <div class="product-form__row">
      <!-- Price -->
      <div class="product-form__field">
        <label for="pf-price" class="product-form__label">
          Preço de referência <span class="product-form__required" aria-hidden="true">*</span>
        </label>
        <input
          id="pf-price"
          v-model="priceRef"
          type="text"
          name="priceRef"
          class="product-form__input"
          :class="{ 'product-form__input--error': fieldErrors.priceRef }"
          placeholder="R$ 49,90"
          maxlength="50"
          :disabled="loading"
          :aria-invalid="Boolean(fieldErrors.priceRef)"
          :aria-describedby="fieldErrors.priceRef ? 'pf-price-error' : undefined"
          required
        >
        <span
          v-if="fieldErrors.priceRef"
          id="pf-price-error"
          class="product-form__field-error"
          role="alert"
        >
          {{ fieldErrors.priceRef }}
        </span>
      </div>

      <!-- Category -->
      <div class="product-form__field">
        <label for="pf-category" class="product-form__label">
          Categoria <span class="product-form__required" aria-hidden="true">*</span>
        </label>
        <input
          id="pf-category"
          v-model="category"
          type="text"
          name="category"
          class="product-form__input"
          :class="{ 'product-form__input--error': fieldErrors.category }"
          placeholder="Ex.: Terços, Bíblias, Livros…"
          maxlength="100"
          :disabled="loading"
          :aria-invalid="Boolean(fieldErrors.category)"
          :aria-describedby="fieldErrors.category ? 'pf-category-error' : undefined"
          required
        >
        <span
          v-if="fieldErrors.category"
          id="pf-category-error"
          class="product-form__field-error"
          role="alert"
        >
          {{ fieldErrors.category }}
        </span>
      </div>
    </div>

    <!-- Affiliate URL -->
    <div class="product-form__field">
      <label for="pf-affiliate" class="product-form__label">
        Link de afiliado <span class="product-form__required" aria-hidden="true">*</span>
      </label>
      <input
        id="pf-affiliate"
        v-model="affiliateUrl"
        type="url"
        name="affiliateUrl"
        class="product-form__input"
        :class="{ 'product-form__input--error': fieldErrors.affiliateUrl }"
        placeholder="https://amzn.to/exemplo"
        :disabled="loading"
        :aria-invalid="Boolean(fieldErrors.affiliateUrl)"
        :aria-describedby="fieldErrors.affiliateUrl ? 'pf-affiliate-error' : undefined"
        required
      >
      <span
        v-if="fieldErrors.affiliateUrl"
        id="pf-affiliate-error"
        class="product-form__field-error"
        role="alert"
      >
        {{ fieldErrors.affiliateUrl }}
      </span>
    </div>

    <!-- Image URL -->
    <div class="product-form__field">
      <label for="pf-image" class="product-form__label">
        URL da foto <span class="product-form__required" aria-hidden="true">*</span>
      </label>
      <input
        id="pf-image"
        v-model="imageUrl"
        type="url"
        name="imageUrl"
        class="product-form__input"
        :class="{ 'product-form__input--error': fieldErrors.imageUrl }"
        placeholder="https://exemplo.com/foto.jpg"
        :disabled="loading"
        :aria-invalid="Boolean(fieldErrors.imageUrl)"
        :aria-describedby="fieldErrors.imageUrl ? 'pf-image-error' : undefined"
        required
      >
      <span
        v-if="fieldErrors.imageUrl"
        id="pf-image-error"
        class="product-form__field-error"
        role="alert"
      >
        {{ fieldErrors.imageUrl }}
      </span>
      <!-- Live preview when URL looks valid -->
      <div
        v-if="imageUrl && imageUrl.startsWith('http')"
        class="product-form__preview"
        aria-label="Pré-visualização da foto"
      >
        <img
          :src="imageUrl"
          alt=""
          class="product-form__preview-img"
          loading="lazy"
        >
      </div>
    </div>

    <!-- Store sources -->
    <fieldset class="product-form__fieldset">
      <legend class="product-form__legend">Fontes da loja</legend>
      <p class="product-form__hint">
        Escolha em quais lojas este produto aparece. A pública é para todos; a
        organizacional é para quem organiza eventos (atacado e itens similares).
      </p>

      <div class="product-form__field product-form__field--inline">
        <input
          id="pf-show-public"
          v-model="showPublic"
          type="checkbox"
          name="showPublic"
          class="product-form__checkbox"
          :disabled="loading"
        >
        <label for="pf-show-public" class="product-form__label product-form__label--inline">
          Loja pública
        </label>
      </div>

      <div class="product-form__field product-form__field--inline">
        <input
          id="pf-show-org"
          v-model="showOrg"
          type="checkbox"
          name="showOrg"
          class="product-form__checkbox"
          :disabled="loading"
        >
        <label for="pf-show-org" class="product-form__label product-form__label--inline">
          Loja organizacional
        </label>
      </div>
    </fieldset>

    <!-- Active toggle -->
    <div class="product-form__field product-form__field--inline">
      <input
        id="pf-active"
        v-model="active"
        type="checkbox"
        name="active"
        class="product-form__checkbox"
        :disabled="loading"
      >
      <label for="pf-active" class="product-form__label product-form__label--inline">
        Produto ativo (visível na lojinha)
      </label>
    </div>

    <!-- Actions -->
    <div class="product-form__actions">
      <NuxtLink to="/produtos" class="product-form__cancel">
        Cancelar
      </NuxtLink>
      <button
        type="submit"
        class="product-form__submit"
        :disabled="loading"
        :aria-busy="loading"
      >
        {{ loading ? 'Salvando…' : (productId ? 'Salvar alterações' : 'Criar produto') }}
      </button>
    </div>
  </form>
</template>

<style scoped>
/* =========================================================================
   ProductForm
   Mobile-first; somente tokens do design-system — nenhum valor hardcoded.
   ========================================================================= */

.product-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* ── Banner de erro geral ──────────────────────────────────────────────────── */
.product-form__alert {
  background-color: var(--danger-100);
  color: var(--danger-600);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: var(--leading-normal);
}

/* ── Linha de dois campos ─────────────────────────────────────────────────── */
.product-form__row {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
}

@media (min-width: 48rem) {
  .product-form__row {
    grid-template-columns: 1fr 1fr;
  }
}

/* ── Grupo de campo ───────────────────────────────────────────────────────── */
.product-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.product-form__field--inline {
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
}

/* ── Label ────────────────────────────────────────────────────────────────── */
.product-form__label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--text-body);
}

.product-form__label--inline {
  font-weight: var(--weight-normal);
  cursor: pointer;
}

.product-form__required {
  color: var(--danger-600);
}

/* ── Input / textarea base ────────────────────────────────────────────────── */
.product-form__input,
.product-form__textarea {
  width: 100%;
  padding-inline: var(--space-3);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--text-strong);
  background-color: var(--surface-card);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  outline: none;
  transition:
    border-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}

.product-form__input {
  height: 44px; /* alvo de toque mínimo */
}

.product-form__textarea {
  padding-block: var(--space-3);
  resize: vertical;
  min-height: 100px;
}

.product-form__input::placeholder,
.product-form__textarea::placeholder {
  color: var(--text-subtle);
}

.product-form__input:focus,
.product-form__textarea:focus {
  border-color: var(--brand);
  box-shadow: var(--shadow-focus);
}

.product-form__input--error,
.product-form__input--error:focus,
.product-form__textarea.product-form__input--error,
.product-form__textarea.product-form__input--error:focus {
  border-color: var(--danger-600);
  box-shadow: 0 0 0 3px oklch(0.58 0.16 26 / 0.20);
}

.product-form__input:disabled,
.product-form__textarea:disabled {
  background-color: var(--surface-sunken);
  color: var(--text-muted);
  cursor: not-allowed;
}

/* ── Erro de campo ────────────────────────────────────────────────────────── */
.product-form__field-error {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--danger-600);
}

/* ── Preview de imagem ────────────────────────────────────────────────────── */
.product-form__preview {
  margin-top: var(--space-2);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  width: 6rem;
  height: 6rem;
  background: var(--surface-sunken);
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-form__preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Fieldset de fontes ───────────────────────────────────────────────────── */
.product-form__fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-4);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
}

.product-form__legend {
  padding-inline: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--text-strong);
}

.product-form__hint {
  margin: 0 0 var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: var(--leading-normal);
}

/* ── Checkbox ─────────────────────────────────────────────────────────────── */
.product-form__checkbox {
  width: 1.125rem;
  height: 1.125rem;
  min-width: 1.125rem;
  accent-color: var(--brand);
  cursor: pointer;
}

.product-form__checkbox:disabled {
  cursor: not-allowed;
}

/* ── Ações ────────────────────────────────────────────────────────────────── */
.product-form__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-2);
}

.product-form__cancel {
  min-height: 44px;
  padding-inline: var(--space-4);
  display: inline-flex;
  align-items: center;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  color: var(--text-body);
  text-decoration: none;
  border-radius: var(--radius-md);
  border: var(--border-width) solid var(--border);
  background: transparent;
  transition: border-color var(--dur-fast) var(--ease-standard);
}

.product-form__cancel:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.product-form__cancel:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.product-form__submit {
  min-height: 44px;
  padding-inline: var(--space-6);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  color: var(--text-on-brand);
  background-color: var(--brand);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease-standard),
    box-shadow var(--dur-fast) var(--ease-standard);
}

.product-form__submit:hover:not(:disabled) {
  background-color: var(--brand-strong);
}

.product-form__submit:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.product-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
