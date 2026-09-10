# Criar endpoint GET /api/products

**Status:** done

## What to do

Criar a rota de API `portal/server/api/products/index.get.ts` usando `defineEventHandler`. O endpoint deve extrair parâmetros opcionais de query string (`categoria`, `busca`), consultar produtos ativos no Prisma com ordenação por data de criação decrescente, e aplicar tratamento de erro seguro sem expor detalhes internos do banco de dados. Caso o banco esteja inacessível no ambiente atual, deve retornar uma resposta de fallback graciosa (como lista vazia ou produtos de demonstração).

## Original line

> - [ ] Criar endpoint `GET /api/products` em `portal/server/api/products/index.get.ts` com filtros por categoria e busca, retornando produtos ativos com fallback resiliente. ✔ Rota registrada e tipada no Nitro (`npx nuxi prepare`).

## Summary

Criado `portal/server/api/products/index.get.ts` com `defineEventHandler`: lê `categoria` (filtro exato) e `busca` (contains case-insensitive em título/descrição) via `getQuery`, consulta `prisma.product.findMany` só de ativos (`where.active = true`) ordenado por `createdAt desc`, retornando envelope `{ data: PublicProduct[] }` com `select` do contrato público (sem `active`/`createdAt`/`updatedAt`). Erro de banco é logado no servidor e cai em fallback gracioso `{ data: [] }` (sem vazar internals). Validado com `npx nuxi prepare` (rota tipada em `.nuxt/types/nitro-routes.d.ts`) e `npx eslint` (limpo).
