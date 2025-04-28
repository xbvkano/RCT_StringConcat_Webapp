/*
  Warnings:

  - Changed the type of `result` on the `Marcos_per_question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Marcos_per_question" DROP COLUMN "result",
ADD COLUMN     "result" BOOLEAN NOT NULL;
