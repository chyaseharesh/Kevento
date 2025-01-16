/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import PurchaseTable from "./component/PurchaseTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loading from "@/components/ui/loding";

type Props = object;


type Purchase = {
    id: string;
    status: string;
    date: string;
    createdAt: string; // Add the createdAt property
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
            }
        }
    ];
    user: { name: string };
};

export default function PurchasesPage({ }: Props) {
    const [purchases, setPurchases] = useState<Purchase[] | null>(null); // Null for loading state
    const [filter, setFilter] = useState(""); // Search filter
    const [filteredData, setFilteredData] = useState<Purchase[]>([]);

    // Fetch purchases on component mount
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await fetch("/api/purchases");
                const data = await response.json();
                setPurchases(data); // Set the full purchase data
                setFilteredData(data); // Initialize filtered data
                console.log(data)
            } catch (error) {
                console.error("Error fetching purchases:", error);
                setPurchases([]); // Fallback to empty array on error
            }
        };

        fetchPurchases();
    }, []);

    useEffect(() => {
        if (purchases && Array.isArray(purchases)) {
            const filtered = purchases.filter((purchase) => {
                const matchesSearch =
                    (purchase.id?.toLowerCase().includes(filter.toLowerCase()) || false) ||
                    (purchase.tickets[0].ticket.event.title?.toLowerCase().includes(filter.toLowerCase()) || false) ||
                    (purchase.tickets[0].ticket.event.organizer?.toLowerCase().includes(filter.toLowerCase()) || false) ||
                    (purchase.tickets[0].ticket.ticketTier.ticketType.name?.toLowerCase().includes(filter.toLowerCase()) || false)

                return matchesSearch;
            });

            setFilteredData(filtered);
        }
    }, [filter, purchases]);

    if (purchases === null) {
        // Render a loading state until data is fetched
        return <Loading/>;
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between items-center">
                <PageTitle title="Purchases" />

            </div>

            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Search by puurchase id or purchase id"
                    className="border tex-sm h-10 rounded-lg w-full"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

            </div>

            <Tabs defaultValue="ALL" className="w-full">
                <TabsList>
                    <TabsTrigger value="ALL">ALL</TabsTrigger>
                    <TabsTrigger value="CONFIRMED">CONFIRMED</TabsTrigger>
                    <TabsTrigger value="PENDING">PENDING</TabsTrigger>
                    <TabsTrigger value="COMPLETED">COMPLETED</TabsTrigger>
                    <TabsTrigger value="CANCELLED">CANCELLED</TabsTrigger>
                    <TabsTrigger value="REFUNDED">REFUNDED</TabsTrigger>
                    <TabsTrigger value="PARTIAL_REFUNDED">PARTIAL_REFUNDED</TabsTrigger>
                    <TabsTrigger value="BLOCKED">BLOCKED</TabsTrigger>
                </TabsList>
                <TabsContent value="ALL">
                    <PurchaseTable data={filteredData} /> 
                </TabsContent>
                <TabsContent value="CONFIRMED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "CONFIRMED")} />
                </TabsContent>
                <TabsContent value="PENDING">
                    {/* Table */}
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "PENDING")} />
                </TabsContent>

                <TabsContent value="COMPLETED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "COMPLETED")} />

                </TabsContent>

                <TabsContent value="CANCELLED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "CANCELLED")} />

                </TabsContent>
                <TabsContent value="REFUNDED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "REFUNDED")} />

                </TabsContent>
                <TabsContent value="PARTIAL_REFUNDED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "PARTIAL_REFUNDED")} />

                </TabsContent>

                <TabsContent value="BLOCKED">
                    <PurchaseTable data={filteredData.filter((purchase) => purchase.status === "BLOCKED")} />

                </TabsContent>
            </Tabs>


        </div>
    );
}
