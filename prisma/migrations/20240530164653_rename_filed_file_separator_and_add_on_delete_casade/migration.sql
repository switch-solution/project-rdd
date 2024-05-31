/*
  Warnings:

  - You are about to drop the column `sepatator` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_fileLabel_softwareLabel_fkey";

-- DropForeignKey
ALTER TABLE "Row" DROP CONSTRAINT "Row_fileLabel_softwareLabel_columnLabel_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "sepatator",
ADD COLUMN     "separator" TEXT NOT NULL DEFAULT ';';

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_fileLabel_softwareLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel") REFERENCES "File"("label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;
