/* eslint-disable @next/next/no-img-element */
"use client";
import Loading from "@/components/ui/loding";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TiCketDownloadDialogue from "@/components/TiCketDownloadDialogue";
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

export default function TicketInfos({ id }: { id: string }) {
    const session = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [event, setEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); // Show popup state
    const [purchaseId, setPurchaseId] = useState<string | null>(null);


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/events/${id}`);
                setEvent(response.data);
                console.log(response.data);

            } catch {
                setError("Failed to fetch event details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [id]);
    //function to handle purchase

    const handlePurchase = async (
        ticketTierId: string,
    ) => {
        if (!ticketTierId || quantity <= 0) {
            setMessage("Please provide a valid ticket tier ID and quantity.");
            return;
        }
        setIsLoading(true); // Start loading
        try {
            const response = await fetch('/api/purchases/ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: session.data?.user.id, ticketTierId, quantity }),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Ticket booked successfully!');
                console.log(result.ticketss);
                setPurchaseId(result.purchase.id);
                setShowPopup(true); // Show popup

            } else {
                setMessage(`Error: ${result.error}`);

            }
        } catch (error) {
            console.error(error);
            setMessage('An unexpected error occurred.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center text-red-500 font-semibold">{message}</div>
            </div>
        );
    }
    return (
        <div>
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-semibold tracking-tight">{event?.title}</h1>
                <div className="flex gap-2">
                    <div className="w-1/3">
                        <img src={event?.imageUrl} alt={event?.title} className="w-full h-auto object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm">Organizer: {event?.organizer}</div>
                        <div className="text-sm">Venue: {event?.venue}</div>
                        <div className="text-sm">Date: {event?.date ? new Date(event.date).toLocaleDateString() : 'N/A'}</div>
                        <div className="text-sm">Total Tickets: {event?.totalTicket}</div>
                        <div className="text-sm">
                            <h2 className="font-bold mt-2">Ticket Tiers:</h2>
                            <ul>
                                {event?.ticketTiers.map((tier) => (
                                    <li key={tier.id} className="mb-1 flex gap-1">
                                        <span>{tier.ticketType.name} - ${tier.price} ({tier.quantity} tickets)</span>
                                        <input type="number" className="w-10 border-2 border-gray-500 text-sm text-center text-black rounded-lg" value={quantity} onChange={
                                            (e) => {
                                                setQuantity(Number(e.target.value));
                                            }
                                        } />
                                        <button className=" ml-2" onClick={() => handlePurchase(tier.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-down" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z" />
                                                <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            {/* Popup Section */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
                        <h2 className="text-lg font-bold text-green-500">Success!</h2>
                        <p className="mt-2 text-gray-700">Your ticket has been booked successfully!</p>
                        {purchaseId && <TiCketDownloadDialogue id={purchaseId} />}
                    </div>
                </div>
            )}
        </div>
    );
}
