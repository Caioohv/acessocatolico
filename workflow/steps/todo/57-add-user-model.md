# Add the `User` model to the schema

**Status:** todo

## What to do

Add a `User` model to `db/prisma/schema.prisma` with fields `id`, `email` (unique), `passwordHash`, `name`, `role` (default `master`), `createdAt`, and `updatedAt`. This is the auth hook for the admin (single `master` role in v1; later ties to `Pessoa`/`Vínculo`). Do not generate the migration yet — that comes after `AnalyticsEvent` is added.

## Done criteria

`npx prisma validate` passes with the `User` model.

## Original line

> Adicionar o modelo `User` ao schema (`id`, `email` único, `passwordHash`, `name`, `role` default `master`, `createdAt`, `updatedAt`). ✔ `npx prisma validate` passa com o modelo `User`.
