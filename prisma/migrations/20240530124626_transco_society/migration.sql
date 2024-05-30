-- CreateTable
CREATE TABLE "Transco_Society" (
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "newId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Transco_Society_pkey" PRIMARY KEY ("projectId","siren")
);

-- AddForeignKey
ALTER TABLE "Transco_Society" ADD CONSTRAINT "Transco_Society_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
