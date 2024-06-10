/*
  Warnings:

  - The primary key for the `Daily` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Quote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `dayCreated` to the `Daily` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayCreated` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_createdOn_fkey";

-- AlterTable
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_pkey",
ADD COLUMN     "dayCreated" TEXT NOT NULL,
ADD CONSTRAINT "Daily_pkey" PRIMARY KEY ("dayCreated");

-- AlterTable
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_pkey",
ADD COLUMN     "dayCreated" TEXT NOT NULL,
ALTER COLUMN "createdOn" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Quote_pkey" PRIMARY KEY ("dayCreated");

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_dayCreated_fkey" FOREIGN KEY ("dayCreated") REFERENCES "Daily"("dayCreated") ON DELETE CASCADE ON UPDATE CASCADE;
