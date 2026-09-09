# Criar átomo AppContainer

**Status:** done

## What to do

Criar o átomo `AppContainer.vue` (Atomic Design, `<script setup>`) que aplica largura máxima e padding lateral via tokens. Deve centralizar o conteúdo em telas largas e servir de wrapper reutilizável no layout e nas seções. Usar tokens de spacing/container, nunca valores brutos.

## Original line

> - [ ] Criar átomo `AppContainer.vue` (largura máxima + padding lateral por token). ✔ centraliza conteúdo em telas largas.

## Summary

Criado o átomo `portal/app/components/atoms/AppContainer.vue` (`<script setup lang="ts">`, props `size` portal/panel/narrow/prose e `as`), largura máxima e padding lateral 100% por tokens (`--container-*`, `--measure-prose`, `--space-4/6`), centralizado e mobile-first. Configurado `components: [{ path: '~/components', pathPrefix: false }]` no `nuxt.config.ts` e refatorado `default.vue` para usar `<AppContainer as="main">`. `nuxi prepare` e ESLint passam.
