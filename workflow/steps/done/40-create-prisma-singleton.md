# Criar helper singleton do Prisma Client

**Status:** done

## What to do

Criar o arquivo `portal/server/utils/prisma.ts` instanciando o `PrismaClient` como singleton. Usar o padrão global (`globalThis.prisma`) para evitar o vazamento ou duplicação de conexões com o banco durante o Hot Module Replacement (HMR) em desenvolvimento. A instância exportada será disponibilizada automaticamente pelo Nitro para os endpoints da API.

## Original line

> - [ ] Criar helper singleton do Prisma Client em `portal/server/utils/prisma.ts` evitando múltiplas instâncias em HMR. ✔ Exporta instância única reutilizável no Nitro.

## Summary

Criado `portal/server/utils/prisma.ts` exportando `prisma` como singleton via `globalThis.prisma` (evita múltiplos pools em HMR; cacheado só fora de produção). Como Prisma 7 exige driver adapter (não há mais `datasourceUrl`), instalados `@prisma/adapter-pg@7.10.0` + `pg@8.23.0` (+ `@types/pg` dev): a `DATABASE_URL` é lida em runtime e passada via `new PrismaPg(...)` ao `PrismaClient`, com erro claro se ausente. Validado com `npx nuxi prepare` e `npx eslint` (ambos OK).
