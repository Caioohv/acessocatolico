# Todo — Lojinha de Afiliados

Passos para implementação da Lojinha de Afiliados (Fase 1 — Portal Público), com busca de produtos via endpoint Nitro consultando PostgreSQL com Prisma.

## 1. Configuração do ORM & Modelagem (Prisma)

- [ ] Instalar `prisma` (dev) e `@prisma/client` (prod) no workspace `portal/`. ✔ `npm ls @prisma/client` em `portal/` retorna as dependências instaladas.
- [ ] Criar arquivo de variáveis de ambiente modelo `portal/.env.example` com a chave `DATABASE_URL`. ✔ Arquivo criado com string de conexão PostgreSQL documentada.
- [ ] Criar o schema Prisma com a modelagem do modelo `Product` em `portal/prisma/schema.prisma` (id, title, description, priceRef, category, affiliateUrl, imageUrl, active, createdAt, updatedAt e índices). ✔ `npx prisma validate --schema=prisma/schema.prisma` valida com sucesso.
- [ ] Gerar os tipos do cliente Prisma com `npx prisma generate`. ✔ `@prisma/client` gerado com tipagem do modelo `Product`.
- [ ] Criar helper singleton do Prisma Client em `portal/server/utils/prisma.ts` evitando múltiplas instâncias em HMR. ✔ Exporta instância única reutilizável no Nitro.
- [ ] Criar script de seed em `portal/prisma/seed.ts` com produtos católicos de exemplo e configurar comando no `package.json`. ✔ Script compila sem erros de tipagem TypeScript contra o `@prisma/client`.

## 2. Backend & Endpoints Nitro (`server/api/`)

- [ ] Criar endpoint `GET /api/products` em `portal/server/api/products/index.get.ts` com filtros por categoria e busca, retornando produtos ativos com fallback resiliente. ✔ Rota registrada e tipada no Nitro (`npx nuxi prepare`).
- [ ] Criar endpoint `GET /api/products/categories` em `portal/server/api/products/categories.get.ts` retornando categorias disponíveis com contagem. ✔ Rota tipada respondendo lista de categorias ativas.

## 3. Componentes de UI (Atomic Design)

- [ ] Criar molécula `AffiliateNotice.vue` em `portal/app/components/molecules/AffiliateNotice.vue` com a nota de transparência de afiliados. ✔ Componente renderiza texto e ícone utilizando tokens de design.
- [ ] Criar molécula `ProductCard.vue` em `portal/app/components/molecules/ProductCard.vue` (imagem com fallback, BaseTag, BaseHeading, preço formatado em BRL e BaseButton com `rel="noopener noreferrer nofollow"`). ✔ Card acessível com touch target ≥ 44px e link de afiliado.
- [ ] Criar molécula `ProductCategoryFilter.vue` em `portal/app/components/molecules/ProductCategoryFilter.vue` para filtragem por chips com scroll suave no mobile. ✔ Chips acessíveis (`aria-current`) sincronizados com estado de categoria.
- [ ] Criar organismo `ProductGrid.vue` em `portal/app/components/organisms/ProductGrid.vue` com layout responsivo mobile-first e estado vazio amigável. ✔ Grid fluido (1 col mobile, 2 cols tablet, 3 cols desktop) sem estouro horizontal.

## 4. Páginas, Integração & Navegação

- [ ] Criar página principal da lojinha em `portal/app/pages/loja/index.vue` integrando busca SSR (`useFetch`), SEO (`useSeoMeta`), filtro e grid. ✔ Rota `/loja` renderiza corretamente via SSR no Nuxt.
- [ ] Criar seção da lojinha para a Home em `portal/app/components/sections/LatestProducts.vue` e incluir em `portal/app/pages/index.vue`. ✔ Home renderiza seção "Da lojinha" com link para `/loja`.
- [ ] Atualizar navegação global em `portal/app/data/navigation.json` (header e menu mobile) e ativar atalho no `portal/app/data/home.json`. ✔ Link da lojinha visível na barra de navegação e atalhos da home.

## 5. Auditoria & Build

- [ ] Rodar auditoria estática com `npx nuxi prepare` e `npm run lint` no diretório `portal/`. ✔ Zero erros ou avisos críticos de lint e tipagem.
- [ ] Executar build de produção com `npm run build` no diretório `portal/`. ✔ Build SSR concluído com sucesso e gerado em `.output/`.
