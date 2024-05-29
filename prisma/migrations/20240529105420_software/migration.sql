/*
  Warnings:

  - Added the required column `softwareLabel` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "softwareLabel" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Software" (
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_pkey" PRIMARY KEY ("label")
);

-- CreateIndex
CREATE UNIQUE INDEX "Software_slug_key" ON "Software"("slug");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
