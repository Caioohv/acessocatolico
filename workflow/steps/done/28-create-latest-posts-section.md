# Criar section LatestPosts

**Status:** done

## What to do

Criar a section `LatestPosts.vue` que reaproveita `PostGrid` com os 3 posts mais recentes (via `queryCollection`) e inclui um link "ver blog" para `/blog`. Deve exibir posts reais do content.

## Original line

> - [ ] Criar section `LatestPosts.vue`: reaproveita `PostGrid` com os 3 posts mais recentes + link "ver blog". ✔ mostra posts reais do content.

## Summary

Criada `portal/app/components/sections/LatestPosts.vue`: `useAsyncData` + `queryCollection('blog').order('date','DESC').limit(3).all()`, renderiza via `PostGrid`, com heading "Do blog" e `BaseButton to="/blog"` (secondary) para "Ver o blog". Incluída em `portal/app/pages/index.vue` abaixo de `HeroHome`. `nuxi prepare` passa.
