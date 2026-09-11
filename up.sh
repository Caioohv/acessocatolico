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

# ── Validação das variáveis obrigatórias ──────────────────────────────────────
# Lê um valor do .env (se existir) ou cai para a variável de ambiente do shell.
# Remove CR (arquivos CRLF) e aspas externas para medir o valor real — o mesmo
# que o docker compose enxerga ao carregar o env_file.
read_env() {
  key="$1"
  value=""
  if [ -f .env ]; then
    line=$(grep -E "^[[:space:]]*${key}=" .env | tail -n1 || true)
    value="${line#*=}"
  fi
  if [ -z "$value" ]; then
    value="$(printenv "$key" 2>/dev/null || true)"
  fi
  value="${value%$'\r'}"
  case "$value" in
    \"*\") value="${value#\"}"; value="${value%\"}" ;;
    \'*\') value="${value#\'}"; value="${value%\'}" ;;
  esac
  printf '%s' "$value"
}

if [ ! -f .env ]; then
  echo "! Aviso: Arquivo .env não encontrado, utilizando variáveis definidas no ambiente."
  echo "  Para criar:  cp .env.example .env" >&2
fi

DB_URL_VALUE="$(read_env DATABASE_URL)"
SESSION_PW_VALUE="$(read_env NUXT_SESSION_PASSWORD)"
env_errors=0

if [ -z "$DB_URL_VALUE" ]; then
  echo "✗ DATABASE_URL não definida (nem no .env, nem no ambiente)." >&2
  echo "  É usada por migrate, portal e admin. Ver .env.example." >&2
  env_errors=1
fi

# nuxt-auth-utils exige NUXT_SESSION_PASSWORD com no mínimo 32 caracteres em
# produção — sem ela (ou curta demais) o admin quebra ao criar a sessão.
if [ -z "$SESSION_PW_VALUE" ]; then
  echo "✗ NUXT_SESSION_PASSWORD não definida — o admin não sobe sem ela." >&2
  echo "  Gere uma chave segura:  openssl rand -base64 32" >&2
  env_errors=1
elif [ "${#SESSION_PW_VALUE}" -lt 32 ]; then
  echo "✗ NUXT_SESSION_PASSWORD tem ${#SESSION_PW_VALUE} caracteres; o mínimo é 32." >&2
  echo "  Gere uma chave segura:  openssl rand -base64 32" >&2
  env_errors=1
fi

if [ "$env_errors" -ne 0 ]; then
  exit 1
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
