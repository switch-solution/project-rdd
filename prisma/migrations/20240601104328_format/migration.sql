-- AlterTable
ALTER TABLE "Project_Column" ADD COLUMN     "format" TEXT;

-- CreateTable
CREATE TABLE "Format" (
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Format_pkey" PRIMARY KEY ("type","format")
);

-- AddForeignKey
ALTER TABLE "Standard_Field" ADD CONSTRAINT "Standard_Field_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;
