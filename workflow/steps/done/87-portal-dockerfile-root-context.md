# Adjust portal Dockerfile/compose for root build context

**Status:** done

## What to do

Adjust `portal/Dockerfile` and the root `docker-compose.yml` so the portal builds from the repo root (workspace-aware, including the `db/` package), running `npm ci` from the single lockfile plus `prisma generate`. Per `docs/decisoes/banco-monorepo.md`, the build context moves from `./portal` to the repo root so the generated Prisma client lands in the app's `node_modules`.

## Done criteria

`docker compose build app` completes and the portal container comes up consuming `@acesso/db`.

## Original line

> Ajustar o `portal/Dockerfile` e o `docker-compose.yml` da raiz para build a partir da **raiz do repo** (workspace + pacote `db/`), com `npm ci` do lockfile único e `prisma generate`. ✔ `docker compose build app` conclui e o container do portal sobe consumindo `@acesso/db`.

## Summary

Ajustados `portal/Dockerfile` e `docker-compose.yml` para build com contexto na raiz do monorepo (`context: .`, `dockerfile: portal/Dockerfile`) e multi-stage workspace-aware (`npm ci` com lockfile raiz único, `prisma generate` no pacote `@acesso/db`, build do portal e runner servindo `.output` com symlink do pacote de banco). Validado com `docker compose build app` (exit code 0) e container de teste respondendo HTTP 200 em `/` e `/api/products`.
