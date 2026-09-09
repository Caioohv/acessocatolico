# Criar layout default

**Status:** done

## What to do

Criar `app/layouts/default.vue` com um `<slot />` dentro de um container limitado por `--container-portal`. As páginas devem herdar esse layout automaticamente via `<NuxtLayout>` já presente no shell.

## Original line

> - [ ] Criar `app/layouts/default.vue` com `<slot />` dentro de um container (`--container-portal`). ✔ páginas herdam o layout.

## Summary

Criado `portal/app/layouts/default.vue`: `<slot />` dentro de um `<main>` centrado com `max-width: var(--container-portal)`, `margin-inline: auto` e padding mobile-first (`--space-4`, subindo para `--space-6` em ≥768px). As páginas herdam via o `<NuxtLayout>` já presente em `portal/app/app.vue` (convenção Nuxt: layout `default` sem `layout` explícito).
