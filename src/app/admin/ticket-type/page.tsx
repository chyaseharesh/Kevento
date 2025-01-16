"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import TicketTypeTable from "./components/TicketTypeTable";
// import TicketTypeTable from "./components/TicketTypeTable";

type TicketType = {
  id: string;
  name: string;
};


const TicketType = () => {
  const [data, setData] = useState<TicketType[]>([]);
  const [filter, setFilter] = useState(""); // Search filter
  const [filteredData, setFilteredData] = useState<TicketType[]>([]);

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicketType = async () => {
      // setIsLoading(true);
      try {
        const response = await axios.get("/api/ticket-type");
        setFilteredData(response.data.ticketTypes)
        console.log(response.data)
        setData(response.data.ticketTypes);
      } catch(error) {
        toast.error("Failed to fetch ticketTypes");
        console.log(error)
      }
    };

    fetchTicketType();
  }, []);
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filtered = data.filter((event) => {
        const matchesSearch =
          (event.name?.toLowerCase().includes(filter.toLowerCase()) || false)

        return matchesSearch;
      });

      setFilteredData(filtered);
    }
  }, [filter, data]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex justify-between items-center">
        <PageTitle title="Ticket Type" />
        <Link
          href="/admin/ticket-type/add"
          className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded-lg"
        >
          <span>+ </span>Add Ticket Type
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by name"
        className="border px-2 py-2 rounded-xl w-72"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <TicketTypeTable data={filteredData} />
    </div>
  );
};

export default TicketType;
