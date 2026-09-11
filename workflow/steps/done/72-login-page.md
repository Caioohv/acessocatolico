# Create the `/login` page

**Status:** done

## What to do

Create the `/login` page with an email + password form built from the design-system components and tokens (Atomic Design, mobile-first). It posts to `POST /api/auth/login` and, on success, navigates to the admin home. Show a friendly error on invalid credentials (PT-BR copy per `content-writer-ptbr`).

## Done criteria

The `/login` page renders, submits to the endpoint, and on success navigates to the admin home.

## Original line

> Criar a página `/login` (formulário e-mail+senha usando os componentes/tokens do design system). ✔ Página `/login` renderiza, envia ao endpoint e, em sucesso, navega para a home do admin.

## Summary

Created `admin/app/pages/login.vue`: mobile-first card layout with email + password fields, submits to `POST /api/auth/login` via `$fetch`, navigates to `/` on success, and shows PT-BR error messages (field-level for 422, banner for 401/500). All styles use design-system tokens exclusively; touch targets are 44px minimum; already-authenticated users are redirected to `/` on page entry via `useUserSession`.
