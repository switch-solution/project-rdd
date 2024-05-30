/*
  Warnings:

  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estbalishementId` on the `Person` table. All the data in the column will be lost.
  - Added the required column `dsnId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishmentId` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_estbalishementId_fkey";

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "estbalishementId",
ADD COLUMN     "dsnId" TEXT NOT NULL,
ADD COLUMN     "establishmentId" TEXT NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("dsnId", "establishmentId", "numSS");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
