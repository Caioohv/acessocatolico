# Criar molécula PostMeta

**Status:** done

## What to do

Criar a molécula `PostMeta.vue` que exibe categoria e data usando `--font-mono` e `--text-meta`. A data deve ser formatada em PT-BR (ex.: `Intl.DateTimeFormat('pt-BR')`).

## Original line

> - [ ] Criar molécula `PostMeta.vue` (categoria + data em `--font-mono`/`--text-meta`). ✔ formata a data em PT-BR.

## Summary

Criada a molécula `portal/app/components/molecules/PostMeta.vue`: categoria via `BaseTag` e data em `<time datetime>` com `--font-mono`/`--text-meta`, formatada em PT-BR via `Intl.DateTimeFormat('pt-BR', { day, month: 'short', year })`. Prop contract `{ category?: string; date?: string }` casa com o consumo de `PostCard`. Ambos os campos opcionais; datas inválidas caem para `null`.
