# Encaixar Header e Footer no layout

**Status:** done

## What to do

Encaixar `TheHeader` e `TheFooter` no `app/layouts/default.vue`, envolvendo o `<slot />`. Confirmar que ambos aparecem tanto na Home quanto no Blog.

## Original line

> - [ ] Encaixar Header/Footer no `default.vue`. ✔ presentes na Home e no Blog.

## Summary

`TheHeader` e `TheFooter` já envolviam o `<slot />` em `portal/app/layouts/default.vue` (steps 12/13); finalizei a wiring de sticky-footer: `.layout-default` agora é `display:flex; flex-direction:column; min-height:100vh` e o `<main>` (AppContainer) recebe `flex:1 0 auto` via classe `layout-default__main`, empurrando o footer ao fim da viewport. Home (`content/index.md`) e blog roteiam pelo mesmo `[...slug].vue` com o layout `default`, então header/footer aparecem em ambos. ESLint sem erros.
