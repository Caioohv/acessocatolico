// Prisma 7: a connection string saiu do bloco `datasource` do schema. O CLI
// (`prisma db push`, no docker-entrypoint.sh) lê a conexão daqui; o runtime do
// app continua usando o driver adapter (@prisma/adapter-pg) em
// server/utils/prisma.ts. `env('DATABASE_URL')` lê de process.env — na VPS a
// variável vem do docker-compose (environment/env_file).
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
