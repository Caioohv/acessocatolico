# Generate the initial versioned migration

**Status:** todo

## What to do

Generate the first versioned migration containing all three models — `Product`, `User`, `AnalyticsEvent` — with `prisma migrate dev --name init` (run from `db/`), and commit the resulting `db/prisma/migrations/` folder to git. This replaces the old `db push` flow with a real migration history, as decided in `docs/decisoes/banco-monorepo.md`.

## Done criteria

A migration folder exists under `db/prisma/migrations/` and `npx prisma migrate status` reports the schema up to date.

## Original line

> Gerar a migration inicial versionada com os três modelos (`prisma migrate dev --name init`) e commitar `db/prisma/migrations/`. ✔ Existe uma pasta de migration em `db/prisma/migrations/` e `npx prisma migrate status` reporta o schema em dia.
