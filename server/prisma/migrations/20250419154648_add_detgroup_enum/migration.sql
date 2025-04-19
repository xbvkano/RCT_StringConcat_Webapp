-- CreateEnum
CREATE TYPE "DetGroup" AS ENUM ('Backslash', 'SingleQuote', 'DoubleQuote', 'TemplateLiteral', 'EscapedPrefix', 'RawString', 'AngleBracket', 'DollarSign', 'TildeWrapped', 'HashPrefix', 'TagSlash', 'HashSuffix');

-- AlterTable
ALTER TABLE "Marcos_Data" ADD COLUMN     "group" "DetGroup" NOT NULL DEFAULT 'Backslash';
