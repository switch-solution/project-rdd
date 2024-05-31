/*
  Warnings:

  - Added the required column `type` to the `Project_Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project_Column" ADD COLUMN     "type" TEXT NOT NULL;
