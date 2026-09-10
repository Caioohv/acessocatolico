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
COPY package.json package-lock.json ./
RUN npm ci

# Código + build do Nuxt. Prisma comentado (banco em pendência).
COPY . .
# RUN DATABASE_URL="postgresql://user:pass@localhost:5432/placeholder" npx prisma generate
RUN npm run build

# ── Runtime ──────────────────────────────────────────────────────────────────
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Nitro (preset node-server) lê estas variáveis; 0.0.0.0 para o Caddy alcançar.
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# .output é auto-contido para servir.
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]

