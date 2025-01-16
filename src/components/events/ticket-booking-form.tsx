
// 'use client';
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Event, Ticket, User } from "@prisma/client"
// interface TicketBookingFormProps {
  
//   event: Event & {
//     tickets: Ticket[]
//     user: Pick<User, "name" | "email">
//   }
//   userId: string
// }

// interface TicketSelection {
//   [key: string]: number
// }

// export function TicketBookingForm({ event, userId }: TicketBookingFormProps) {
//   const router = useRouter()
//   const [ticketSelection, setTicketSelection] = useState<TicketSelection>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleQuantityChange = (ticketId: string, quantity: number) => {
//     setTicketSelection((prev) => ({
//       ...prev,
//       [ticketId]: quantity,
//     }))
//   }

//   const calculateTotal = () => {
//     return event.tickets.reduce((total, ticket) => {
//       const quantity = ticketSelection[ticket.id] || 0
//       return total + ticket.price * quantity
//     }, 0)
//   }

//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       const selectedTickets = Object.entries(ticketSelection).filter(
//         ([_, quantity]) => quantity > 0
//       )

//       if (selectedTickets.length === 0) {
//         setError("Please select at least one ticket")
//         return
//       }

//       const response = await fetch("/api/purchases", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eventId: event.id,
//           userId,
//           tickets: selectedTickets.map(([ticketId, quantity]) => ({
//             ticketId,
//             quantity,
//           })),
//         }),
//       })

//       if (!response.ok) {
//         const data = await response.json()
//         throw new Error(data.error || "Failed to book tickets")
//       }

//       const { purchaseId } = await response.json()
//       router.push(`/dashboard/purchases/${purchaseId}`)
//     } catch (error) {
//       console.error("Booking error:", error)
//       setError(error instanceof Error ? error.message : "Failed to book tickets")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="rounded-lg bg-white p-6 shadow-md">
//       <h2 className="mb-4 text-xl font-semibold">Get Tickets</h2>
      
//       <div className="mb-6 space-y-4">
//         {event.tickets.map((ticket) => (
//           <div
//             key={ticket.id}
//             className="flex items-center justify-between border-b pb-4"
//           >
//             <div>
//               <p className="font-semibold">{ticket.type}</p>
//               <p className="text-sm text-gray-500">
//                 {ticket.quantity - ticket.sold} remaining
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="font-bold">Rs. {ticket.price}</p>
//               <select
//                 className="mt-1 rounded border px-2 py-1"
//                 value={ticketSelection[ticket.id] || 0}
//                 onChange={(e) =>
//                   handleQuantityChange(ticket.id, Number(e.target.value))
//                 }
//                 disabled={ticket.quantity === ticket.sold}
//               >
//                 {Array.from(
//                   { length: Math.min(5, ticket.quantity - ticket.sold + 1) },
//                   (_, i) => i
//                 ).map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mb-6 border-t pt-4">
//         <div className="flex items-center justify-between">
//           <span className="font-semibold">Total</span>
//           <span className="text-xl font-bold">Rs. {calculateTotal()}</span>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-lg bg-red-50 p-2 text-sm text-red-500">
//           {error}
//         </div>
//       )}

//       <button
//         onClick={handleSubmit}
//         disabled={isLoading}
//         className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50"
//       >
//         {isLoading ? "Processing..." : "Book Now"}
//       </button>
//     </div>
//   )
// } 