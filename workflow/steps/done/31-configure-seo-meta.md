# Definir SEO meta na Home e posts

**Status:** done

## What to do

Definir `useSeoMeta`/`useHead` na Home e nas páginas de post: title, description, tags Open Graph e slug amigável (derivado do frontmatter do post). Cada página deve gerar `<head>` com title e og:tags corretos. Aproveitar o SSR do Nuxt para que os metadados sejam renderizados no servidor.

## Original line

> - [ ] Definir `useSeoMeta`/`useHead` na Home e nos posts (title, description, Open Graph, slug amigável). ✔ `<head>` traz title e og:tags corretos por página.

## Summary

Configurado `useSeoMeta` na Home (`pages/index.vue`), no índice do blog (`pages/blog/index.vue`) e na página individual de posts (`pages/blog/[...slug].vue`) definindo `title`, `description`, `ogTitle`, `ogDescription`, `ogImage` e `ogType` com suporte completo a SSR.
