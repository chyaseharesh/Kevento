/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  // useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { flexRender, useReactTable } from "@tanstack/react-table";
import {
  BookAIcon,
  EditIcon,
  EllipsisVertical,
  TicketIcon,
  // Trash2Icon
} from "lucide-react";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  venue: string;
  imageUrl: string;
  date: string; // ISO string format
  category: { name: string };
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TicketInfos from "./TickeDownload";

type Props = {
  data: Event[];
};

export default function EventTable({ data }: Props) {
  const columnHelper = createColumnHelper<Event>();

  const columns = [
    columnHelper.accessor("title", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("venue", {
      header: "Venue",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("imageUrl", {
      header: "Image",
      cell: (info) => {
        return <img src={info.getValue()} alt={info.getValue()} className="w-20" />;
      },
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    }),

    columnHelper.accessor("category.name", {
      header: "Category",
      cell: (info) => info.getValue() || "Uncategorized",
    }),

    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => {
        return (
          <div className="">

            <DropdownMenu>
              <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded-lg w-48 mr-5">

                <DropdownMenuItem className="hover:text-white hover:bg-blue-600 rounded-md hover:cursor-pointer">
                  <BookAIcon />
                  <span>View Bookings</span>
                </DropdownMenuItem>
                <div className="hover:text-white hover:bg-blue-600 rounded-md hover:cursor-pointer">

                  <Dialog>
                    <DialogTrigger className="flex gap-2 p-1 text-sm">
                      <TicketIcon />
                    <span>Download Tickets</span>
                    </DialogTrigger>
                    <DialogContent className="bg-white min-w-72 overflow-y-scroll min-h-96">
                      <DialogHeader>
                        <DialogTitle>Ticket Info</DialogTitle>
                        <DialogDescription>
                          <TicketInfos id={info.getValue()} />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>


                <DropdownMenuItem className="hover:text-white hover:bg-blue-600 rounded-md hover:cursor-pointer">
                  <Link className="flex gap-2" href={
                    `/admin/events/${info.getValue()}`
                  }>
                    <div className="text-xs">
                      <EditIcon />
                    </div>
                    <span>Edit Event</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <button className="hover:text-white hover:bg-red-600 py-1 px-2 rounded-lg">
              <Trash2Icon />
            </button> */}
          </div>
        );

      },
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
      {
        //check if data is empty or not
        data.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No events found.</div>
        ) : (
          // render table if data is not empty
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
          </table>)}


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
