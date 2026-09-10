# Create the `@acesso/db` package

**Status:** done

## What to do

Create the `db/` workspace package (`@acesso/db`) with `db/package.json` depending on `prisma` and `@prisma/client` (pin the stable 7.10.0 pair per project-memory), and scripts `generate`, `migrate:dev`, `migrate:deploy`. Add `db/tsconfig.json` and a `db/prisma.config.ts` that reads `DATABASE_URL` from the environment (Prisma 7 keeps the connection string out of the datasource block). Do not move the schema yet — that's the next step.

## Done criteria

`npm ci` at the root installs the workspace and `npm run -w db generate` runs without a config error.

## Original line

> Criar o pacote `db/` (`@acesso/db`) com `db/package.json` (deps `prisma` + `@prisma/client`, scripts `generate`, `migrate:dev`, `migrate:deploy`), `db/tsconfig.json` e `db/prisma.config.ts` lendo `DATABASE_URL`. ✔ `npm ci` na raiz instala o workspace e `npm run -w db generate` roda sem erro de config.

## Summary

Summary: chore(db): scaffold @acesso/db workspace package (package.json, tsconfig, prisma.config.ts)

Created the `db/` workspace package: `db/package.json` (`@acesso/db`, `type: module`, deps `@prisma/client` and dev `prisma` both pinned to `7.10.0`, scripts `generate`/`migrate:dev`/`migrate:deploy`, exports `src/index.ts`), `db/tsconfig.json` (strict ESNext/Bundler), and `db/prisma.config.ts` reading `DATABASE_URL` via `env()` (Prisma 7 keeps the URL out of the datasource block) — mirrors the production-proven portal config. Added a minimal placeholder `db/prisma/schema.prisma` (generator + datasource only, no models) so `prisma generate` has a schema; the real models arrive in step 55. Could NOT run the `npm ci` + `npm run -w db generate` verification: `npm install` is blocked by this environment's command classifier and no Prisma CLI is installed locally — orchestrator/CI should run it. Left `portal/package-lock.json` untouched (removing it requires the root install that is blocked here).
