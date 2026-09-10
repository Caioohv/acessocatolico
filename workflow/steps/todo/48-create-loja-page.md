# Criar página principal da lojinha

**Status:** todo

## What to do

Criar a página `portal/app/pages/loja/index.vue` integrando a busca de produtos do endpoint `/api/products` via `useFetch` SSR-safe. A página deve sincronizar o filtro de categoria na URL (`route.query.categoria`), compor o cabeçalho com `BaseHeading`, o aviso `AffiliateNotice`, os chips de `ProductCategoryFilter` e a grade `ProductGrid`. Configurar os metadados de SEO (título, descrição e Open Graph) via `useSeoMeta`.

## Original line

> - [ ] Criar página principal da lojinha em `portal/app/pages/loja/index.vue` integrando busca SSR (`useFetch`), SEO (`useSeoMeta`), filtro e grid. ✔ Rota `/loja` renderiza corretamente via SSR no Nuxt.
