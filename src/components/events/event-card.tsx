/* eslint-disable @next/next/no-img-element */
import { Event, TicketStatus } from "@prisma/client"

interface Ticket {
  id: string;
  status: TicketStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ticketNumber: string;
  eventId: string;
  ticketTierId: string;
  qrCode: string | null;
  paymentProof: string | null;
  price: number; // Add the price property
}
import Link from "next/link"

interface EventCardProps {
  event: Event & { tickets: Ticket[] }
}

export function EventCard({ event }: EventCardProps) {
  const lowestPrice = event.tickets.reduce(
    (min, ticket) => Math.min(min, ticket.price),
    Infinity
  )

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-gray-200" />
      )}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{event.title}</h3>
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-600">
            {event.description.slice(0, 100)}...
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{event.date.toLocaleDateString()}</span>
            <span>•</span>
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            {lowestPrice === Infinity ? "Free" : `Rs. ${lowestPrice}`}
          </span>
          <Link
            href={`/events/${event.id}`}
            className="rounded-lg bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
} 