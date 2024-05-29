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
