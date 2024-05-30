/*
  Warnings:

  - Added the required column `oldId` to the `Transco_Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transco_Person" ADD COLUMN     "oldId" TEXT NOT NULL;
