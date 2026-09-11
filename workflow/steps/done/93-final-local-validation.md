# Run the final local validation

**Status:** done

## What to do

Run the final local validation of the whole stack: the `migrate` service applies the schema and both apps build and come up. This is the end-to-end check that the workspace, shared package, migrations runner, and both containers work together.

## Done criteria

`docker compose up --build` brings up `migrate` (completes), `acessocatolico_app`, and `acessocatolico_admin` healthy.

## Original line

> Rodar a validação final local: `migrate` aplica o schema e os dois apps buildam e sobem. ✔ `docker compose up --build` sobe `migrate` (completa), `acessocatolico_app` e `acessocatolico_admin` saudáveis.

## Summary

Validação local completa da stack: `docker compose config` validado com sucesso, `docker compose build` construiu todas as imagens (`acessocatolico_migrate`, `acessocatolico_app` e `acessocatolico_admin`), e teste end-to-end com Postgres efêmero em `caddy_net` confirmou que o runner `migrate` aplica migrações e finaliza com exit code 0, e os containers `app` e `admin` sobem e respondem com sucesso (HTTP 200/302). Containers de teste limpos.

