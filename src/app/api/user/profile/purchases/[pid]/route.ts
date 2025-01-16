import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { uploadImageToCloudinary } from "@/lib/cloudinary"
import { nanoid } from "nanoid"

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
    const purchaseId = body.get("purchaseId") as string;
    const image = body.get("file") as File | null;


    if (!image || !purchaseId) {
      return NextResponse.json(
        { error: "Missing or invalid event fields." },
        { status: 400 }
      );
    }
    // Upload image if available
    let imageUrl = null;
    if (image) {
      const cloudinaryResult = await uploadImageToCloudinary(image) as { secure_url: string };
            imageUrl = cloudinaryResult?.secure_url || null;
    }

    // Create event in the database
    const reciept = await prisma.paymentReceipts.create({
      data: {
        id: nanoid(),
        purchaseId,
        receiptUrl: imageUrl || ""
      },
    });

    return NextResponse.json({ reciept }, { status: 201 });
  } catch (error) {
    const errorDetails =
      error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.log(errorDetails)
    // return NextResponse.json(
    //   { error: "Internal server error", details: errorDetails },
    //   { status: 500 }
    // );
  }
}


export async function GET(req: Request) {
  try {
        // Extract the event id from the URL params
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // Assumes URL pattern is like /api/purchases/[id]
    
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
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
