# Fire pageview on route navigation

**Status:** todo

## What to do

Create a portal plugin/composable that fires a `pageview` event to `POST /api/track` on every route navigation, sending the correct `path`. Keep it client-side and non-blocking so tracking never delays or breaks navigation; avoid double-firing on hydration.

## Done criteria

Navigating between portal pages generates `pageview` events with the correct `path`.

## Original line

> Criar um plugin/composable no portal que dispara `pageview` a cada navegação de rota. ✔ Navegar entre páginas do portal gera eventos `pageview` com o `path` correto.
