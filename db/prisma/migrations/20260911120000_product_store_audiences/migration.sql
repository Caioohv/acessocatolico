-- Lojinha: fontes de exibição (pública / organizacional).
-- Colunas com DEFAULT true: produtos existentes passam a aparecer nas duas lojas.
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN "showPublic" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "produtos" ADD COLUMN "showOrg" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "produtos_active_showPublic_idx" ON "produtos"("active", "showPublic");

-- CreateIndex
CREATE INDEX "produtos_active_showOrg_idx" ON "produtos"("active", "showOrg");
