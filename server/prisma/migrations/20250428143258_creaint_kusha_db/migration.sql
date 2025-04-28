-- CreateTable
CREATE TABLE "Kusha_Data" (
    "id" SERIAL NOT NULL,
    "experience_years" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "email" TEXT,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "task_accuracy" BOOLEAN[],
    "total_time" INTEGER NOT NULL,
    "per_task_time" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kusha_Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment_kusha" (
    "id" SERIAL NOT NULL,
    "group" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignment_kusha_pkey" PRIMARY KEY ("id")
);
