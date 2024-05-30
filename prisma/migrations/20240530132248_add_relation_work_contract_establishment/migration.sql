/*
  Warnings:

  - You are about to drop the column `establishmentId` on the `WorkContract` table. All the data in the column will be lost.
  - Added the required column `nic` to the `WorkContract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siren` to the `WorkContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkContract" DROP COLUMN "establishmentId",
ADD COLUMN     "nic" TEXT NOT NULL,
ADD COLUMN     "siren" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_dsnId_siren_nic_fkey" FOREIGN KEY ("dsnId", "siren", "nic") REFERENCES "Establishment"("dsnId", "siren", "nic") ON DELETE CASCADE ON UPDATE CASCADE;
