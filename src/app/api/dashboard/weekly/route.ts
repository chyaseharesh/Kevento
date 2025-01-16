import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eachDayOfInterval, startOfToday, subDays, format } from "date-fns";

export async function GET() {
  try {
    // Calculate the date range for the last 7 days
    const today = startOfToday();
    const weekStart = subDays(today, 6);

    // Get all dates in the past week
    const dates = eachDayOfInterval({
      start: weekStart,
      end: today,
    }).map((date) => ({
      date,
      name: format(date, "EEE"), // Get the day name (e.g., "Monday")
    }));

    // Initialize the data structure
    const weeklyData = dates.map(({ name }) => ({
      name,
      confirmed: 0,
      pending: 0,
    }));

    // Fetch ticket data for the last week
    const tickets = await prisma.ticket.findMany({
      where: {
        createdAt: {
          gte: weekStart,
          lte: today,
        },
      },
    });

    // Populate the weekly data
    tickets.forEach((ticket) => {
      const ticketDate = format(ticket.createdAt, "EEE"); // Get the day name
      const dayData = weeklyData.find((d) => d.name === ticketDate);

      if (dayData) {
        if (ticket.status === "CONFIRMED") {
          dayData.confirmed += 1;
        } else if (ticket.status === "PENDING") {
          dayData.pending += 1;
        }
      }
    });

    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error("Error fetching weekly ticket data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly ticket data" },
      { status: 500 }
    );
  }
}
