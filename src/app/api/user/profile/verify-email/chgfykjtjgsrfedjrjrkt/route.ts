import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url); // Parse the request URL
  const token = url.searchParams.get("token"); // Extract query parameter

  if (!token) {
    const failUrl = `${url.origin}/verification-fail`;
    return NextResponse.redirect(failUrl);
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() }, // Check if the token is valid and not expired
      },
    });

    if (!user) {
        console.log("user not found")
        const failUrl = `${url.origin}/verification-fail`;
        return NextResponse.redirect(failUrl);
        }

    // Token is valid; update the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // Construct absolute URL for success redirect
    const successUrl = `${url.origin}/verification-success`;
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error("Verification error:", error);

    // Construct absolute URL for failure redirect
    const failUrl = `${url.origin}/verification-fail`;
    return NextResponse.redirect(failUrl);
  }
}
