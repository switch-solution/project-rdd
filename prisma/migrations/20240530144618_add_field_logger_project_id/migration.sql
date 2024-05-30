-- AlterTable
ALTER TABLE "Logger" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
