import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {

    // Fetch paginated users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      users,

    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
