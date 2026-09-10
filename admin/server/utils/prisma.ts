/**
 * Reexporta o singleton do Prisma Client do pacote compartilhado `@acesso/db`,
 * que é a fonte única do acesso ao banco (schema, migrations e client) para
 * `portal/` e `admin/`.
 *
 * `server/utils/*` é auto-importado pelo Nitro, então basta reexportar `prisma`
 * aqui para que os handlers (`server/api/**`) do admin usem `prisma.user...`,
 * `prisma.product...` e `prisma.analyticsEvent...` sem import explícito. O
 * client é preguiçoso (lazy): o import nunca quebra sem `DATABASE_URL` — o erro
 * só surge na primeira query, dentro do try/catch dos handlers. Ver
 * `db/src/index.ts`.
 */
export { prisma } from '@acesso/db'
export type { Prisma } from '@acesso/db'
