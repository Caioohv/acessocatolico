# Rodar verificação de tipos e lint

**Status:** done

## What to do

Executar a regeneração de tipos do Nuxt com `npx nuxi prepare` no diretório `portal/` e rodar a validação com `npm run lint`. Verificar e corrigir eventuais avisos ou erros de lint nas novas páginas, componentes, endpoints e helpers criados.

## Original line

> - [ ] Rodar auditoria estática com `npx nuxi prepare` e `npm run lint` no diretório `portal/`. ✔ Zero erros ou avisos críticos de lint e tipagem.

## Summary

Rodei `npx nuxi prepare` (tipos gerados sem erro) e `npm run lint` (`eslint .`) a partir de `portal/`: **0 erros de lint** e tipagem limpa. Todos os arquivos novos do trabalho de Prisma/loja (steps 36-50) — endpoints, componentes, seed, página `/loja` — passaram sem apontamentos. Restou 1 warning pré-existente (`vue/html-self-closing` no `<img/>` de `organisms/TheHeader.vue`), oriundo de commits anteriores e fora do escopo dos steps 36-50; deixado intacto para não expandir escopo.
