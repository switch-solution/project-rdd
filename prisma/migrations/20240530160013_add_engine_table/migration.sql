-- CreateTable
CREATE TABLE "File" (
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "fileFormat" TEXT NOT NULL DEFAULT 'csv',
    "sepatator" TEXT NOT NULL DEFAULT ';',
    "maxRows" INTEGER NOT NULL DEFAULT 99999,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "File_pkey" PRIMARY KEY ("label","softwareLabel")
);

-- CreateTable
CREATE TABLE "Column" (
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "type" TEXT NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "format" TEXT,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("fileLabel","softwareLabel","label")
);

-- CreateTable
CREATE TABLE "Row" (
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "value" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Row_pkey" PRIMARY KEY ("softwareLabel","fileLabel","columnLabel","order")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_slug_key" ON "File"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Column_slug_key" ON "Column"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Row_slug_key" ON "Row"("slug");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_fileLabel_softwareLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel") REFERENCES "File"("label", "softwareLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE RESTRICT ON UPDATE CASCADE;
