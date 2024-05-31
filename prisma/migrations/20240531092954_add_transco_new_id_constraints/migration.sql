/*
  Warnings:

  - A unique constraint covering the columns `[projectId,newId]` on the table `Transco_Establishment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,newId]` on the table `Transco_Person` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,newId]` on the table `Transco_Society` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,newId]` on the table `Transco_WorkContract` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transco_Establishment_projectId_newId_key" ON "Transco_Establishment"("projectId", "newId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Person_projectId_newId_key" ON "Transco_Person"("projectId", "newId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Society_projectId_newId_key" ON "Transco_Society"("projectId", "newId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_projectId_newId_key" ON "Transco_WorkContract"("projectId", "newId");
