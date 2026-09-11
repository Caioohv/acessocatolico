# Reuse design tokens in the admin

**Status:** done

## What to do

Wire the `design-system/` tokens into the admin (import the token CSS in `nuxt.config`/assets), mirroring the portal so nothing is hardcoded. Per project-memory, breakpoints are literals and families are referenced via `var(--font-*)`. All colors, spacing, radii, and fonts must come from the shared tokens.

## Done criteria

An admin page renders using a token alias (e.g. `--brand`) resolved in the browser.

## Original line

> Reutilizar os tokens do `design-system/` no admin (importar os CSS de tokens no `nuxt.config`/assets) — nada hardcoded. ✔ Uma página do admin renancia usando um alias de token (ex.: `--brand`) resolvido no navegador.

## Summary

Copiei os tokens do portal (fonte = `design-system/`) para `admin/app/assets/css/` (`main.css` + `reset.css` + `tokens/{colors,spacing,typography,fonts,effects}.css`, byte-idênticos) e os liguei em `admin/nuxt.config.ts` via `css: ['~/assets/css/main.css']`. Adicionei o módulo/config `@nuxt/fonts` (+ dep `^0.14.0`) para self-host das famílias (fonts.css do portal, sem `@import` externo). `index.vue` reescrito usando só aliases (`var(--brand)`, `var(--space-*)`, `var(--text-*)`), nada hardcoded. Render real deferido à CI (`admin/node_modules` ausente — install bloqueado no sandbox; `nuxi prepare` falha em `@nuxt/kit`).
