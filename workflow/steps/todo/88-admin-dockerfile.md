# Create the admin Dockerfile

**Status:** todo

## What to do

Create `admin/Dockerfile` (multi-stage, workspace-aware, building from the repo root) mirroring the portal's Dockerfile: copy root `package.json` + lockfile + the `db/` package + the admin app, run `npm ci`, `prisma generate`, and build. The container should serve the admin on port 3000.

## Done criteria

The admin image build completes and the container serves the app on port 3000.

## Original line

> Criar o `admin/Dockerfile` (multi-stage, workspace-aware, build a partir da raiz) espelhando o do portal. ✔ Build da imagem do admin conclui e o container serve o app na porta 3000.
