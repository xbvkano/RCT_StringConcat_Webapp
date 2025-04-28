/*
  Warnings:

  - Added the required column `group` to the `Kusha_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment_kusha" ALTER COLUMN "group" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Kusha_Data" ADD COLUMN     "group" INTEGER NOT NULL;
