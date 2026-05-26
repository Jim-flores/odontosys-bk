-- DropForeignKey
ALTER TABLE "Antecedent" DROP CONSTRAINT "Antecedent_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Odontogram" DROP CONSTRAINT "Odontogram_clientId_fkey";

-- AlterTable
ALTER TABLE "Antecedent" ALTER COLUMN "pain" DROP NOT NULL,
ALTER COLUMN "clench" DROP NOT NULL,
ALTER COLUMN "headache" DROP NOT NULL,
ALTER COLUMN "medication" DROP NOT NULL,
ALTER COLUMN "allergies" DROP NOT NULL,
ALTER COLUMN "arthritis" DROP NOT NULL,
ALTER COLUMN "hypertension" DROP NOT NULL,
ALTER COLUMN "diabetes" DROP NOT NULL,
ALTER COLUMN "hemorrhage" DROP NOT NULL,
ALTER COLUMN "cardiovascular" DROP NOT NULL,
ALTER COLUMN "pregnancy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Antecedent" ADD CONSTRAINT "Antecedent_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odontogram" ADD CONSTRAINT "Odontogram_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
