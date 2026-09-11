# syntax=docker/dockerfile:1

# ── Build ────────────────────────────────────────────────────────────────────
# node:24-slim (glibc): better-sqlite3 (@nuxt/content) e o binário do Prisma
# usam prebuilds glibc — evita compilar do zero como no Alpine (musl).
FROM node:24-slim AS builder
WORKDIR /app

# better-sqlite3 (@nuxt/content) não tem prebuild para o Node 24 e compila via
# node-gyp — precisa de Python + toolchain C++. Fica só no builder; o runtime
# continua slim.
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Instala dependências primeiro para aproveitar o cache de camadas.
# Copia os manifests da raiz e dos workspaces para o npm ci resolver a árvore completa.
COPY package.json package-lock.json ./
COPY db/package.json ./db/
COPY portal/package.json ./portal/
COPY admin/package.json ./admin/
RUN npm ci

# Código dos pacotes necessários para o build do portal (@acesso/db e portal)
COPY db/ ./db/
COPY portal/ ./portal/

# Gera o client do Prisma no pacote @acesso/db (requer DATABASE_URL dummy em build time para prisma.config.ts)
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" npm run -w db generate

# Build do portal Nuxt
RUN npm run -w portal build

# ── Runtime ──────────────────────────────────────────────────────────────────
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Nitro (preset node-server) lê estas variáveis; 0.0.0.0 para o Caddy alcançar.
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# .output é auto-contido para servir.
COPY --from=builder /app/portal/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/db ./db
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/portal/package.json ./portal/package.json
COPY portal/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]


