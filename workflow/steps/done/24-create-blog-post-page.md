# Criar página do post blog/[...slug].vue

**Status:** done

## What to do

Criar a página `app/pages/blog/[...slug].vue` que carrega o post pela rota e renderiza o markdown com `<ContentRenderer>`. Abrir um `PostCard` da listagem deve levar ao post completo correspondente.

## Original line

> - [ ] Criar página `app/pages/blog/[...slug].vue` que renderiza o markdown do post (`<ContentRenderer>`). ✔ abrir um card leva ao post completo.

## Summary

Criada `portal/app/pages/blog/[...slug].vue`: carrega o post via `queryCollection('blog').path(route.path).first()` (SSR com `useAsyncData`), lança 404 quando não existe, define SEO/OG e renderiza o corpo markdown com `<ContentRenderer>`. Cabeçalho reaproveita `PostMeta` + `BaseHeading`, capa com `NuxtImg`, corpo estilizado via `:deep()` só com tokens de design. `PostCard` já aponta para `post.path`, então abrir um card leva ao post. `npx nuxi prepare` passa.
