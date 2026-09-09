# Remover boilerplate do starter

**Status:** done

## What to do

Excluir os arquivos de exemplo do starter: `app/components/Counter.vue`, `app/components/Alert.vue` e `content/about.md`. Depois remover qualquer referência a esses arquivos (imports, uso em páginas/layouts) para não quebrar o build. Validar com `npm run dev`, que deve subir sem referências quebradas.

## Original line

> - [ ] Remover o boilerplate do starter: `app/components/Counter.vue`, `app/components/Alert.vue`, `content/about.md`. ✔ `npm run dev` sobe sem referências quebradas.

## Summary

Excluídos `portal/app/components/Counter.vue`, `portal/app/components/Alert.vue` e `portal/content/about.md` (o diretório `app/components/` ficou vazio e foi removido). Reescrito `portal/content/index.md` para remover as referências ao link `/about` e aos componentes MDC `::alert`/`::counter`, substituindo o texto do starter por conteúdo inicial em PT-BR. Validado com `npx nuxi dev`: Nuxt 4.5.2 sobe sem referências quebradas e a home responde HTTP 200.
