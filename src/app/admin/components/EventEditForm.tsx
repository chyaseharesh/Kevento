/* eslint-disable @next/next/no-img-element */
"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
// import { CalendarIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { useParams, useRouter } from 'next/navigation'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import 'moment/locale/ne'; // Import Nepali locale

moment.locale('ne'); // Set moment locale to Nepali


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { updateEventAction } from "@/actions/events";
import { Trash2Icon } from "lucide-react";

// Zod schema for validating the form
const eventFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    venue: z.string().min(1, "Venue is required"),
    location: z.string().min(1, "Location is required"),
    organizer: z.string().min(1, "Organizer is required"),
    //
    date: z
        .string()
        .refine((val) => !isNaN(new Date(val).getTime()), "Date is required"),
    image: z
        .instanceof(File)
        .refine((file) => !file || file.size <= 10 * 1024 * 1024, "File size should be less than 10MB")
        .refine((file) => !file || file.type.startsWith("image/"), "Only image files are allowed")
        .optional(),
    categoryId: z.string().min(1, "Category is required"),
    status: z.string().min(1, "Status is required"),
    tickets: z
        .array(
            z.object({
                ticketTypeId: z.string().min(1, "Ticket type is required"),
                price: z
                    .number()
                    .min(0, "Price must be greater than or equal to 0"),
                quantity: z
                    .number()
                    .min(1, "Quantity must be greater than or equal to 1"),
            })
        )
        .min(1, "At least one ticket is required"),
});
type Category = {
    id: string;
    name: string;
};
type TicketType = {
    id: string;
    name: string;
};
type Ticket = {
    id?: string;
    ticketTypeId: string;
    price: number;
    quantity: number;

};
type Event = {
    id: string;
    title: string;
    description: string;
    venue: string;
    location: string,
    organizer: string,
    date: string;
    categoryId: string;
    status: string;
    tickets: { id?: string; ticketTypeId: string; price: number; quantity: number }[];
    imageUrl?: string;
    ticketTiers:[]
};

export default function EventEditForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);


    const router = useRouter()
    const { id } = useParams();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchEventAndCategories = async () => {
            try {
                setIsLoading(true);
                const [categoriesResponse, ticketTypesResponse, eventResponse] = await Promise.all([
                    axios.get("/api/categories"),
                    axios.get("/api/ticket-type"),
                    axios.get(`/api/events/${id}`),
                ]);
                setIsLoading(false);
                setCategories(categoriesResponse.data.categories);
                setTicketTypes(ticketTypesResponse.data.ticketTypes);
                setEvent(eventResponse.data);
                // setStartDate(new Date(eventResponse.data.data.toISOString()))
                console.log(eventResponse.data)

                form.reset({
                    ...eventResponse.data,
                    date: format(new Date(eventResponse.data.date), "yyyy-MM-dd hh:mm aa "),
                    categoryId: eventResponse.data.categoryId,
                    tickets: eventResponse.data.ticketTiers.map((ticket: Ticket) => ({
                        id: ticket.id,
                        ticketTypeId: ticket.ticketTypeId,
                        price: ticket.price,
                        quantity: ticket.quantity,
                    })),
                });

                if (eventResponse.data.imageUrl) {
                    setImagePreview(eventResponse.data.imageUrl);
                }
            } catch {
                toast.error("Failed to fetch event or categories.");
            }
        };

        fetchEventAndCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: "",
            description: "",
            venue: "",
            location: "",
            organizer: "",
            date: "",
            image: undefined,
            categoryId: "",
            status: "",
            tickets: [{ ticketTypeId: "", price: 0, quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "tickets",
        control: form.control,
    });

    const handleSubmit = async (values: z.infer<typeof eventFormSchema>) => {
        try {
            const localDate = new Date(values.date);
            const localDateISO = localDate.toISOString(); // Convert to ISO format (local time)

            // Create FormData for sending data
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("venue", values.venue);
            formData.append("location", values.location);
            formData.append("organizer", values.organizer);
            formData.append("date", localDateISO); // Convert date to ISO format
            formData.append("categoryId", values.categoryId);
            formData.append("status", values.status);

            // Append tickets array
            values.tickets.forEach((ticket, index) => {
                formData.append(`tickets[${index}][ticketTypeId]`, ticket.ticketTypeId);
                formData.append(`tickets[${index}][price]`, ticket.price.toString());
                formData.append(`tickets[${index}][quantity]`, ticket.quantity.toString());
            });

            // Append the image (if it exists)
            if (values.image) {
                formData.append("image", values.image);
            }
            const response = await updateEventAction(formData, id as string)
            console.log(response)
            if (response.status == 200) {

                toast.success("Event Added Successfully!")
                router.push('/admin/events')
            } else {
                toast.error("Failed to update event.")
            }


            // console.log("Event Created Successfully:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Something went wrong");

            } else {
                console.error("Submission Error:", error);
                toast.error("Something went wrong");
            }
        }
    };


    const handleError = (errors: unknown) => {
        console.error("Form errors:", errors);
    };

    const handleImageChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="w-full">
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                (values) => {
                                    // Ensure transformations match schema requirements
                                    const transformedValues = {
                                        ...values,
                                        date: values.date,
                                        tickets: values.tickets.map((ticket) => ({
                                            ...ticket,
                                            price: Number(ticket.price),
                                            quantity: Number(ticket.quantity),
                                        })),
                                    };
                                    handleSubmit(transformedValues);
                                },
                                handleError // Capture errors during submission
                            )}
                            className="w-full flex flex-col gap-4"
                            encType="multipart/form-data"
                        >
                            <div className="flex gap-2">
                                <div className="border-2 p-3 flex-1 rounded-lg">
                                    <FormLabel className="text-2xl font-bold">Event Information</FormLabel>
                                    <br />
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    {/* Description */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Event description" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    {/* Venue */}
                                    <FormField
                                        control={form.control}
                                        name="venue"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Venue</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event venue" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    {/* Location */}
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location Link (from Map)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event location" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />


                                    {/* Organizer */}
                                    <FormField
                                        control={form.control}
                                        name="organizer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Organizer</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event organizer" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Date and Time */}
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date and Time</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        selected={field.value ? new Date(field.value) : null}
                                                        onChange={(date) => {
                                                            if (date) {
                                                                console.log(field)
                                                                // Convert to UTC before submitting
                                                                const utcDate = new Date(date).toISOString();
                                                                field.onChange(utcDate); // Store it in UTC for submission
                                                            }
                                                        }}
                                                        showTimeSelect
                                                        timeFormat="HH:mm"
                                                        dateFormat="yyyy-MM-dd HH:mm"
                                                        placeholderText="Select date and time"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <br />
                                    {/* Category */}
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select value={field.value || event?.categoryId} onValueChange={(value) => field.onChange(value)}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <br />
                                    {/* Status */}
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    value={field.value || event?.status}
                                                    onValueChange={(value) => field.onChange(value)}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="DRAFT">DRAFT</SelectItem>
                                                        <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                                                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                                                        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                                                        <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
                                                        <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <br />
                                    {/* Image */}
                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <div>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files ? e.target.files[0] : null;
                                                                field.onChange(file);
                                                                handleImageChange(file);
                                                            }}
                                                        />
                                                        {imagePreview && (
                                                            <div className="mt-4">
                                                                <img src={imagePreview} alt="Selected Preview" className="w-56 h-auto rounded" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Ticket Info Section */}
                                <div className="border-2 p-3 flex-1 rounded-lg">
                                    <div className="border-t pt-4">
                                        <FormLabel className="text-2xl font-bold">Ticket Information</FormLabel>
                                        <br />
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex gap-4">
                                                {/* Ticket Type */}
                                                <FormField
                                                    control={form.control}
                                                    name={`tickets.${index}.ticketTypeId`}
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Type</FormLabel>
                                                            {/* <Select onValueChange={field.onChange} value={event?.ticketTiers[index].ticketTypeId}> */}
                                                            <Select onValueChange={field.onChange} value={field.value}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Ticket Type" />
                                                                </SelectTrigger>

                                                                <SelectContent>
                                                                    {ticketTypes.map((ticketType) => (
                                                                        <SelectItem key={ticketType.id} value={ticketType.id.toString()}>
                                                                            {ticketType.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />
                                                {/* Ticket Price */}
                                                <FormField
                                                    control={form.control}
                                                    name={`tickets.${index}.price`}
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Price</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Price"
                                                                    value={field.value.toString()}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />
                                                {/* Ticket Quantity */}
                                                <FormField
                                                    control={form.control}
                                                    name={`tickets.${index}.quantity`}
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Quantity</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    placeholder="Quantity"
                                                                    value={field.value.toString()}
                                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                                />
                                                            </FormControl>
                                                            <FormMessage>{fieldState.error?.message}</FormMessage>
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button className="mt-8" variant="destructive" onClick={() => remove(index)}>
                                                    <Trash2Icon />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            className="mt-4 bg-gray-800 text-white"
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                append({
                                                    ticketTypeId: "",
                                                    price: 0,
                                                    quantity: 1,
                                                })
                                            }
                                        >
                                            Add More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="mt-4">
                                Submit
                            </Button>
                        </form>
                    </Form>
                )
            }

        </div>
    );
}

//