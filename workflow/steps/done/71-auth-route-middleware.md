# Add global auth route middleware

**Status:** done

## What to do

Create a global route middleware that protects the entire admin: any route without a valid session redirects to `/login`, while `/login` itself stays public. This enforces the "whole app behind auth" rule from the admin definition.

## Done criteria

Accessing an internal route without a session redirects to `/login`; with a session, it is allowed.

## Original line

> Criar middleware global de rota que protege todo o admin (sem sessão → `/login`). ✔ Acesso a uma rota interna sem sessão redireciona para `/login`; com sessão, permite.

## Summary

Created `admin/app/middleware/auth.global.ts` — a Nuxt global route middleware that allows `/login` through and redirects any unauthenticated navigation to `/login` using `useUserSession` from `nuxt-auth-utils` (already wired in `nuxt.config.ts`).
