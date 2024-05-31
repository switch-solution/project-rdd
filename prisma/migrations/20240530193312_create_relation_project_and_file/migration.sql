-- CreateTable
CREATE TABLE "Project_File" (
    "projectId" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "fileFormat" TEXT NOT NULL,
    "separator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_File_pkey" PRIMARY KEY ("projectId","fileLabel","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_Column" (
    "projectId" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "defaultValue" TEXT,
    "order" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Column_pkey" PRIMARY KEY ("projectId","softwareLabel","fileLabel","columnLabel")
);

-- CreateTable
CREATE TABLE "Project_Row" (
    "projectId" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Project_Row_pkey" PRIMARY KEY ("projectId","softwareLabel","fileLabel","columnLabel","order")
);

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_fileLabel_softwareLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel") REFERENCES "File"("label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Row" ADD CONSTRAINT "Project_Row_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Row" ADD CONSTRAINT "Project_Row_fileLabel_softwareLabel_columnLabel_order_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel", "order") REFERENCES "Row"("fileLabel", "softwareLabel", "columnLabel", "order") ON DELETE CASCADE ON UPDATE CASCADE;
