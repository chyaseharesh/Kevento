import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { startOfDay, endOfDay, eachDayOfInterval } from "date-fns"

export async function GET(req: Request) {
  try {
    // Extract the event id from the URL params
    const url = new URL(req.url)
    const id = url.pathname.split("/").pop() // Assumes URL pattern is like /api/events/[id]

    if (!id) {
      return NextResponse.json({ error: "Event ID is missing" }, { status: 400 })
    }

    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const event = await prisma.event.findUnique({
      where: { id },
    })

    if (!event || event.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Event not found or unauthorized access" },
        { status: 404 }
      )
    }

    // Get all purchases for this event
    const purchases = await prisma.purchase.findMany({
      where: {
        tickets: {
          some: {
            ticket: {
              eventId: id,
            },
          },
        },
      },
      include: {
        tickets: {
          include: {
            ticket: {
              include: {
                ticketTier: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    // Get the date range
    const startDate = purchases[0]?.createdAt || new Date()
    const endDate = new Date()

    // Create an array of all dates in the range
    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    })

    // Initialize sales data for each date
    const salesData = dateRange.map((date) => {
      const dayStart = startOfDay(date)
      const dayEnd = endOfDay(date)

      // Filter purchases for this day
      const dayPurchases = purchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.createdAt)
        return purchaseDate >= dayStart && purchaseDate <= dayEnd
      })

      // Calculate daily totals
      const dailyStats = dayPurchases.reduce(
        (acc, purchase) => {
          const ticketCount = purchase.tickets.reduce(
            (sum, pt) => sum + pt.quantity * pt.ticket.ticketTier.price,
            0
          )
          const revenue = purchase.tickets.reduce(
            (sum, pt) => sum + pt.quantity * pt.ticket.ticketTier.price,
            0
          )
          return {
            sales: acc.sales + ticketCount,
            revenue: acc.revenue + revenue,
          }
        },
        { sales: 0, revenue: 0 }
      )

      return {
        date: date.toISOString(),
        ...dailyStats,
      }
    })

    return NextResponse.json(salesData)
  } catch (error) {
    console.error("Sales data error:", error)
    return NextResponse.json(
      { error: "Failed to fetch sales data" },
      { status: 500 }
    )
  }
}
