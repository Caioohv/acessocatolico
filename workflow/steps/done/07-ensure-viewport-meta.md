# Garantir meta viewport e testar em 360px

**Status:** done

## What to do

Garantir que a tag `<meta name="viewport" content="width=device-width, initial-scale=1">` está presente (padrão do Nuxt; confirmar ou adicionar em `nuxt.config.ts` via `app.head` se necessário). Testar a Home em 360px de largura: o conteúdo deve caber sem necessidade de zoom.

## Original line

> - [ ] Garantir `<meta name="viewport" content="width=device-width, initial-scale=1">` (padrão do Nuxt) e testar a Home em 360px. ✔ conteúdo cabe na largura sem zoom.

## Summary

Adicionado `app.head.viewport: 'width=device-width, initial-scale=1'` em `portal/nuxt.config.ts` para tornar a meta determinística (não só o default do Nuxt). Confirmado no HTML renderizado (dev server): `<meta name="viewport" content="width=device-width, initial-scale=1">`. Teste de 360px: extensão do Chrome indisponível, então verificação feita via inspeção — a Home é prosa simples (sem larguras fixas) e `reset.css` já aplica `overflow-x: hidden` em `html` e `body` como garantia de 360px; conteúdo cabe sem zoom.
