# Run the final local validation

**Status:** todo

## What to do

Run the final local validation of the whole stack: the `migrate` service applies the schema and both apps build and come up. This is the end-to-end check that the workspace, shared package, migrations runner, and both containers work together.

## Done criteria

`docker compose up --build` brings up `migrate` (completes), `acessocatolico_app`, and `acessocatolico_admin` healthy.

## Original line

> Rodar a validação final local: `migrate` aplica o schema e os dois apps buildam e sobem. ✔ `docker compose up --build` sobe `migrate` (completa), `acessocatolico_app` e `acessocatolico_admin` saudáveis.
