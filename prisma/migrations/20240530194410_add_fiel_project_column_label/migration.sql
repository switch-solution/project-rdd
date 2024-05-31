/*
  Warnings:

  - Added the required column `label` to the `Project_Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Column" ADD COLUMN     "label" TEXT NOT NULL;
