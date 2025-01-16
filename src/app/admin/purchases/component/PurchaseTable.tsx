/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  EyeIcon,
  // Trash2Icon
} from "lucide-react";
import Link from "next/link";


type Purchase = {
  id: string;
  status: string;
  createdAt: string;
  tickets: [
    ticket: {
      ticket: {
        event: {
          title: string;
          organizer: string
        };
        ticketTier: {
          ticketType: {
            name: string;
          }
        }
      };
    }
  ];
  user: { name: string };
};


type Props = {
  data: Purchase[];
};

export default function PurchaseTable({ data }: Props) {
  const columnHelper = createColumnHelper<Purchase>();

  const columns = [
    columnHelper.accessor("id", {
      header: "Purchase ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("tickets", {
      header: "Event Name",
      cell: (info) => {
        return info.getValue()[0].ticket.event.title;
      },
    }),
    columnHelper.accessor("tickets", {
      header: "Ticket Type",
      cell: (info) => {
        return info.getValue()[0].ticket.ticketTier.ticketType.name;
      },
    }),
    columnHelper.accessor("tickets", {
      header: "Event Organizer",
      cell: (info) => {
        return info.getValue()[0].ticket.event.organizer;
      },
    }),

    columnHelper.accessor("user", {
      header: "Customer Name",
      cell: (info) => {
        return info.getValue().name;
      },
    }),


    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        return info.getValue();
      }
    }),

    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
    }),

    columnHelper.accessor("id", {
      header: "Action",
      cell: (info) => {
        return (
          <div className="flex gap-2 items-center">
            <Link href={`/admin/purchases/${info.getValue()}`} className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-lg">
              <EyeIcon />
            </Link>
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
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
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
