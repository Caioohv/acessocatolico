# Criar átomo BaseTag

**Status:** done

## What to do

Criar o átomo `BaseTag.vue` — chip de categoria/tag — usando `--radius-pill` e `--brand-tint`. Recebe o rótulo por prop/slot e renderiza com cor de marca.

## Original line

> - [ ] Criar átomo `BaseTag.vue` (chip de categoria/tag, `--radius-pill`, `--brand-tint`). ✔ renderiza um rótulo com cor de marca.

## Summary

Criado `portal/app/components/atoms/BaseTag.vue`: chip de categoria/tag com `--radius-pill` e fundo `--brand-tint`, texto em `--brand-strong`, tamanho `--text-xs`. Rótulo via slot ou prop `label`; opcionalmente vira NuxtLink/`<a>` (com `to`/`href`) com hover de marca e foco visível. Só tokens de design.
