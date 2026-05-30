import { getBookings } from "@/lib/actions/bookings";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { BookingActions } from "@/components/admin/booking-actions";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  completed: "bg-blue-100 text-blue-700",
};

export default async function AdminBookingsPage() {
  const bookingsData = await getBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold">Bookings</h1>
      <p className="text-muted-foreground">
        {bookingsData.length} total bookings
      </p>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No bookings yet
                </TableCell>
              </TableRow>
            ) : (
              bookingsData.map(({ booking, car }) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-sm">
                    {booking.orderId}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customerPhone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {car ? `${car.brand} ${car.model}` : "N/A"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {booking.startDate} - {booking.endDate}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {booking.totalDays} days
                    </span>
                  </TableCell>
                  <TableCell>{formatCurrency(booking.totalPrice)}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[booking.status] || ""}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <BookingActions
                      bookingId={booking.id}
                      currentStatus={booking.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
