#!/bin/sh
# Entrypoint do admin: sobe o servidor Nitro.
# As migrations do banco NÃO rodam aqui — quem aplica o schema é o serviço
# one-shot `migrate` (prisma migrate deploy, pacote @acesso/db), que roda antes
# dos apps subirem (depends_on: service_completed_successfully). O container do
# admin nunca toca no schema no start.
set -e

exec "$@"
