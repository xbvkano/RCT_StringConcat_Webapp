-- CreateEnum
CREATE TYPE "ProgrammingLanguage" AS ENUM ('cpp', 'java', 'csharp', 'js', 'ts', 'python', 'other');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female', 'other');

-- CreateTable
CREATE TABLE "Marcos_Data" (
    "id" SERIAL NOT NULL,
    "yearsProgramming" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "email" TEXT,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Marcos_Data_pkey" PRIMARY KEY ("id")
);
