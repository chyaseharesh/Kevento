"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TicketTypeForm } from "@/components/events/ticket-type-form"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil } from "lucide-react"
import { Ticket } from "@prisma/client"

interface TicketTypeDialogProps {
  eventId: string
  ticket?: Ticket
  trigger?: React.ReactNode
  mode: "create" | "edit"
}

export function TicketTypeDialog({
  eventId,
  ticket,
  trigger,
  mode,
}: TicketTypeDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant={mode === "create" ? "default" : "outline"}
            size={mode === "create" ? "default" : "sm"}
            className="gap-2"
          >
            {mode === "create" ? (
              <>
                <PlusCircle className="h-4 w-4" />
                Add Ticket Type
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Ticket Type" : "Edit Ticket Type"}
          </DialogTitle>
        </DialogHeader>
        <TicketTypeForm
          eventId={eventId}
          ticket={ticket ? {
            id: ticket.id,
            type: "", // provide a default or actual value
            description: null, // provide a default or actual value
            price: 0, // provide a default or actual value
            quantity: 0 // provide a default or actual value
          } : undefined}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
} 