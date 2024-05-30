/*
  Warnings:

  - You are about to drop the column `employementLabel` on the `WorkContract` table. All the data in the column will be lost.
  - Added the required column `employmentLabel` to the `WorkContract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkContract" DROP COLUMN "employementLabel",
ADD COLUMN     "employmentLabel" TEXT NOT NULL;
