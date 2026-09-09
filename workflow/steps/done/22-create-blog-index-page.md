# Criar página blog/index.vue

**Status:** done

## What to do

Criar a página `app/pages/blog/index.vue` que lista os posts (mais recentes primeiro) usando a molécula `PostCard`, via `queryCollection` do Nuxt Content. A rota `/blog` deve mostrar os posts de exemplo ordenados por data decrescente.

## Original line

> - [ ] Criar página `app/pages/blog/index.vue`: lista os posts (mais recentes primeiro) usando `PostCard`. ✔ `/blog` mostra os posts de exemplo.

## Summary

Criado `portal/app/pages/blog/index.vue`: busca `queryCollection('blog').order('date', 'DESC').all()` via `useAsyncData` (SSR), renderiza cada post com `PostCard` num grid responsivo (1/2/3 colunas por `min-width` 48rem/64rem), só com tokens de design; header com `BaseHeading`/`AppContainer`, `useSeoMeta` para título/descrição e estado vazio. Capas ausentes já caem no fallback de gradiente do `PostCard`; capas com caminho inexistente em disco continuam 404 em runtime até as imagens serem adicionadas (gotcha já registrado). `npx nuxi prepare` roda sem erros.
