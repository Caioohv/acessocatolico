# Criar seção da lojinha para a Home

**Status:** done

## What to do

Criar a seção `portal/app/components/sections/LatestProducts.vue` exibindo uma vitrine compacta com os primeiros produtos em destaque e um link CTA para `/loja`. Inserir a seção em `portal/app/pages/index.vue`, posicionada harmoniosamente entre as seções existentes. Garantir que o visual mantenha o alinhamento com os tokens do design system.

## Original line

> - [ ] Criar seção da lojinha para a Home em `portal/app/components/sections/LatestProducts.vue` e incluir em `portal/app/pages/index.vue`. ✔ Home renderiza seção "Da lojinha" com link para `/loja`.

## Summary

Criada a section `portal/app/components/sections/LatestProducts.vue`: busca produtos reais em `GET /api/products` (via `useFetch`, SSR-safe) e mostra os 3 primeiros numa vitrine, reusando o organismo `ProductGrid` (que compõe `ProductCard`), com título "Da lojinha", link "Ver tudo" e CTA `BaseButton` para `/loja`. A section só renderiza quando há produtos (`v-if`), evitando bloco vazio sem banco. Incluída em `portal/app/pages/index.vue` após `LatestPosts`. Só tokens de design. Validado com `npx nuxi prepare` e `eslint` (limpos).
