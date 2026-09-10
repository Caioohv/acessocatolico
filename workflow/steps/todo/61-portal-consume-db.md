# Portal consumes `@acesso/db`

**Status:** in-progress

## What to do

Add `@acesso/db` as a dependency of `portal/` and rewrite `portal/server/utils/prisma.ts` to re-export the client from the package instead of instantiating its own. Keep the lazy/graceful-fallback behavior so imports never break the build when `DATABASE_URL` is absent (see project-memory on the lazy singleton). Remove portal-local Prisma schema/client duplication.

## Done criteria

`npx nuxi prepare` in `portal/` completes with no import error.

## Original line

> Adicionar `@acesso/db` como dependência do `portal/` e reescrever `portal/server/utils/prisma.ts` para reexportar o client do pacote. ✔ `npx nuxi prepare` no `portal/` conclui sem erro de import.
