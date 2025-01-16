import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { TicketManager } from '@/lib/ticketUtils';

import QRCode from 'qrcode';
import { sendEmail } from '@/lib/email';
import { auth } from '@/lib/auth';
import { ticketPurchaseTemplate } from '@/lib/email-templates';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.TICKET_SECRET_KEY!;

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized', success: false }, { status: 401 });
    }

    // check if the email is verfied
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.emailVerified) {
      return NextResponse.json({ error: 'Email not verified! Please verify it.', success: false }, { status: 401 });
    }

    const ticketManager = new TicketManager(SECRET_KEY);

    const body = await request.json();
    const { userId, ticketTierId, quantity } = body;

    const ticketTier = await prisma.ticketTier.findUnique({
      where: { id: ticketTierId },
      include: {
        event: true
      }
    })
    if (!ticketTier) {
      return NextResponse.json({ error: 'Something went wrong', success: false }, { status: 404 });
    }

    if (ticketTier.quantity < quantity) {
      return NextResponse.json({ error: 'Not enough tickets available' }, { status: 400 });
    }

    console.log(ticketTier)
    // Generate tickets and QR codes
    const ticketss = [];
    const qrCodes: string[] = [];

    for (let i = 0; i < quantity; i++) {
      const ticketId = ticketManager.generateTicketId();
      const payload = ticketManager.createTicketPayload(
        ticketId,
        ticketTier.id
        // additionalInfo
      );

      const qrString = ticketManager.generateQRString(payload);
      const qrCodeDataUrl = await QRCode.toDataURL(qrString);
      ticketss.push(payload);
      qrCodes.push(qrCodeDataUrl);
    }

    // // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        totalAmount: ticketTier.price * quantity,
        status: 'PENDING',
      },
    });
    console.log(purchase)

    // //  Create ticket records in the database
    // try {
    const vtickets = [];
    for (let index = 0; index < ticketss.length; index++) {
      const ticket = ticketss[index];
      const createdTicket = await prisma.ticket.create({
        data: {
          ticketNumber: ticket.ticket_id,
          status: 'PENDING',
          userId,
          eventId: ticketTier.eventId,
          ticketTierId: ticketTier.id,
          paymentProof: null,
          qrCode: qrCodes[index],
        },
      });
      vtickets.push(createdTicket);
    }
    // console.log(vtickets)

    if (vtickets.length > 0) {
      for (let i = 0; i < vtickets.length; i++) {
        await prisma.purchaseTicket.create({
          data: {
            purchaseId: purchase.id,
            ticketId: vtickets[i].ticketNumber,
            quantity: 1,
          },
        });
      }
    }


    //  Update ticket quantity in the database
    await prisma.ticketTier.update({
      where: { id: ticketTierId },
      data: { quantity: ticketTier.quantity - quantity },
    });


    //decrease ticket count in event table
    await prisma.event.update({
      where: { id: ticketTier.eventId },
      data: { totalTicket: ticketTier.event.totalTicket - quantity },
    });

    if (session?.user.email) {
      const tier_id = ticketss[0]?.tier; // Ensure this is valid before using it
      const ticketTierData = await prisma.ticketTier.findUnique({
        where: {
          id: tier_id,
        },
        include: {
          event: {
            select: {
              title: true,
              date: true,
              venue: true,
            },
          }
        }
      });
      const totalAmount = ticketTier.price * quantity;

      if (ticketTierData) {
        sendEmail(
          session.user.email,
          'Ticket Purchase',
          ticketPurchaseTemplate(
            {
              name: ticketTierData.event.title,  // Ensure 'name' exists in ticketTierData.event
              time: ticketTierData.event.date.toLocaleTimeString(),  // Ensure 'time' exists in ticketTierData.event
              venue: ticketTierData.event.venue // Ensure 'venue' exists in ticketData
            },
            totalAmount,
            ticketTier?.event.date?.toString(),
            purchase.id,
            quantity,
            ticketTier.price
          )
        );
      }
    }
    return NextResponse.json({
      message: 'Ticket booked successfully',
      success: true,
      ticketss,
      qrCodes,
      purchase,
    });
  } catch (error) {
    const errorDetails =
      error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.log(errorDetails)
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500 });
  }
}
