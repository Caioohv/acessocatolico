# Add activate/deactivate and delete actions

**Status:** todo

## What to do

Add the activate/deactivate and delete actions to the product listing. Delete must use a non-blocking confirmation UI (a design-system modal/dialog, not `window.confirm`). Wire activate/deactivate to `PATCH /api/products/:id` and delete to `DELETE /api/products/:id`, refreshing the listing on success.

## Done criteria

Toggling status and deleting reflect immediately in the listing and in the table.

## Original line

> Adicionar as ações de ativar/desativar e excluir na listagem (excluir com confirmação, sem `window.confirm` bloqueante). ✔ Alternar status e excluir refletem imediatamente na listagem e na tabela.
