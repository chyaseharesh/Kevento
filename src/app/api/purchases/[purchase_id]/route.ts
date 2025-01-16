import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function GET(
  req: Request,) {
  try {
    // Extract the event id from the URL params
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Assumes URL pattern is like /api/purchases/[id]

    if (!id) {
      return NextResponse.json(
        { error: "Purchase ID is missing" },
        { status: 400 }
      );
    }
    // Fetch purchases from the database
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: id
      },
      include: {
        user: {
          select: {
            id:true,
            name: true,
            email: true,
          }
        },
        tickets: {
          include: {
            ticket: {
              include: {
                ticketTier: {
                  include: {
                    ticketType: true,
                  }
                },
                event: true,
              }
            }
          }
        }
      },
    });

    // Handle case where purchase is not found
    if (!purchase) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Return the purchase data
    return NextResponse.json(purchase);
  } catch (error) {
    console.error("Error fetching purchase:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchase" },
      { status: 500 }
    );
  }
}
