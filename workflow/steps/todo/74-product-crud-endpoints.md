# Create the product CRUD endpoints

**Status:** todo

## What to do

Create the admin product endpoints, all protected by session: `GET /api/products` (list, including inactive), `POST /api/products` (create), `PUT /api/products/:id` (edit), `PATCH /api/products/:id` (activate/deactivate), and `DELETE /api/products/:id`. Persist to the `Product` model via `@acesso/db`; follow the `api-responses` skill (no leaked internals). Note the admin list differs from the public portal one by including inactive products.

## Done criteria

Each route returns the correct status and persists to the `produtos` table (verifiable via the listing).

## Original line

> Criar os endpoints do admin de produtos: `GET /api/products` (lista, inclui inativos), `POST /api/products` (cria), `PUT /api/products/:id` (edita), `PATCH /api/products/:id` (ativar/desativar) e `DELETE /api/products/:id`, todos protegidos por sessão. ✔ Cada rota responde o status correto e persiste na tabela `produtos` (verificável via listagem).
