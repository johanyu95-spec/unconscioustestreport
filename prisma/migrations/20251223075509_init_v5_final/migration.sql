-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "answers" JSONB NOT NULL,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestMetric" (
    "id" TEXT NOT NULL,
    "testResultId" TEXT NOT NULL,
    "z_iM_Ach" DOUBLE PRECISION NOT NULL,
    "z_iM_Pow" DOUBLE PRECISION NOT NULL,
    "z_iM_Aff" DOUBLE PRECISION NOT NULL,
    "z_eM_Ach" DOUBLE PRECISION NOT NULL,
    "z_eM_Pow" DOUBLE PRECISION NOT NULL,
    "z_eM_Aff" DOUBLE PRECISION NOT NULL,
    "z_MDI_Ach" DOUBLE PRECISION NOT NULL,
    "z_MDI_Pow" DOUBLE PRECISION NOT NULL,
    "z_MDI_Aff" DOUBLE PRECISION NOT NULL,
    "z_PSCI" DOUBLE PRECISION NOT NULL,
    "z_N_Auto" DOUBLE PRECISION NOT NULL,
    "z_N_Comp" DOUBLE PRECISION NOT NULL,
    "z_N_Rela" DOUBLE PRECISION NOT NULL,
    "z_W_Wellbeing" DOUBLE PRECISION NOT NULL,
    "z_C_Depletion" DOUBLE PRECISION NOT NULL,
    "z_C_External" DOUBLE PRECISION NOT NULL,
    "profileKey" TEXT NOT NULL,

    CONSTRAINT "TestMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestAnalysis" (
    "id" TEXT NOT NULL,
    "testResultId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultContent" (
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "ResultContent_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TestMetric_testResultId_key" ON "TestMetric"("testResultId");

-- CreateIndex
CREATE UNIQUE INDEX "TestAnalysis_testResultId_key" ON "TestAnalysis"("testResultId");

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestMetric" ADD CONSTRAINT "TestMetric_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAnalysis" ADD CONSTRAINT "TestAnalysis_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
