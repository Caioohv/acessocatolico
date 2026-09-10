# Criar molécula AffiliateNotice

**Status:** done

## What to do

Criar a molécula `portal/app/components/molecules/AffiliateNotice.vue` exibindo uma nota de transparência explicando que os links são afiliados e que as compras ajudam a manter o Acesso Católico gratuito. Utilizar exclusivamente tokens de design (`--surface-card`, `--border`, `--text-muted`, `--radius-md`) e garantir design responsivo mobile-first.

## Original line

> - [ ] Criar molécula `AffiliateNotice.vue` em `portal/app/components/molecules/AffiliateNotice.vue` com a nota de transparência de afiliados. ✔ Componente renderiza texto e ícone utilizando tokens de design.

## Summary

Criada a molécula `portal/app/components/molecules/AffiliateNotice.vue` (SFC `<script setup>`): nota de transparência de afiliados com ícone SVG inline (info) e copy PT-BR padrão (com override por props `title`/`text`). Estilo só com tokens (`--surface-card`, `--border`, `--radius-md`, `--text-muted`, `--space-*`, `--text-sm`), responsivo por padrão. Validado com `npx nuxi prepare` e `eslint` (ambos limpos).
