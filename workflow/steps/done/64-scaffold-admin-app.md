# Scaffold the `admin/` app

**Status:** done

## What to do

Initialize the admin app with `npx nuxi init admin`, remove the example boilerplate (sample pages/README), and integrate it into the workspace (`name: @acesso/admin`, `private: true`). Mirror the portal's Nuxt 4 setup. This is the separate private app that will hold auth, product CRUD, and metrics dashboards.

## Done criteria

`npm run -w admin dev` brings up the default app in dev mode.

## Original line

> Inicializar o app com `npx nuxi init admin`, limpar o boilerplate (páginas/README de exemplo) e integrá-lo ao workspace (`name: @acesso/admin`, `private`). ✔ `npm run -w admin dev` sobe o app padrão em modo dev.

## Summary

`nuxi init` está bloqueado no sandbox (busca template pela rede), então o app foi scaffoldado à mão espelhando `portal/`: criados `admin/package.json` (`@acesso/admin`, private, mesmas versões/scripts do portal, módulo `@nuxt/eslint`), `nuxt.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `.env.example`, `README.md` e o layout Nuxt 4 `app/app.vue` + `app/pages/index.vue` (placeholder PT-BR). Workspace reconhece o membro (`npm run -w admin` lista scripts; `npm ls -w admin` resolve sem erro). Done-criteria (`npm run -w admin dev`) DIFERIDO à CI — sem `npm install` no sandbox o `nuxt` não está instalado. `@acesso/db` NÃO adicionado ainda (entra no step de consumo de banco).
