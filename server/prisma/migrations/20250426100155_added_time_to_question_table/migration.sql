/*
  Warnings:

  - Added the required column `time` to the `Marcos_per_question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Marcos_per_question" ADD COLUMN     "time" INTEGER NOT NULL;
