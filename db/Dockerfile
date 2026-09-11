# syntax=docker/dockerfile:1

# ── Build ────────────────────────────────────────────────────────────────────
# node:24-slim (glibc): o binário do Prisma usa prebuilds glibc.
FROM node:24-slim AS builder
WORKDIR /app

# better-sqlite3 (@nuxt/content do workspace) não tem prebuild para Node 24 e
# compila via node-gyp durante o npm ci — precisa de Python + toolchain C++.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Instala dependências do monorepo para resolver o workspace completo.
COPY package.json package-lock.json ./
COPY db/package.json ./db/
COPY portal/package.json ./portal/
COPY admin/package.json ./admin/
RUN npm ci

# Código do pacote db
COPY db/ ./db/

# Gera o client do Prisma no pacote @acesso/db (DATABASE_URL dummy para prisma.config.ts)
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" npm run -w db generate

# ── Runtime ──────────────────────────────────────────────────────────────────
FROM node:24-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/db ./db
COPY db/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /app/db

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "migrate:deploy"]
