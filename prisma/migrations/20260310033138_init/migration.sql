-- CreateTable
CREATE TABLE "boilerplate_placeholders" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "boilerplate_placeholders_pkey" PRIMARY KEY ("id")
);
