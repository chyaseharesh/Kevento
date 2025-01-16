import { Event, Ticket as PrismaTicket } from "@prisma/client"

interface Ticket extends PrismaTicket {
  price: number;
}
import { EventCard } from "./event-card"
import { Pagination } from "../ui/pagination"

interface EventListProps {
  events: (Event & { tickets: Ticket[] })[]
  pageCount: number
  currentPage: number
}

export function EventList({ events, pageCount, currentPage }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No events found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((event) => (
          <div key={event.id}>

            <EventCard event={event} />
          </div>

        ))}
      </div>
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} currentPage={currentPage} />
      )}
    </div>
  )
} 