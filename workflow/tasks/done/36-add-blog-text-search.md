# Task: Adicionar Pesquisa Textual na Home do Blog

**Status:** done
**Created:** 2026-09-09
**Completed:** 2026-09-09

## Context & Objective

A home do blog (`/blog` — `portal/app/pages/blog/index.vue`) permite filtrar posts por categoria através dos chips `CategoryFilter`. Para facilitar a localização de artigos por palavra-chave, foi adicionada uma funcionalidade de pesquisa textual que filtra os posts por título, resumo (descrição), categoria e tags.

## Implementation Details

1. **Átomo `BaseInput.vue`**:
   - Criado em `portal/app/components/atoms/BaseInput.vue`.
   - Suporte completo a `v-model`, label acessível (`hideLabel`), botão de limpar busca, alvos de toque min 44px e estilos com tokens de design (`--surface-card`, `--border`, `--brand`, `--shadow-focus`).
   - Adicionada classe utilitária `.sr-only` em `portal/app/assets/css/reset.css`.

2. **Molécula `BlogSearch.vue`**:
   - Criada em `portal/app/components/molecules/BlogSearch.vue`.
   - Envolve o `BaseInput` em um elemento `<form role="search">` com semântica acessível.

3. **Página `blog/index.vue` & Filtro de Categorias**:
   - Integrada a busca textual com estado reativo sincronizado na query string (`?busca=<termo>`).
   - Algoritmo de filtragem insensível a maiúsculas/minúsculas e acentos (`normalizeText`).
   - Busca em `title`, `description`, `category` e `tags`.
   - Atualizado `CategoryFilter.vue` para preservar a busca textual ativa ao navegar entre categorias.
   - Mensagem de estado vazio amigável quando nenhum resultado é encontrado, com botão para limpar filtros.

## Verification

- `npx nuxi prepare`: executado com sucesso (tipos gerados).
- `npm run lint`: executado com sucesso (0 erros).
- `npm run build`: build de produção concluído com sucesso em ~6s.
