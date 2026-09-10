# Add the one-shot `migrate` service

**Status:** todo

## What to do

Add a one-shot `migrate` service to the root `docker-compose.yml` that runs `prisma migrate deploy` from the `db/` package and exits. Add `depends_on` with `condition: service_completed_successfully` on both the portal and admin services so migrations apply exactly once before the apps start (the single-runner rule from `docs/decisoes/banco-monorepo.md`, replacing the old `db push` race).

## Done criteria

`docker compose up` applies the migrations once and only then brings up the apps.

## Original line

> Adicionar o serviço one-shot `migrate` ao `docker-compose.yml` (roda `prisma migrate deploy` do pacote `db/` e sai); portal e admin ganham `depends_on` com `service_completed_successfully`. ✔ `docker compose up` aplica as migrations uma vez e só então sobe os apps.
