import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { profileSchema } from "@/lib/validations/user"
import { emailVerificationTemplate } from "@/lib/email-templates"
import { sendEmail } from "@/lib/email"
import crypto from "crypto"


export async function PATCH(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized",success:false },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, email, phone } = profileSchema.parse(body)

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        phone,
      },
    })
    if (session?.user.email !== email) {
      const resetToken = crypto.randomBytes(32).toString("hex")
      const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour
      const updateUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          emailVerified: null,
          resetToken,
          resetTokenExpiry,
        },
      })
      if (updateUser) {
        await sendEmail(
          email,
          "Email Verification",
          emailVerificationTemplate(updateUser.resetToken as string))
      }
    }

    return NextResponse.json({
      message:"Profile Updated Successfully!",
      user,
      success: true,
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
// get user profile
export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    return NextResponse.json({
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        emailVerified: user?.emailVerified,
      },
      success: true,
    })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}