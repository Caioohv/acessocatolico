# Project Memory

> Running log of **known gotchas** — non-obvious things worth remembering across tasks:
> solutions to tricky errors, surprising behaviors, environment quirks, and decisions
> that future work must respect.
>
> Agents read this before implementing and append new entries when they learn something
> that would have saved them time. Keep entries short and factual. Newest at the top.

## Entries

### 2026-09-09 — Prisma seed (step 41): script standalone precisa do próprio adapter + `process.loadEnvFile()`
**Context:** Criar `portal/prisma/seed.ts` e o comando de seed no `package.json`.
**Gotcha:** (1) O singleton `server/utils/prisma.ts` é auto-importado pelo Nitro e não pode ser reusado num script node/tsx puro — o seed precisa instanciar seu próprio `PrismaClient` com `new PrismaPg({ connectionString })` (mesma exigência de driver adapter do Prisma 7, pois o `datasource` não tem `url`). (2) Um script standalone não carrega o `.env` sozinho; `dotenv` não está instalado. Usei `process.loadEnvFile()` (nativo do Node >= 20.6, aqui v24) dentro de try/catch — silencioso se o `.env` não existir. (3) `tsx`/`ts-node` não vinham instalados; instalei `tsx` (devDep). (4) O `prisma.seed` do `package.json` ainda funciona no Prisma 7 (não migrei para `prisma.config.ts`, que ainda não existe). (5) ESLint (`@typescript-eslint/consistent-type-imports`) exige que o namespace `Prisma` (usado só como tipo, `Prisma.ProductCreateInput`) venha como `import type` separado de `PrismaClient` (usado como valor).
**Resolution:** Seed idempotente com `deleteMany()` + `createMany({ data })`. `category` é string livre (nomes legíveis: "Terços", "Bíblias", "Livros", "Vestuário", "Acessórios de retiro") — o endpoint de categorias (step 43) agrupa por esse valor. Validado com `npx tsc --noEmit --strict ... prisma/seed.ts` (exit 0) e `npx eslint prisma/seed.ts` (limpo). Rodar `npm run db:seed` sem `.env` para no erro esperado `DATABASE_URL não definida`; não testado contra Postgres real neste ambiente.

### 2026-09-09 — Prisma singleton (step 40): Prisma 7 exige driver adapter (sem `datasourceUrl`)
**Context:** Criar o singleton `portal/server/utils/prisma.ts` instanciando o `PrismaClient`.
**Gotcha:** Como o `url` saiu do `datasource` (step 38), o `PrismaClient` do Prisma 7 **não aceita mais** a opção `datasourceUrl`. O `PrismaClientOptions` (ver `node_modules/.prisma/client/index.d.ts`) só oferece `adapter` (obrigatório) ou `accelerateUrl`. Sem adapter, o client não conecta. Para Postgres é preciso `@prisma/adapter-pg` + o driver `pg` — nenhum vinha instalado (só `better-sqlite3`, que é do Nuxt Content).
**Resolution:** `npm install @prisma/adapter-pg@7.10.0 pg` (+ `@types/pg` dev) em `portal/` — casar a versão do adapter com o par 7.10.0. Singleton: ler `process.env.DATABASE_URL`, construir `const adapter = new PrismaPg({ connectionString })` e `new PrismaClient({ adapter })`; guardar em `globalThis.prisma` e cachear só quando `NODE_ENV !== 'production'` (HMR). `server/utils/*` é auto-importado pelo Nitro, então basta `export const prisma`. Validado com `npx nuxi prepare` + `npx eslint server/utils/prisma.ts` (o projeto não tem typechecker).

### 2026-09-09 — Prisma schema (step 38): em Prisma 7 o `url` sai do `datasource`
**Context:** Criar `portal/prisma/schema.prisma` e validar com `npx prisma validate`.
**Gotcha:** No Prisma 7 a propriedade `url = env("DATABASE_URL")` dentro do bloco `datasource` **não é mais suportada** — `prisma validate` falha com `P1012` ("The datasource property `url` is no longer supported in schema files"). A connection string vai para um `prisma.config.ts` (para o Migrate) e/ou para um `adapter`/`accelerateUrl` passado ao `PrismaClient`. Ver https://pris.ly/d/prisma7-client-config.
**Resolution:** Deixar o `datasource db` só com `provider = "postgresql"` (sem `url`). Com isso `npx prisma validate --schema=prisma/schema.prisma` (rodado de `portal/`) passa. A ligação da `DATABASE_URL` deve ser feita em `prisma.config.ts` / no client nos steps seguintes (39/40). O aviso de "update available 8.0.0-rc.13" é a mesma dist-tag RC do step 36 — ignorar, ficar no 7.10.0.

### 2026-09-09 — Prisma (step 36): tag `latest` da CLI aponta para RC v8; fixar par 7.10.0
**Context:** Instalar `prisma` (dev) e `@prisma/client` (prod) em `portal/`.
**Gotcha:** No registro, a dist-tag `latest` de `prisma` está em `8.0.0-rc.13` (release candidate), enquanto a `latest` de `@prisma/client` está no estável `7.10.0`. Um `npm install prisma` + `npm install @prisma/client` sem versão instala CLI v8-rc e client v7 — majors descasados, que quebram `prisma generate`. Além disso, os postinstall scripts (`@prisma/engines`) aparecem como "not covered by allowScripts" no aviso do npm, mas os engines foram baixados e `npx prisma --version` funciona (Schema Engine + Query Compiler presentes).
**Resolution:** Fixar ambos no par estável alinhado: `npm install --save-dev prisma@7.10.0` e `npm install @prisma/client@7.10.0`. Verificar com `npm ls @prisma/client` (client 7.10.0 + prisma 7.10.0 deduped) e `npx prisma --version`. Ao subir de versão no futuro, subir CLI e client juntos no mesmo major.

### 2026-09-09 — HeroHome (step 27): `sections/` novo; `index.vue` assume `/` sobre o catch-all
**Context:** Colocar a section `HeroHome.vue` no topo de `/`.
**Gotcha:** Até então `/` era servido pelo catch-all `app/pages/[...slug].vue` a partir de `content/index.md`. Criado o primeiro `app/pages/index.vue`: ele é mais específico e tem prioridade sobre o catch-all no caminho `/`, então a home passa a ser composta em Vue (não mais do markdown). `content/index.md` fica órfão (não removido — fora de escopo), sem conflito de rota. Criada a nova camada atômica `app/components/sections/` (só havia atoms/molecules/organisms); auto-import por `pathPrefix: false` resolve `<HeroHome>` sem prefixo de pasta.
**Resolution:** Título de hero usa `--text-display` compondo sobre `BaseHeading` nível 1 via `:deep(.base-heading--h1)` — mobile-first começa em `--text-h1` e sobe para `--text-display` em `@media (min-width: 48rem)`. CTA reusa `BaseButton to="/blog"`. `npx nuxi prepare` (em `portal/`) passa.

### 2026-09-09 — Filtro de categoria (step 26): estado na query string + re-consulta nativa
**Context:** `CategoryFilter.vue` filtra o índice do blog por categoria.
**Gotcha:** O `CollectionQueryBuilder` do Nuxt Content 3 (confirmado em `node_modules/@nuxt/content/dist/module.d.mts:380`) expõe `.select(...fields)`, `.order(field, 'ASC'|'DESC')`, `.where(field, operator, value)`, `.all()`, `.first()`, `.count()`. `'='` é `SQLOperator` válido. Para o filtro reativo com SSR, o estado vive em `route.query.categoria`; o `useAsyncData` do índice usa `{ watch: [activeCategory] }` para re-consultar `queryCollection('blog').where('category','=', valor)`. Não há `distinct` no builder para listar categorias — buscar `.select('category').all()` e derivar um `Set`.
**Resolution:** `CategoryFilter` (molécula) só recebe `categories`/`active` por prop e renderiza `BaseTag` como link (`?categoria=<valor>`); um chip "Todos" aponta para `/blog`. Adicionada prop `active` ao átomo `BaseTag` (estado preenchido + `aria-current`). Sem typechecker instalado no projeto (`nuxi typecheck` pede `vue-tsc`); validação via `nuxi prepare` + inspeção dos `.d.ts`.

### 2026-09-09 — Posts de exemplo (step 21): `date` precisa ser string YAML entre aspas
**Context:** Criar posts em `portal/content/blog/*.md` conforme o schema do step 20.
**Gotcha:** O schema define `date: z.string().date()`. Em YAML, `date: 2026-09-01` sem aspas é interpretado como tipo date/timestamp, não string, e pode falhar a validação Zod. Escrever sempre entre aspas: `date: '2026-09-01'`. O "resumo" vai no `description` nativo (não existe campo `resumo`); `title`/`description` são nativos, os demais (`category`, `tags`, `date`, `cover`, `coverAlt`, `slug`) são do schema.
**Resolution:** Frontmatter com `date` como string entre aspas. `npx nuxi prepare` (em `portal/`) roda sem erro. Capas referenciam `/img/blog/*.jpg` (ainda não existem em `public/img/blog/`); o `PostCard` tem fallback de gradiente quando `cover` ausente, mas com `cover` presente a imagem 404 aparece quebrada em runtime até os arquivos serem adicionados.

### 2026-09-09 — Schema de content (step 20): `z` vem de `@nuxt/content`; resumo = `description` nativo
**Context:** Definir o schema da collection de blog em `portal/content.config.ts` (Nuxt Content 3).
**Gotcha:** `zod` não está em `package.json`, mas o `@nuxt/content` re-exporta `z` (`import { defineContentConfig, defineCollection, z } from '@nuxt/content'`) — não instalar zod à parte. Com `type: 'page'`, os campos `title`, `description`, `path`, `body`, `seo` e `navigation` já são nativos; o "resumo" do post mapeia para o `description` nativo (que o `PostCard` consome), então não se cria um campo `resumo` separado.
**Resolution:** Schema declara só os campos extras: `category`, `tags` (default `[]`), `date` (`z.string().date()`), `cover`, `coverAlt`, `slug`. Rodar `npx nuxi prepare` (em `portal/`) regenera `.nuxt/content/types.d.ts` para conferir a tipagem de `queryCollection('blog')`. Source da collection: `blog/**` (posts vivem em `portal/content/blog/`).

### 2026-09-09 — PostCard (step 18) compõe PostMeta (step 19), criado depois
**Context:** `PostCard.vue` foi criado antes de `PostMeta.vue` na ordem dos steps.
**Gotcha:** `PostCard` referencia `<PostMeta :category :date />`, mas essa molécula só é criada no step 19. Até lá o componente resolve como elemento desconhecido (warning), não quebra a renderização; o build (step 34) só passa depois do 19.
**Resolution:** Manter a composição; concluir o step 19 fecha a dependência. O tipo `Post` (path, title, description, category, date, cover, coverAlt) é exportado de `PostCard.vue` — reaproveitar ao configurar o schema de content (step 20) e no grid (step 23).

### 2026-09-09 — @nuxt/icon sem collection instalada; usar SVG inline
**Context:** `TheHeader` precisava de ícones (hambúrguer/fechar).
**Gotcha:** `@nuxt/icon` está nos módulos, mas não há `@iconify-json/*` instalado. Sem collection local, `<Icon>` busca o SVG pela API do Iconify em runtime — dependência de rede frágil.
**Resolution:** Para ícones simples de UI, usar SVG inline (`stroke="currentColor"`) no componente. Só instalar uma collection `@iconify-json/<set>` quando o volume de ícones justificar.

### 2026-09-09 — Breakpoints são literais, não var()
**Context:** Media queries em componentes (ex.: nav inline no desktop).
**Gotcha:** Custom properties não funcionam dentro de media queries. Os `--bp-*` são só CONVENÇÃO documentada em `app/assets/css/main.css`.
**Resolution:** Usar os valores literais em `min-width`: `--bp-md` = `48rem`, `--bp-lg` = `64rem`, `--bp-sm` = `30rem`. Mobile-first sempre.

### 2026-09-09 — @nuxt/fonts detecta famílias em custom properties e self-hospeda
**Context:** Configurar as webfonts (Spectral, Figtree, JetBrains Mono).
**Gotcha:** As famílias são referenciadas via `var(--font-*)` no reset; os nomes literais só aparecem nos tokens (`--font-display: 'Spectral'...`). Ainda assim o `@nuxt/fonts` detecta essas famílias e injeta `@font-face` — não é preciso `font-family` literal. O `@import` externo do Google em `tokens/fonts.css` era redundante e render-blocking.
**Resolution:** Declarar as famílias/pesos em `nuxt.config.ts` → `fonts.families` (provider `google`) e remover o `@import` externo. O build baixa e serve local em `.output/public/_fonts` (woff2).

<!--
Template for each entry:

### [date] — [short title]
**Context:** where/when this comes up.
**Gotcha:** the surprising thing or the error.
**Resolution:** what to do about it.
-->

### 2026-09-09 — App Nuxt vive em `portal/`, não na raiz
**Context:** Steps/tarefas costumam citar caminhos como `app/components/...` ou `content/...`.
**Gotcha:** Esses caminhos são relativos ao app Nuxt, que fica em `portal/` (com `nuxt.config.ts`, `package.json`, `content/`, `app/`), não na raiz do repositório.
**Resolution:** Rodar `npm`/`npx nuxi` a partir de `portal/` e prefixar os caminhos de arquivo do app com `portal/`.
