/*
  Warnings:

  - The values [RawString] on the enum `DetGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DetGroup_new" AS ENUM ('Backslash', 'SingleQuote', 'DoubleQuote', 'TemplateLiteral', 'EscapedPrefix', 'BacktickDet', 'AngleBracket', 'DollarSign', 'TildeWrapped', 'HashPrefix', 'TagSlash', 'HashSuffix');
ALTER TABLE "Marcos_Data" ALTER COLUMN "group" DROP DEFAULT;
ALTER TABLE "Marcos_Data" ALTER COLUMN "group" TYPE "DetGroup_new" USING ("group"::text::"DetGroup_new");
ALTER TYPE "DetGroup" RENAME TO "DetGroup_old";
ALTER TYPE "DetGroup_new" RENAME TO "DetGroup";
DROP TYPE "DetGroup_old";
ALTER TABLE "Marcos_Data" ALTER COLUMN "group" SET DEFAULT 'Backslash';
COMMIT;
