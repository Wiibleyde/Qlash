/*
  Warnings:

  - You are about to drop the `_UserQuizzes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserQuizzes" DROP CONSTRAINT "_UserQuizzes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserQuizzes" DROP CONSTRAINT "_UserQuizzes_B_fkey";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "authorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserQuizzes";

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
