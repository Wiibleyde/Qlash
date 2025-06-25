/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `QuestionType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionType_name_key" ON "QuestionType"("name");
