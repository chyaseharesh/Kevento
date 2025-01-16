// AddTicketTypeForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Shadcn Button Component
import { Input } from "@/components/ui/input"; // Shadcn Input Component
import { Label } from "@/components/ui/label"; // Shadcn Label Component
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Define Zod schema for validation
const ticketTypeSchema = z.object({
  name: z
    .string()
    .nonempty("Ticket Type name is required")
    .max(100, "Ticket Type name must be at most 100 characters"),
});

// Define TypeScript type from Zod schema
type TicketTypeFormData = z.infer<typeof ticketTypeSchema>;

const AddTicketTypeForm = () => {
      const router = useRouter()
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketTypeFormData>({
    resolver: zodResolver(ticketTypeSchema),
  });

  const onSubmit = async (data: TicketTypeFormData) => {
    try {
      // Send POST request to the API
      console.log(data)
      const response = await axios.post("/api/ticket-type", data);
      console.log(response);
      toast.success("Ticket Type Added Successfully!")
      router.push('/admin/ticket-type')

      reset(); // Reset the form after successful submission
    } catch (error: unknown) {
     toast.error("Something Went Wrong! Please try again.")
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mx-auto bg-white p-6 rounded-md shadow-md"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Ticket Type Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter ticketType name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Add TicketType"}
      </Button>
    </form>
  );
};

export default AddTicketTypeForm;
