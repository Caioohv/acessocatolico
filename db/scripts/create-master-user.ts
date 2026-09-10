/**
 * CLI para criar ou atualizar o usuário master do painel admin.
 *
 * Em v1 não há cadastro público — este script é o único caminho para gerar as
 * credenciais de acesso ao painel. Faz upsert: se o e-mail já existir, atualiza
 * o hash da senha (e, opcionalmente, o nome); se não existir, cria o usuário.
 *
 * O hash usa bcryptjs com custo 12 — o mesmo custo do hash dummy de temporização
 * constante no endpoint `POST /api/auth/login` do admin.
 *
 * Uso (a partir da raiz do monorepo):
 *
 *   npm run -w db create-user -- <email> <senha> [nome]
 *
 * Ou diretamente em `db/`:
 *
 *   npx tsx scripts/create-master-user.ts <email> <senha> [nome]
 *
 * Exemplos:
 *
 *   npm run -w db create-user -- admin@exemplo.com MinhaSenh@Segura "Caio Vieira"
 *   npm run -w db create-user -- admin@exemplo.com NovaSenha123
 *
 * A `DATABASE_URL` é lida do `.env` (na raiz ou em `db/`) ou diretamente das
 * variáveis de ambiente do shell.
 *
 * Prisma 7: a connection string não vive no bloco `datasource` do schema; é
 * passada em runtime pelo driver adapter. O script segue o mesmo padrão standalone
 * de `db/prisma/seed.ts` e instancia seu próprio `PrismaClient`.
 */

import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Carrega o `.env` sem depender de `dotenv` (Node >= 20.6).
// Silencioso se o arquivo não existir (usa variáveis já no ambiente).
try {
  process.loadEnvFile()
} catch {
  // .env ausente — segue com as variáveis presentes em process.env.
}

// ── argumentos ────────────────────────────────────────────────────────────────

const [, , emailArg, passwordArg, nameArg] = process.argv

if (!emailArg || !passwordArg) {
  console.error('Uso: tsx scripts/create-master-user.ts <email> <senha> [nome]')
  console.error('Exemplo: tsx scripts/create-master-user.ts admin@exemplo.com MinhaSenh@ "Caio Vieira"')
  process.exit(1)
}

const email = emailArg.trim().toLowerCase()
const password = passwordArg
const name = nameArg?.trim() || 'Master'

// ── cliente Prisma (standalone, como o seed) ──────────────────────────────────

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

// ── execução ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const prisma = createPrismaClient()

  try {
    // Custo 12 — igual ao hash dummy de temporização constante no login endpoint.
    const passwordHash = await hash(password, 12)

    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        passwordHash,
        name,
        role: 'master',
      },
      update: {
        passwordHash,
        name,
      },
    })

    console.log(`Usuário ${user.email} (${user.role}) criado/atualizado com sucesso.`)
    console.log(`ID: ${user.id}`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error: unknown) => {
  console.error('Falha ao criar/atualizar o usuário master:', error)
  process.exitCode = 1
})
