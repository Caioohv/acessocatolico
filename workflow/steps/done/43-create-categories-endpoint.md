# Criar endpoint GET /api/products/categories

**Status:** done

## What to do

Criar a rota de API `portal/server/api/products/categories.get.ts` para retornar a lista de categorias disponíveis que possuem produtos ativos. O endpoint deve agrupar ou listar os nomes e identificadores de categorias para alimentar os chips de filtragem da interface. Incluir tratamento de erro com resposta vazia em caso de falha de conexão com o banco.

## Original line

> - [ ] Criar endpoint `GET /api/products/categories` em `portal/server/api/products/categories.get.ts` retornando categorias disponíveis com contagem. ✔ Rota tipada respondendo lista de categorias ativas.

## Summary

Criada a rota tipada `portal/server/api/products/categories.get.ts` (`GET /api/products/categories`). Usa `prisma.product.groupBy` por `category` filtrando `active: true`, retornando `{ data: [{ name, count }] }` ordenado por contagem (desc) e nome (asc). Em falha de banco, loga no servidor e responde `{ data: [] }` sem vazar internals. Validado com `npx nuxi prepare`, `eslint` (limpo) e `tsc --strict` (sem erros de tipagem no groupBy).
