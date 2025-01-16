
'use server'
import { auth } from '@/lib/auth';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

/**
 * Handles the file upload process by calling Cloudinary upload functionality.
 * @param file - The image file to upload.
 * @returns An object with success status and response data or error message.
 */
export async function uploadImage(formData: FormData) {
    const body = formData;

    console.log(body.get("file"))
    try {
        const session = await auth();
        if (!session?.user) {
            return { success: false, status: 400 };

        }

        const image = body.get("file") as File | null;

        let imageUrl = null;
        if (image) {
            const cloudinaryResult = await uploadImageToCloudinary(image) as { secure_url: string };
            imageUrl = cloudinaryResult?.secure_url || null;
        }
        //update or create the paymentQR
        const result = await prisma.paymentQR.update({
            where: { id: "randomlygenerated" },
            data: { qrCode: imageUrl || "" },
        });
        // Returning relevant data from the Cloudinary response
        return { success: true, data: result };
    } catch (error) {
        console.error("Upload action error:", error);
        return { success: false, error: "An error occurred" };
    }
}
//get the image
export async function getImage() {
    try {
        const result = await prisma.paymentQR.findUnique({
            where: { id: "randomlygenerated" },
            select: { qrCode: true },
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Get image action error:", error);
        return { success: false, error: "An error occurred" };
    }
}

export async function getPaymentReceipts() {
    try {
        const result = await prisma.paymentReceipts.findMany({
            include:{
                purchase:true
            }
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Get payment receipts action error:", error);
        return { success: false, error: "An error occurred" };
    }
}