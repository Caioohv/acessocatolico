# Todo — Painel Admin + banco compartilhado

Passos para o **Painel Admin** (`admin.acessocatolico.com.br`): login, CRUD de produtos da lojinha e
métricas (acesso ao site, produtos mais acessados, leitura de artigos). Antes, o banco é extraído para
um pacote compartilhado `@acesso/db` (fonte única de schema/migrations) consumido por portal e admin.

Definição em [`docs/produtos/admin.md`](docs/produtos/admin.md); decisão de banco em
[`docs/decisoes/banco-monorepo.md`](docs/decisoes/banco-monorepo.md). Cada passo é pequeno e verificável.

## 1. Pacote `db/` compartilhado (npm workspaces + migrations)

- [ ] Converter a raiz do repo em npm workspace: criar `package.json` na raiz com `"workspaces": ["db", "portal", "admin"]` e `"private": true`. ✔ `npm ls -w db` reconhece o workspace (mesmo antes do pacote existir, `npm run` resolve a raiz).
- [ ] Criar o pacote `db/` (`@acesso/db`) com `db/package.json` (deps `prisma` + `@prisma/client`, scripts `generate`, `migrate:dev`, `migrate:deploy`), `db/tsconfig.json` e `db/prisma.config.ts` lendo `DATABASE_URL`. ✔ `npm ci` na raiz instala o workspace e `npm run -w db generate` roda sem erro de config.
- [ ] Mover `portal/prisma/schema.prisma` para `db/prisma/schema.prisma` (modelo `Product` intacto, `generator`+`datasource` apontando pro pacote) e remover `portal/prisma/`. ✔ `npx prisma validate` (no `db/`) valida o schema com o modelo `Product`.
- [ ] Criar `db/src/index.ts` exportando um singleton do `PrismaClient` (evita múltiplas instâncias em HMR) e apontar o `main`/`exports` do `db/package.json` para ele. ✔ `import { prisma } from '@acesso/db'` resolve tipado num arquivo de teste TS.
- [ ] Adicionar o modelo `User` ao schema (`id`, `email` único, `passwordHash`, `name`, `role` default `master`, `createdAt`, `updatedAt`). ✔ `npx prisma validate` passa com o modelo `User`.
- [ ] Adicionar o modelo `AnalyticsEvent` ao schema (`id`, `type`, `path`, `targetId?`, `sessionId`, `referrer?`, `createdAt`) com índices `(type, createdAt)` e `(type, targetId)`. ✔ `npx prisma validate` passa com o modelo `AnalyticsEvent`.
- [ ] Gerar a migration inicial versionada com os três modelos (`prisma migrate dev --name init`) e commitar `db/prisma/migrations/`. ✔ Existe uma pasta de migration em `db/prisma/migrations/` e `npx prisma migrate status` reporta o schema em dia.
- [ ] Mover o seed para `db/prisma/seed.ts` (produtos de exemplo) usando o client do pacote e registrar o comando de seed no `db/package.json`. ✔ `npm run -w db seed` compila e roda sem erro de tipagem.

## 2. Portal consome `@acesso/db`

- [ ] Adicionar `@acesso/db` como dependência do `portal/` e reescrever `portal/server/utils/prisma.ts` para reexportar o client do pacote. ✔ `npx nuxi prepare` no `portal/` conclui sem erro de import.
- [ ] Remover o `prisma db push` do `portal/docker-entrypoint.sh` (migrations passam a rodar num serviço dedicado — ver seção 7). ✔ O entrypoint não referencia mais `prisma db push`; o portal ainda sobe localmente contra o banco existente.
- [ ] Rodar build de produção do portal consumindo o pacote. ✔ `npm run -w portal build` conclui e gera `.output/` sem erros.

## 3. Scaffold do app `admin/`

- [ ] Inicializar o app com `npx nuxi init admin`, limpar o boilerplate (páginas/README de exemplo) e integrá-lo ao workspace (`name: @acesso/admin`, `private`). ✔ `npm run -w admin dev` sobe o app padrão em modo dev.
- [ ] Reutilizar os tokens do `design-system/` no admin (importar os CSS de tokens no `nuxt.config`/assets) — nada hardcoded. ✔ Uma página do admin renancia usando um alias de token (ex.: `--brand`) resolvido no navegador.
- [ ] Configurar o admin para consumir `@acesso/db` via `admin/server/utils/prisma.ts` (reexporta o client do pacote). ✔ `npx nuxi prepare` no `admin/` conclui sem erro de import.
- [ ] Criar o shell do admin (layout com barra lateral + topo) como componentes Atomic Design sobre os tokens. ✔ Layout renderiza em mobile (~360px) e desktop sem overflow horizontal.

## 4. Autenticação (login)

- [ ] Instalar e configurar `nuxt-auth-utils` no admin (variável `NUXT_SESSION_PASSWORD`). ✔ `npx nuxi prepare` reconhece o módulo e as funções de sessão ficam disponíveis no servidor.
- [ ] Criar `POST /api/auth/login` no admin: valida e-mail+senha contra `User` (compara hash) e cria a sessão. ✔ Requisição com credenciais válidas retorna 200 e seta o cookie de sessão; inválidas retornam 401.
- [ ] Criar `POST /api/auth/logout` no admin que encerra a sessão. ✔ Após chamar, a sessão fica vazia e rotas protegidas voltam a redirecionar para `/login`.
- [ ] Criar middleware global de rota que protege todo o admin (sem sessão → `/login`). ✔ Acesso a uma rota interna sem sessão redireciona para `/login`; com sessão, permite.
- [ ] Criar a página `/login` (formulário e-mail+senha usando os componentes/tokens do design system). ✔ Página `/login` renderiza, envia ao endpoint e, em sucesso, navega para a home do admin.
- [ ] Criar um script/CLI de criação do usuário master (gera hash da senha e faz upsert do `User`), documentado no README do admin. ✔ Rodar o script cria/atualiza o usuário e o login com essas credenciais funciona.

## 5. CRUD de produtos (lojinha)

- [ ] Criar os endpoints do admin de produtos: `GET /api/products` (lista, inclui inativos), `POST /api/products` (cria), `PUT /api/products/:id` (edita), `PATCH /api/products/:id` (ativar/desativar) e `DELETE /api/products/:id`, todos protegidos por sessão. ✔ Cada rota responde o status correto e persiste na tabela `produtos` (verificável via listagem).
- [ ] Criar a página de listagem de produtos no admin (tabela com título, categoria, preço, status ativo). ✔ Página lista os produtos do banco e mostra estado vazio amigável quando não há nenhum.
- [ ] Criar o formulário de criar/editar produto (validação de campos obrigatórios; foto por URL) reusando componentes do design system. ✔ Criar e editar via formulário reflete a mudança na listagem e no portal (`/loja`).
- [ ] Adicionar as ações de ativar/desativar e excluir na listagem (excluir com confirmação, sem `window.confirm` bloqueante). ✔ Alternar status e excluir refletem imediatamente na listagem e na tabela.

## 6. Coleta de métricas first-party (no portal)

- [ ] Criar `POST /api/track` no portal que grava um `AnalyticsEvent` (deriva `sessionId` por hash rotativo sem PII), resiliente e não-bloqueante. ✔ Um POST de exemplo insere uma linha em `AnalyticsEvent`; falha do banco não retorna erro que quebre a página.
- [ ] Criar um plugin/composable no portal que dispara `pageview` a cada navegação de rota. ✔ Navegar entre páginas do portal gera eventos `pageview` com o `path` correto.
- [ ] Disparar `product_click` (com `targetId` = id do produto) no clique do card da lojinha, sem atrapalhar o redirecionamento ao afiliado. ✔ Clicar num produto gera um evento `product_click` com o id correto e ainda abre o link de afiliado.
- [ ] Disparar `article_read` (com `targetId` = slug) na página de artigo do blog. ✔ Abrir um artigo gera um evento `article_read` com o slug correto.

## 7. Dashboards de métricas (no admin)

- [ ] Criar `GET /api/metrics/site` no admin: pageviews por dia, páginas mais acessadas e sessões únicas num período. ✔ Endpoint retorna os agregados corretos para dados de teste conhecidos.
- [ ] Criar `GET /api/metrics/products` no admin: ranking de `product_click` por `targetId`, com join no `Product` para o título. ✔ Endpoint retorna os produtos ordenados por número de cliques.
- [ ] Criar `GET /api/metrics/articles` no admin: ranking de `article_read` por slug num período. ✔ Endpoint retorna os artigos ordenados por número de leituras.
- [ ] Criar as páginas de dashboard (Acesso ao site, Produtos mais acessados, Leitura de artigos) com seletor de período, usando os tokens do design system. ✔ As três páginas renderizam os dados dos endpoints em mobile e desktop.
- [ ] Criar a home do admin com cards-resumo (totais do período) e atalhos para as seções. ✔ Home do admin mostra os números-resumo e navega para produtos e cada dashboard.

## 8. Docker & deploy (espelho da VPS)

- [ ] Ajustar o `portal/Dockerfile` e o `docker-compose.yml` da raiz para build a partir da **raiz do repo** (workspace + pacote `db/`), com `npm ci` do lockfile único e `prisma generate`. ✔ `docker compose build app` conclui e o container do portal sobe consumindo `@acesso/db`.
- [ ] Criar o `admin/Dockerfile` (multi-stage, workspace-aware, build a partir da raiz) espelhando o do portal. ✔ Build da imagem do admin conclui e o container serve o app na porta 3000.
- [ ] Adicionar o serviço one-shot `migrate` ao `docker-compose.yml` (roda `prisma migrate deploy` do pacote `db/` e sai); portal e admin ganham `depends_on` com `service_completed_successfully`. ✔ `docker compose up` aplica as migrations uma vez e só então sobe os apps.
- [ ] Adicionar o serviço `admin` ao `docker-compose.yml` (`container_name: acessocatolico_admin`, rede `caddy_net`, `restart: unless-stopped`, guarda de memória `mem_limit` + `NODE_OPTIONS=--max-old-space-size`, `NUXT_SESSION_PASSWORD`, `DATABASE_URL`). ✔ `docker compose config` valida e o serviço sobe como `acessocatolico_admin:3000` na `caddy_net`.
- [ ] Atualizar `.env.example` (`NUXT_SESSION_PASSWORD` e o que mais for necessário) e o `up.sh` (mensagens/serviços novos). ✔ `cp .env.example .env` + preencher + `./up.sh` sobe migrate + portal + admin sem erro.
- [ ] Documentar a entrada do Caddy da VPS (`admin.acessocatolico.com.br` → `reverse_proxy acessocatolico_admin:3000`) no README do repo e na decisão de banco/infra. ✔ Instrução de proxy documentada, coerente com o padrão do `CLAUDE.md` da VPS.
- [ ] Rodar a validação final local: `migrate` aplica o schema e os dois apps buildam e sobem. ✔ `docker compose up --build` sobe `migrate` (completa), `acessocatolico_app` e `acessocatolico_admin` saudáveis.
