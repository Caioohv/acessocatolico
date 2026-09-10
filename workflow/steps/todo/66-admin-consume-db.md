# Admin consumes `@acesso/db`

**Status:** todo

## What to do

Configure the admin to consume `@acesso/db` by adding it as a dependency and creating `admin/server/utils/prisma.ts` that re-exports the package client (same lazy/graceful pattern as the portal). This gives the admin typed access to `Product`, `User`, and `AnalyticsEvent` against the single shared schema.

## Done criteria

`npx nuxi prepare` in `admin/` completes with no import error.

## Original line

> Configurar o admin para consumir `@acesso/db` via `admin/server/utils/prisma.ts` (reexporta o client do pacote). ✔ `npx nuxi prepare` no `admin/` conclui sem erro de import.
