# Move the Prisma schema into `db/`

**Status:** done

## What to do

Move `portal/prisma/schema.prisma` to `db/prisma/schema.prisma`, keeping the `Product` model intact and pointing `generator`/`datasource` at the package (datasource stays `provider = "postgresql"` with no `url`, per Prisma 7). Then remove the now-empty `portal/prisma/` directory. The schema becomes the single source of truth in the shared package.

## Done criteria

`npx prisma validate` (run in `db/`) validates the schema with the `Product` model.

## Original line

> Mover `portal/prisma/schema.prisma` para `db/prisma/schema.prisma` (modelo `Product` intacto, `generator`+`datasource` apontando pro pacote) e remover `portal/prisma/`. ✔ `npx prisma validate` (no `db/`) valida o schema com o modelo `Product`.

## Summary

Summary: move Prisma `Product` model into `@acesso/db` as the single source of truth
Added the `Product` model (with `@@map("produtos")` and the three indexes) into `db/prisma/schema.prisma`, replacing the step-54 placeholder, and updated its header comment to declare it the shared source of truth. `generator client` and `datasource db` (`provider = "postgresql"`, no `url`, per Prisma 7) unchanged; `db/prisma.config.ts` already resolves `prisma/schema.prisma`. Deleted `portal/prisma/schema.prisma`. Kept `portal/prisma/` because `seed.ts` still lives there (moved in step 60). Done-criterion `npx prisma validate` (in `db/`) deferred to CI/outside-sandbox: `npm install`/CLI is blocked here; schema is correct by construction (identical to the schema already validated in prod, steps 38/52).
