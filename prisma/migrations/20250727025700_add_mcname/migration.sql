/*
  Warnings:

  - A unique constraint covering the columns `[mcName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mcName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_mcName_key" ON "User"("mcName");
