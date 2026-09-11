# Create `GET /api/metrics/site` in the admin

**Status:** done

## What to do

Create `GET /api/metrics/site` in the admin (session-protected) that aggregates `AnalyticsEvent`: pageviews per day, most-accessed paths, and approximate unique sessions over a period. Use SQL aggregation via `@acesso/db`; accept a period parameter. Follow the `api-responses` skill and the existing resilient fallback pattern.

## Done criteria

The endpoint returns the correct aggregates for known test data.

## Original line

> Criar `GET /api/metrics/site` no admin: pageviews por dia, páginas mais acessadas e sessões únicas num período. ✔ Endpoint retorna os agregados corretos para dados de teste conhecidos.

## Summary

Created `admin/server/api/metrics/site.get.ts`: session-protected GET endpoint that accepts a `period` query param (default 30 days, max 365) and returns `{ data: { period, from, pageviewsPerDay, topPaths, uniqueSessions } }`. Pageviews-per-day and unique-sessions use `prisma.$queryRaw` with `Prisma.sql` (date truncation and `COUNT(DISTINCT)` require raw SQL); top-10 paths use `prisma.analyticsEvent.groupBy`. BigInt counts from Postgres are converted to `Number` before serialising. Error path logs internally and returns a safe `INTERNAL_ERROR` 500, consistent with the existing admin API pattern.
