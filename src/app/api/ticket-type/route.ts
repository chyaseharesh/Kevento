import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const { name } = await req.json();
console.log('cname'+name)
  try {
    if (!name) {
      return NextResponse.json(
        { error: "TicketType name is required" },
        { status: 400 }
      );
    }

    // Check if ticketType name is unique
    const existingTicketType = await prisma.ticketType.findUnique({
      where: { name:name },
    });
    if (existingTicketType) {
      return NextResponse.json(
        { error: "Ticket Type already exists" },
        { status: 400 }
      );
    }

    // Create the new ticketType
    const ticketType = await prisma.ticketType.create({
      data: { 
        id: nanoid(),
        name:name,
     },
    });
console.log('INSERTED'+ticketType)
    return NextResponse.json(ticketType, { status: 201 });
  } catch (error) {
    console.log("Error creating ticketType:", error);
    return NextResponse.json(
      { error: "Failed to create ticketType" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {

    // Fetch paginated ticketTypes
    const ticketTypes = await prisma.ticketType.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      ticketTypes,

    });
  } catch (error) {
    console.error("Error fetching ticketTypes:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticketTypes" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "TicketType ID is required" },
        { status: 400 }
      );
    }

    await prisma.ticketType.delete({
      where: { id },
    });

    return NextResponse.json({ message: "TicketType deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticketType:", error);
    return NextResponse.json(
      { error: "Failed to delete ticketType" },
      { status: 500 }
    );
  }
}
