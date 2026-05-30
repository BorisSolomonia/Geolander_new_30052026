import { z } from "zod";

const isoDateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)");

export const bookingSchema = z.object({
  carId: z.string().uuid(),
  startDate: isoDateString,
  endDate: isoDateString,
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().min(8, "Valid phone number is required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  couponCode: z.string().optional(),
  notes: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const bookingStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "approved", "rejected", "cancelled", "completed"]),
});
