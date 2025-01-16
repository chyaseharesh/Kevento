/* eslint-disable @next/next/no-img-element */
'use client'

import PageTitle from '@/components/PageTitle';
import React, { useEffect, useState } from 'react';
import { getImage, getPaymentReceipts, uploadImage } from '@/actions/payment';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import Link from 'next/link';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { PurchaseStatus } from '@prisma/client';
type PaymentReceipt = {
    id: string;
    purchaseId: string;
    receiptUrl: string;
    createdAt: Date;
    updatedAt: Date;
    purchase: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalAmount: number;
        status: PurchaseStatus;
    };
};


const Payment = () => {
    const [file, setFile] = useState<File | null>(null); // State to store the selected file
    const [uploading, setUploading] = useState(false); // State to handle upload status
    const [message, setMessage] = useState<string | null>(null); // State for success or error message
    const [image, setImage] = useState<string>(); // State to store the fetched image URL
    const [paymentReceipts, setPaymentReceipts] = useState<PaymentReceipt[]>([]);
    // getPaymentReceipts
    const getPaymentReceiptsss = async () => {
        const response = await getPaymentReceipts();
    
        console.log(response.data);
    
        if (response.success) {
            if (response.data) {
                setPaymentReceipts(response.data);
            } else {
                setPaymentReceipts([]);
            }
            console.log('Payment receipts fetched successfully!');
        } else {
            console.log('Failed to fetch the payment receipts.');
        }
    };
    
    //get image from action
    const getImagess = async () => {
        const data = await getImage();
        console.log(data)
        if (data.success) {
            console.log('Image fetched successfully!');
            setImage(data.data?.qrCode);
        } else {
            console.log('Failed to fetch the image.');
        }
    };
    // Call the get image function when the component mounts
    useEffect(() => {
        getImagess();
        getPaymentReceiptsss();
    }, []);

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
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Call the function from the actions folder
            const response = await uploadImage(formData);

            if (response.success) {
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

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
                <PageTitle title="Payment Setting" />
            </div>
            <div className='flex justify-between gap-2 border-2 border-purple-500 p-3 rounded-lg w-full'>
                <div className='p-1 w-full'>
                    <h2 className='font-bold text-purple-900 pb-3'>Upload your QR Code to receive Payment</h2>
                    <form onSubmit={handleSubmit} className='px-5 flex gap-3'>
                        <input
                            className="appearance-none block w-full bg-white border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                            placeholder="Upload your QR Code"
                            disabled={uploading}
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(e) => handleFileChange(e)} />
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
                <div className='p-1 flex'>
                    {
                        image && (

                            <Dialog>
                                <DialogTrigger>
                                    <img
                                        className="mt-4 object-cover w-28 rounded-lg"
                                        src={image}
                                        alt="QR Code"
                                    />
                                    <p className="text-xs text-gray-700">Khatra Tech</p>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Payment Recieving QR</DialogTitle>
                                        <DialogDescription>
                                            <img
                                                className="object-cover w-full h-full"
                                                src={image}
                                                alt="QR Code"
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>

                        )
                    }
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
                <PageTitle title="Payments to Validate" />
                <div className="border border-purple-600 p-3 rounded-lg">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Purchase ID</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Payment Proof</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                paymentReceipts.map((payment) => (
                                    payment.purchase.status == "PENDING" &&
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium"><Link className='font-bold underline text-purple-700' href={`/admin/purchases/${payment.purchaseId}`}>{payment.purchaseId}</Link></TableCell>
                                        <TableCell>
                                            <select name="status" id="stats" value={payment.purchase.status}>
                                                <option value="PENDING">PENDING</option>                                                <option value="COMPLETED">COMPLETED</option>
                                                <option value="CANCELLED">CANCELLED</option>
                                                <option value="REFUNDED">REFUNDED</option>
                                                <option value="PARTIAL_REFUNDED">PARTIAL_REFUNDED</option>
                                                <option value="BLOCKED">BLOCKED</option>
                                            </select>
                                        </TableCell>
                                        <TableCell>ONLINE</TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <span className="border-2 p-1 px-3 rounded-md">
                                                        View
                                                    </span>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle className='py-2'>Online</DialogTitle>
                                                        <DialogDescription className='overflow-y-scroll h-[80vh]'>
                                                            <img
                                                                className="object-contain w-full"
                                                                src={payment.receiptUrl}
                                                                alt="QR Code"
                                                            />
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell className="text-right">Rs. {payment.purchase.totalAmount}</TableCell>
                                    </TableRow>

                                ))
                            }
                        </TableBody>
                    </Table>

                </div>
            </div>
            {/* other payment methods */}
            {/* payment history */}

        </div>
    );
};

export default Payment;
