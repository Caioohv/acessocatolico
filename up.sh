#!/usr/bin/env bash
# Sobe o portal Acesso Católico (build + up) numa tacada só.
#
# Uso:  ./up.sh
#
# Pré-requisitos (uma vez):
#   1. cp .env.example .env  e preencher DATABASE_URL (Postgres global da VPS).
#   2. O database `acessocatolico` é criado pelo init do global_psql. Se essa
#      instância já existia antes disso, crie-o manualmente:
#        docker exec -it global_psql psql -U postgres -c 'CREATE DATABASE acessocatolico;'
set -euo pipefail

cd "$(dirname "$0")"

# docker compose (v2) ou docker-compose (v1) — o que estiver disponível.
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "✗ Docker Compose não encontrado (nem 'docker compose' nem 'docker-compose')." >&2
  exit 1
fi

# .env é opcional enquanto a integração com o banco / Prisma estiver comentada.
# if [ ! -f .env ]; then
#   echo "✗ .env não encontrado. Rode:  cp .env.example .env  e preencha DATABASE_URL." >&2
#   exit 1
# fi


# A rede externa do Caddy precisa existir (idempotente — não recria se já houver).
if ! docker network inspect caddy_net >/dev/null 2>&1; then
  echo "→ Criando rede externa caddy_net..."
  docker network create caddy_net
fi

echo "→ Build da imagem e subida (detached)..."
$COMPOSE up -d --build

echo "→ Status:"
$COMPOSE ps

echo
echo "✓ Portal no ar como acessocatolico_app:3000."
echo "  Caddy já aponta acessocatolico.com.br → acessocatolico_app:3000."
echo "  Recarregar o proxy, se preciso:  ../../../vps/infra/proxy/restart-caddy.sh"
