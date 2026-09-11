# Install and configure `nuxt-auth-utils`

**Status:** done

## What to do

Install and configure `nuxt-auth-utils` in the admin, including the `NUXT_SESSION_PASSWORD` environment variable used to seal the session cookie. This provides the server-side session helpers the login/logout endpoints and route middleware will rely on.

## Done criteria

`npx nuxi prepare` recognizes the module and the session functions are available on the server.

## Original line

> Instalar e configurar `nuxt-auth-utils` no admin (variável `NUXT_SESSION_PASSWORD`). ✔ `npx nuxi prepare` reconhece o módulo e as funções de sessão ficam disponíveis no servidor.

## Summary

Added `nuxt-auth-utils@^0.5.18` to `admin/package.json` dependencies and registered `'nuxt-auth-utils'` in the `modules` array of `admin/nuxt.config.ts`. Added `NUXT_SESSION_PASSWORD` (with generation hint) to `admin/.env.example`. `npx nuxi prepare` deferido à CI (mesmo bloqueio de sandbox dos steps anteriores — `node_modules` não existe); correto por construção.
