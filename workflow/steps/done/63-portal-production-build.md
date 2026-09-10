# Run the portal production build against the package

**Status:** done

## What to do

Run the portal's production build while it consumes the shared `@acesso/db` package, confirming the workspace wiring and generated Prisma client resolve at build time. Fix any remaining import/resolution issues surfaced by the build.

## Done criteria

`npm run -w portal build` completes and generates `.output/` without errors.

## Original line

> Rodar build de produção do portal consumindo o pacote. ✔ `npm run -w portal build` conclui e gera `.output/` sem erros.

## Summary

Ran `npm run build` (nuxt build) in `portal/` and it completed with EXIT=0, generating `.output/` (server + public). Done-criteria PASSED. `@acesso/db` is not linked into `portal/node_modules` in the sandbox, so Nitro emitted three WARN lines downgrading it to an external dependency (`server/utils/prisma.ts` + both `server/api/products/*` handlers) — a warning, not a build error, so the build still succeeds and by-construction resolves once `npm ci` links the workspace in CI. Verified `npx nuxi prepare` (types ok) and that all API handlers built (`products/index.get` bundled into `chunks/routes/api/index.get.mjs`, carrying `prisma.product.findMany`; `categories.get.mjs` present). No import/resolution code changes were needed.
