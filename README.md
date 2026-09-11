# Acesso Católico

Monorepo do projeto **Acesso Católico** — portal público católico e plataforma de gestão (painel administrativo).

## Estrutura do Repositório

O repositório é gerenciado como um **npm workspace** compartilhado:

- **`portal/`**: Aplicação pública em Nuxt 4 (SSR). Acesso a missas, eventos, blog e lojinha de afiliados. Servido em `acessocatolico.com.br`.
- **`admin/`**: Painel administrativo privado em Nuxt 4 (SSR). Autenticação com sessão segura (`nuxt-auth-utils`), gestão de produtos da lojinha e métricas. Servido em `admin.acessocatolico.com.br`.
- **`db/`**: Pacote `@acesso/db` compartilhado (Prisma schema, migrations versionadas, client singleton e scripts CLI administrativos como `create-user`).
- **`content/`**: Artigos e conteúdo em Markdown consumidos pelo blog via `@nuxt/content`.
- **`design-system/`**: Tokens visuais e estilos base compartilhados.
- **`docs/`**: Documentação de arquitetura, decisões técnicas e visão do produto.

---

## Infraestrutura e Docker

Os serviços de produção rodam via Docker Compose conectados à rede externa compartilhada `caddy_net`, consumindo o banco PostgreSQL global da VPS (`global_psql`).

### Serviços no `docker-compose.yml`

1. **`migrate`** (`acessocatolico_migrate`): Executa as migrações pendentes do banco (`prisma migrate deploy`) durante o deploy e finaliza com sucesso antes da inicialização dos apps.
2. **`app`** (`acessocatolico_app:3000`): Container de produção do portal público.
3. **`admin`** (`acessocatolico_admin:3000`): Container de produção do painel administrativo.

### Subindo os Serviços

Copie o arquivo de variáveis de ambiente e preencha as configurações:

```bash
cp .env.example .env
```

Para realizar o build e subir todos os serviços na ordem correta:

```bash
./up.sh
```

---

## Configuração do Proxy Reverso (Caddy)

Na VPS, o Caddy gerencia o TLS automático (Let's Encrypt) e o roteamento de tráfego por meio da rede Docker `caddy_net`.

As entradas de configuração para os domínios do Acesso Católico no `Caddyfile` seguem o padrão de infraestrutura da VPS:

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

> **Nota sobre snippets de TLS:** Caso o ambiente utilize snippet dedicado de TLS (ex.: `import /etc/caddy/snippets/tls.caddy` em vez de `import sec_headers`), a diretiva essencial de encaminhamento permanece:
> ```caddyfile
> admin.acessocatolico.com.br {
>     import /etc/caddy/snippets/tls.caddy
>     reverse_proxy acessocatolico_admin:3000
> }
> ```

Após atualizar o `Caddyfile`, valide e reinicie o proxy:

```bash
caddy validate
# Ou, pelo script da VPS:
../../../vps/infra/proxy/restart-caddy.sh
```

---

## Comandos Úteis de Desenvolvimento

Execute a partir da raiz do repositório:

```bash
# Instalar dependências de todos os workspaces
npm ci

# Desenvolvimento local
npm run -w portal dev       # Portal público em http://localhost:3000
npm run -w admin dev        # Painel admin em http://localhost:3000

# Banco de dados e migrations (@acesso/db)
npm run -w db migrate:deploy    # Aplica migrações pendentes
npm run -w db prisma:generate   # Gera o Prisma Client

# Criação / atualização do usuário master do painel admin
npm run -w db create-user -- admin@exemplo.com SenhaForte123 "Nome do Usuário"
```
