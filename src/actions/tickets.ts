'use server';
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PurchaseStatus, TicketStatus } from "@prisma/client"

export async function changePurchaseStatus(status: string, id: string) {
    try {
        const session = await auth();
        if (!session?.user) {
            return { success: false, status: 400 };
        }
        // check if the user is an admin or super admin
        if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
            return { success: false, status: 403 };
        }
        let tstatus = status as TicketStatus
        if(status =="REFUNDED" || status =="PARTIAL_REFUNDED" || status =="BLOCKED"){
            tstatus = "PENDING"
        }
        // Check if purchase exists
        const purchaseExists = await prisma.purchase.findUnique({
            where: { id },
        });
        if (!purchaseExists) {
            return { success: false, status: 404, message:"Purchase not found!" };
        }

        // Check if ticket tier exists
        const purchaseTicket = await prisma.purchaseTicket.findMany({
            where: { purchaseId: purchaseExists.id },
        });
        if (!purchaseTicket) {
            return { success: false, status: 404, message:"Purchase not found!" };
        }

        // Update purchase and ticket status 
        const purchase = await prisma.purchase.update({
            where: { id },
            data: {
                status: status as PurchaseStatus
            }
        });
        if (!purchase) {
            return { success: false, status: 404, message:"Purchase not found!" };
        }
  
        // update ticket status
        purchaseTicket.forEach(async (sss) => {
        await prisma.ticket.updateMany({
            where: { ticketNumber: sss.ticketId },
            data: {
                status: tstatus
            }
        });
        });

        console.log(purchase)
        return { success: true, status: 200 };
    } catch (error) {
        const errorDetails =
            error instanceof Error ? { message: error.message, stack: error.stack } : error;
        console.error("Error updating event:", errorDetails);
        return { error: "Internal server error", status: 500 };
    }
}