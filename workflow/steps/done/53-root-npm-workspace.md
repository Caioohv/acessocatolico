# Convert repo root into an npm workspace

**Status:** done

## What to do

Create a root `package.json` declaring `"private": true` and `"workspaces": ["db", "portal", "admin"]`, turning the repo root into an npm workspace that will own the single lockfile. The `db` and `admin` directories do not exist yet — that's expected; the workspace declaration comes first. Keep the file minimal (name, private, workspaces, maybe shared scripts); do not move `portal/` internals.

## Done criteria

`npm ls -w db` recognizes the workspace (even before the package exists, `npm run` resolves the root).

## Original line

> Converter a raiz do repo em npm workspace: criar `package.json` na raiz com `"workspaces": ["db", "portal", "admin"]` e `"private": true`. ✔ `npm ls -w db` reconhece o workspace (mesmo antes do pacote existir, `npm run` resolve a raiz).

## Summary

Created minimal root `package.json` (`name: acessocatolico`, `private: true`, `workspaces: ["db","portal","admin"]`, no scripts) converting the repo root into an npm workspace that will own the single lockfile. `portal/` left untouched; `db/` and `admin/` don't exist yet (expected). Verified `npm run` resolves the root and `npm ls -w portal` resolves against the root workspace (`db`/`admin` error only because their dirs don't exist yet). Noted in project-memory that `portal/package-lock.json` must be removed once a later step runs the root install.

Summary: chore: convert repo root into npm workspace (root package.json with db/portal/admin)
