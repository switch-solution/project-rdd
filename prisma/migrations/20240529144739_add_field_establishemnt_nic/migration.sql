/*
  Warnings:

  - Added the required column `nic` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Establishment" ADD COLUMN     "nic" TEXT NOT NULL;
