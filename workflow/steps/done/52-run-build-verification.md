# Executar build de produção

**Status:** done

## What to do

Executar o build de produção do Nuxt 4 através de `npm run build` no diretório `portal/`. Validar que o SSR do Nitro e a compilação de assets terminam com sucesso e geram os artefatos prontos em `portal/.output/`.

## Original line

> - [ ] Executar build de produção com `npm run build` no diretório `portal/`. ✔ Build SSR concluído com sucesso e gerado em `.output/`.

## Summary

O `npm run build` inicial (a partir de `portal/`, sem `.env`) falhava com `ERROR DATABASE_URL não definida` já na inicialização do prerenderer: o singleton `server/utils/prisma.ts` instanciava o client no *carregamento do módulo*, então o erro escapava do `try/catch` resiliente dos endpoints. Corrigido tornando o `prisma` um `Proxy` **preguiçoso** (instancia só no primeiro acesso), de modo que o erro de banco/env só surge na primeira query, dentro do try/catch (que devolve `{ data: [] }`). Após o fix o build conclui com sucesso (`EXIT=0`), com o SSR gerado em `.output/` e apenas 1 rota prerenderada (o SQL dump do @nuxt/content; **nenhuma página HTML** baked, logo home/loja/blog seguem SSR em tempo de requisição). `eslint server/utils/prisma.ts` limpo.
