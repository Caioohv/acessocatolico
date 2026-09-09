# Criar molécula CategoryFilter

**Status:** done

## What to do

Criar a molécula `CategoryFilter.vue` e usá-la para filtrar a listagem do blog por categoria, usando a consulta nativa do Nuxt Content (`queryCollection` com `where`). Clicar numa categoria deve filtrar os posts exibidos. Reaproveitar `BaseTag` para os itens de filtro.

## Original line

> - [ ] Criar molécula `CategoryFilter.vue` e filtrar a listagem por categoria (nativo do Nuxt Content). ✔ clicar numa categoria filtra os posts.

## Summary

Criada a molécula `portal/app/components/molecules/CategoryFilter.vue` (chips `BaseTag` navegáveis via `?categoria=<valor>`, com chip "Todos"). O índice `portal/app/pages/blog/index.vue` re-consulta o Nuxt Content nativamente (`queryCollection('blog').where('category','=', valor)`) reativo à query string via `useAsyncData({ watch: [activeCategory] })`, mais uma consulta para as categorias distintas. Adicionada prop `active` ao átomo `BaseTag` (estado preenchido + `aria-current`). `npx nuxi prepare` roda sem erro.
