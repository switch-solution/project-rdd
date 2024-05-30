/*
  Warnings:

  - You are about to drop the `Establishement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Establishement" DROP CONSTRAINT "Establishement_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Establishement" DROP CONSTRAINT "Establishement_societyId_fkey";

-- DropTable
DROP TABLE "Establishement";

-- CreateTable
CREATE TABLE "Establishment" (
    "id" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "legalStatus" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE CASCADE ON UPDATE CASCADE;
