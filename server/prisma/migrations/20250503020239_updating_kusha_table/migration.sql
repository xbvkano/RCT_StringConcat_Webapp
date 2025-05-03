-- CreateTable
CREATE TABLE "Kusha_data" (
    "id" SERIAL NOT NULL,
    "experience_years" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
    "language" "ProgrammingLanguage" NOT NULL,
    "email" TEXT,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "task_accuracy" BOOLEAN[],
    "task_ids" TEXT[],
    "total_time" INTEGER NOT NULL,
    "per_task_time" INTEGER[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kusha_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kusha_per_question" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "result" BOOLEAN NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Kusha_per_question_pkey" PRIMARY KEY ("id")
);
