-- DropForeignKey
ALTER TABLE "Dsn_Value_Exist" DROP CONSTRAINT "Dsn_Value_Exist_dsnId_fkey";

-- AddForeignKey
ALTER TABLE "Dsn_Value_Exist" ADD CONSTRAINT "Dsn_Value_Exist_dsnId_fkey" FOREIGN KEY ("dsnId") REFERENCES "Dsn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
