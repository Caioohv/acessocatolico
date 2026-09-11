# Create `GET /api/metrics/products` in the admin

**Status:** done

## What to do

Create `GET /api/metrics/products` in the admin (session-protected) that ranks `product_click` events by `targetId`, joining `Product` to resolve the product title, over a period. Return products ordered by click count. Use `@acesso/db` aggregation and the resilient fallback pattern.

## Done criteria

The endpoint returns products ordered by number of clicks.

## Original line

> Criar `GET /api/metrics/products` no admin: ranking de `product_click` por `targetId`, com join no `Product` para o título. ✔ Endpoint retorna os produtos ordenados por número de cliques.

## Summary

Created `admin/server/api/metrics/products.get.ts`: session-protected endpoint that groups `product_click` analytics events by `targetId` (with optional `period` param, default 30d, max 365d), fetches matching product names in a single `findMany` query, merges click counts with titles (null for deleted products), and returns `{ data: { period, from, products: [{ id, title, clicks }] } }` ordered by clicks desc. Follows the same resilient try/catch + 500 error pattern as `site.get.ts`.
