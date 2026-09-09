# Registrar main.css global

**Status:** done

## What to do

Registrar o CSS global em `nuxt.config.ts` com `css: ['~/assets/css/main.css']`. Ao recarregar a aplicação, os tokens devem estar aplicados (fundo papel via `--paper-50`, fonte Figtree no corpo).

## Original line

> - [ ] Registrar `main.css` global em `nuxt.config.ts` (`css: ['~/assets/css/main.css']`). ✔ tokens aplicados (fundo papel, fonte Figtree) ao recarregar.

## Summary

Adicionada a linha `css: ['~/assets/css/main.css']` em `portal/nuxt.config.ts` (logo após `devtools`). O agregador `main.css` (em `portal/app/assets/css/`, resolvido por `~` → `app/`) importa tokens + reset, cujo `body` já aplica `background-color: var(--surface-page)` (=`--paper-50`) e `font-family: var(--font-sans)` (Figtree). Validado com `npx nuxi prepare` — config OK.
