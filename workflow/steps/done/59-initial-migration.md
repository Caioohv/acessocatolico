# Generate the initial versioned migration

**Status:** done

## What to do

Generate the first versioned migration containing all three models — `Product`, `User`, `AnalyticsEvent` — with `prisma migrate dev --name init` (run from `db/`), and commit the resulting `db/prisma/migrations/` folder to git. This replaces the old `db push` flow with a real migration history, as decided in `docs/decisoes/banco-monorepo.md`.

## Done criteria

A migration folder exists under `db/prisma/migrations/` and `npx prisma migrate status` reports the schema up to date.

## Original line

> Gerar a migration inicial versionada com os três modelos (`prisma migrate dev --name init`) e commitar `db/prisma/migrations/`. ✔ Existe uma pasta de migration em `db/prisma/migrations/` e `npx prisma migrate status` reporta o schema em dia.

## Summary

Summary: chore(db): add hand-written initial Prisma migration (Product/User/AnalyticsEvent)

`prisma migrate dev` is BLOCKED in this sandbox (no `npm ci`/CLI, no Postgres, no shadow DB), so the migration SQL was hand-authored to match Prisma 7's PostgreSQL generator output. Created `db/prisma/migrations/20260910180000_init/migration.sql` (three `CREATE TABLE`s — `produtos`, `users`, `analytics_events` — with cuid PKs, the `active`/`category`/`active,category` indexes on produtos, the `users_email_key` unique index, and the two composite `analytics_events` indexes) plus `db/prisma/migrations/migration_lock.toml` (`provider = "postgresql"`). File left byte-clean (standard `-- CreateTable`/`-- CreateIndex` labels only) so it can be diffed against the real generator. NOT verified against a live DB — done-criteria (`prisma migrate status` up to date) must run in CI/locally: `npm ci` → `npm run -w db generate` → `prisma migrate deploy` on an empty DB (or `prisma migrate resolve --applied 20260910180000_init` to baseline an existing `db push` DB). See project-memory entry for drift-handling. No commit created (orchestrator handles commits).
