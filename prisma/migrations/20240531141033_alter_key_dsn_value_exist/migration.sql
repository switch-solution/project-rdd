/*
  Warnings:

  - The primary key for the `Dsn_Value_Exist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Dsn_Value_Exist" DROP CONSTRAINT "Dsn_Value_Exist_pkey",
ADD CONSTRAINT "Dsn_Value_Exist_pkey" PRIMARY KEY ("dsnId", "projectId");
