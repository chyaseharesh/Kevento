'use client'

import React, { Suspense } from "react"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { useSearchParams } from "next/navigation"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  if (!token) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <p className="text-red-500">Invalid or missing token</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below
        </p>
      </div>
      <ResetPasswordForm token={token} />
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}
