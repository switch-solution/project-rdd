-- CreateTable
CREATE TABLE "Extraction" (
    "label" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Extraction_pkey" PRIMARY KEY ("label","projectId")
);

-- AddForeignKey
ALTER TABLE "Extraction" ADD CONSTRAINT "Extraction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
