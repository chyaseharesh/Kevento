"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface TicketSalesChartProps {
  eventId: string
}

interface SalesData {
  date: string
  sales: number
  revenue: number
}

export function TicketSalesChart({ eventId }: TicketSalesChartProps) {
  const [data, setData] = useState<SalesData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await fetch(`/api/events/${eventId}/sales`)
        if (!response.ok) throw new Error("Failed to fetch sales data")
        const salesData = await response.json()
        setData(salesData)
      } catch (error) {
        console.error("Error fetching sales data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSalesData()
  }, [eventId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "revenue") return (value)
              return value
            }}
            labelFormatter={(label) => (new Date(label).toLocaleDateString())}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            name="Tickets Sold"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#82ca9d"
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 