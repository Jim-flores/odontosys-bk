/*
  Warnings:

  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "address",
DROP COLUMN "notes",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "chiefComplaint" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "currentAddress" TEXT,
ADD COLUMN     "dep" TEXT,
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "occupation" TEXT,
ADD COLUMN     "prov" TEXT,
ADD COLUMN     "religion" TEXT,
ALTER COLUMN "phone" SET NOT NULL;

-- CreateTable
CREATE TABLE "Antecedent" (
    "id" TEXT NOT NULL,
    "lastAppointment" TEXT,
    "numberOfBrushesPerDay" INTEGER,
    "pain" BOOLEAN NOT NULL,
    "painDetails" TEXT,
    "clench" BOOLEAN NOT NULL,
    "clenchDetails" TEXT,
    "headache" BOOLEAN NOT NULL,
    "headacheDetails" TEXT,
    "medication" BOOLEAN NOT NULL,
    "medicationDetails" TEXT,
    "allergies" BOOLEAN NOT NULL,
    "allergiesDetails" TEXT,
    "arthritis" BOOLEAN NOT NULL,
    "hypertension" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "hemorrhage" BOOLEAN NOT NULL,
    "cardiovascular" BOOLEAN NOT NULL,
    "pregnancy" BOOLEAN NOT NULL,
    "others" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Antecedent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Odontogram" (
    "id" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Odontogram_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Antecedent_clientId_key" ON "Antecedent"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Odontogram_clientId_key" ON "Odontogram"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");

-- AddForeignKey
ALTER TABLE "Antecedent" ADD CONSTRAINT "Antecedent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odontogram" ADD CONSTRAINT "Odontogram_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
