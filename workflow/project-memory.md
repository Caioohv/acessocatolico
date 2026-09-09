# Project Memory

> Running log of **known gotchas** — non-obvious things worth remembering across tasks:
> solutions to tricky errors, surprising behaviors, environment quirks, and decisions
> that future work must respect.
>
> Agents read this before implementing and append new entries when they learn something
> that would have saved them time. Keep entries short and factual. Newest at the top.

## Entries

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
