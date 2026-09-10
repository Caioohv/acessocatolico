# Export a PrismaClient singleton from `db/`

**Status:** done

## What to do

Create `db/src/index.ts` exporting a `PrismaClient` singleton (cache on `globalThis` to avoid multiple instances under HMR; use the `@prisma/adapter-pg` driver adapter required by Prisma 7). Consider keeping the lazy/Proxy pattern used in the portal so importing the module never throws when `DATABASE_URL` is absent. Point `main`/`exports` of `db/package.json` at this entry so apps import `{ prisma }` from `@acesso/db`.

## Done criteria

`import { prisma } from '@acesso/db'` resolves, typed, in a TS test file.

## Original line

> Criar `db/src/index.ts` exportando um singleton do `PrismaClient` (evita múltiplas instâncias em HMR) e apontar o `main`/`exports` do `db/package.json` para ele. ✔ `import { prisma } from '@acesso/db'` resolve tipado num arquivo de teste TS.

## Summary

Summary: feat(db): export lazy PrismaClient singleton from @acesso/db

Created `db/src/index.ts` — a lazy `Proxy` `prisma` singleton mirroring the portal pattern (cache on `globalThis` off-production for HMR; `@prisma/adapter-pg` driver adapter required by Prisma 7, no `datasourceUrl`; import never throws without `DATABASE_URL`). Also re-exports `PrismaClient` and `type Prisma`. Added the missing runtime deps to `db/package.json` (`@prisma/adapter-pg@7.10.0`, `pg@^8.23.0`, `@types/pg` dev). Done-criterion (typed import resolves) deferred to CI: needs `npm ci` + `prisma generate` (both blocked in sandbox).
