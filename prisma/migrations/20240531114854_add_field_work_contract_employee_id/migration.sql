/*
  Warnings:

  - Added the required column `employeeId` to the `Transco_WorkContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transco_WorkContract" ADD COLUMN     "employeeId" TEXT NOT NULL;
