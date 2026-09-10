# @acesso/admin

Painel administrativo privado do Acesso Católico (Fase 2+): autenticação, gestão da
lojinha (CRUD de produtos) e dashboards de métricas. App Nuxt 4 separado do portal
público, membro do workspace ao lado de `portal/` e `db/` (consome `@acesso/db`).

## Criando o usuário master

Não há cadastro público em v1 — o acesso ao painel é criado via CLI. Execute o
script uma vez (ou sempre que precisar trocar a senha):

```bash
npm run -w db create-user -- <email> <senha> [nome]
```

**Exemplos:**

```bash
# Criar o primeiro usuário master
npm run -w db create-user -- admin@exemplo.com MinhaSenh@Segura "Caio Vieira"

# Trocar só a senha (mantém o nome)
npm run -w db create-user -- admin@exemplo.com NovaSenha123

# Com nome omitido, usa "Master" como padrão
npm run -w db create-user -- admin@exemplo.com MinhaSenh@
```

**Pré-requisitos:**
- `DATABASE_URL` no arquivo `.env` (raiz ou `db/`) apontando para o Postgres.
- `npm ci` na raiz para instalar as dependências do workspace (inclui `bcryptjs` e o Prisma Client).
- A migration inicial aplicada (`npm run -w db migrate:deploy` ou `prisma migrate deploy` a partir de `db/`).

O script faz **upsert**: cria o usuário se o e-mail não existir; se existir, atualiza
o hash da senha e o nome. O papel (`role`) é sempre `"master"` na criação.

---

## Desenvolvimento

Rodar a partir da raiz do monorepo:

```bash
npm run -w admin dev       # sobe o app em modo dev
npm run -w admin build     # build de produção
npm run -w admin lint      # eslint
```
