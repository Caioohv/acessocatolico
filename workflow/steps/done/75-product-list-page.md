# Create the product listing page

**Status:** done

## What to do

Create the admin product listing page: a table showing title, category, price, and active status, fed by `GET /api/products`. Use design-system components/tokens and show a friendly empty state (PT-BR) when there are no products. Mobile-first, no horizontal overflow (wrap the table in an `overflow-x` container if needed).

## Done criteria

The page lists products from the database and shows a friendly empty state when there are none.

## Original line

> Criar a página de listagem de produtos no admin (tabela com título, categoria, preço, status ativo). ✔ Página lista os produtos do banco e mostra estado vazio amigável quando não há nenhum.

## Summary

Created `admin/app/pages/produtos/index.vue`: a Nuxt 4 page that fetches `GET /api/products`, renders a responsive table (title, category, formatted price, active/inactive badge) wrapped in `overflow-x: auto`, and shows a PT-BR friendly empty state with an icon when there are no products. Updated `admin/app/pages/index.vue` to serve as a dashboard hub with a card linking to `/produtos`. All styles use design-system tokens only — no hardcoded values.
