// import { NextResponse } from 'next/server';
// import { TicketManager } from '@/lib/ticketUtils';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// import QRCode from 'qrcode';

// // Make sure to set this in your environment variables
// const SECRET_KEY = process.env.TICKET_SECRET_KEY!;

// export async function POST(request: Request) {
//     try {
//         const ticketManager = new TicketManager(SECRET_KEY);
//         const body = await request.json();
//         const { userId, ticketTierId, quantity } = body;

//         // Validate ticket tier
//         const ticketTier = await prisma.ticketTier.findUnique({
//             where: { id: ticketTierId },
//             include:{
//                 event:true
//             }
//         })



//         if (!ticketTier) {
//             return NextResponse.json({ error: 'Ticket tier not found' }, { status: 404 });
//         }

//         if (ticketTier.quantity < quantity) {
//             return NextResponse.json({ error: 'Not enough tickets available' }, { status: 400 });
//         }

//         const {
//             eventName,
//             eventVenue,
//             eventTime,
//             ticketTier,
//             additionalInfo,
//         } = body;

//         const ticketId = ticketManager.generateTicketId();
//         const payload = ticketManager.createTicketPayload(
//             ticketId,
//             eventName,
//             eventVenue,
//             new Date(eventTime),
//             ticketTier,
//             additionalInfo
//         );

//         const qrString = ticketManager.generateQRString(payload);
//         const qrCodeDataUrl = await QRCode.toDataURL(qrString);

//         return NextResponse.json({
//             success: true,
//             ticket: payload,
//             qrCode: qrCodeDataUrl,
//         });
//     } catch (error) {
//         return NextResponse.json(
//             { success: false, error: 'Failed to generate ticket' },
//             { status: 500 }
//         );
//     }
// }

// // // app/api/tickets/validate/route.ts
// // export async function POST(request: Request) {
// //   try {
// //     const ticketManager = new TicketManager(SECRET_KEY);
// //     const { qrString } = await request.json();

// //     const ticketData = ticketManager.validateQRString(qrString);

// //     if (!ticketData) {
// //       return NextResponse.json(
// //         { success: false, error: 'Invalid ticket' },
// //         { status: 400 }
// //       );
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       ticket: ticketData,
// //     });
// //   } catch (error) {
// //     return NextResponse.json(
// //       { success: false, error: 'Failed to validate ticket' },
// //       { status: 500 }
// //     );
// //   }
// // }