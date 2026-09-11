# Decisão — Banco no monorepo: pacote `db/` compartilhado

> **Status:** ✅ decidido (2026-09-10)
> **Contexto:** entra o app `admin/` (2º app Nuxt no mesmo repo) que precisa das mesmas
> tabelas que o `portal/` e de tabelas novas (usuários, métricas). Onde vive o schema/migrations?

---

## O problema

Hoje o `portal/` tem seu próprio `prisma/schema.prisma` e sincroniza o banco com **`prisma db push`**
no start do container (sem pasta de `migrations/`). O banco (`acessocatolico`, no `global_psql` da VPS)
é **um só**. Com um segundo app (`admin/`) mexendo nas mesmas tabelas, duplicar o schema levaria a:

- **Drift de schema** — duas fontes de verdade divergem.
- **Corrida no deploy** — dois apps rodando `db push` sobre a mesma estrutura.
- **Posse errada** — tabelas transversais (usuários, métricas, futuramente paróquias/comunidades)
  não são "do portal"; não devem morar dentro dele.

## Alternativas consideradas

| Opção | Resumo | Veredito |
|---|---|---|
| **A. Cada app com seu schema** | `portal/` e `admin/` com schemas separados apontando pro mesmo banco. | ❌ É exatamente o conflito/duplicidade a evitar. |
| **B. Schema dono no `portal/`** | `portal/prisma` como fonte única; `admin/` consome o mesmo client; só o portal migra. | 🟡 Mudança mínima, mas o portal passa a "possuir" tabelas que são do admin — torto conceitualmente e acopla os dois apps. |
| **C. Pacote `db/` compartilhado** | Um pacote neutro (`@acesso/db`) dono do schema + migrations + client; ambos os apps importam. | ✅ **Escolhido.** |

## Decisão

**Um pacote neutro `db/` (`@acesso/db`), via npm workspaces, é a única fonte de verdade do banco.**

```
/ (raiz do repo — npm workspace)
├── package.json            # "workspaces": ["db", "portal", "admin"]
├── db/                     # @acesso/db  — fonte única do banco
│   ├── prisma/
│   │   ├── schema.prisma   #   Product, User, AnalyticsEvent, ...
│   │   └── migrations/     #   versionadas em git
│   ├── src/index.ts        #   exporta o PrismaClient (singleton)
│   └── package.json
├── portal/                 # consome @acesso/db (público)
└── admin/                  # consome @acesso/db (com login)
```

### Regras

1. **Schema e migrations só existem em `db/`.** Nenhum app tem `prisma/` próprio.
2. **`db push` sai; entram migrations versionadas** (`prisma migrate`). O banco passa a ter histórico
   de mudanças — necessário com dois apps e dados reais (usuários, métricas).
3. **Exatamente UM runner aplica migrations no deploy:** um serviço one-shot `migrate` no
   `docker-compose.yml` roda `prisma migrate deploy` e sai; os apps sobem com `depends_on`
   (`service_completed_successfully`). Fim da corrida de `db push`.
4. **Cada app importa o client de `@acesso/db`** (via `server/utils/prisma.ts`), mantendo o singleton
   e o fallback gracioso já existente quando o banco está indisponível.

### Consequência no Docker

O client Prisma gerado precisa estar no `node_modules` de cada app. Com workspaces, o **contexto de
build passa a ser a raiz do repo** (não mais `./portal`): o Dockerfile copia `package.json` +
`package-lock.json` da raiz + o pacote `db/` + o app, roda `npm ci` (lockfile único) e gera o client.
É a troca aceita por ter fonte única — documentada aqui para não surpreender no deploy.

### Roteamento e Proxy (Caddy na VPS)

Na topologia de produção da VPS, tanto o portal quanto o painel administrativo conectam-se à rede Docker externa `caddy_net`. O proxy reverso Caddy recebe os requests externos e encaminha para os respectivos containers:

- **Portal público:** `acessocatolico.com.br` → `reverse_proxy acessocatolico_app:3000`
- **Painel administrativo:** `admin.acessocatolico.com.br` → `reverse_proxy acessocatolico_admin:3000`

Configuração no `Caddyfile` da VPS:

```caddyfile
# Portal público (canônico no apex)
http://acessocatolico.com.br, http://www.acessocatolico.com.br, www.acessocatolico.com.br {
	redir https://acessocatolico.com.br{uri} permanent
}
acessocatolico.com.br {
	import sec_headers
	reverse_proxy acessocatolico_app:3000
}

# Painel administrativo
admin.acessocatolico.com.br {
	import sec_headers
	reverse_proxy acessocatolico_admin:3000
}
```

Caso o ambiente de proxy utilize snippets dedicados de TLS (ex.: `/etc/caddy/snippets/tls.caddy`), o bloco mantém a mesma regra de encaminhamento:

```caddyfile
admin.acessocatolico.com.br {
    import /etc/caddy/snippets/tls.caddy
    reverse_proxy acessocatolico_admin:3000
}
```

### Custo / trade-off

- **+** Fonte única real, zero drift, posse correta das tabelas, histórico de migrations.
- **−** Refactor do que já funciona: portal migra de `db push` → migrations, e o contexto Docker muda
  para a raiz. Mitigado fazendo em passos pequenos e verificáveis (ver `admin-todo.md`).

## Fora de escopo (por ora)

- Multi-tenancy / RBAC (Pessoa × Vínculo) — Fases 2–3; o `User` de agora é o gancho de auth e depois
  se liga a `Pessoa`. Ver [`../conceito.md §4`](../conceito.md).
