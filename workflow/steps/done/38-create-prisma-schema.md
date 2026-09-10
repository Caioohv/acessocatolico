# Criar schema Prisma com modelo Product

**Status:** done

## What to do

Criar o arquivo `portal/prisma/schema.prisma` configurando o datasource PostgreSQL e o generator do cliente Prisma. Definir o modelo `Product` com os campos `id`, `title`, `description`, `priceRef`, `category`, `affiliateUrl`, `imageUrl`, `active` (booleano com default true), `createdAt`, `updatedAt`, além de índices adequados para consultas por status e categoria.

## Original line

> - [ ] Criar o schema Prisma com a modelagem do modelo `Product` em `portal/prisma/schema.prisma` (id, title, description, priceRef, category, affiliateUrl, imageUrl, active, createdAt, updatedAt e índices). ✔ `npx prisma validate --schema=prisma/schema.prisma` valida com sucesso.

## Summary

Criado `portal/prisma/schema.prisma` com generator `prisma-client-js`, datasource `postgresql` e o modelo `Product` (mapeado para `produtos`) com todos os campos pedidos e índices em `active`, `category` e `[active, category]`. Em Prisma 7 o `url` do datasource foi removido do schema (P1012); `npx prisma validate --schema=prisma/schema.prisma` passa ("valid 🚀").
