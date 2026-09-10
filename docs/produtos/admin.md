# Painel Admin — `admin.acessocatolico.com.br`

> Plataforma interna de gestão do Acesso Católico. **Exige login.** Nasce enxuta (gestão da lojinha +
> métricas), mas é o app que vai concentrar a gestão dos próximos módulos (paróquias, comunidades…) —
> por isso é um **app Nuxt separado** (`admin/`), não uma área dentro do portal. Stack e regras de
> banco em [`../decisoes/stack.md`](../decisoes/stack.md) e [`../decisoes/banco-monorepo.md`](../decisoes/banco-monorepo.md).

---

## Por que um app separado

O portal é **público e sem login** (é consumo, SEO, SSR agressivo). O admin é **privado, atrás de
autenticação**, e vai crescer com dados de vários módulos. Misturar os dois no portal contamina o app
público com sessão/auth e complica o SSR. Apps separados, **um banco só** (via o pacote `@acesso/db`),
é o encaixe certo. Subdomínio dedicado: `admin.acessocatolico.com.br`.

## Funcionalidades (v1)

### 1. Autenticação
- Login por **e-mail + senha** (senha com hash). Sem cadastro público — usuário criado por seed/CLI.
- Sessão por cookie selado (`nuxt-auth-utils`). Todo o app fica atrás de middleware; sem sessão → `/login`.
- **Tabela `User` reaproveitável:** é o gancho de auth que, nas Fases 2–3, se liga a `Pessoa`/`Vínculo`
  (RBAC por tenant — ver [`../conceito.md §4`](../conceito.md)). No v1 há um papel único (`master`).

### 2. Criação/gestão de produtos (lojinha)
- CRUD completo da tabela `produtos` (a mesma que o portal lê): criar, editar, ativar/desativar, excluir.
- Campos: título, descrição, preço de referência, categoria, link de afiliado, URL da foto, ativo.
- v1: **URL da foto** (campo texto) — upload de arquivo fica para depois (ver stack §Fotos da lojinha).

### 3. Métricas — produtos mais acessados
- Ranking por **cliques em produto** (evento `product_click`), com nome do produto e período.

### 4. Métricas — leitura de artigos do blog
- Ranking de artigos por **leituras** (evento `article_read`, por slug), com período.

### 5. Métricas — acesso ao site
- **Pageviews** ao longo do tempo, páginas mais acessadas e **sessões únicas** (aproximadas).

## Como as métricas são coletadas (first-party)

Decisão: **eventos first-party no próprio Postgres** — sem terceiros, mesma solução para site/produto/artigo.

- Tabela **`AnalyticsEvent`**: `type` (`pageview` | `product_click` | `article_read`), `path`,
  `targetId` (id do produto / slug do artigo), `sessionId` (hash rotativo, sem PII), `referrer`, `createdAt`.
  Índices por `(type, createdAt)` e `(type, targetId)`.
- **Coleta mora no `portal/`** (é onde está o tráfego público): endpoint `POST /api/track` grava o evento;
  um plugin dispara `pageview` a cada navegação; o card da lojinha dispara `product_click`; a página de
  artigo dispara `article_read`. Coleta resiliente e não-bloqueante (falha de tracking nunca quebra a página).
- **Leitura mora no `admin/`**: endpoints que **agregam** a tabela via SQL e alimentam os dashboards.
- Privacidade: sem cookie de rastreio de terceiros; `sessionId` é hash efêmero, não identifica pessoa.

## Modelo de dados (no pacote `@acesso/db`)

| Modelo | Papel |
|---|---|
| `Product` | Lojinha (já existe) — agora gerida pelo admin. |
| `User` | Credenciais de acesso ao admin. Gancho para `Pessoa` (Fases 2–3). |
| `AnalyticsEvent` | Eventos first-party de acesso (site, produto, artigo). |

Schema, migrations e client vivem só em `db/` — ver [`../decisoes/banco-monorepo.md`](../decisoes/banco-monorepo.md).

## Deploy (espelho da VPS)

Segue o padrão dos demais sites (ver [`../decisoes/stack.md`](../decisoes/stack.md) e o `CLAUDE.md` da VPS):
container na rede externa `caddy_net`, `container_name` fixo, `restart: unless-stopped`, guarda de
memória (`mem_limit` + `--max-old-space-size`). Adiciona-se ao `docker-compose.yml` da raiz o serviço
`admin` (`acessocatolico_admin:3000`) e um serviço one-shot `migrate` (aplica as migrations antes dos
apps subirem). O Caddy da VPS ganha `reverse_proxy acessocatolico_admin:3000` para `admin.acessocatolico.com.br`.

## Critério de pronto (v1)

- Admin no ar em `admin.acessocatolico.com.br`, atrás de login.
- Dá para **criar/editar/excluir** produtos e a mudança aparece no portal.
- Três painéis de métrica funcionando: **acesso ao site**, **produtos mais acessados**, **leitura de artigos**.
- Coleta first-party ativa no portal, alimentando os painéis.

## Fora de escopo (v1)

- Multi-tenancy, RBAC granular, gestão de paróquias/comunidades (Fases 2–3).
- Upload de imagem de produto (só URL por ora).
- Cadastro/recuperação de senha self-service (usuário criado por seed/CLI).
