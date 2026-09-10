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
    // Páginas avulsas servidas pelo catch-all `app/pages/[...slug].vue` via
    // `queryCollection('content').path(...)`. PRECISA existir: consultar uma
    // collection não declarada faz o @nuxt/content buscar uma tabela SQLite
    // inexistente e lançar erro em CADA URL não-casada (todo tráfego 404 de
    // bots/scanners), o que vazava heap por request até o OOM. Exclui `blog/**`
    // para não duplicar os posts (que têm a sua própria collection tipada).
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['blog/**'],
      },
    }),
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
