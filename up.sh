#!/usr/bin/env bash
# Sobe os serviços do Acesso Católico (build + up) numa tacada só:
#   - migrate (executa migrations e sai)
#   - portal  (acessocatolico_app:3000)
#   - admin   (acessocatolico_admin:3000)
#
# Uso:  ./up.sh
#
# Pré-requisitos (uma vez):
#   1. cp .env.example .env  e preencher DATABASE_URL e NUXT_SESSION_PASSWORD.
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

# Validação do arquivo .env
if [ ! -f .env ]; then
  if [ -z "${DATABASE_URL:-}" ]; then
    echo "✗ Arquivo .env não encontrado (e DATABASE_URL não definida no ambiente)." >&2
    echo "  Execute:  cp .env.example .env" >&2
    echo "  E preencha DATABASE_URL e NUXT_SESSION_PASSWORD antes de subir os serviços." >&2
    exit 1
  else
    echo "! Aviso: Arquivo .env não encontrado, utilizando variáveis definidas no ambiente."
  fi
fi

# A rede externa do Caddy precisa existir (idempotente — não recria se já houver).
if ! docker network inspect caddy_net >/dev/null 2>&1; then
  echo "→ Criando rede externa caddy_net..."
  docker network create caddy_net
fi

echo "→ Build das imagens e subida dos serviços (detached)..."
$COMPOSE up -d --build

echo "→ Status dos serviços:"
$COMPOSE ps

echo
echo "✓ Serviços iniciados:"
echo "  - migrate: executa migrações pendentes do banco (@acesso/db) e finaliza com sucesso."
echo "  - portal:  acessocatolico_app:3000"
echo "  - admin:   acessocatolico_admin:3000"
echo
echo "  Configuração de proxy reverso no Caddy (rede caddy_net):"
echo "  - acessocatolico.com.br       -> acessocatolico_app:3000"
echo "  - admin.acessocatolico.com.br -> acessocatolico_admin:3000"
echo
echo "  Recarregar o proxy Caddy, se preciso:  ../../../vps/infra/proxy/restart-caddy.sh"
