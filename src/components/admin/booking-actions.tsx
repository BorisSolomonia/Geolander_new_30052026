"use client";

import { updateBookingStatus } from "@/lib/actions/bookings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const router = useRouter();

  const handleStatusChange = async (status: string) => {
    try {
      await updateBookingStatus(
        bookingId,
        status as "pending" | "approved" | "rejected" | "cancelled" | "completed"
      );
      toast.success(`Booking status updated to ${status}`);
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="h-8 w-28 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}
