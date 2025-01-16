/*
  Warnings:

  - You are about to drop the column `qrCode` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `qrOptions` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Purchase_qrCode_key";

-- DropIndex
DROP INDEX "Ticket_qrCode_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "qrCode",
DROP COLUMN "qrOptions";

-- AlterTable
ALTER TABLE "TicketTier" ALTER COLUMN "ticketTypeId" DROP DEFAULT;
