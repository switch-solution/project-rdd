-- CreateTable
CREATE TABLE "Extraction_Data" (
    "projectId" TEXT NOT NULL,
    "extractionLabel" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "columnValue" TEXT NOT NULL,
    "rowOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Extraction_Data_pkey" PRIMARY KEY ("projectId","extractionLabel","fileLabel","columnLabel","rowOrder")
);

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_Data_slug_key" ON "Extraction_Data"("slug");

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_extractionLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "projectId") REFERENCES "Extraction"("label", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE RESTRICT ON UPDATE CASCADE;
