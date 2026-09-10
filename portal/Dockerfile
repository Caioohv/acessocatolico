# syntax=docker/dockerfile:1

# ── Build ────────────────────────────────────────────────────────────────────
# node:24-slim (glibc): better-sqlite3 (@nuxt/content) e o binário do Prisma
# usam prebuilds glibc — evita compilar do zero como no Alpine (musl).
FROM node:24-slim AS builder
WORKDIR /app

# Instala dependências primeiro para aproveitar o cache de camadas.
COPY package.json package-lock.json ./
RUN npm ci

# Código + geração do Prisma Client. O build do Nuxt NÃO exige banco vivo:
# o Prisma é lazy (ver server/utils/prisma.ts), então o prerender não conecta.
COPY . .
RUN npx prisma generate
RUN npm run build

# ── Runtime ──────────────────────────────────────────────────────────────────
FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
# Nitro (preset node-server) lê estas variáveis; 0.0.0.0 para o Caddy alcançar.
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

# .output é auto-contido para servir; node_modules + prisma/ ficam para o
# `prisma db push` no start (não há migrations neste projeto — o schema é
# sincronizado via push).
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
