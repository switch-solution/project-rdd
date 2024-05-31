/*
  Warnings:

  - Added the required column `nic` to the `Transco_WorkContract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siren` to the `Transco_WorkContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transco_WorkContract" ADD COLUMN     "nic" TEXT NOT NULL,
ADD COLUMN     "siren" TEXT NOT NULL;
