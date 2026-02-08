-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "joueur" TEXT NOT NULL,
    "etat" TEXT NOT NULL,
    "monde" TEXT NOT NULL,
    "projet" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coords" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
