# Fire pageview on route navigation

**Status:** done

## What to do

Create a portal plugin/composable that fires a `pageview` event to `POST /api/track` on every route navigation, sending the correct `path`. Keep it client-side and non-blocking so tracking never delays or breaks navigation; avoid double-firing on hydration.

## Done criteria

Navigating between portal pages generates `pageview` events with the correct `path`.

## Original line

> Criar um plugin/composable no portal que dispara `pageview` a cada navegação de rota. ✔ Navegar entre páginas do portal gera eventos `pageview` com o `path` correto.

## Summary

Created `portal/app/plugins/analytics.client.ts`: a client-only Nuxt plugin that hooks into `router.afterEach` to fire `POST /api/track` with `{ type: 'pageview', path, referrer }` on every route navigation (including initial load). Uses `void $fetch(...).catch(() => {})` for fire-and-forget behavior — tracking never blocks navigation or surfaces errors to the user. The `.client.ts` suffix ensures the plugin never runs on the server, eliminating any risk of double-firing on hydration. Validated with `nuxi prepare` (types OK) and `eslint` (clean).
