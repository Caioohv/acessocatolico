# Criar molécula ProductCard

**Status:** done

## What to do

Criar a molécula `portal/app/components/molecules/ProductCard.vue` recebendo a entidade do produto por prop. Deve renderizar imagem com `<NuxtImg>` e fallback de gradiente/placeholder, tag de categoria via `BaseTag`, título do produto via `BaseHeading`, descrição curta, preço formatado em BRL e botão CTA via `BaseButton` (`target="_blank"`, `rel="noopener noreferrer nofollow"`) direcionando ao link de afiliado. Assegurar alvo de toque mínimo de 44px e consumo estrito dos tokens de design.

## Original line

> - [ ] Criar molécula `ProductCard.vue` em `portal/app/components/molecules/ProductCard.vue` (imagem com fallback, BaseTag, BaseHeading, preço formatado em BRL e BaseButton com `rel="noopener noreferrer nofollow"`). ✔ Card acessível com touch target ≥ 44px e link de afiliado.

## Summary

Criada a molécula `portal/app/components/molecules/ProductCard.vue`: imagem `<NuxtImg>` (aspect 4/3) com fallback de gradiente `--brand-tint`, `BaseTag` de categoria, `BaseHeading` nível 3 no título, descrição curta, preço de referência em BRL (renderiza `priceRef` de exibição; formata via `Intl.NumberFormat('pt-BR', BRL)` se vier numérico) e CTA `BaseButton` full-width com `href` do afiliado, `target="_blank"` e `rel="noopener noreferrer nofollow"`. Interface `Product` exportada (espelha o contrato de `GET /api/products`). Só tokens de design; CTA garante alvo de toque ≥44px. Validado com `npx nuxi prepare` e eslint (limpos).
