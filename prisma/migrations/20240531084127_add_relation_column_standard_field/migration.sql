-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "standardFieldLabel" TEXT;

-- AlterTable
ALTER TABLE "Project_Column" ADD COLUMN     "standardFieldLabel" TEXT;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_standardFieldLabel_fkey" FOREIGN KEY ("standardFieldLabel") REFERENCES "Standard_Field"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_standardFieldLabel_fkey" FOREIGN KEY ("standardFieldLabel") REFERENCES "Standard_Field"("label") ON DELETE SET NULL ON UPDATE CASCADE;
