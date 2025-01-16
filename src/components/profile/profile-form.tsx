import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "next-auth"
import { useRouter } from "next/navigation"
import { ProfileInput, profileSchema } from "@/lib/validations/user"

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  })

  const onSubmit = async (data: ProfileInput) => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      setSuccess("Profile updated successfully")
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            disabled={isLoading}
            className="w-full rounded-lg border p-2"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            disabled={true}
            className="w-full rounded-lg border bg-gray-100 p-2"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            disabled={isLoading}
            className="w-full rounded-lg border p-2"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
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
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
} 