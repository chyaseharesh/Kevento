/* eslint-disable @next/next/no-img-element */
'use client';

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ConcertTicket from '@/components/common/ConcertTicket';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Loading from '@/components/ui/loding';
interface Purchase {
    id: string;
    status: string;
    totalAmount: number;
    tickets: {
        quantity: number;
        ticket: {
            event: {
                id: string;
                title: string;
                date: string;
                location: string;
                venue: string;
                organizer: string;
                imageUrl: string;
            };
            ticketTier: {
                ticketType: {
                    name: string;
                };
                price: number;
            };
            ticketNumber: string;
            qrCode: string;
        };
    }[];
}

const PurchaseDetails = () => {
    const { id } = useParams();
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [file, setFile] = useState<File | null>(null); // State to store the selected file
    const [uploading, setUploading] = useState(false); // State to handle upload status
    const [message, setMessage] = useState<string | null>(null); // State for success or error message

    const downloadTicketsRef = useRef(null);
    const downloadTickets = async () => {
        const input = downloadTicketsRef.current;
        try {
            if (!input) {
                console.error('Error: downloadTicketsRef is null');
                return;
            }

            const canvas = await html2canvas(input, {
                useCORS: true, // To handle cross-origin images
                backgroundColor: null, // Keeps transparency intact
            });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: 'a4',
            });

            const pageWidth = pdf.internal.pageSize.getWidth(); // Width of A4 page
            const pageHeight = pdf.internal.pageSize.getHeight(); // Height of A4 page
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Scaling factor to fit the canvas width to PDF page width
            const scaleFactor = pageWidth / canvasWidth;


            let yOffset = 0; // Tracks the vertical position on the canvas

            // Add content to PDF page-by-page
            while (yOffset < canvasHeight) {
                // Height of the slice for the current page
                const sliceHeight = Math.min(canvasHeight - yOffset, pageHeight / scaleFactor);

                // Create a new canvas for the slice
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = canvasWidth;
                pageCanvas.height = sliceHeight;

                const ctx = pageCanvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(
                        canvas,
                        0, yOffset, // Source position
                        canvasWidth, sliceHeight, // Source dimensions
                        0, 0, // Destination position
                        canvasWidth, sliceHeight // Destination dimensions
                    );
                } else {
                    console.error('Error: 2D context is null');
                }

                // Convert the slice to an image
                const pageImgData = pageCanvas.toDataURL('image/png');

                // Add the image to the PDF
                pdf.addImage(pageImgData, 'PNG', 0, 0, pageWidth, sliceHeight * scaleFactor);

                // Move to the next section of the canvas
                yOffset += sliceHeight;

                // Add a new page if there's more content
                if (yOffset < canvasHeight) {
                    pdf.addPage();
                }
            }

            pdf.save('khatra_event_ticket.pdf');
        } catch (error) {
            console.error('Error downloading tickets:', error);
        }
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file before uploading.');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('purchaseId', id as string);

            // Call the function from the actions folder
            const response = await axios.post(`/api/user/profile/purchases/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('API response:', response); // Log the entire response object
            if (response.status == 201) {
                setMessage('File uploaded successfully!');
            } else {
                setMessage('Failed to upload the file.');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            setMessage('An error occurred while uploading the file.');
        } finally {
            setUploading(false);
            setFile(null);
        }
    };
    useEffect(() => {
        const fetchPurchase = async () => {
            try {

                const response = await axios.get(`/api/purchases/${id}`);
                console.log(response.data) // Log the entire response object

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

            </div>
            <div className="bg-gray-50 rounded-lg p-4">
                {purchase ? (
                    <div>
                        <div>
                            <h3 className='py-4'>Purchase Status: <span className='p-1 px-2 border-2 border-purple-500 text-purple-600'>{purchase.status}</span></h3>
                        </div>
                        <div className="flex w-full justify-center gap-2">
                            <div className="border-2 p-2 rounded-lg w-[30%]">
                                <h2 className='font-bold text-lg'>Event Details</h2>
                                <p className='my-3'>Event ID: <span className='font-bold'>{purchase.tickets[0]?.ticket.event.id}</span></p>
                                <p className='my-3'>Event Title:  <span className='font-bold'>{purchase.tickets[0]?.ticket.event.title}</span></p>
                                <p className='my-3'>Event Date:  <span className='font-bold'>{purchase.tickets[0]?.ticket.event.date}</span></p>
                                <p className='my-3'>Event Location:  <a className='p-1 underline' target='_blank' href={purchase.tickets[0]?.ticket.event.location}>View in Map</a></p>
                                <p className='my-3'>Event Venue:  <span className='font-bold'>{purchase.tickets[0]?.ticket.event.venue}</span></p>
                                <p className='my-3'>Event Organizer:  <span className='font-bold'>{purchase.tickets[0]?.ticket.event.organizer}</span></p>
                                {/* <p className='my-3'>Event Status:  <span className='font-bold'>{purchase.tickets[0]?.ticket.event.status}</span></p> */}

                            </div>
                            <div className="border-2 w-[60%] p-2">
                                <h2 className='font-bold text-lg'>Ticket Details</h2>
                                {
                                    purchase.tickets?.map((ticket, index) => (
                                        <React.Fragment key={index}>

                                        <div key={index} className="w-full my-2 mt-2 px-2">
                                            <ConcertTicket
                                                keyss={index}
                                                qrcode={ticket.ticket.qrCode}
                                                ticketNumber={ticket.ticket.ticketNumber}
                                                ticketType={ticket.ticket.ticketTier.ticketType.name}
                                                eventdetails={
                                                    {
                                                        title: ticket.ticket.event.title,
                                                        img:ticket.ticket.event.imageUrl,
                                                        organizer: ticket.ticket.event.organizer,
                                                        venue: ticket.ticket.event.venue,
                                                        date: ticket.ticket.event.date
                                                    }
                                                }
                                            />
                                            <div className="border-b-4 border-dashed border-gray-400 w-full my-2"></div>
                                        </div>
                                        {index > 0 && index % 4 === 3 && <div className="mb-20" />}

                                        </React.Fragment>

                                    ))
                                }
                                <p className='text-xl font-bold flex justify-end p-4'>Total Amount: Rs. {purchase?.totalAmount}</p>
                                <div className=" flex justify-end">
                                    <Dialog>
                                        <DialogTrigger className='bg-purple-500 text-white text-lg p-1 px-8 rounded'>Download Tickets</DialogTrigger>
                                        <DialogContent className='bg-white min-w-[30%] lg:max-w-screen-lg overflow-y-scroll max-h-screen'>
                                            <DialogHeader>
                                                <DialogTitle>Download Tickets?</DialogTitle>
                                                <DialogDescription>
                                                    <div ref={downloadTicketsRef} className="text-center">
                                                      
                                                            <div className='mt-2'>
                                                                <div className="border-b-4 border-dashed border-gray-400 w-full my-2"></div>
                                                                {
                                                                    purchase.tickets?.map((ticket, index) => (
                                                                        <React.Fragment key={index}>

                                                                        <div key={index} className="w-full my-2 mt-2 px-2">
                                                                            <ConcertTicket
                                                                                keyss={index}
                                                                                qrcode={ticket.ticket.qrCode}
                                                                                ticketNumber={ticket.ticket.ticketNumber}
                                                                                ticketType={ticket.ticket.ticketTier.ticketType.name}
                                                                                eventdetails={
                                                                                    {
                                                                                        title: ticket.ticket.event.title,
                                                                                        img:ticket.ticket.event.imageUrl,
                                                                                        organizer: ticket.ticket.event.organizer,
                                                                                        venue: ticket.ticket.event.venue,
                                                                                        date: ticket.ticket.event.date
                                                                                    }
                                                                                }
                                                                            />
                                                                            <div className="border-b-4 border-dashed border-gray-400 w-full my-2"></div>
                                                                        </div>
                                                                        {index > 0 && index % 4 === 3 && <div className="mb-20" />}

                                                                        </React.Fragment>

                                                                    ))
                                                                }

                                                            </div>

                                                    </div>
                                                    <div className='flex justify-center mt-5'>
                                                        <button onClick={downloadTickets} className='bg-purple-500 text-white text-xl font-bold p-1 px-8 rounded'>Download</button>
                                                    </div>
                                                </DialogDescription>
                                            </DialogHeader>

                                        </DialogContent>
                                    </Dialog>

                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border rounded-md p-4">
                            <h2>Complete your payment</h2>
                            <p>Payment ID: <span className="font-bold">{purchase?.id}</span></p>
                            <div className='p-1 w-full'>
                                <h2 className='font-bold text-purple-900 pb-3'>Upload Screenshot of your Payment</h2>
                                <form onSubmit={handleSubmit} className='px-5 flex gap-3'
                                    encType='
                                 multipart/form-data'
                                >
                                    <input
                                        className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                                        placeholder="Upload your QR Code"
                                        disabled={uploading}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleFileChange(e)} />
                                    <input type="hidden" value={purchase.id} />
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white text-lg px-8 rounded"
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Uploading...' : 'Upload'}
                                    </button>
                                </form>
                                {message && <p className="mt-2 text-sm ml-8 text-red-600">{message}</p>}
                            </div>
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
