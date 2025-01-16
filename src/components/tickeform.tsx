/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface BookTicketProps {
  ticketTierId: string;
  quantity: number | undefined;
}



export default function BookTicket({ ticketTierId: initialTicketTierId, quantity: initialQuantity }: BookTicketProps) {
  const [ticketTierId, setTicketTierId] = useState(initialTicketTierId || '');
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [isBooked, setIsBooked] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Show popup state
  const [loading, setLoading] = useState(false); // Loading state
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setTicketTierId(initialTicketTierId || '');
    setQuantity(initialQuantity || 1);
  }, [initialTicketTierId, initialQuantity]);

  const handleBooking = async () => {
    if (!ticketTierId || quantity <= 0) {
      return;
    }

    if (!session.data?.user.id) {
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/purchases/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.data?.user.id, ticketTierId, quantity }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.ticketss);

        setIsBooked(true);
        setShowPopup(true); // Show popup
        toast.success(result.message);
      } else {
        console.log(`Error: ${result.error}`);
        toast.error(result.error);

      }
    } catch (error) {
      console.error(error);
      console.log('An unexpected error occurred.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false); // Close popup
    router.push('/profile'); // Navigate to profile page
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 justify-center">
        <Button
          className={`hover:text-purple-700 mt-4 text-white hover:bg-white hover:border-purple-600 border border-purple-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleBooking}
          disabled={loading || isBooked}
        >
          {loading ? 'Booking...' : isBooked ? 'Ticket Booked' : 'Book Tickets'}
        </Button>
      </div>

      {/* Show Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Popup Section */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
            <h2 className="text-lg font-bold text-green-500">Success!</h2>
            <p className="mt-2 text-gray-700">Your ticket has been booked successfully!</p>
            <Button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handlePopupClose}
            >
              Go to Profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
