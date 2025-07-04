/*
  Warnings:

  - A unique constraint covering the columns `[nicknameIndex]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nicknameIndex" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_nicknameIndex_key" ON "User"("nicknameIndex");
