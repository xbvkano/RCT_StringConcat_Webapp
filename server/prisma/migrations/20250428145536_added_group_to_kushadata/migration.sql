/*
  Warnings:

  - Changed the type of `group` on the `Assignment_kusha` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Assignment_kusha" DROP COLUMN "group",
ADD COLUMN     "group" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kusha_Data" ALTER COLUMN "group" SET DATA TYPE TEXT;
