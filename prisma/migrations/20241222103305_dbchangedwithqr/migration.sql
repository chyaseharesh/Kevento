-- DropForeignKey
ALTER TABLE "PurchaseTicket" DROP CONSTRAINT "PurchaseTicket_ticketId_fkey";

-- AddForeignKey
ALTER TABLE "PurchaseTicket" ADD CONSTRAINT "PurchaseTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
