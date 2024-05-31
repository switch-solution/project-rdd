/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Project_Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Project_File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Project_Row` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Project_Column` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `Project_File` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `slug` was added to the `Project_Row` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Project_Column" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project_File" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project_Row" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_Column_slug_key" ON "Project_Column"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_File_slug_key" ON "Project_File"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Row_slug_key" ON "Project_Row"("slug");
