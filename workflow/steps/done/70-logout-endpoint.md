# Create the logout endpoint

**Status:** done

## What to do

Create `POST /api/auth/logout` in the admin that clears/ends the current session using the `nuxt-auth-utils` helpers. After it runs, protected routes should redirect back to `/login`.

## Done criteria

After calling it, the session is empty and protected routes redirect to `/login` again.

## Original line

> Criar `POST /api/auth/logout` no admin que encerra a sessão. ✔ Após chamar, a sessão fica vazia e rotas protegidas voltam a redirecionar para `/login`.

## Summary

Created `admin/server/api/auth/logout.post.ts` — a single-handler Nitro route that calls `clearUserSession(event)` from `nuxt-auth-utils` and returns `{ data: { ok: true } }`. No additional wiring needed; the existing `nuxt-auth-utils` module already provides `clearUserSession` as a global auto-import.
