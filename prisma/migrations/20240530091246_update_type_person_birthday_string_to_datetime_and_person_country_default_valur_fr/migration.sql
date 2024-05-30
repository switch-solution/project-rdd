/*
  Warnings:

  - Changed the type of `birthday` on the `Person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'FR';
