"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import UsersTable from "./components/UsersTable";
import { BadgeCheck } from "lucide-react";
// import UserTable from "./components/UserTable";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  emailVerified: boolean
};


const Users = () => {
  const [data, setData] = useState<User[]>([]);
  const [filter, setFilter] = useState(""); // Search filter
  const [filteredData, setFilteredData] = useState<User[]>([]);

  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      // setIsLoading(true);
      try {
        const response = await axios.get("/api/user");
        setFilteredData(response.data.users)
        setData(response.data.users);
      } catch {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
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
        <PageTitle title="Users" />
        {/* <Link
          href="/admin/users/add"
          className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded-lg"
        >
          <span>+ </span>Add User
        </Link> */}
      </div>

      <input
        type="text"
        placeholder="Search by name"
        className="border px-2 py-2 rounded-xl w-72"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex gap-4 mx-6">
        <div className="flex gap-1">
          <span>Verified</span>
          <BadgeCheck className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex gap-1">
          <span>Unverified</span>
          <BadgeCheck className="w-5 h-5 text-red-500" />
          </div>
      </div>

      <UsersTable data={filteredData} />
    </div>
  );
};

export default Users;
