# Criar organismo ProductGrid

**Status:** done

## What to do

Criar o organismo `portal/app/components/organisms/ProductGrid.vue` recebendo a lista de produtos e renderizando uma grade responsiva com `ProductCard`. Adotar grid de 1 coluna em telas mobile (~360px), 2 colunas em telas médias e 3 colunas em telas largas, sem estouro horizontal. Incluir tratamento para lista vazia com mensagem amigável e botão/link para limpar filtros.

## Original line

> - [ ] Criar organismo `ProductGrid.vue` em `portal/app/components/organisms/ProductGrid.vue` com layout responsivo mobile-first e estado vazio amigável. ✔ Grid fluido (1 col mobile, 2 cols tablet, 3 cols desktop) sem estouro horizontal.

## Summary

Criado o organismo `portal/app/components/organisms/ProductGrid.vue`, espelhando o `PostGrid.vue`: recebe `products: Product[]` (interface reusada de `ProductCard.vue`) e renderiza grade fluida 1/2/3 colunas (`--bp-md` 48rem, `--bp-lg` 64rem) sem overflow horizontal. Estado vazio com copy PT-BR amigável e, quando `hasFilters`, um `BaseButton` "Limpar filtros" apontando para `clearTo` (padrão `/loja`). Validado com `npx nuxi prepare` e `eslint` (limpos).
