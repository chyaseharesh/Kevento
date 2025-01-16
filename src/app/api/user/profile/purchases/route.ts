import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"



export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Fetch purchases from the database
    const purchase = await prisma.purchase.findMany({
      where: {
        userId: session.user.id
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
