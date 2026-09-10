import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

/**
 * Singleton do Prisma Client.
 *
 * Nitro/Nuxt recarrega os módulos do servidor a cada mudança durante o dev (HMR),
 * o que instanciaria um novo `PrismaClient` — e um novo pool de conexões — a cada
 * reload, esgotando as conexões do Postgres. Guardando a instância em `globalThis`
 * ela sobrevive aos reloads e é reutilizada.
 *
 * Prisma 7: a connection string não vive mais no bloco `datasource` do schema; ela é
 * passada em runtime por um driver adapter (`@prisma/adapter-pg`) construído a partir
 * de `DATABASE_URL`. Ver https://pris.ly/d/prisma7-client-config.
 */

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL não definida. Copie `.env.example` para `.env` e preencha a string de conexão do Postgres.',
    )
  }

  const adapter = new PrismaPg({ connectionString })

  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
