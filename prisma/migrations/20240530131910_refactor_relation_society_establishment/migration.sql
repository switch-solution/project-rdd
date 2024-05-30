/*
  Warnings:

  - The primary key for the `Establishment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Establishment` table. All the data in the column will be lost.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `establishmentId` on the `Person` table. All the data in the column will be lost.
  - The primary key for the `Society` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Society` table. All the data in the column will be lost.
  - Added the required column `dsnId` to the `Establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nic` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siren` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Establishment" DROP CONSTRAINT "Establishment_societyId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "WorkContract" DROP CONSTRAINT "WorkContract_dsnId_establishmentId_numSS_fkey";

-- AlterTable
ALTER TABLE "Establishment" DROP CONSTRAINT "Establishment_pkey",
DROP COLUMN "id",
ADD COLUMN     "dsnId" TEXT NOT NULL,
ADD CONSTRAINT "Establishment_pkey" PRIMARY KEY ("dsnId", "siren", "nic");

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "establishmentId",
ADD COLUMN     "nic" TEXT NOT NULL,
ADD COLUMN     "siren" TEXT NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("dsnId", "numSS");

-- AlterTable
ALTER TABLE "Society" DROP CONSTRAINT "Society_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Society_pkey" PRIMARY KEY ("dsnId", "siren");

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_dsnId_siren_fkey" FOREIGN KEY ("dsnId", "siren") REFERENCES "Society"("dsnId", "siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_dsnId_siren_nic_fkey" FOREIGN KEY ("dsnId", "siren", "nic") REFERENCES "Establishment"("dsnId", "siren", "nic") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_dsnId_numSS_fkey" FOREIGN KEY ("dsnId", "numSS") REFERENCES "Person"("dsnId", "numSS") ON DELETE CASCADE ON UPDATE CASCADE;
