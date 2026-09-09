# Criar section HeroHome

**Status:** done

## What to do

Criar a section `HeroHome.vue` com a proposta de valor do portal e um CTA, usando `--text-display` em serifa. Texto em PT-BR (skill `content-writer-ptbr`) e CTA via `BaseButton`. Deve aparecer no topo de `/`.

## Original line

> - [ ] Criar section `HeroHome.vue`: proposta de valor + CTA (`--text-display`, serifa). ✔ hero aparece no topo de `/`.

## Summary

Criada a section `portal/app/components/sections/HeroHome.vue` (proposta de valor PT-BR + CTA `BaseButton` para `/blog`, título em serifa usando `--text-display` mobile-first sobre `BaseHeading`). Criado `portal/app/pages/index.vue`, que assume `/` sobre o catch-all e renderiza `HeroHome` no topo. `npx nuxi prepare` passou.
