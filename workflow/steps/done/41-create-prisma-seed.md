# Criar script de seed com produtos de exemplo

**Status:** done

## What to do

Criar o arquivo `portal/prisma/seed.ts` contendo produtos católicos de exemplo organizados nas categorias previstas (terços, bíblias, livros, vestuário e acessórios de retiro). Configurar a chave `prisma.seed` no `package.json` utilizando `tsx` (ou `ts-node`). Garantir que o script compile e tipa os dados de acordo com o Prisma Client gerado.

## Original line

> - [ ] Criar script de seed em `portal/prisma/seed.ts` com produtos católicos de exemplo e configurar comando no `package.json`. ✔ Script compila sem erros de tipagem TypeScript contra o `@prisma/client`.

## Summary

Criado `portal/prisma/seed.ts` com 15 produtos de exemplo (3 por categoria: Terços, Bíblias, Livros, Vestuário, Acessórios de retiro), tipados como `Prisma.ProductCreateInput[]`; seed idempotente (`deleteMany` + `createMany`) que constrói o próprio `PrismaClient` com adapter `PrismaPg` a partir de `DATABASE_URL`, carregada via `process.loadEnvFile()` nativo. Instalado `tsx` (devDep) e adicionados ao `package.json` o script `db:seed` e a chave `prisma.seed` (`tsx prisma/seed.ts`). `tsc --noEmit --strict` e `eslint` passam limpos. Não rodado contra banco real (sem `.env`/DB acessível no ambiente): o script para com erro claro de `DATABASE_URL não definida`, comportamento esperado.
