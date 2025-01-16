import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export async function GET() {
    try {
        // User metrics
        const totalUsers = await prisma.user.count();
        const blockedUsers = await prisma.user.count({
            where: { isBlocked: true },
        });
// get active users count within hours
// const activeSessions = await prisma.session.count();



        // Current and previous month date ranges
        const now = new Date();
        const currentMonthStart = startOfMonth(now);
        const currentMonthEnd = endOfMonth(now);
        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));

        // total users this month
         
        // Revenue for the current month
        const currentMonthRevenue = await prisma.purchase.aggregate({
            _sum: { totalAmount: true },
            where: {
                status: "COMPLETED",
                createdAt: {
                    gte: currentMonthStart,
                    lte: currentMonthEnd,
                },
            },
        });

        // Revenue for the previous month
        const lastMonthRevenue = await prisma.purchase.aggregate({
            _sum: { totalAmount: true },
            where: {
                status: "COMPLETED",
                createdAt: {
                    gte: lastMonthStart,
                    lte: lastMonthEnd,
                },
            },
        });

        // Calculate metrics
        const currentRevenue = currentMonthRevenue._sum.totalAmount || 0;
        const lastRevenue = lastMonthRevenue._sum.totalAmount || 0;
        const isUp = currentRevenue >= lastRevenue;
        const changePercentage = lastRevenue === 0 ? 100 : ((currentRevenue - lastRevenue) / lastRevenue) * 100;

        const totalTicketsSold = await prisma.purchaseTicket.aggregate({
            _sum: {
              quantity: true,
            },
          });
      
        // Return combined metrics
        return NextResponse.json({
            totalUsers,
            blockedUsers,
            revenue: {
                currentMonth: currentRevenue,
                lastMonth: lastRevenue,
                isUp,
                changePercentage,
            },
            totalTicketsSold: totalTicketsSold._sum.quantity || 0,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
