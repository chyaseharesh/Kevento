/* eslint-disable @next/next/no-img-element */
"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { format, formatISO } from "date-fns";
// import { CalendarIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { useRouter } from 'next/navigation'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Import the CSS for the DatePicker
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
import { CalendarIcon, Trash2Icon } from "lucide-react";


// Zod schema for validating the form
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  venue: z.string().min(1, "Venue is required"),
  location: z.string().min(1, "Location is required"),
  organizer: z.string().min(1, "Organizer is required"),
  // date: z
  //   .string()
  //   .refine((val) => !isNaN(new Date(val).getTime()), "Date and time is required"),
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
        type: z.string().min(1, "Ticket type is required"),
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

export default function EventAddForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  const [startDate, setStartDate] = useState(new Date());


  
  useEffect(() => {
    // Fetch categories and ticket types
    const fetchData = async () => {
      try {
        const [categoriesResponse, ticketTypesResponse] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/ticket-type"),
        ]);
        console.log(ticketTypesResponse)
  
        // Set the categories and ticket types data
        setCategories(categoriesResponse.data.categories);
        setTicketTypes(ticketTypesResponse.data.ticketTypes);
      } catch (error) {
        // You can log the error or show a more detailed message
        console.error(error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs only on mount
  
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      location: "",
      organizer: "",
      image: undefined,
      categoryId: "",
      status: "",
      tickets: [{ type: "", price: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "tickets",
    control: form.control,
  });

  const handleSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    try {
      // Create FormData for sending data
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("venue", values.venue);
      formData.append("location", values.location);
      formData.append("organizer", values.organizer);
      formData.append("date", startDate.toString()); // Convert date to ISO format
      formData.append("categoryId", values.categoryId);
      formData.append("status", values.status);

      // Append tickets array
      values.tickets.forEach((ticket, index) => {
        formData.append(`tickets[${index}][type]`, ticket.type);
        formData.append(`tickets[${index}][price]`, ticket.price.toString());
        formData.append(`tickets[${index}][quantity]`, ticket.quantity.toString());
      });

      // Append the image (if it exists)
      if (values.image) {
        formData.append("image", values.image);
      }

      // Use axios to make the POST request
      const response = await axios.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Event Added Successfully!")
      router.push('/admin/events')

      console.log("Event Created Successfully:", response.data);
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (values) => {


              // Ensure transformations match schema requirements
              const transformedValues = {
                ...values,

                // date: values.date ? formatISO(new Date(values.date), { representation: 'complete' }) : "",
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
              <br />

              {/* Date and Time */}
              <label className="mb-2">Date & Time</label>
              <div className="flex gap-2 mt-2">
                <CalendarIcon className="mt-2" />

                <DatePicker
                  className="rounded-md p-sm"
                  selected={startDate}
                  onChange={(date) => date && setStartDate(date)}
                  closeOnScroll={true}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
              <br />
              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
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
                      name={`tickets.${index}.type`}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select onValueChange={field.onChange}> 
                            <SelectTrigger>
                              <SelectValue placeholder="Select Ticket Type" />
                            </SelectTrigger>

                            <SelectContent className="bg-white">
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
                      type: "",
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
    </div>
  );
}
