import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { TicketManager } from '@/lib/ticketUtils';


const prisma = new PrismaClient();
const SECRET_KEY = process.env.TICKET_SECRET_KEY!;

export async function POST(request: Request) {
    try {
        const ticketManager = new TicketManager(SECRET_KEY);

        const body = await request.json();
        const { qrString, } = body;

        const validated = ticketManager.validateQRString(qrString)
        console.log(validated?.ticket_id);
        try {
            const ticket = await prisma.ticket.findUnique({
                where: {
                    ticketNumber: validated?.ticket_id.toString()
                }
            })
            if (!ticket) {
                return NextResponse.json({ message: 'Ticket used or not confirmed!', success: false });
            }
            if (ticket?.status === "USED" || ticket?.status === "PENDING" || ticket?.status === "CANCELLED") {
                return NextResponse.json({ message: 'Ticket already used or not confirmed!', success: false });
            }

            await prisma.ticket.update({
                where: { ticketNumber: validated?.ticket_id.toString() },
                data: { status: "USED" },
            })
            //update ticket status to USED
            const ticketTier = await prisma.ticketTier.findUnique({
                where: { id: validated?.tier },
                include: {
                    event: {
                        select:{
                            title: true,
                            date: true,
                            venue: true
                        }
                    }
                }
            })
            console.log(validated)
            console.log(ticketTier)
            return NextResponse.json({
                success: true,
                ticketTier,
            }, { status: 200 });

        } catch (error) {
            const errorDetails =
                error instanceof Error ? { message: error.message, stack: error.stack } : error;
            console.log(errorDetails)
            return NextResponse.json({ error: 'Ticket already used or invalid!' }, { status: 500 });


        }
    } catch (error) {
        const errorDetails =
            error instanceof Error ? { message: error.message, stack: error.stack } : error;
        console.log(errorDetails)
        return NextResponse.json({ error: 'Ticket already used or invalid!' }, { status: 500 });
    }
}
