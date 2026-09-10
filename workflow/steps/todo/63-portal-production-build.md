# Run the portal production build against the package

**Status:** todo

## What to do

Run the portal's production build while it consumes the shared `@acesso/db` package, confirming the workspace wiring and generated Prisma client resolve at build time. Fix any remaining import/resolution issues surfaced by the build.

## Done criteria

`npm run -w portal build` completes and generates `.output/` without errors.

## Original line

> Rodar build de produção do portal consumindo o pacote. ✔ `npm run -w portal build` conclui e gera `.output/` sem erros.
