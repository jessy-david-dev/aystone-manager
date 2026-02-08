/*
  Warnings:

  - You are about to drop the column `slots` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `day` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromHour` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toHour` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_userId_fkey";

-- DropIndex
DROP INDEX "Availability_userId_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "slots",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "fromHour" INTEGER NOT NULL,
ADD COLUMN     "toHour" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
