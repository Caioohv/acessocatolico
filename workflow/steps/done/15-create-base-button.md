# Criar átomo BaseButton

**Status:** done

## What to do

Criar o átomo `BaseButton.vue` com variantes: primária (`--brand`), secundária e link. Usar `--radius-md` e foco visível com `--shadow-focus`. As variantes devem renderizar corretamente via prop e ter foco visível (acessibilidade). Só tokens, sem valores hardcoded.

## Original line

> - [ ] Criar átomo `BaseButton.vue` (variantes: primária/`--brand`, secundária, link; usa `--radius-md`, `--shadow-focus`). ✔ variantes renderizam e têm foco visível.

## Summary

Criado `portal/app/components/atoms/BaseButton.vue` com variantes `primary`/`secondary`/`link`, foco visível via `--shadow-focus`, `--radius-md` e alvo de toque ≥44px. Renderiza `<button>`, `<NuxtLink>` (`to`) ou `<a>` (`href`); suporta `block` e `disabled`. Só tokens de design; passou no ESLint.
