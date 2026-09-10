# Move the seed into `db/`

**Status:** todo

## What to do

Move the existing seed to `db/prisma/seed.ts` (sample products), using the package's own client, and register the seed command in `db/package.json`. Per project-memory, a standalone seed instantiates its own `PrismaClient` with the pg adapter and loads env via `process.loadEnvFile()`; keep it idempotent. Remove the old portal seed reference.

## Done criteria

`npm run -w db seed` compiles and runs without a typing error.

## Original line

> Mover o seed para `db/prisma/seed.ts` (produtos de exemplo) usando o client do pacote e registrar o comando de seed no `db/package.json`. ✔ `npm run -w db seed` compila e roda sem erro de tipagem.
