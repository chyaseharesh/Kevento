import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      select: {
        title: true,
        ticketTiers: {
          select: {
            price: true,
            quantity: true,
            ticketType: {
              select: { name: true },
            },
          },
        },
      },
    });

    const chartData = events.map((event) => {
      const revenueByType: { [key: string]: number } = {};

      event.ticketTiers.forEach((tier) => {
        const ticketTypeName = tier.ticketType?.name || "Unknown";
        revenueByType[ticketTypeName] =
          (revenueByType[ticketTypeName] || 0) + tier.price * tier.quantity;
      });

      return {
        name: event.title,
        ...revenueByType,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
