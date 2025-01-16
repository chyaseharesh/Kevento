import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"
import * as z from "zod"

const prisma = new PrismaClient()

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Raw body:", body);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = registerSchema.parse(body);
    console.log("Parsed body:", { name, email, password, phone });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });



    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        id:nanoid(),
        name,
        email,
        password: hashedPassword,
        phone,        
      },
    });

    const abcc= NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,  
        },
      },
      { status: 201 }
    );
    console.log("abcc"+abcc)
    return abcc;
  } catch (error) {
    const errorDetails =
    error instanceof Error ? { message: error.message, stack: error.stack } : error;
  console.log(errorDetails)

    // return NextResponse.json(
    //   { error: "Internal server error" },
    //   { status: 500 }
    // );
  }
}
