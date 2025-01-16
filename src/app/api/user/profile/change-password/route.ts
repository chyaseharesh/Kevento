import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { changePasswordSchema } from "@/lib/validations/auth"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        )
      }
    const body = await req.json()
    const { oldPassword, newPassword } = changePasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }
    const isPasswordValid = bcrypt.compare(oldPassword, user.password || "")
    if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Incorrect old password" },
          { status: 400 }
        )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword
      },
    })

    return NextResponse.json({ message: "Password change successful" })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 