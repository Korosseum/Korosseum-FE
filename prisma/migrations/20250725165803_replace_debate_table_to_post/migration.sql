/*
  Warnings:

  - You are about to drop the column `debateId` on the `Opinion` table. All the data in the column will be lost.
  - You are about to drop the `Debate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `debate_like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `debate_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postId` to the `Opinion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Opinion" DROP CONSTRAINT "Opinion_debateId_fkey";

-- DropForeignKey
ALTER TABLE "debate_like" DROP CONSTRAINT "debate_like_debateId_fkey";

-- DropForeignKey
ALTER TABLE "debate_like" DROP CONSTRAINT "debate_like_userId_fkey";

-- DropForeignKey
ALTER TABLE "debate_user" DROP CONSTRAINT "debate_user_debateId_fkey";

-- DropForeignKey
ALTER TABLE "debate_user" DROP CONSTRAINT "debate_user_userId_fkey";

-- AlterTable
ALTER TABLE "Opinion" DROP COLUMN "debateId",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Debate";

-- DropTable
DROP TABLE "debate_like";

-- DropTable
DROP TABLE "debate_user";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sideA" TEXT,
    "sideB" TEXT,
    "sideC" TEXT,
    "sideD" TEXT,
    "sideE" TEXT,
    "sideF" TEXT,
    "sideG" TEXT,
    "totalCounts" INTEGER NOT NULL DEFAULT 0,
    "totalArguments" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL DEFAULT 'debate',
    "category" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_like" (
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "post_like_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "post_user" (
    "postId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_user_pkey" PRIMARY KEY ("postId","userId")
);

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_user" ADD CONSTRAINT "post_user_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_user" ADD CONSTRAINT "post_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
