import React, { useEffect, useRef, useState } from 'react'
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
import Loading from './ui/loding';
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

const TiCketDownloadDialogue = ({id}:{id:string}) => {
        const [purchase, setPurchase] = useState<Purchase | null>(null);
    
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
    <div className=" flex justify-end">
    <Dialog>
        <DialogTrigger className='bg-purple-500 text-white text-lg p-1 px-8 rounded'>Download Tickets</DialogTrigger>
        <DialogContent className='bg-white min-w-[30%] lg:max-w-screen-lg overflow-y-scroll max-h-screen'>
            <DialogHeader>
                <DialogTitle>Download Tickets?</DialogTitle>
                {
                    purchase ? (
                        <DialogDescription>
                    <div ref={downloadTicketsRef} className="text-center">
                      
                            <div className='mt-2'>
                                <div className="border-b-4 border-dashed border-gray-400 w-full my-2"></div>
                                {
                                    purchase?.tickets?.map((ticket, index) => (
                                        <React.Fragment key={index}>

                                        <div key={index} className="w-full my-2 mt-2 px-4">
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
                    ):(
                        <DialogDescription>
                            <Loading />
                        </DialogDescription>
                    )
                }
            </DialogHeader>

        </DialogContent>
    </Dialog>

</div>
  )
}

export default TiCketDownloadDialogue