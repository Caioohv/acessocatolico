# Add the one-shot `migrate` service

**Status:** done

## What to do

Add a one-shot `migrate` service to the root `docker-compose.yml` that runs `prisma migrate deploy` from the `db/` package and exits. Add `depends_on` with `condition: service_completed_successfully` on both the portal and admin services so migrations apply exactly once before the apps start (the single-runner rule from `docs/decisoes/banco-monorepo.md`, replacing the old `db push` race).

## Done criteria

`docker compose up` applies the migrations once and only then brings up the apps.

## Original line

> Adicionar o serviço one-shot `migrate` ao `docker-compose.yml` (roda `prisma migrate deploy` do pacote `db/` e sai); portal e admin ganham `depends_on` com `service_completed_successfully`. ✔ `docker compose up` aplica as migrations uma vez e só então sobe os apps.

## Summary

Created `db/Dockerfile` and `db/docker-entrypoint.sh` to run `npm run migrate:deploy` (`prisma migrate deploy`), added the one-shot `migrate` service with `restart: "no"` to `docker-compose.yml`, configured `depends_on: migrate: condition: service_completed_successfully` in `app`, and validated cleanly with `docker compose config` and `docker compose build migrate`.
