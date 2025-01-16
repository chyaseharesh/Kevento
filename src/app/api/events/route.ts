import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { EventStatus } from "@prisma/client";
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }    
    const body = await req.formData();

    // Extract fields
    const title = body.get("title") as string;
    const description = body.get("description") as string;
    const venue = body.get("venue") as string;
    const location = body.get("location") as string;
    const organizer = body.get("organizer") as string;
    const status = body.get("status") as EventStatus;
    const date = new Date(body.get("date") as string);
    const categoryId = body.get("categoryId") as string;
    const image = body.get("image") as File | null;

const ktmTime = new Date(body.get("date") as string).toLocaleString("en-US", { timeZone: "Asia/Kathmandu" });

    if (!title || !description || !venue || !categoryId || !status || isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Missing or invalid event fields." },
        { status: 400 }
      );
    }

    const tickets: { name: string; price: number; quantity: number }[] = [];
    body.forEach((value, key) => {
      const match = key.match(/tickets\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];
        if (!tickets[index]) tickets[index] = { name: "", price: 0, quantity: 0 };
        if (field === "type") tickets[index].name = value as string;
        if (field === "price") tickets[index].price = parseFloat(value as string);
        if (field === "quantity") tickets[index].quantity = parseInt(value as string, 10);
      }
    });

    if (tickets.length === 0) {
      return NextResponse.json(
        { error: "At least one ticket tier is required." },
        { status: 400 }
      );
    }
    //get the total number of tickets
    const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
console.log(totalTickets);

    // Upload image if available
    let imageUrl = null;
    if (image) {
      const cloudinaryResult = await uploadImageToCloudinary(image) as { secure_url: string };
      imageUrl = cloudinaryResult?.secure_url || null;
    }

    // Create event in the database
    const event = await prisma.event.create({
      data: {
        id: nanoid(),
        status,
        title,
        description,
        venue,
        location,
        organizer,
        date:new Date(ktmTime),
        categoryId,
        imageUrl,
        userId: session.user.id,
        totalTicket:totalTickets, 
        ticketTiers: {
          create: tickets.map((ticket) => ({
            id: nanoid(),
            ticketTypeId: ticket.name,
            price: ticket.price,
            quantity: ticket.quantity,
          })),
        },
      },
      include: { ticketTiers: true },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    // console.log("Error creating event:", error);
    const errorDetails =
      error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.log(errorDetails)
    // return NextResponse.json(
    //   { error: "Internal server error", details: errorDetails },
    //   { status: 500 }
    // );
  }
}


export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Fetch events from the database
    const events = await prisma.event.findMany({
      where: {
        ...(category && { categoryId: category }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        category: true, // Include category details if needed
      },
    });

    // Return the fetched events
    return NextResponse.json(events);
  } catch (error:unknown) {
    console.error("Error fetching events:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to fetch events", error: errorMessage },
      { status: 500 }
    );
  }
}

