# Criar organism PostGrid

**Status:** done

## What to do

Criar o organism `PostGrid.vue` (mobile-first): 1 coluna por padrão, 2 colunas a partir de `--bp-md`, 3 a partir de `--bp-lg`, controlado por `grid-template-columns` em media queries `min-width`. Recebe a lista de posts e renderiza `PostCard`. Deve exibir 1 coluna em 360px e 2–3 no desktop, sem overflow horizontal.

## Original line

> - [ ] Criar organism `PostGrid.vue` (mobile-first: 1 coluna por padrão; 2 col a partir de `--bp-md`, 3 a partir de `--bp-lg`, via `grid-template-columns` em media queries). ✔ 1 coluna em 360px, 2–3 no desktop, sem overflow.

## Summary

Criado `portal/app/components/organisms/PostGrid.vue`: recebe `posts: Post[]` (tipo importado de `PostCard.vue`) e os dispõe numa grade mobile-first (1 col; 2 col em 48rem; 3 col em 64rem, via `grid-template-columns` em media queries `min-width`, sem overflow). Refatorado `portal/app/pages/blog/index.vue` para consumir `<PostGrid :posts>` no lugar da grade inline, removendo o CSS duplicado (`.blog-index__grid`/`__item` e suas media queries). `npx nuxi prepare` roda sem erro de tipos.
