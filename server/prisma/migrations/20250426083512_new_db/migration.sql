/*
  Warnings:

  - You are about to drop the column `group` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `durationMs` on the `Marcos_Data` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Marcos_Data` table. All the data in the column will be lost.
  - You are about to drop the column `yearsProgramming` on the `Marcos_Data` table. All the data in the column will be lost.
  - The `task_accuracy` column on the `Marcos_Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `latinCounter` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience_years` to the `Marcos_Data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_time` to the `Marcos_Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "group",
ADD COLUMN     "latinCounter" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Marcos_Data" DROP COLUMN "durationMs",
DROP COLUMN "group",
DROP COLUMN "yearsProgramming",
ADD COLUMN     "experience_years" INTEGER NOT NULL,
ADD COLUMN     "per_task_time" INTEGER[],
ADD COLUMN     "total_time" INTEGER NOT NULL,
DROP COLUMN "task_accuracy",
ADD COLUMN     "task_accuracy" BOOLEAN[];

-- DropEnum
DROP TYPE "DetGroup";

-- CreateTable
CREATE TABLE "Marcos_per_question" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,

    CONSTRAINT "Marcos_per_question_pkey" PRIMARY KEY ("id")
);
