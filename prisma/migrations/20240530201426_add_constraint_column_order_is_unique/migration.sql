/*
  Warnings:

  - A unique constraint covering the columns `[fileLabel,softwareLabel,order]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Column" ALTER COLUMN "order" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Column_fileLabel_softwareLabel_order_key" ON "Column"("fileLabel", "softwareLabel", "order");
