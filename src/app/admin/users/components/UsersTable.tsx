/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { BadgeCheck, BadgeXIcon, EllipsisVertical, UserRoundCheckIcon } from "lucide-react";
import { blockUser, changeUserRole } from "@/actions/auth";
import { toast } from "react-toastify";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  emailVerified: boolean;

};

type Props = {
  data: User[];
};

export default function UsersTable({ data }: Props) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Track the selected user ID
  const [selectedUserIdss, setSelectedUserIdss] = useState<string | null>(null); // Track the selected user ID
  const [role, setRole] = useState("");

  const handleRoleChange = async () => {
    if (!selectedUserId) return;

    const res = await changeUserRole(role, selectedUserId);
    if (res.success) {
      setSelectedUserId(null);
      toast.success(res.message);
      window.location.reload(); // Reload the page
    } else {
      console.error("Failed to change role");
      toast.error(res.message);
      setSelectedUserId(null);
    }
  };
  async function handleBlockUser(selectedUserIdss: string | null) {
    if (!selectedUserIdss) return;
  
    const res= await blockUser(selectedUserIdss);
    if (res.success) {
      setSelectedUserIdss(null);
      toast.success(res.message);
      window.location.reload(); // Reload the page
    }
    else {
      console.error("Failed to block user");
      toast.error(res.message);
      setSelectedUserIdss(null);
    }
  }
  
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => {
        return (
          <div className="flex justify-center gap-1">
            <span>{info.getValue()}</span>
            {/* check email emailVerified */}
            {data.find((user) => user.id === info.row.original.id)?.emailVerified ? (
              <BadgeCheck className="w-5 h-5 text-green-500 mt-1" />
            ) : (
              <BadgeXIcon className="w-5 h-5 text-red-500 mt-1" />
            )}
          </div>
        )
      },
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isBlocked", {
      header: "Status",
      cell: (info) => (
        <span className={`text-sm px-2 border-2 rounded-xl ${info.getValue() == true ? "text-red-400 border-red-400" : "text-green-400 border-green-400"}`}>{info.getValue() === true ? "Blocked" : "Active"}</span>
      ),
    }),
    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => (
        <div>
          {selectedUserId === info.getValue() && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl mx-auto">
                <h2 className="text-lg font-bold text-gray-800">Are you sure?</h2>
                <p className="mt-2 text-gray-700">The user role will be Changed!</p>
                <p className="mt-2 text-gray-700">Please Choose the role you want assign.</p>
                <select
                  className="mt-4 w-full py-2 px-3 border rounded-md"
                  onChange={(e) => setRole(e.target.value)}
                  value={role || data.find((user) => user.id === info.getValue())?.role}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <div className="flex justify-center gap-2">
                  <button
                    className="mt-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={() => setSelectedUserId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
                    onClick={handleRoleChange}
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md rounded-lg w-48 mr-5">
              <DropdownMenuItem
                className="hover:text-white hover:bg-blue-600 rounded-md hover:cursor-pointer"
                onClick={() => {
                  setSelectedUserId(info.getValue());
                  setRole(data.find((user) => user.id === info.getValue())?.role || "USER");
                }}
              >
                <UserRoundCheckIcon />
                <span>Change Role</span>
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger className="hover:text-white w-full p-1 hover:bg-blue-600 rounded-md">
                  <div className="hover:text-white w-full p-1 hover:bg-blue-600 rounded-md hover:cursor-pointer flex items-center gap-2 px-2"
                    onClick={() => setSelectedUserIdss(info.getValue())}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-ban text-red-600" viewBox="0 0 16 16">
                      <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0" />
                    </svg>
                    <span className="text-sm">Block User</span>
                  </div>

                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white shadow-md rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure to block?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will disable users to buy a event tickets.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-white"
                      onClick={() => {handleBlockUser(selectedUserIdss);
                      }}
                    >Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="overflow-auto">
      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No Users found.</div>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-4 gap-3">
        <button
          className="border-2 border-gray-600 px-2 rounded-lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          className="border-2 border-gray-600 px-2 rounded-lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

