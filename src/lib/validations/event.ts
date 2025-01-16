import * as z from "zod"

export const eventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10),
  venue: z.string().min(3),
  startDate: z.string(),
  endDate: z.string(),
  image: z.string().optional(),
  tickets: z.array(
    z.object({
      type: z.string().min(1),
      price: z.number().min(0),
      quantity: z.number().min(1),
      description: z.string().optional(),
    })
  ).min(1),
})

export type EventFormData = z.infer<typeof eventSchema> 