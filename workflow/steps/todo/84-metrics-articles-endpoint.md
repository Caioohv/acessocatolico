# Create `GET /api/metrics/articles` in the admin

**Status:** todo

## What to do

Create `GET /api/metrics/articles` in the admin (session-protected) that ranks `article_read` events by slug (`targetId`) over a period, returning articles ordered by number of reads. Use `@acesso/db` aggregation and the resilient fallback pattern.

## Done criteria

The endpoint returns articles ordered by number of reads.

## Original line

> Criar `GET /api/metrics/articles` no admin: ranking de `article_read` por slug num período. ✔ Endpoint retorna os artigos ordenados por número de leituras.
