# Project Memory

> Running log of **known gotchas** — non-obvious things worth remembering across tasks:
> solutions to tricky errors, surprising behaviors, environment quirks, and decisions
> that future work must respect.
>
> Agents read this before implementing and append new entries when they learn something
> that would have saved them time. Keep entries short and factual. Newest at the top.

## Entries

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
