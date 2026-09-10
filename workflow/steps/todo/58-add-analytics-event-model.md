# Add the `AnalyticsEvent` model to the schema

**Status:** todo

## What to do

Add an `AnalyticsEvent` model to `db/prisma/schema.prisma` with fields `id`, `type`, `path`, `targetId` (optional), `sessionId`, `referrer` (optional), and `createdAt`, plus composite indexes on `(type, createdAt)` and `(type, targetId)`. This backs the first-party metrics: `type` is `pageview | product_click | article_read`, `targetId` is the product id or article slug. Migration comes in the next step.

## Done criteria

`npx prisma validate` passes with the `AnalyticsEvent` model.

## Original line

> Adicionar o modelo `AnalyticsEvent` ao schema (`id`, `type`, `path`, `targetId?`, `sessionId`, `referrer?`, `createdAt`) com índices `(type, createdAt)` e `(type, targetId)`. ✔ `npx prisma validate` passa com o modelo `AnalyticsEvent`.
