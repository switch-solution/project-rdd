-- CreateTable
CREATE TABLE "Person" (
    "estbalishementId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "societyId" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "placeOfBith" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "codeZip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "codeZipBith" TEXT NOT NULL,
    "countryBirth" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "email" TEXT,
    "employeeId" TEXT NOT NULL,
    "graduate" TEXT,
    "studies" TEXT,
    "date" TEXT,
    "ntt" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("estbalishementId","numSS")
);

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_estbalishementId_fkey" FOREIGN KEY ("estbalishementId") REFERENCES "Establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
