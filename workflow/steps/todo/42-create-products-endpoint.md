# Criar endpoint GET /api/products

**Status:** todo

## What to do

Criar a rota de API `portal/server/api/products/index.get.ts` usando `defineEventHandler`. O endpoint deve extrair parâmetros opcionais de query string (`categoria`, `busca`), consultar produtos ativos no Prisma com ordenação por data de criação decrescente, e aplicar tratamento de erro seguro sem expor detalhes internos do banco de dados. Caso o banco esteja inacessível no ambiente atual, deve retornar uma resposta de fallback graciosa (como lista vazia ou produtos de demonstração).

## Original line

> - [ ] Criar endpoint `GET /api/products` em `portal/server/api/products/index.get.ts` com filtros por categoria e busca, retornando produtos ativos com fallback resiliente. ✔ Rota registrada e tipada no Nitro (`npx nuxi prepare`).
