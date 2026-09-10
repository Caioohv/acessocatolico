# Instalar dependências do Prisma

**Status:** done

## What to do

Instalar o Prisma e o Prisma Client no projeto `portal/`. Adicionar `prisma` como dependência de desenvolvimento e `@prisma/client` como dependência de produção. Certificar-se de executar a instalação dentro do diretório `portal/`.

## Original line

> - [ ] Instalar `prisma` (dev) e `@prisma/client` (prod) no workspace `portal/`. ✔ `npm ls @prisma/client` em `portal/` retorna as dependências instaladas.

## Summary

Instalados em `portal/`: `prisma@^7.10.0` (devDependencies) e `@prisma/client@^7.10.0` (dependencies). A tag `latest` de `prisma` no registro apontava para um RC (`8.0.0-rc.13`), descasando com o `@prisma/client` estável (7.10.0); ambos foram fixados no par estável alinhado `7.10.0`. Verificado com `npm ls @prisma/client` (retorna `@prisma/client@7.10.0` com `prisma@7.10.0` deduped) e `npx prisma --version` (CLI + engines OK).
