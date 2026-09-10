# Criar helper singleton do Prisma Client

**Status:** todo

## What to do

Criar o arquivo `portal/server/utils/prisma.ts` instanciando o `PrismaClient` como singleton. Usar o padrão global (`globalThis.prisma`) para evitar o vazamento ou duplicação de conexões com o banco durante o Hot Module Replacement (HMR) em desenvolvimento. A instância exportada será disponibilizada automaticamente pelo Nitro para os endpoints da API.

## Original line

> - [ ] Criar helper singleton do Prisma Client em `portal/server/utils/prisma.ts` evitando múltiplas instâncias em HMR. ✔ Exporta instância única reutilizável no Nitro.
