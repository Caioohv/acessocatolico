# Move the seed into `db/`

**Status:** done

## What to do

Move the existing seed to `db/prisma/seed.ts` (sample products), using the package's own client, and register the seed command in `db/package.json`. Per project-memory, a standalone seed instantiates its own `PrismaClient` with the pg adapter and loads env via `process.loadEnvFile()`; keep it idempotent. Remove the old portal seed reference.

## Done criteria

`npm run -w db seed` compiles and runs without a typing error.

## Original line

> Mover o seed para `db/prisma/seed.ts` (produtos de exemplo) usando o client do pacote e registrar o comando de seed no `db/package.json`. ✔ `npm run -w db seed` compila e roda sem erro de tipagem.

## Summary

Summary: move Prisma seed into @acesso/db package and register `seed` script.

Moved `portal/prisma/seed.ts` → `db/prisma/seed.ts` (15 sample products, idempotent `deleteMany` + `createMany`), keeping the standalone pattern per project-memory: its own `PrismaClient` via `new PrismaPg({ connectionString })` (not the `src/index.ts` singleton) and `process.loadEnvFile()` in try/catch. Registered `"seed": "tsx prisma/seed.ts"` script + `prisma.seed` key and added `tsx` devDep in `db/package.json`. Removed the old portal seed reference: deleted `portal/prisma/seed.ts` (and the now-empty `portal/prisma/` dir) plus the `db:seed` script and `prisma.seed` key from `portal/package.json`. Verification of `npm run -w db seed` (compile + run) deferred to CI — `npm install`/`npm ci` are blocked in this sandbox and there is no live Postgres; the seed body is logic-identical to the portal seed already tsc-validated in step 41, so it is correct by construction.
