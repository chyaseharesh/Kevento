'use server';
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { EventStatus } from "@prisma/client"
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/lib/cloudinary"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

function extractPublicId(imageUrl: string): string {
    const parts = imageUrl.split("/");
    const fileNameWithExtension = parts[parts.length - 1];
    const fileName = fileNameWithExtension.split(".")[0];
    return parts.slice(-2, -1)[0] + "/" + fileName; // Includes folder if present
}
export async function updateEventAction(formData: FormData, id: string) {
    try {
        const session = await auth();
        if (!session?.user) {
            return { success: false, status:400 };

        }

        const body = formData;

        // Extract fields
        const title = body.get("title") as string;
        const description = body.get("description") as string;
        const venue = body.get("venue") as string;
        const location = body.get("location") as string;
        const organizer = body.get("organizer") as string;        
        const status = body.get("status") as EventStatus;
        const dateStr = body.get("date") as string;  // This is the ISO 8601 string
        const categoryId = body.get("categoryId") as string;
        const image = body.get("image") as File | null;


        const date = new Date(dateStr);
    // If date parsing is successful, continue processing
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

        // return null
        // Check if the event exists
        const events = await prisma.event.findUnique({
            where: {
                id: id
            }
        });
        if (!events) {
            return NextResponse.json(
                { error: "Event not found." },
                { status: 404 }
            );
        }

        // Check if the user is the owner of the event

        if (!title || !description || !venue || !categoryId || !location || !organizer || !status || isNaN(date.getTime())) {
            return { success: false, status:400 };

        }

        const tickets: { id?: string; ticketTypeId: string; price: number; quantity: number }[] = [];
        body.forEach((value, key) => {
            const match = key.match(/tickets\[(\d+)\]\[(\w+)\]/);
            if (match) {
                const index = parseInt(match[1], 10);
                const field = match[2];
                if (!tickets[index]) tickets[index] = { ticketTypeId: "", price: 0, quantity: 0 };
                if (field === "id") tickets[index].id = value as string; // Include ticket ID for updates
                if (field === "ticketTypeId") tickets[index].ticketTypeId = value as string;
                if (field === "price") tickets[index].price = parseFloat(value as string);
                if (field === "quantity") tickets[index].quantity = parseInt(value as string, 10);
            }
        });
        console.log("Tickets:", tickets);

        if (tickets.length === 0) {
            return { success: false, status:400 };

        }

        const evnt = await prisma.event.findUnique({
            where: {
                id: id
            }
        })
        if (evnt?.imageUrl) {
            const publicId = extractPublicId(evnt.imageUrl); // Extract public_id from the URL
            await deleteImageFromCloudinary(publicId);
        }
        // Upload new image if available
        let imageUrl = null;
        if (image) {
            const cloudinaryResult = await uploadImageToCloudinary(image) as { secure_url: string };
            imageUrl = cloudinaryResult?.secure_url || null;
        }

        // Update event in the database
        const event = await prisma.event.update({
            where: { id: id },
            data: {
                title,
                description,
                venue,
                location,
                organizer,
                date,
                categoryId,
                status,
                ...(imageUrl && { imageUrl }), // Only update imageUrl if a new image is uploaded
                ticketTiers: {
                    deleteMany: {}, // Remove all existing tickets for simplicity
                    create: tickets.map((ticket) => ({
                        id: ticket.id || nanoid(),
                        ticketTypeId: ticket.ticketTypeId,
                        price: ticket.price,
                        quantity: ticket.quantity,
                    })),
                },
            },
            include: { ticketTiers: true },
        });
        console.log(event)
        return { success: true, status:200 };
    } catch (error) {
        const errorDetails =
            error instanceof Error ? { message: error.message, stack: error.stack } : error;
        console.error("Error updating event:", errorDetails);
        return { error: "Internal server error", status: 500 };
    }
}


//delete event
export async function deleteEventAction(id: string) {
    return{
        status:200,
        body: JSON.stringify({ message: `Event with ID ${id} deleted.` })
    }
    
}