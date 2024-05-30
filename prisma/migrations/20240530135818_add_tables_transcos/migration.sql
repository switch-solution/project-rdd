-- CreateTable
CREATE TABLE "Transco_Establishment" (
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "newId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Establishment_pkey" PRIMARY KEY ("projectId","siren","nic")
);

-- CreateTable
CREATE TABLE "Transco_Person" (
    "projectId" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "newId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Person_pkey" PRIMARY KEY ("projectId","numSS")
);

-- CreateTable
CREATE TABLE "Transco_WorkContract" (
    "projectId" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "newId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_WorkContract_pkey" PRIMARY KEY ("projectId","numSS","contractId")
);

-- CreateTable
CREATE TABLE "Transco_Job" (
    "projectId" TEXT NOT NULL,
    "employementLabel" TEXT NOT NULL,
    "newId" TEXT,
    "newLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Job_pkey" PRIMARY KEY ("projectId","employementLabel")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Establishment_slug_key" ON "Transco_Establishment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Person_slug_key" ON "Transco_Person"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_slug_key" ON "Transco_WorkContract"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Job_slug_key" ON "Transco_Job"("slug");

-- AddForeignKey
ALTER TABLE "Transco_Establishment" ADD CONSTRAINT "Transco_Establishment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Person" ADD CONSTRAINT "Transco_Person_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_WorkContract" ADD CONSTRAINT "Transco_WorkContract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Job" ADD CONSTRAINT "Transco_Job_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
