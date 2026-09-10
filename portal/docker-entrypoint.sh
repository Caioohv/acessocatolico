#!/bin/sh
# Entrypoint do portal: sincroniza o schema do banco e sobe o servidor Nitro.
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "→ Sincronizando schema do Postgres (prisma db push)..."
  # --skip-generate: o client já foi gerado no build.
  # Falha não é fatal: o app sobe e cada endpoint tem fallback gracioso quando o
  # banco está indisponível (ver server/utils/prisma.ts).
  npx prisma db push --skip-generate || echo "⚠  prisma db push falhou; subindo o app mesmo assim."
else
  echo "⚠  DATABASE_URL não definida — pulando o db push."
fi

exec "$@"
