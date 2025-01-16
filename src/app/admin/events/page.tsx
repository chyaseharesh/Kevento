/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import EventTable from "./component/EventTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = object;


type Event = {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  category: { name: string };
  title: string;
  venue: string;
  imageUrl: string;
};

export default function EventsPage({ }: Props) {
  const [events, setEvents] = useState<Event[] | null>(null); // Null for loading state
  const [filter, setFilter] = useState(""); // Search filter
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter
  const [filteredData, setFilteredData] = useState<Event[]>([]);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data); // Set the full event data
        setFilteredData(data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Fallback to empty array on error
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events && Array.isArray(events)) {
      const filtered = events.filter((event) => {
        const matchesSearch =
          (event.name?.toLowerCase().includes(filter.toLowerCase()) || false) ||
          (event.description?.toLowerCase().includes(filter.toLowerCase()) || false);

        const matchesCategory =
          !categoryFilter || event.category?.name === categoryFilter;

        return matchesSearch && matchesCategory;
      });

      setFilteredData(filtered);
    }
  }, [filter, categoryFilter, events]);

  if (events === null) {
    // Render a loading state until data is fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Link
          href="/admin/events/add"
          className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded-lg"
        >
          <span>+ </span>Add Event
        </Link>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search by name or description"
          className="border px-2 py-3 rounded-xl w-full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="border px-2 py-1 rounded-xl"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {Array.from(
            new Set(events.map((event) => event.category?.name))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="DRAFT" className="w-full">
        <TabsList>
          <TabsTrigger value="PUBLISHED">PUBLISHED</TabsTrigger>
          <TabsTrigger value="DRAFT">DRAFT</TabsTrigger>
          <TabsTrigger value="COMPLETED">COMPLETED</TabsTrigger>
          <TabsTrigger value="CANCELLED">CANCELLED</TabsTrigger>
          <TabsTrigger value="ARCHIVED">ARCHIVED</TabsTrigger>
          <TabsTrigger value="UPCOMING">UPCOMING</TabsTrigger>
        </TabsList>
        <TabsContent value="PUBLISHED">
          {/* Table */}
          <EventTable data={filteredData.filter((event) => event.status === "PUBLISHED")} />
        </TabsContent>
        <TabsContent value="DRAFT">
          {/* Table */}
          <EventTable data={filteredData.filter((event) => event.status === "DRAFT")} />
        </TabsContent>

        <TabsContent value="COMPLETED">
        <EventTable data={filteredData.filter((event) => event.status === "COMPLETED")} />

        </TabsContent>

        <TabsContent value="CANCELLED">
        <EventTable data={filteredData.filter((event) => event.status === "CANCELLED")} />

        </TabsContent>
        <TabsContent value="ARCHIVED">
        <EventTable data={filteredData.filter((event) => event.status === "ARCHIVED")} />

        </TabsContent>
        <TabsContent value="UPCOMING">
        <EventTable data={filteredData.filter((event) => event.status === "UPCOMING")} />

        </TabsContent>
      </Tabs>


    </div>
  );
}