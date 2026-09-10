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
 *
 * Instanciação preguiçosa (lazy): o client só é criado no primeiro acesso, não no
 * carregamento do módulo. Isso mantém o servidor (e o prerender do build) importável
 * mesmo sem `DATABASE_URL` — o erro de "banco indisponível/sem env" só surge quando uma
 * query é de fato executada, dentro do try/catch dos handlers, que então devolvem o
 * fallback gracioso. Assim o build **não exige um banco vivo** e a lojinha faz o fetch
 * em tempo de requisição, não de build.
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

let instance: PrismaClient | undefined = globalForPrisma.prisma

function getPrismaClient(): PrismaClient {
  if (!instance) {
    instance = createPrismaClient()
    // Em dev, guarda no globalThis para sobreviver ao HMR do Nitro (evita
    // esgotar o pool de conexões). Em produção, o módulo já é singleton.
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = instance
    }
  }
  return instance
}

/**
 * Proxy preguiçoso: preserva a mesma forma de importação (`import { prisma }`) e uso
 * (`prisma.product.findMany(...)`) dos handlers, mas adia a construção do client até o
 * primeiro acesso a uma propriedade. Sem `DATABASE_URL`, o import não quebra — o erro
 * cai na primeira query, capturado pelo try/catch de cada endpoint.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})
