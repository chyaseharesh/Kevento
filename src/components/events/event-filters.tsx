'use client';

import { useRouter, useSearchParams } from "next/navigation"

const CATEGORIES = [
  { id: "MUSIC", name: "Music" },
  { id: "SPORTS", name: "Sports" },
  { id: "ARTS", name: "Arts" },
  { id: "FOOD", name: "Food" },
  { id: "TECHNOLOGY", name: "Technology" },
  { id: "BUSINESS", name: "Business" },
  { id: "OTHER", name: "Other" },
]

export function EventFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category")

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set("category", categoryId)
    } else {
      params.delete("category")
    }
    params.delete("page") // Reset to first page
    router.push(`/events?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
            !currentCategory ? "bg-gray-100 font-medium" : ""
          }`}
        >
          All Events
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
              currentCategory === category.id ? "bg-gray-100 font-medium" : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
} 