import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

/**
 * Uploads an image file to Cloudinary.
 * @param file - The image file to upload.
 * @returns The response from Cloudinary including the URL.
 */
export async function uploadImageToCloudinary(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Return a promise that resolves when the upload is complete
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "events", // Optional: specify a folder in your Cloudinary account
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result); // Resolving with the result when upload is successful
          }
        }
      ).end(buffer);
    });

    return result; // Result includes secure_url, public_id, etc.
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
}

/**
 * Deletes an image from Cloudinary by its public ID.
 * @param publicId - The public ID of the image to delete.
 */
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Delete result:", result);
    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Failed to delete image");
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Error deleting the image");
  }
}