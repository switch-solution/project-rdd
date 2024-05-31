/*
  Warnings:

  - A unique constraint covering the columns `[projectId,softwareLabel,fileLabel,order]` on the table `Project_Column` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `iteratorLabel` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iteratorLabel` to the `Project_File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "history" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "iteratorLabel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project_File" ADD COLUMN     "history" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "iteratorLabel" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Iterator" (
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Iterator_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Iterator_Standard_Field" (
    "iteratorLabel" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Iterator_Standard_Field_pkey" PRIMARY KEY ("iteratorLabel","fieldLabel")
);

-- CreateTable
CREATE TABLE "Standard_Field" (
    "table" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "format" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Standard_Field_pkey" PRIMARY KEY ("label")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_Column_projectId_softwareLabel_fileLabel_order_key" ON "Project_Column"("projectId", "softwareLabel", "fileLabel", "order");

-- AddForeignKey
ALTER TABLE "Iterator_Standard_Field" ADD CONSTRAINT "Iterator_Standard_Field_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Iterator_Standard_Field" ADD CONSTRAINT "Iterator_Standard_Field_fieldLabel_fkey" FOREIGN KEY ("fieldLabel") REFERENCES "Standard_Field"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
