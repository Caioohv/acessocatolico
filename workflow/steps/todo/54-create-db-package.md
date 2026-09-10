# Create the `@acesso/db` package

**Status:** todo

## What to do

Create the `db/` workspace package (`@acesso/db`) with `db/package.json` depending on `prisma` and `@prisma/client` (pin the stable 7.10.0 pair per project-memory), and scripts `generate`, `migrate:dev`, `migrate:deploy`. Add `db/tsconfig.json` and a `db/prisma.config.ts` that reads `DATABASE_URL` from the environment (Prisma 7 keeps the connection string out of the datasource block). Do not move the schema yet — that's the next step.

## Done criteria

`npm ci` at the root installs the workspace and `npm run -w db generate` runs without a config error.

## Original line

> Criar o pacote `db/` (`@acesso/db`) com `db/package.json` (deps `prisma` + `@prisma/client`, scripts `generate`, `migrate:dev`, `migrate:deploy`), `db/tsconfig.json` e `db/prisma.config.ts` lendo `DATABASE_URL`. ✔ `npm ci` na raiz instala o workspace e `npm run -w db generate` roda sem erro de config.
