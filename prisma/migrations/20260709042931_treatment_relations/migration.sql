/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Treatment` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Treatment` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Treatment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Treatment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "doctorId",
DROP COLUMN "patientId",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
