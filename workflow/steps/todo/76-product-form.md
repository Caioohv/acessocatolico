# Create the product create/edit form

**Status:** todo

## What to do

Create the create/edit product form, reusing design-system components, with validation of required fields (title, price, category, affiliate link) and photo by URL (no file upload in v1). It posts to `POST /api/products` (create) and `PUT /api/products/:id` (edit). Changes must flow through to the portal's `/loja`, which reads the same `Product` table.

## Done criteria

Creating and editing via the form reflects the change in the listing and in the portal (`/loja`).

## Original line

> Criar o formulário de criar/editar produto (validação de campos obrigatórios; foto por URL) reusando componentes do design system. ✔ Criar e editar via formulário reflete a mudança na listagem e no portal (`/loja`).
