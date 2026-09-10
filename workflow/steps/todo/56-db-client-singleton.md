# Export a PrismaClient singleton from `db/`

**Status:** todo

## What to do

Create `db/src/index.ts` exporting a `PrismaClient` singleton (cache on `globalThis` to avoid multiple instances under HMR; use the `@prisma/adapter-pg` driver adapter required by Prisma 7). Consider keeping the lazy/Proxy pattern used in the portal so importing the module never throws when `DATABASE_URL` is absent. Point `main`/`exports` of `db/package.json` at this entry so apps import `{ prisma }` from `@acesso/db`.

## Done criteria

`import { prisma } from '@acesso/db'` resolves, typed, in a TS test file.

## Original line

> Criar `db/src/index.ts` exportando um singleton do `PrismaClient` (evita múltiplas instâncias em HMR) e apontar o `main`/`exports` do `db/package.json` para ele. ✔ `import { prisma } from '@acesso/db'` resolve tipado num arquivo de teste TS.
