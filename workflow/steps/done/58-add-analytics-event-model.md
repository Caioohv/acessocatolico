# Add the `AnalyticsEvent` model to the schema

**Status:** done

## What to do

Add an `AnalyticsEvent` model to `db/prisma/schema.prisma` with fields `id`, `type`, `path`, `targetId` (optional), `sessionId`, `referrer` (optional), and `createdAt`, plus composite indexes on `(type, createdAt)` and `(type, targetId)`. This backs the first-party metrics: `type` is `pageview | product_click | article_read`, `targetId` is the product id or article slug. Migration comes in the next step.

## Done criteria

`npx prisma validate` passes with the `AnalyticsEvent` model.

## Original line

> Adicionar o modelo `AnalyticsEvent` ao schema (`id`, `type`, `path`, `targetId?`, `sessionId`, `referrer?`, `createdAt`) com índices `(type, createdAt)` e `(type, targetId)`. ✔ `npx prisma validate` passa com o modelo `AnalyticsEvent`.

## Summary

Added the `AnalyticsEvent` model to `db/prisma/schema.prisma` (fields `id`, `type`, `path`, `targetId?`, `sessionId`, `referrer?`, `createdAt`; composite indexes `(type, createdAt)` and `(type, targetId)`; `@@map("analytics_events")`). `type` and `targetId` are free String (no enum/FK) — decision noted in project-memory. `npx prisma validate` deferred to CI (npm install/CLI blocked in sandbox); migration comes in step 59.

Summary: feat(db): add AnalyticsEvent model to shared Prisma schema
