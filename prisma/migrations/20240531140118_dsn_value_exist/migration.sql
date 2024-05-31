-- CreateTable
CREATE TABLE "Dsn_Value_Exist" (
    "dsnId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "dsnMonth" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "exist" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'system',

    CONSTRAINT "Dsn_Value_Exist_pkey" PRIMARY KEY ("dsnId","projectId","dsnMonth","table","fieldLabel")
);

-- AddForeignKey
ALTER TABLE "Dsn_Value_Exist" ADD CONSTRAINT "Dsn_Value_Exist_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dsn_Value_Exist" ADD CONSTRAINT "Dsn_Value_Exist_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
