#!/bin/sh
# Entrypoint do portal: sobe o servidor Nitro (Prisma/banco comentado por enquanto).
set -e

# if [ -n "$DATABASE_URL" ]; then
#   echo "→ Sincronizando schema do Postgres (prisma db push)..."
#   npx prisma db push || echo "⚠  prisma db push falhou; subindo o app mesmo assim."
# else
#   echo "⚠  DATABASE_URL não definida — pulando o db push."
# fi

exec "$@"

