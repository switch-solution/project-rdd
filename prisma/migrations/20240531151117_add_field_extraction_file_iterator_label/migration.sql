/*
  Warnings:

  - Added the required column `iteratorLabel` to the `Extraction_File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extraction_File" ADD COLUMN     "iteratorLabel" TEXT NOT NULL;
