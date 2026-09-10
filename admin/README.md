# @acesso/admin

Painel administrativo privado do Acesso Católico (Fase 2+): autenticação, gestão da
lojinha (CRUD de produtos) e dashboards de métricas. App Nuxt 4 separado do portal
público, membro do workspace ao lado de `portal/` e `db/` (consome `@acesso/db`).

## Desenvolvimento

Rodar a partir da raiz do monorepo:

```bash
npm run -w admin dev       # sobe o app em modo dev
npm run -w admin build     # build de produção
npm run -w admin lint      # eslint
```
