-- DropForeignKey
ALTER TABLE "Extraction_Data" DROP CONSTRAINT "Extraction_Data_extractionLabel_projectId_fkey";

-- CreateTable
CREATE TABLE "Extraction_File" (
    "extractionLabel" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Extraction_File_pkey" PRIMARY KEY ("extractionLabel","fileLabel","projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_File_slug_key" ON "Extraction_File"("slug");

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_extractionLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "projectId") REFERENCES "Extraction"("label", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_extractionLabel_fileLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "fileLabel", "projectId") REFERENCES "Extraction_File"("extractionLabel", "fileLabel", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;
