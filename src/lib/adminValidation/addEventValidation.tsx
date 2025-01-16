import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  date: z
    .union([z.string(), z.date()])
    .refine((val) => !isNaN(new Date(val).getTime()), { message: "Invalid date" })
    .transform((val) => (typeof val === 'string' ? val : new Date(val).toISOString())), // Transform to string if it's a Date object
  // image: z
  //   .union([z.instanceof(File), z.instanceof(FileList)])
  //   .optional()
  //   .refine((file) => {
  //     if (!file) return true; // No file provided
  //     if (file instanceof FileList && file.length > 0) {
  //       return true; // Valid FileList with at least one file
  //     }
  //     if (file instanceof File && file.size > 0) {
  //       return true; // Valid single file
  //     }
  //     return false; // Invalid file
  //   }, { message: "Invalid image file" }),
  status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]),
  categoryId: z.string().min(1, { message: "Category is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  
  tickets: z.array(
    z.object({
      type: z.string().min(1, { message: "Ticket type is required" }),
      price: z
        .string()
        .refine((val) => !isNaN(parseFloat(val)), {
          message: "Ticket price must be a number",
        })
        .transform((val) => parseFloat(val)),
      quantity: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)), {
          message: "Ticket quantity must be a number",
        })
        .transform((val) => parseInt(val, 10)),
    })
  ),
});
