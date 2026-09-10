// Prisma 7: a connection string saiu do bloco `datasource` do schema. O CLI
// (`prisma generate`, `prisma migrate dev/deploy`) lê a conexão daqui; o runtime
// dos apps continua usando o driver adapter (@prisma/adapter-pg) no client
// exportado por src/index.ts. `env('DATABASE_URL')` lê de process.env — na VPS a
// variável vem do docker-compose (environment/env_file); em dev, do .env local.
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
