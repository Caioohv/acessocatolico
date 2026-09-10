# Criar página principal da lojinha

**Status:** done

## What to do

Criar a página `portal/app/pages/loja/index.vue` integrando a busca de produtos do endpoint `/api/products` via `useFetch` SSR-safe. A página deve sincronizar o filtro de categoria na URL (`route.query.categoria`), compor o cabeçalho com `BaseHeading`, o aviso `AffiliateNotice`, os chips de `ProductCategoryFilter` e a grade `ProductGrid`. Configurar os metadados de SEO (título, descrição e Open Graph) via `useSeoMeta`.

## Original line

> - [ ] Criar página principal da lojinha em `portal/app/pages/loja/index.vue` integrando busca SSR (`useFetch`), SEO (`useSeoMeta`), filtro e grid. ✔ Rota `/loja` renderiza corretamente via SSR no Nuxt.

## Summary

Criada `portal/app/pages/loja/index.vue`: página `/loja` com busca SSR-safe via `useFetch` de `GET /api/products` (query reativa `?categoria=`, re-consulta automática) e `GET /api/products/categories`. Compõe `BaseHeading`, `AffiliateNotice`, `ProductCategoryFilter` e `ProductGrid` (estado vazio delegado ao organismo via `has-filters`), com SEO/OG por `useSeoMeta`. Validado com `npx nuxi prepare` e `eslint` (limpos).
