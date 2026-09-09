import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * Configuração das collections do @nuxt/content 3.
 *
 * A collection `blog` tipa o frontmatter dos posts em `content/blog/**`.
 * O schema garante que `queryCollection('blog')` retorne os campos abaixo
 * já tipados (categoria, tags, data, capa, slug e resumo), consumidos pelo
 * `PostCard` e pelo grid do blog. `type: 'page'` já entrega, além do schema,
 * os campos nativos: `title` (título), `description` (o resumo), `path`,
 * `body`, `seo` e `navigation` — por isso o resumo não é redeclarado aqui.
 */
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        /** Categoria editorial do post (ex.: "Espiritualidade"). */
        category: z.string(),
        /** Etiquetas livres para filtro/busca. */
        tags: z.array(z.string()).default([]),
        /** Data de publicação (ISO `YYYY-MM-DD`). */
        date: z.string().date(),
        /** URL/caminho da imagem de capa. */
        cover: z.string().optional(),
        /** Texto alternativo da capa (acessibilidade). */
        coverAlt: z.string().optional(),
        /** Slug canônico do post; sobrepõe o derivado do arquivo quando presente. */
        slug: z.string().optional(),
      }),
    }),
  },
})
