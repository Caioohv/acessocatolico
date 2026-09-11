# Add the `admin` service to compose

**Status:** done

## What to do

Add the `admin` service to the root `docker-compose.yml`: `container_name: acessocatolico_admin`, on the external `caddy_net` network, `restart: unless-stopped`, memory guard (`mem_limit` + `NODE_OPTIONS=--max-old-space-size`, mirroring the portal's guard from project-memory), and env `NUXT_SESSION_PASSWORD` and `DATABASE_URL`. Mirror the portal service's VPS conventions.

## Done criteria

`docker compose config` validates and the service comes up as `acessocatolico_admin:3000` on `caddy_net`.

## Original line

> Adicionar o serviço `admin` ao `docker-compose.yml` (`container_name: acessocatolico_admin`, rede `caddy_net`, `restart: unless-stopped`, guarda de memória `mem_limit` + `NODE_OPTIONS=--max-old-space-size`, `NUXT_SESSION_PASSWORD`, `DATABASE_URL`). ✔ `docker compose config` valida e o serviço sobe como `acessocatolico_admin:3000` na `caddy_net`.

## Summary

Adicionado o serviço `admin` ao `docker-compose.yml` com build multi-stage (`admin/Dockerfile`), container `acessocatolico_admin`, rede `caddy_net`, dependência do `migrate` concluído e guarda de memória (`mem_limit: 768m`, `NODE_OPTIONS: --max-old-space-size=512`). Validado com `docker compose config` e `docker compose build admin` (exit 0).
