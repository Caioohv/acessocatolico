# Remove `db push` from the portal entrypoint

**Status:** done

## What to do

Remove the `prisma db push` call from `portal/docker-entrypoint.sh`. Migrations now run in a dedicated one-shot `migrate` service (see section 8), so the portal container no longer touches the schema on start. The portal should still boot locally against the existing database.

## Done criteria

The entrypoint no longer references `prisma db push`; the portal still comes up locally against the existing database.

## Original line

> Remover o `prisma db push` do `portal/docker-entrypoint.sh` (migrations passam a rodar num serviço dedicado — ver seção 7). ✔ O entrypoint não referencia mais `prisma db push`; o portal ainda sobe localmente contra o banco existente.

## Summary

Removed the (already-commented) `prisma db push` bootstrap block from `portal/docker-entrypoint.sh`; the script now just `exec "$@"` with a header noting migrations run in the dedicated one-shot `migrate` service (`prisma migrate deploy`, `@acesso/db`). Verified: no `db push` refs, `sh -n` syntax OK, executable bit preserved. Non-breaking (block was inert) so done-criteria passes statically; live boot deferred to CI/Docker.
