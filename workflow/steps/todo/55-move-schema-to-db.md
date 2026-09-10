# Move the Prisma schema into `db/`

**Status:** todo

## What to do

Move `portal/prisma/schema.prisma` to `db/prisma/schema.prisma`, keeping the `Product` model intact and pointing `generator`/`datasource` at the package (datasource stays `provider = "postgresql"` with no `url`, per Prisma 7). Then remove the now-empty `portal/prisma/` directory. The schema becomes the single source of truth in the shared package.

## Done criteria

`npx prisma validate` (run in `db/`) validates the schema with the `Product` model.

## Original line

> Mover `portal/prisma/schema.prisma` para `db/prisma/schema.prisma` (modelo `Product` intacto, `generator`+`datasource` apontando pro pacote) e remover `portal/prisma/`. ✔ `npx prisma validate` (no `db/`) valida o schema com o modelo `Product`.
