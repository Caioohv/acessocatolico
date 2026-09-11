# Create the product create/edit form

**Status:** done

## What to do

Create the create/edit product form, reusing design-system components, with validation of required fields (title, price, category, affiliate link) and photo by URL (no file upload in v1). It posts to `POST /api/products` (create) and `PUT /api/products/:id` (edit). Changes must flow through to the portal's `/loja`, which reads the same `Product` table.

## Done criteria

Creating and editing via the form reflects the change in the listing and in the portal (`/loja`).

## Original line

> Criar o formulário de criar/editar produto (validação de campos obrigatórios; foto por URL) reusando componentes do design system. ✔ Criar e editar via formulário reflete a mudança na listagem e no portal (`/loja`).

## Summary

Created `admin/app/components/organisms/ProductForm.vue` (shared create/edit form with field validation and image URL preview), `admin/app/pages/produtos/novo.vue` (create page), `admin/app/pages/produtos/[id]/editar.vue` (edit page with `useFetch` pre-fill), and `admin/server/api/products/[id].get.ts` (single-product GET endpoint). Updated the listing page to add a "Novo produto" button and per-row "Editar" links. All form submissions go to `POST /api/products` (create) or `PUT /api/products/:id` (edit), which write to the shared Postgres `produtos` table — changes are immediately visible on the portal's `/loja`.
