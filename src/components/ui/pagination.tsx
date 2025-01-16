'use client';

import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface PaginationProps {
  pageCount: number
  currentPage: number
}

export function Pagination({ pageCount, currentPage }: PaginationProps) {
  const searchParams = useSearchParams()
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `/events?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`rounded-lg px-3 py-2 text-sm ${
            currentPage === page
              ? "bg-black text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < pageCount && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  )
} 