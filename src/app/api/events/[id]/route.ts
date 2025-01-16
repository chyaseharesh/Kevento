import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function GET(request: Request) {
  try {
    // Extract the event id from the URL params
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Assumes the URL is like "/api/events/[id]"

    if (!id) {
      return NextResponse.json(
        { error: "Event ID is missing" },
        { status: 400 }
      );
    }

    // Fetch the event, category, and tickets
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true, // Include category details
        ticketTiers: {
          include: {
            ticketType: true
          }
        }, // Include ticket tiers
        tickets: {
          include: {
            event: true, // Include ticket status if it's an enum or relation
          },
        },
      },
    });

    // Handle case where event is not found
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Return the event data
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

