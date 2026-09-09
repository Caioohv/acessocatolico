# Decisões — Stack

> Decisões técnicas por fase. O produto de cada fase está em [`../produtos/`](../produtos/).

---

## Frontend / framework — Nuxt 4 ✅

Uma stack só para o projeto todo (dev solo → familiaridade > stack "ótima" fragmentada):

- **Fase 1 (Portal):** encaixe quase perfeito — SSR/SSG resolve o SEO (coração do portal), Nuxt Content
  dá o blog em markdown sem CMS.
- **Fases 2–3 (Gestão):** Nuxt como full-stack via **Nitro** (server routes) ou como frontend de uma API
  à parte. Para a plataforma multi-tenant com RBAC, usar um backend "de verdade" (Nitro + Postgres, ou
  API separada) — **não** esticar o Nuxt Content além do blog.

---

## UI — CSS próprio + Atomic Design + Mobile-first ✅

A interface é construída com **CSS próprio** — **sem Tailwind** nem framework de utilitários. O
sistema de design vive em [`design-system/`](../../design-system/): os tokens (`tokens/colors.css`,
`spacing.css`, `typography.css`, `effects.css`, `fonts.css`) e os **aliases semânticos**
(`--brand`, `--accent`, `--text-body`, `--radius-lg`…). **Regra:** usar sempre os aliases no produto,
nunca valores brutos hardcoded.

- **Componentes reaproveitáveis, Atomic Design:** átomos → moléculas → organisms → sections. Reuso
  antes de criar novo componente.
- **Mobile-first (regra transversal):** projetar e estilizar primeiro para telas pequenas (~360px). O
  CSS-base é o do mobile; adaptar para telas maiores com media queries **`min-width`** — nunca
  `max-width` como padrão. Alvos de toque ≥ 44px, sem overflow horizontal, imagens fluidas
  (`max-width: 100%`). UI só está pronta depois de conferida no viewport mobile **e** desktop.
- **Breakpoints** como convenção `min-width` documentada no CSS global (ex.: `--bp-sm: 30rem`,
  `--bp-md: 48rem`, `--bp-lg: 64rem`).

Os primeiros passos concretos de implementação (Home + Blog) estão em [`../../todo.md`](../../todo.md).

---

## Blog — Nuxt Content + git ✅

- Posts escritos em **Obsidian** (markdown), publicados via `git push`.
- **Nuxt Content** lê os `.md` direto — sem CMS externo, sem banco. Git é histórico + backup +
  portabilidade entre VPS. Sem painel admin: o editor é o Obsidian.
- Webhook na VPS dispara rebuild a cada push.

**Frontmatter padrão:**
```yaml
---
title: Como se preparar para um retiro
categoria: guias
tags: [retiro, preparação, oração]
data: 2026-09-01
capa: /img/blog/retiro.jpg
slug: como-se-preparar-retiro
---
```

**Busca:** categoria/tag e título/frontmatter → Nuxt Content nativo; corpo do artigo → **Fuse.js**
(client-side) no v1, migrar para **Meilisearch** (Docker) se o volume crescer.

**Imagens:** em `public/img/blog/` no v1; migrar para **Cloudflare R2** (S3-compatível) ou diretório
servido por Nginx se o repo ficar pesado.

---

## Banco — PostgreSQL único (Docker) ✅

**Uma instância de Postgres já existente em Docker serve o projeto todo** — lojinha, auth, tenancy e
gestão. Sem PocketBase, sem SQLite: um banco só simplifica operação, backup e o modelo relacional que a
Fase 3 (escalação, RBAC, multi-tenant) exige de qualquer forma. Nuxt fala com o Postgres via Nitro
(server routes) — direto ou com um ORM (Drizzle/Prisma, a decidir na Fase 1).

- **Fase 1:** só a tabela da **lojinha** (`produtos`) — o resto do portal é estático/Nuxt Content.
- **Fases 2–3:** entram auth, `Local`/Paróquia, Comunidade, tenancy e RBAC no mesmo banco, com
  isolamento por tenant (schema por tenant ou coluna `tenant_id` — a decidir na Fase 2).

**Lojinha — tabela `produtos`:** `titulo`, `descricao`, `preco_ref`, `categoria`, `link_afiliado`,
`foto`, `ativo`. Admin da lojinha no v1: painel mínimo próprio ou seed via migração (não há CMS externo).

---

## Infra (Fase 1)

```
VPS
├── Nginx (reverse proxy)
├── Nuxt (SSR/SSG + Nitro) ── Nuxt Content (/content/*.md do repo)
├── PostgreSQL (Docker, já existente) ── lojinha no v1; auth + gestão nas Fases 2–3
└── Git repo (blog + código) ── webhook → rebuild no push
```

Deploy, **backups** (dump do Postgres) e monitoramento desde a Fase 1.

---

## Decisões em aberto

- **Fotos da lojinha:** servir por Nginx (diretório) no v1; migrar para **Cloudflare R2** se pesar.
- **ORM:** Drizzle vs. Prisma vs. SQL direto — decidir na Fase 1, ao criar a tabela `produtos`.
- **Isolamento multi-tenant:** schema por tenant vs. `tenant_id` por linha — decidir na Fase 2.
- **Meilisearch:** subir quando o volume de posts justificar (não bloqueia o v1).
