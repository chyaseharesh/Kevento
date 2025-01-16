import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function GET(
  req: Request) {
  try {
    // Extract the event id and tier id from the URL params
    const url = new URL(req.url);
    const params = url.searchParams;
    const id = params.get("id");
    const tier_id = params.get("tier_id");

    if (!id ||!tier_id) {
      return NextResponse.json(
        { error: "Event ID or tier ID is missing" },
        { status: 400 }
      );
    }

    // Fetch event from the database
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        ticketTiers: {
          include: {
            ticketType: true
          }
        }
      }
    })

    // Handle case where event is not found
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }
    // Fetch tiers from the database
    const tier = await prisma.ticketTier.findUnique({
      where: { id: tier_id },
      include: {
        event: true
      }
    })

    // Return the tier data
    return NextResponse.json(tier);
  } catch (error) {
    const errorDetails =
      error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.log(errorDetails)
    return NextResponse.json(
      { error: "Failed to fetch tier" },
      { status: 500 }
    );
  }
}
