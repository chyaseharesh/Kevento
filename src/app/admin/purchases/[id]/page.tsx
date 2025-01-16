/* eslint-disable @next/next/no-img-element */
'use client';

import PageTitle from '@/components/PageTitle';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { changePurchaseStatus } from '@/actions/tickets';
import Loading from '@/components/ui/loding';
import { toast } from 'react-toastify';

const PurchaseDetails = () => {
    const { id } = useParams();
    interface Purchase {
        status: string;
        tickets: {
            ticket: {
                event: {
                    id: string;
                    title: string;
                    date: string;
                    location: string;
                    venue: string;
                    organizer: string;
                };
                ticketTier: {
                    ticketType: {
                        name: string;
                    };
                };
                ticketNumber: string;
                status: string;
                qrCode: string;
            };
        }[];
        totalAmount: number;
        user: {
            id: string;
            name: string;
            email: string;
        };
    }

    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const router=useRouter();
    async function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>){
      try {
        const status = event.target.value;
        console.log(status)
        console.log(id)
        const resp=await changePurchaseStatus(status,id as string)
        console.log(resp)
        if(resp.success){
          toast.success("Status updated successfully")
          router.push(`/admin/purchases`)
        //   router.refresh()
          
        }else{
          toast.error("Something went wrong!")
        }
        
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Something went wrong!")

        
      }
    }

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                console.log(`Fetching purchase details for ID: ${id}`); // Debug log

                const response = await axios.get(`/api/purchases/${id}`);
                console.log('API response:', response); // Log the entire response object
                setPurchase(response.data); // Set the purchase details
            } catch (error) {
                console.error('Error fetching purchase details:', error);
            }
        };

        if (id) {
            fetchPurchase();
        }
    }, [id]);

    return (
        <div className="flex flex-col gap-5 w-full p-4 border rounded-lg">
            <div className="flex justify-between">
                <PageTitle title="Purchase Detail" />
                <Link href={'/admin/purchases'}>
                    <div className="flex">
                        <ArrowLeft />
                        <span>Back</span>
                    </div>
                </Link>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
                {purchase ? (
                    <div>
                        <form action="" className='mb-2'>
                            <label className='text-lg font-bold mr-3' htmlFor="stats">Purchase Status</label>
                            <select name="status" id="stats" value={purchase.status} onChange={(e) => handleStatusChange(e)}>
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                {/* <option value="COMPLETED">COMPLETED</option> */}
                                <option value="CANCELLED">CANCELLED</option>
                                <option value="REFUNDED">REFUNDED</option>
                                <option value="PARTIAL_REFUNDED">PARTIAL_REFUNDED</option>
                                <option value="BLOCKED">BLOCKED</option>
                            </select>
                        </form>
                        <div className="flex gap-2">
                            <div className="border-2 flex-1 p-2 rounded-lg">
                                <h2 className='font-bold text-lg'>Event Details</h2>
                                <p className='my-3'>Event ID: <span className='font-bold'>{purchase.tickets[0].ticket.event.id}</span></p>
                                <p className='my-3'>Event Title:  <span className='font-bold'>{purchase.tickets[0].ticket.event.title}</span></p>
                                <p className='my-3'>Event Date:  <span className='font-bold'>{purchase.tickets[0].ticket.event.date}</span></p>
                                <p className='my-3'>Event Location:  <a className='p-1 underline' target='_blank' href={purchase.tickets[0].ticket.event.location}>View in Map</a></p>
                                <p className='my-3'>Event Venue:  <span className='font-bold'>{purchase.tickets[0].ticket.event.venue}</span></p>
                                <p className='my-3'>Event Organizer:  <span className='font-bold'>{purchase.tickets[0].ticket.event.organizer}</span></p>
                                {/* <p className='my-3'>Event Status:  <span className='font-bold'>{purchase.tickets[0].ticket.event.status}</span></p> */}

                            </div>
                            <div className="border-2 flex-1 p-2">
                                <h2 className='font-bold text-lg'>Ticket Details</h2>
                                {
                                    purchase.tickets.map((ticket, index) => (
                                        <div key={index} className='my-3'>
                                            <div className='p-2'>
                                                <div className="border flex justify-between p-2">
                                                    <div>
                                                        <p className='text-yellow-300 font-bold'>
                                                            {ticket.ticket.ticketTier.ticketType.name}
                                                        </p>
                                                        <p>
                                                            {ticket.ticket.ticketNumber}
                                                        </p>
                                                        <p className='mt-2'>
                                                            Status: <span className="py-1 px-2 bg-purple-600 rounded text-white">
                                                            {ticket.ticket.status}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <img className='w-24' src={ticket.ticket.qrCode} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <p>Total Amount: Rs. {purchase?.totalAmount}</p>
                            </div>
                        </div>
                        <div className="mt-4 border rounded-md">
                            <h2 className="font-bold mb-2 text-lg">User Detail</h2>
                            <p>ID: <span className="font-bold">{purchase?.user.id}</span></p>
                            <p>Name: <span className="font-bold">{purchase?.user.name}</span></p>
                            <p>Email: <span className="font-bold">{purchase?.user.email}</span></p>
                        </div>
                        {/* <pre>{JSON.stringify(purchase, null, 2)}</pre> */}
                    </div>
                ) : (
                    <Loading/>
                )}
            </div>
        </div>
    );
};

export default PurchaseDetails;
