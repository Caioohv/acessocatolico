# Create the product CRUD endpoints

**Status:** done

## What to do

Create the admin product endpoints, all protected by session: `GET /api/products` (list, including inactive), `POST /api/products` (create), `PUT /api/products/:id` (edit), `PATCH /api/products/:id` (activate/deactivate), and `DELETE /api/products/:id`. Persist to the `Product` model via `@acesso/db`; follow the `api-responses` skill (no leaked internals). Note the admin list differs from the public portal one by including inactive products.

## Done criteria

Each route returns the correct status and persists to the `produtos` table (verifiable via the listing).

## Summary

Created 5 Nitro server route handlers in `admin/server/api/products/`: `index.get.ts` (list all including inactive, supports `ativo`/`categoria`/`busca` filters), `index.post.ts` (create, 201), `[id].put.ts` (full edit), `[id].patch.ts` (toggle active state), and `[id].delete.ts` (delete, 204). All routes call `requireUserSession` for session protection, follow the `api-responses` envelope (`{ data }` / `{ error: { code, message } }`), handle Prisma P2025 with 404, and log errors server-side without leaking internals. The `prisma` singleton is auto-imported from `admin/server/utils/prisma.ts` (no explicit imports needed in handlers).

## Original line

> Criar os endpoints do admin de produtos: `GET /api/products` (lista, inclui inativos), `POST /api/products` (cria), `PUT /api/products/:id` (edita), `PATCH /api/products/:id` (ativar/desativar) e `DELETE /api/products/:id`, todos protegidos por sessão. ✔ Cada rota responde o status correto e persiste na tabela `produtos` (verificável via listagem).
