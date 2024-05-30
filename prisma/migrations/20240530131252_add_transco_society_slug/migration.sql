/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Transco_Society` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Transco_Society` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Transco_Society" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Society_slug_key" ON "Transco_Society"("slug");
