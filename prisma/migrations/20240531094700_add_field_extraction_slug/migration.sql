/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Extraction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Extraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extraction" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_slug_key" ON "Extraction"("slug");
