# Ajustar schema do post no content.config.ts

**Status:** done

## What to do

Ajustar `content.config.ts` (@nuxt/content 3) definindo o schema da collection de blog com os campos: título, categoria, tags, data, capa, slug e resumo. O schema deve tipar esses campos para que `queryCollection` os retorne tipados. Usar `zod` conforme o padrão do Nuxt Content 3.

## Original line

> - [ ] Ajustar `content.config.ts` com o schema do post (título, categoria, tags, data, capa, slug, resumo). ✔ `queryCollection` tipa esses campos.

## Summary

Reescrito `portal/content.config.ts`: collection `blog` (`type: 'page'`, source `blog/**`) com schema `zod` (`z` exportado por `@nuxt/content`) tipando `category`, `tags` (default `[]`), `date` (`z.string().date()`), `cover`, `coverAlt` e `slug`. Título e resumo usam os campos nativos do tipo `page` (`title`/`description`), evitando redeclaração. `npx nuxi prepare` gerou os tipos; `.nuxt/content/types.d.ts` confirma os campos tipados em `queryCollection('blog')`.
