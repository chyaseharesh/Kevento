/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loding";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TicketTier {
  id: string;
  price: number;
  quantity: number;
  ticketType: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  organizer: string;
  description: string;
  venue: string;
  location: string;
  date: string;
  imageUrl: string;
  status: string;
  totalTicket: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  ticketTiers: TicketTier[];
  tickets: { id: string; tierId: string; userId: string; }[];
}

export default function EventBooking() {
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketTier | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
        if (response.data.ticketTiers?.length === 1) {
          setSelectedTicket(response.data.ticketTiers[0]);
        }
      } catch {
        setError("Failed to fetch event details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500 font-semibold">{error}</div>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4 mt-36">
          {/* Event Image */}
          <div className="col-span-4 sm:col-span-3 z-10">
            <div className="flex flex-col items-center">
              <img
                src={event?.imageUrl}
                className="w-full h-full bg-gray-300 mb-4 shrink-0"
                alt="Event"
              />
            </div>
            <div className="relative w-full h-0 pb-[56.25%] mt-8 border-gray-500 shadow rounded-lg p-6">
              <iframe
                src={`https://www.google.com/maps/embed?pb=${event?.location}`}
                className="absolute top-0 left-0 w-full h-full"
                height={400}
                style={{ width: "100%", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="col-span-4 sm:col-span-9 z-10">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Profile Card */}
              <div className="w-full bg-white p-6 sm:p-8 md:p-12 lg:mx-0 max-w-5xl mx-auto rounded-lg shadow-md">
                <h1 className="text-2xl md:text-3xl font-bold text-left mt-6">
                  {event?.title}
                </h1>
                {/* <div className="w-16 border-b-2 border-primary opacity-50 mt-4"></div> */}

                {/* Information Section */}
                <div className="flex flex-col lg:flex-row flex-wrap gap-6 mt-6">
                  {/* Event Info */}
                  <div className="space-y-3 flex-1">
                    <p className="flex items-center text-base font-bold">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                        />
                      </svg>
                      {event?.date}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-5 h-5 text-primary mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      {event?.date ? new Date(event.date).toLocaleString() : "Date not available"}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-6 h-6 text-primary dark:text-primary mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.64 4.737A7.97 7.97 0 0 1 12 4a7.997 7.997 0 0 1 6.933 4.006h-.738c-.65 0-1.177.25-1.177.9 0 .33 0 2.04-2.026 2.008-1.972 0-1.972-1.732-1.972-2.008 0-1.429-.787-1.65-1.752-1.923-.374-.105-.774-.218-1.166-.411-1.004-.497-1.347-1.183-1.461-1.835ZM6 4a10.06 10.06 0 0 0-2.812 3.27A9.956 9.956 0 0 0 2 12c0 5.289 4.106 9.619 9.304 9.976l.054.004a10.12 10.12 0 0 0 1.155.007h.002a10.024 10.024 0 0 0 1.5-.19 9.925 9.925 0 0 0 2.259-.754 10.041 10.041 0 0 0 4.987-5.263A9.917 9.917 0 0 0 22 12a10.025 10.025 0 0 0-.315-2.5A10.001 10.001 0 0 0 12 2a9.964 9.964 0 0 0-6 2Zm13.372 11.113a2.575 2.575 0 0 0-.75-.112h-.217A3.405 3.405 0 0 0 15 18.405v1.014a8.027 8.027 0 0 0 4.372-4.307ZM12.114 20H12A8 8 0 0 1 5.1 7.95c.95.541 1.421 1.537 1.835 2.415.209.441.403.853.637 1.162.54.712 1.063 1.019 1.591 1.328.52.305 1.047.613 1.6 1.316 1.44 1.825 1.419 4.366 1.35 5.828Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {event?.venue}
                    </p>
                  </div>

                  {/* Ticket Booking Section */}
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-semibold mb-4">Select a Ticket:</h2>
                    <div className="space-y-4">
                      {event?.ticketTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <input
                            type="radio"
                            id={tier.id}
                            name="ticket"
                            value={tier.id}
                            onChange={() => setSelectedTicket(tier)}
                            checked={selectedTicket?.id === tier.id}
                            className="cursor-pointer"
                          />
                          <label htmlFor={tier.id} className="cursor-pointer">
                            <span className="font-medium">{tier.ticketType.name}</span> -{" "}
                            <span className="text-green-600">${tier.price}</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Quantity Section */}
                    <div className="mt-4">
                      <label htmlFor="quantity" className="block font-bold">
                        Quantity:
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value, 10))
                        }
                        className="w-full border border-gray-300 rounded p-2 mt-1"
                      />
                    </div>

                    {/* Book Now Button */}
                    {selectedTicket && (
                      <Link
                        href={`/ticket/[id]?eventId=${event?.id}&ticketId=${selectedTicket.id}&quantity=${quantity}&category=${selectedTicket.ticketType.name}&ticketPrice=${selectedTicket.price}`}
                        className="block mt-4 text-center"
                      >
                        <Button className="w-full hover:text-purple-700 text-white hover:bg-white hover:border-purple-600 border border-purple-600 py-2 rounded-lg">
                          BOOK NOW
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>


              <h1 className="text-2xl font-bold text-left mt-6">
                Events Details
              </h1>
              {/* Introduction */}
              <p className="mt-4 text-lg text-gray-700">{event?.description}</p>
              <p className="border-b-2 border-black font-extrabold mt-4"></p>
              <h1 className="text-2xl font-bold text-left mt-6">
                Terms & Conditions
              </h1>
              {/* Introduction */}
              <div className="flex flex-col gap-1">
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>Only 18+ are allowed to attend the event.</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>Attendee must bring their valid ID card for the entry.</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>
                    Ticket buyers are solely responsible for themselves and
                    their dependents.
                  </b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>
                    The event organizer or ticketing partner will not assume
                    responsibility for any claims or risks arising directly or
                    indirectly during the event.”
                  </b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>
                    All Customers attending an Event or performance must hold a
                    valid ticket for the same.&nbsp;
                  </b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <b>No outside food or drinks are permitted.&nbsp;</b>
                </p>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Non-Refundable & Non-Transferable tickets, unless the event is
                  canceled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
