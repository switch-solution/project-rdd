-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "User_Project" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "User_Project_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "softwareLabel" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Software" (
    "label" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Software_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Iterator" (
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Iterator_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Iterator_Standard_Field" (
    "iteratorLabel" TEXT NOT NULL,
    "typeValue" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Iterator_Standard_Field_pkey" PRIMARY KEY ("iteratorLabel","fieldLabel")
);

-- CreateTable
CREATE TABLE "Standard_Field" (
    "typeValue" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "format" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Standard_Field_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "File" (
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "description" TEXT,
    "fileFormat" TEXT NOT NULL DEFAULT 'csv',
    "separator" TEXT NOT NULL DEFAULT ';',
    "maxRows" INTEGER NOT NULL DEFAULT 99999,
    "slug" TEXT NOT NULL,
    "iteratorLabel" TEXT NOT NULL,
    "history" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "File_pkey" PRIMARY KEY ("label","softwareLabel")
);

-- CreateTable
CREATE TABLE "Project_File" (
    "projectId" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "fileFormat" TEXT NOT NULL,
    "separator" TEXT NOT NULL,
    "iteratorLabel" TEXT NOT NULL,
    "history" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_File_pkey" PRIMARY KEY ("projectId","fileLabel","softwareLabel")
);

-- CreateTable
CREATE TABLE "Column_Transco_Value" (
    "sourceValue" TEXT NOT NULL,
    "targetValue" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',
    "slug" TEXT NOT NULL,

    CONSTRAINT "Column_Transco_Value_pkey" PRIMARY KEY ("softwareLabel","fileLabel","columnLabel","sourceValue")
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
    "standardFieldLabel" TEXT,
    "order" INTEGER NOT NULL,
    "typeValue" TEXT NOT NULL DEFAULT 'defaultValue',
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "format" TEXT,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" TEXT,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("fileLabel","softwareLabel","label")
);

-- CreateTable
CREATE TABLE "Project_Column" (
    "projectId" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "typeValue" TEXT NOT NULL DEFAULT 'defaultValue',
    "type" TEXT NOT NULL,
    "format" TEXT,
    "standardFieldLabel" TEXT,
    "min" INTEGER,
    "max" INTEGER,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "defaultValue" TEXT,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_Column_pkey" PRIMARY KEY ("projectId","softwareLabel","fileLabel","columnLabel")
);

-- CreateTable
CREATE TABLE "Project_Column_Transco_Value" (
    "projectId" TEXT NOT NULL,
    "sourceValue" TEXT NOT NULL,
    "targetValue" TEXT NOT NULL,
    "softwareLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_Column_Transco_Value_pkey" PRIMARY KEY ("projectId","fileLabel","columnLabel","sourceValue")
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
    "slug" TEXT NOT NULL,

    CONSTRAINT "Project_Row_pkey" PRIMARY KEY ("projectId","softwareLabel","fileLabel","columnLabel","order")
);

-- CreateTable
CREATE TABLE "Prisma_Seed" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "previousLabel" TEXT NOT NULL,
    "error" TEXT,

    CONSTRAINT "Prisma_Seed_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dsn" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "dsnVersion" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "softwareName" TEXT NOT NULL,
    "softwareVersion" TEXT NOT NULL,
    "totalRows" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Dsn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Society" (
    "dsnId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "apen" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("dsnId","siren")
);

-- CreateTable
CREATE TABLE "Transco_Society" (
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "transcoSocietyNewId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Society_pkey" PRIMARY KEY ("projectId","siren")
);

-- CreateTable
CREATE TABLE "Establishment" (
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "ape" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "legalStatus" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,

    CONSTRAINT "Establishment_pkey" PRIMARY KEY ("dsnId","siren","nic")
);

-- CreateTable
CREATE TABLE "Transco_Establishment" (
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "transcoEstablishmentNewId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Establishment_pkey" PRIMARY KEY ("projectId","siren","nic")
);

-- CreateTable
CREATE TABLE "Person" (
    "projectId" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
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
    "country" TEXT NOT NULL DEFAULT 'FR',
    "codeZipBith" TEXT NOT NULL,
    "countryBirth" TEXT NOT NULL,
    "address2" TEXT,
    "address3" TEXT,
    "email" TEXT,
    "employeeId" TEXT NOT NULL DEFAULT 'Pas de matricule',
    "graduate" TEXT,
    "studies" TEXT,
    "date" TEXT,
    "ntt" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("dsnId","numSS")
);

-- CreateTable
CREATE TABLE "Person_Children" (
    "numSS" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "sex" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Person_Children_pkey" PRIMARY KEY ("projectId","numSS","order")
);

-- CreateTable
CREATE TABLE "Transco_Domain_Email" (
    "projectId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Domain_Email_pkey" PRIMARY KEY ("projectId","domain")
);

-- CreateTable
CREATE TABLE "Person_Analytic" (
    "projectId" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "axis" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Person_Analytic_pkey" PRIMARY KEY ("projectId","numSS","axis","section")
);

-- CreateTable
CREATE TABLE "Mutual" (
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "organisme" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "delegate" TEXT,
    "covererd" TEXT,
    "techId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Mutual_pkey" PRIMARY KEY ("projectId","dsnId","siren","contractId")
);

-- CreateTable
CREATE TABLE "Person_Mutual" (
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "organisme" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "delegate" TEXT,
    "techId" TEXT,
    "option" TEXT,
    "pop" TEXT,
    "children" TEXT,
    "assign" TEXT,
    "numberAssign" TEXT,
    "otheAssign" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Person_Mutual_pkey" PRIMARY KEY ("projectId","dsnId","siren","numSS","contractId")
);

-- CreateTable
CREATE TABLE "Person_Bank" (
    "projectId" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "iban1" TEXT,
    "bic1" TEXT,
    "bank1" TEXT,
    "iban2" TEXT,
    "bic2" TEXT,
    "bank2" TEXT,
    "payrool" BOOLEAN NOT NULL,
    "advance" BOOLEAN NOT NULL,
    "expense" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Person_Bank_pkey" PRIMARY KEY ("projectId","numSS","siren")
);

-- CreateTable
CREATE TABLE "Transco_Person" (
    "projectId" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "oldId" TEXT NOT NULL,
    "transcoEmployeeNewId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_Person_pkey" PRIMARY KEY ("projectId","numSS")
);

-- CreateTable
CREATE TABLE "WorkContract" (
    "numSS" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "retirement" TEXT NOT NULL,
    "pcs" TEXT NOT NULL,
    "pcsBis" TEXT,
    "mal" TEXT NOT NULL,
    "employmentLabel" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "publicDispPolitic" TEXT NOT NULL,
    "contractEndDate" TEXT NOT NULL,
    "DNACodeUnitTime" TEXT NOT NULL,
    "DSNWorkQuotaEstablishment" TEXT NOT NULL,
    "DSNWorkQuotaWorkContract" TEXT NOT NULL,
    "workTime" TEXT NOT NULL,
    "ss" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "estabWorkPlace" TEXT NOT NULL,
    "vieillesse" TEXT NOT NULL,
    "pattern" TEXT,
    "vacation" TEXT,
    "rateProfessionalFess" TEXT,
    "foreigner" TEXT NOT NULL,
    "exclusionDsn" TEXT,
    "statusEmployment" TEXT,
    "unemployment" TEXT,
    "idPublicEmployer" TEXT,
    "methodUnemployment" TEXT,
    "joiningDate" TEXT,
    "denunciationDate" TEXT,
    "dateManagementAgreement" TEXT,
    "idAgreement" TEXT,
    "healthRiskDelegate" TEXT,
    "multipleJobCode" TEXT NOT NULL,
    "multipleEmployerCode" TEXT NOT NULL,
    "workAccidentRisk" TEXT NOT NULL,
    "idWorkAccidentRisk" TEXT NOT NULL,
    "positionCollectiveAgreement" TEXT,
    "apecita" TEXT,
    "rateAt" TEXT NOT NULL,
    "contributingFullTime" TEXT,
    "tip" TEXT,
    "useEstablishmentId" TEXT,
    "livePerfomances" TEXT,
    "licences" TEXT,
    "showId" TEXT,
    "showrunner" TEXT,
    "fpPcsfpPcs" TEXT,
    "typePosition" TEXT,
    "fpQuotite" TEXT,
    "partTimeWork" TEXT,
    "serviceCode" TEXT,
    "fpIndice" TEXT,
    "fpIndiceMaj" TEXT,
    "NBI" TEXT,
    "indiceOriginal" TEXT,
    "article15" TEXT,
    "oldEstablishmentId" TEXT,
    "oldIndice" TEXT,
    "SPP" TEXT,
    "contractualHours" TEXT,
    "secondment" TEXT,
    "browsing" TEXT,
    "activityDutyRate" TEXT,
    "payLevel" TEXT,
    "echelon" TEXT,
    "coefficient" TEXT,
    "boeth" TEXT,
    "addPublicPolicy" TEXT,
    "arrangement" TEXT,
    "finaly" TEXT,
    "navy" TEXT,
    "navyCode" TEXT,
    "activityRate" TEXT,
    "grade" TEXT,
    "cti" TEXT,
    "finess" TEXT,
    "dateStart" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "WorkContract_pkey" PRIMARY KEY ("dsnId","numSS","contractId")
);

-- CreateTable
CREATE TABLE "Transco_WorkContract" (
    "projectId" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "numSS" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "transcoContractNewId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Transco_WorkContract_pkey" PRIMARY KEY ("projectId","numSS","contractId")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "employementLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Idcc" (
    "id" TEXT NOT NULL,
    "idcc" TEXT NOT NULL,
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Idcc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extraction" (
    "label" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Extraction_pkey" PRIMARY KEY ("label","projectId")
);

-- CreateTable
CREATE TABLE "Extraction_Stat" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalRows" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "extractionLabel" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Extraction_Stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Extraction_File" (
    "extractionLabel" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'En attente',
    "iteratorLabel" TEXT NOT NULL,
    "projectFileSlug" TEXT NOT NULL,

    CONSTRAINT "Extraction_File_pkey" PRIMARY KEY ("extractionLabel","fileLabel","projectId")
);

-- CreateTable
CREATE TABLE "Extraction_Data" (
    "projectId" TEXT NOT NULL,
    "extractionLabel" TEXT NOT NULL,
    "fileLabel" TEXT NOT NULL,
    "columnLabel" TEXT NOT NULL,
    "columnValue" TEXT NOT NULL,
    "rowOrder" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "softwareLabel" TEXT,

    CONSTRAINT "Extraction_Data_pkey" PRIMARY KEY ("projectId","extractionLabel","fileLabel","columnLabel","rowOrder")
);

-- CreateTable
CREATE TABLE "Dsn_Value_Exist" (
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "exist" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Dsn_Value_Exist_pkey" PRIMARY KEY ("dsnId","projectId","value")
);

-- CreateTable
CREATE TABLE "Format" (
    "type" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Format_pkey" PRIMARY KEY ("type","format")
);

-- CreateTable
CREATE TABLE "Template" (
    "label" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Template_pkey" PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "Template_Column" (
    "templateLabel" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "type" TEXT,
    "format" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL DEFAULT 'system'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Software_slug_key" ON "Software"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "File_slug_key" ON "File"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_File_slug_key" ON "Project_File"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Column_Transco_Value_slug_key" ON "Column_Transco_Value"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Column_slug_key" ON "Column"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Column_fileLabel_softwareLabel_order_key" ON "Column"("fileLabel", "softwareLabel", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Column_slug_key" ON "Project_Column"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Column_projectId_softwareLabel_fileLabel_order_key" ON "Project_Column"("projectId", "softwareLabel", "fileLabel", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Column_Transco_Value_slug_key" ON "Project_Column_Transco_Value"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Row_slug_key" ON "Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_Row_slug_key" ON "Project_Row"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Society_slug_key" ON "Transco_Society"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Society_projectId_transcoSocietyNewId_key" ON "Transco_Society"("projectId", "transcoSocietyNewId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Establishment_slug_key" ON "Transco_Establishment"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Establishment_projectId_transcoEstablishmentNewId_key" ON "Transco_Establishment"("projectId", "transcoEstablishmentNewId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Domain_Email_slug_key" ON "Transco_Domain_Email"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Person_Analytic_projectId_numSS_axis_order_key" ON "Person_Analytic"("projectId", "numSS", "axis", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Person_slug_key" ON "Transco_Person"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Person_projectId_transcoEmployeeNewId_key" ON "Transco_Person"("projectId", "transcoEmployeeNewId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_slug_key" ON "Transco_WorkContract"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_projectId_siren_transcoContractNewId_key" ON "Transco_WorkContract"("projectId", "siren", "transcoContractNewId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_WorkContract_projectId_numSS_contractId_key" ON "Transco_WorkContract"("projectId", "numSS", "contractId");

-- CreateIndex
CREATE UNIQUE INDEX "Transco_Job_slug_key" ON "Transco_Job"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_slug_key" ON "Extraction"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_File_slug_key" ON "Extraction_File"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Extraction_Data_slug_key" ON "Extraction_Data"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Template_slug_key" ON "Template"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Template_Column_slug_key" ON "Template_Column"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Template_Column_templateLabel_order_key" ON "Template_Column"("templateLabel", "order");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Iterator_Standard_Field" ADD CONSTRAINT "Iterator_Standard_Field_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Iterator_Standard_Field" ADD CONSTRAINT "Iterator_Standard_Field_fieldLabel_fkey" FOREIGN KEY ("fieldLabel") REFERENCES "Standard_Field"("label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard_Field" ADD CONSTRAINT "Standard_Field_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_iteratorLabel_fkey" FOREIGN KEY ("iteratorLabel") REFERENCES "Iterator"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_File" ADD CONSTRAINT "Project_File_fileLabel_softwareLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel") REFERENCES "File"("label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column_Transco_Value" ADD CONSTRAINT "Column_Transco_Value_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_fileLabel_softwareLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel") REFERENCES "File"("label", "softwareLabel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_standardFieldLabel_fkey" FOREIGN KEY ("standardFieldLabel") REFERENCES "Standard_Field"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_standardFieldLabel_fkey" FOREIGN KEY ("standardFieldLabel") REFERENCES "Standard_Field"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column" ADD CONSTRAINT "Project_Column_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Column_Transco_Value" ADD CONSTRAINT "Project_Column_Transco_Value_projectId_softwareLabel_fileL_fkey" FOREIGN KEY ("projectId", "softwareLabel", "fileLabel", "columnLabel") REFERENCES "Project_Column"("projectId", "softwareLabel", "fileLabel", "columnLabel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Row" ADD CONSTRAINT "Row_fileLabel_softwareLabel_columnLabel_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel") REFERENCES "Column"("fileLabel", "softwareLabel", "label") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Row" ADD CONSTRAINT "Project_Row_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_Row" ADD CONSTRAINT "Project_Row_fileLabel_softwareLabel_columnLabel_order_fkey" FOREIGN KEY ("fileLabel", "softwareLabel", "columnLabel", "order") REFERENCES "Row"("fileLabel", "softwareLabel", "columnLabel", "order") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logger" ADD CONSTRAINT "Logger_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn" ADD CONSTRAINT "Dsn_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Society" ADD CONSTRAINT "Society_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Society" ADD CONSTRAINT "Society_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Society" ADD CONSTRAINT "Transco_Society_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_dsnId_siren_fkey" FOREIGN KEY ("dsnId", "siren") REFERENCES "Society"("dsnId", "siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Establishment" ADD CONSTRAINT "Transco_Establishment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_dsnId_siren_nic_fkey" FOREIGN KEY ("dsnId", "siren", "nic") REFERENCES "Establishment"("dsnId", "siren", "nic") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Children" ADD CONSTRAINT "Person_Children_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Domain_Email" ADD CONSTRAINT "Transco_Domain_Email_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Analytic" ADD CONSTRAINT "Person_Analytic_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mutual" ADD CONSTRAINT "Mutual_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mutual" ADD CONSTRAINT "Mutual_dsnId_siren_fkey" FOREIGN KEY ("dsnId", "siren") REFERENCES "Society"("dsnId", "siren") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mutual" ADD CONSTRAINT "Mutual_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Mutual" ADD CONSTRAINT "Person_Mutual_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Mutual" ADD CONSTRAINT "Person_Mutual_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Mutual" ADD CONSTRAINT "Person_Mutual_dsnId_numSS_fkey" FOREIGN KEY ("dsnId", "numSS") REFERENCES "Person"("dsnId", "numSS") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Mutual" ADD CONSTRAINT "Person_Mutual_projectId_dsnId_siren_contractId_fkey" FOREIGN KEY ("projectId", "dsnId", "siren", "contractId") REFERENCES "Mutual"("projectId", "dsnId", "siren", "contractId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person_Bank" ADD CONSTRAINT "Person_Bank_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Person" ADD CONSTRAINT "Transco_Person_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_dsnId_siren_nic_fkey" FOREIGN KEY ("dsnId", "siren", "nic") REFERENCES "Establishment"("dsnId", "siren", "nic") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkContract" ADD CONSTRAINT "WorkContract_dsnId_numSS_fkey" FOREIGN KEY ("dsnId", "numSS") REFERENCES "Person"("dsnId", "numSS") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_WorkContract" ADD CONSTRAINT "Transco_WorkContract_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transco_Job" ADD CONSTRAINT "Transco_Job_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idcc" ADD CONSTRAINT "Idcc_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Idcc" ADD CONSTRAINT "Idcc_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction" ADD CONSTRAINT "Extraction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Stat" ADD CONSTRAINT "Extraction_Stat_extractionLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "projectId") REFERENCES "Extraction"("label", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Stat" ADD CONSTRAINT "Extraction_Stat_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_extractionLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "projectId") REFERENCES "Extraction"("label", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_File" ADD CONSTRAINT "Extraction_File_projectFileSlug_fkey" FOREIGN KEY ("projectFileSlug") REFERENCES "Project_File"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_extractionLabel_fileLabel_projectId_fkey" FOREIGN KEY ("extractionLabel", "fileLabel", "projectId") REFERENCES "Extraction_File"("extractionLabel", "fileLabel", "projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extraction_Data" ADD CONSTRAINT "Extraction_Data_softwareLabel_fkey" FOREIGN KEY ("softwareLabel") REFERENCES "Software"("label") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Value_Exist" ADD CONSTRAINT "Dsn_Value_Exist_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Value_Exist" ADD CONSTRAINT "Dsn_Value_Exist_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template_Column" ADD CONSTRAINT "Template_Column_templateLabel_fkey" FOREIGN KEY ("templateLabel") REFERENCES "Template"("label") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template_Column" ADD CONSTRAINT "Template_Column_type_format_fkey" FOREIGN KEY ("type", "format") REFERENCES "Format"("type", "format") ON DELETE SET NULL ON UPDATE CASCADE;
