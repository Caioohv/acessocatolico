<script setup lang="ts">
/**
 * PostMeta — molécula de meta-dados de post (categoria + data).
 * Exibe a categoria como chip (`BaseTag`) e a data de publicação formatada
 * em PT-BR (`Intl.DateTimeFormat`) em fonte mono (`--font-mono` / `--text-meta`),
 * marcada em `<time datetime>` para semântica/acessibilidade. Ambos os campos
 * são opcionais: renderiza só o que existir. Só tokens de design.
 */
interface Props {
  /** Categoria do post (exibida como chip). */
  category?: string
  /** Data de publicação — ISO ou qualquer valor parseável por `Date`. */
  date?: string
}
const props = defineProps<Props>()

/** Data válida derivada da prop, ou `null` se ausente/inválida. */
const parsedDate = computed(() => {
  if (!props.date) return null
  const d = new Date(props.date)
  return Number.isNaN(d.getTime()) ? null : d
})

/** Valor `machine-readable` para o atributo `datetime`. */
const machineDate = computed(() => parsedDate.value?.toISOString() ?? undefined)

/** Data legível formatada em português do Brasil (ex.: `9 de set. de 2026`). */
const formattedDate = computed(() =>
  parsedDate.value
    ? new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(parsedDate.value)
    : null,
)
</script>

<template>
  <div v-if="category || formattedDate" class="post-meta">
    <BaseTag v-if="category" :label="category" />
    <time v-if="formattedDate" class="post-meta__date" :datetime="machineDate">
      {{ formattedDate }}
    </time>
  </div>
</template>

<style scoped>
.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.post-meta__date {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-mono);
  line-height: var(--leading-snug);
}
</style>
