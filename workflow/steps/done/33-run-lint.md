# Rodar lint e corrigir

**Status:** done

## What to do

Rodar `npm run lint` e corrigir todos os apontamentos. O lint deve passar sem erros ao final. Corrigir problemas reais de código; não desabilitar regras salvo justificativa clara.

## Original line

> - [ ] Rodar `npm run lint` e corrigir apontamentos. ✔ lint passa sem erros.

## Summary

Adicionada a task `lint` no `package.json` utilizando o ESLint com a configuração oficial do Nuxt. Corrigidos os apontamentos no `CategoryFilter.vue` (variável de props não utilizada) e no `PostGrid.vue` (prop com valor padrão configurada como opcional). O comando `npm run lint` agora executa e finaliza sem nenhum aviso ou erro.
