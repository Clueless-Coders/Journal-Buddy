/*
  Warnings:

  - You are about to drop the `bookmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmark" DROP CONSTRAINT "bookmark_userId_fkey";

-- DropTable
DROP TABLE "bookmark";

-- CreateTable
CREATE TABLE "habit" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "journal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entry" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Daily" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "Daily_pkey" PRIMARY KEY ("createdAt")
);

-- CreateTable
CREATE TABLE "Quote" (
    "createdOn" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "quote" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("createdOn")
);

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal" ADD CONSTRAINT "journal_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_createdOn_fkey" FOREIGN KEY ("createdOn") REFERENCES "Daily"("createdAt") ON DELETE CASCADE ON UPDATE CASCADE;
