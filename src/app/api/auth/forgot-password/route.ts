import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { forgotPasswordSchema } from "@/lib/validations/auth"
// import { sendEmail } from "@/lib/email"
import { sendEmail } from "@/lib/mail"
import crypto from "crypto"
import { forgotPasswordTemplate } from "@/lib/email-templates"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = forgotPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send reset email
    await sendEmail(
       user.email,
      "Password Reset",
      forgotPasswordTemplate(
        resetToken
      ),
    )

    return NextResponse.json({ message: "Reset email sent" })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 