# Create `GET /api/metrics/site` in the admin

**Status:** todo

## What to do

Create `GET /api/metrics/site` in the admin (session-protected) that aggregates `AnalyticsEvent`: pageviews per day, most-accessed paths, and approximate unique sessions over a period. Use SQL aggregation via `@acesso/db`; accept a period parameter. Follow the `api-responses` skill and the existing resilient fallback pattern.

## Done criteria

The endpoint returns the correct aggregates for known test data.

## Original line

> Criar `GET /api/metrics/site` no admin: pageviews por dia, páginas mais acessadas e sessões únicas num período. ✔ Endpoint retorna os agregados corretos para dados de teste conhecidos.
