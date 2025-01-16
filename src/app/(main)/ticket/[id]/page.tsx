/* eslint-disable @next/next/no-img-element */
'use client';
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loding";
import { Button } from "@/components/ui/button";
import { TicketEditModal } from "@/components/common/TicketEditModal";
import BookTicket from "@/components/tickeform";

interface CheckoutDetails {
  ticketId: string | undefined;
  quantity: number;
  ticketPrice: number;
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
  ticketPrice: number;
}

type Props = object;

export default function Checkout({ }: Props) {
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal state

  const searchParams = useSearchParams();

  const [ticketTierId, setTicketTierId] = useState('');
  useEffect(() => {
    const loadCheckoutDetails = async () => {
      try {
        const ticketId = searchParams.get("ticketId");
        const quantity = searchParams.get("quantity");
        const eventId = searchParams.get("eventId");
        const ticketPriceParam = searchParams.get("ticketPrice");

        if (!ticketId || !quantity || !eventId) {
          throw new Error("Missing required checkout details.");
        }

        // Fetch event details
        const response = await axios.get(`/api/events/${eventId}`);
        setEvent(response.data);

        // Set checkout details
        const ticketPrice = ticketPriceParam ? parseFloat(ticketPriceParam) : response.data.ticketPrice || 0;
        setCheckoutDetails({
          ticketId,
          quantity: parseInt(quantity, 10),
          ticketPrice: ticketPrice,
        });

        // Extract the first ticketTierId
        if (response.data.ticketTiers.length > 0) {
          setTicketTierId(response.data.ticketTiers[0].id);  // Set the ticket tier id
        }

      } catch {
        setError("Failed to load checkout details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutDetails();
  }, [searchParams]);


  const handleEditTicket = (quantity: number) => {
    if (checkoutDetails) {
      setCheckoutDetails({
        ...checkoutDetails,
        quantity,
      });
    }
    setIsModalOpen(false);  // Close the modal after saving
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4 text-sm text-purple-600">
          <span className="hover:underline">Events</span>
          {' / '}
          <span className="hover:underline">{event?.title}</span>
          {' / '}
          <span>Purchase Ticket</span>
        </div>

        <div className="container mx-auto flex justify-around items-start md:items-center gap-6 px-4 py-6">
          {/* Left Column */}
          <div className="space-y-6 md:flex md:space-x-6 justify-around text-center flex-1 flex-wrap">
            {/* Event Image */}
            <img
              src={event?.imageUrl || "/placeholder.svg"}
              alt={event?.title || "Event Banner"}
              className="rounded-lg w-full md:w-[600px] md:h-[500px] object-cover"
            />

            {/* Ticket Summary */}
            <div className="p-6 bg-white shadow-md rounded-lg w-full flex-1">
              <h1 className="text-2xl font-bold mb-4">{event?.title}</h1>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ticket Summary</h2>
                <div className="flex items-center gap-2">
                  <span>Total Tickets:</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {checkoutDetails?.quantity}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center py-4 border-t">
                <span>
                  {checkoutDetails?.quantity} Ticket x Rs. {checkoutDetails?.ticketPrice}
                </span>
                <span>
                  Rs. {checkoutDetails ? checkoutDetails.quantity * checkoutDetails.ticketPrice : 0}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-t font-semibold">
                <span>Total Amount</span>
                <span>Rs. {checkoutDetails ? checkoutDetails.quantity * checkoutDetails.ticketPrice : 0}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                {/* Edit Tickets Button */}
                <Button
                  className="hover:text-purple-700 text-white hover:bg-white hover:border-purple-600 border border-purple-600 px-4 py-2 rounded-md w-full md:w-auto text-center"
                  onClick={() => setIsModalOpen(true)}
                >
                  EDIT TICKETS
                </Button>

                {/* Book Ticket Component */}
                <BookTicket
                  ticketTierId={ticketTierId}
                  quantity={checkoutDetails?.quantity}
                />
              </div>

            </div>

          </div>
        </div>

        {/* Ticket Edit Modal */}
        {isModalOpen && (
          <TicketEditModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleEditTicket}
            currentQuantity={checkoutDetails?.quantity ?? 1}
            currentTicketId={checkoutDetails?.ticketId ?? ''}
            selectedPrice={checkoutDetails?.ticketPrice ?? 0}
          />
        )}
      </div>


      {/* <ConcertTicket/> */}
    </>

  );
}
