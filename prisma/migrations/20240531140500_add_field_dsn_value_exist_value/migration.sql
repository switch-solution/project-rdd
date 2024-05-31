/*
  Warnings:

  - Added the required column `value` to the `Dsn_Value_Exist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dsn_Value_Exist" ADD COLUMN     "value" TEXT NOT NULL;
