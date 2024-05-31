/*
  Warnings:

  - A unique constraint covering the columns `[projectId,siren,newId]` on the table `Transco_WorkContract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,numSS,contractId]` on the table `Transco_WorkContract` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Transco_WorkContract_projectId_newId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_projectId_siren_newId_key" ON "Transco_WorkContract"("projectId", "siren", "newId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_projectId_numSS_contractId_key" ON "Transco_WorkContract"("projectId", "numSS", "contractId");
