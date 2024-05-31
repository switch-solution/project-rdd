/*
  Warnings:

  - Added the required column `projectFileSlug` to the `Extraction_File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extraction_File" ADD COLUMN     "projectFileSlug" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_projectFileSlug_fkey" FOREIGN KEY ("projectFileSlug") REFERENCES "Project_File"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
