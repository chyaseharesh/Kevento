import React from 'react';

function EventBookingTable() {
  return (
    <>
      <div className="w-full pt-20 pb-24">
        <div className="mx-auto mt-8 max-w-screen-lg px-5">
          <div className="sm:flex sm:items-center sm:justify-between gap-5 flex-col sm:flex-row">
            <p className="flex-1 font-bold text-gray-900 text-lg">
              Your Booked <span className="text-primary">Events</span>
            </p>
            <div className="mt-4 sm:mt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-5 bg-white rounded-lg shadow-lg">
                {/* Search Form */}
                <div className="w-full sm:w-auto">
                  <div className="relative">
                    <input
                      className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                      placeholder="Search your booking..."
                    />
                    <button
                      className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
                      type="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-8 h-8 text-slate-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Sort By Section */}
                <div className="flex items-center gap-2 w-fit">
                  <label className="text-sm font-medium text-gray-900">
                    Sort by:
                  </label>
                  <select className="block w-full sm:w-auto rounded-lg border p-2 text-sm outline-none focus:ring-2">
                    <option>Recent</option>
                    <option>Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
                {/* Clear Booking Button */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-primary text-white hover:bg-primary-hover py-2 px-4 text-sm font-medium shadow focus:ring-2"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Booking
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border shadow">
  {/* Outer wrapper for horizontal scroll */}
  <div className="overflow-x-auto">
    {/* Table */}
    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
      {/* Table Header */}
      <thead className="hidden border-b lg:table-header-group">
        <tr>
          <td className="whitespace-nowrap py-4 text-sm font-extrabold text-gray-500 sm:px-6">
            Event Name
          </td>
          <td className="whitespace-nowrap py-4 text-sm font-extrabold text-gray-500 sm:px-6">
            Timing
          </td>
          <td className="whitespace-nowrap py-4 text-sm font-extrabold text-gray-500 sm:px-6">
            PRICE
          </td>
          <td className="whitespace-nowrap py-4 text-sm font-extrabold text-gray-500 sm:px-6">
            STATUS
          </td>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {/* Table Row */}
        <tr>
          <td className="py-4 px-6 ">
            <div className="flex items-center">
              <img
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg"
                className="w-12 h-12 rounded-lg mr-4"
                alt="Event"
              />
              <span className="text-sm text-gray-700">Social Media API</span>
            </div>
          </td>
          <td className="py-4 text-sm text-gray-600 whitespace-nowrap">
            07 February, 2022
          </td>
          <td className="py-4 text-sm text-gray-600 whitespace-nowrap">$59.00</td>
          <td className="py-4">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full">
              Complete
            </span>
          </td>
        </tr>
        {/* Add more rows here */}
      </tbody>
    </table>
  </div>

  {/* Pagination Section */}
  <div className="mt-6 sm:flex sm:items-center sm:justify-between p-4 sm:p-8 overflow-auto">
    <div className="text-sm text-gray-600 dark:text-gray-600">
      Page <span className="font-medium text-gray-600">1 of 10</span>
    </div>
    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
      {/* Previous Page */}
      <a
        href="#"
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </a>
      {/* Next Page */}
      <a
        href="#"
        className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </a>
    </div>
  </div>
</div>


        </div>
      </div>
    </>
  );
}

export default EventBookingTable;
