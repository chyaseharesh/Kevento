'use client';

import Loading from '@/components/ui/loding';
import axios from 'axios';
import Link from 'next/link';
import React, { Key, useEffect, useState } from 'react';

type Props = object;

type Purchase = {
    id: string;
    status: string;
    createdAt: string;
    totalAmount: string;
    tickets: [
        ticket: {
            ticket: {
                id: Key | null | undefined;
                event: {
                    title: string;
                    organizer: string;
                };
                ticketTier: {
                    ticketType: {
                        name: string;
                    };
                };
            };
        }
    ];
    user: { name: string };
};

const PurchasePage = ({}: Props) => {
    const [purchases, setPurchases] = useState<Purchase[] | null>(null); // Null for loading state
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch purchases by user ID
    async function fetchPurchase() {
        try {
            const response = await axios.get(`/api/user/profile/purchases`);
            console.log(response.data);
            setPurchases(response.data);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPurchase();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Purchases</h2>

            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loading/>
                    {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
                </div>
            ) : (
                <div className="space-y-4">
                    {purchases && purchases.length > 0 ? (
                        purchases.map((purchase) => (
                            <div
                                key={purchase.id}
                                className="flex justify-between p-4 border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                            >
                                <div>
                                    <h3 className="text-sm text-gray-500">Purchase ID: {purchase.id}</h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(purchase.createdAt).toLocaleString()}
                                    </p>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {purchase.tickets[0]?.ticket.event.title}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        {purchase.tickets.length} × {purchase.tickets[0]?.ticket.ticketTier.ticketType.name}{' '}
                                        Ticket(s) | Status: {purchase.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-gray-800">Rs. {purchase.totalAmount}</p>
                                    <Link
                                        href={`/profile
                                            /purchases/${purchase.id}`}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mt-2 inline-block"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No purchases found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PurchasePage;
