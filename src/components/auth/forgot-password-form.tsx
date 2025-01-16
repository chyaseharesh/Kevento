'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useRouter } from "next/navigation"
import { ForgotPasswordInput, forgotPasswordSchema } from "@/lib/validations/auth"

export function ForgotPasswordForm() {
  // const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      setSuccess("Password reset instructions have been sent to your email")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          className="w-full rounded-lg border p-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      {error && (
        <div className="rounded-lg bg-red-50 p-2 text-sm text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 p-2 text-sm text-green-500">
          {success}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Send Reset Instructions"}
      </button>
    </form>
  )
} 