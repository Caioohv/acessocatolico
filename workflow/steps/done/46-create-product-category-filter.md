# Criar molécula ProductCategoryFilter

**Status:** done

## What to do

Criar a molécula `portal/app/components/molecules/ProductCategoryFilter.vue` para exibir chips horizontais de filtro de categoria da loja. O componente deve suportar rolagem horizontal suave no mobile, emitir ou sincronizar a categoria ativa, incluir a opção "Todas" e marcar o item ativo com `aria-current="true"`, reutilizando o átomo `BaseTag`.

## Original line

> - [ ] Criar molécula `ProductCategoryFilter.vue` em `portal/app/components/molecules/ProductCategoryFilter.vue` para filtragem por chips com scroll suave no mobile. ✔ Chips acessíveis (`aria-current`) sincronizados com estado de categoria.

## Summary

Criada a molécula `portal/app/components/molecules/ProductCategoryFilter.vue`: faixa de chips (`BaseTag`) com "Todas" + categorias, estado na query string (`?categoria=` em `/loja`, preservando `?busca=`), chip ativo com `aria-current` herdado do `BaseTag`, e rolagem horizontal suave no mobile (`overflow-x:auto; scroll-behavior:smooth`) que passa a quebrar em linhas a partir de 48rem. Exporta a interface `ProductCategory` ({ name, count? }) para reuso. Validado com `npx nuxi prepare` e `eslint` (limpos).
