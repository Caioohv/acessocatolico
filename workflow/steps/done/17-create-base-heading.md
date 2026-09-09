# Criar átomo BaseHeading

**Status:** done

## What to do

Criar o átomo `BaseHeading.vue` com níveis h1–h4 mapeados na escala tipográfica em serifa (Spectral). O nível é definido por prop e renderiza a tag semântica correspondente, cada uma usando o token de tamanho correto da escala.

## Original line

> - [ ] Criar átomo `BaseHeading.vue` (níveis h1–h4 mapeados na escala tipográfica em serifa). ✔ cada nível usa o token de tamanho correto.

## Summary

Criado `portal/app/components/atoms/BaseHeading.vue`: prop `level` (1–4) mapeia a tag semântica `h1`–`h4` e o token de tamanho correspondente (`--text-h1`…`--text-h4`) na escala serifa (Spectral, `--font-display`). Texto via slot ou prop `text`; só tokens de design.
