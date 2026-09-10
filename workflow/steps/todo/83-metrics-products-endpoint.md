# Create `GET /api/metrics/products` in the admin

**Status:** todo

## What to do

Create `GET /api/metrics/products` in the admin (session-protected) that ranks `product_click` events by `targetId`, joining `Product` to resolve the product title, over a period. Return products ordered by click count. Use `@acesso/db` aggregation and the resilient fallback pattern.

## Done criteria

The endpoint returns products ordered by number of clicks.

## Original line

> Criar `GET /api/metrics/products` no admin: ranking de `product_click` por `targetId`, com join no `Product` para o título. ✔ Endpoint retorna os produtos ordenados por número de cliques.
