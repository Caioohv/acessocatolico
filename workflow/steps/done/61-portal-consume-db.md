# Portal consumes `@acesso/db`

**Status:** done

## What to do

Add `@acesso/db` as a dependency of `portal/` and rewrite `portal/server/utils/prisma.ts` to re-export the client from the package instead of instantiating its own. Keep the lazy/graceful-fallback behavior so imports never break the build when `DATABASE_URL` is absent (see project-memory on the lazy singleton). Remove portal-local Prisma schema/client duplication.

## Done criteria

`npx nuxi prepare` in `portal/` completes with no import error.

## Original line

> Adicionar `@acesso/db` como dependência do `portal/` e reescrever `portal/server/utils/prisma.ts` para reexportar o client do pacote. ✔ `npx nuxi prepare` no `portal/` conclui sem erro de import.

## Summary

Added `"@acesso/db": "workspace:*"` to `portal/package.json` dependencies and rewrote `portal/server/utils/prisma.ts` to `export { prisma }`/`export type { Prisma }` from `@acesso/db` (re-enabling the previously commented-out re-export). Portal-local Prisma duplication was already gone (schema/seed moved to `db/` in steps 55/60; no `@prisma/*` deps remained). `npx nuxi prepare` in `portal/` passed (EXIT=0, no import errors); full workspace-symlink resolution deferred to CI since `npm install` is blocked in the sandbox.
