import * as z from "zod"

export const purchaseTicketSchema = z.object({
  ticketId: z.string(),
  quantity: z.number().min(1),
})

export const createPurchaseSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  tickets: z.array(purchaseTicketSchema),
})

export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>
export type PurchaseTicketInput = z.infer<typeof purchaseTicketSchema> 