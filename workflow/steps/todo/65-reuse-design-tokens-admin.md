# Reuse design tokens in the admin

**Status:** todo

## What to do

Wire the `design-system/` tokens into the admin (import the token CSS in `nuxt.config`/assets), mirroring the portal so nothing is hardcoded. Per project-memory, breakpoints are literals and families are referenced via `var(--font-*)`. All colors, spacing, radii, and fonts must come from the shared tokens.

## Done criteria

An admin page renders using a token alias (e.g. `--brand`) resolved in the browser.

## Original line

> Reutilizar os tokens do `design-system/` no admin (importar os CSS de tokens no `nuxt.config`/assets) — nada hardcoded. ✔ Uma página do admin renancia usando um alias de token (ex.: `--brand`) resolvido no navegador.
