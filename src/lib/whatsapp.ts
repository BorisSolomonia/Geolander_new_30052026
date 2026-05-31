import { businessUiCopy } from "@/content/business-defaults";

interface BookingMessage {
  carName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  customerName: string;
  orderId?: string;
}

export function buildWhatsAppUrl(
  phoneNumber: string,
  message?: string
): string {
  const cleanNumber = phoneNumber.replace(/[^+\d]/g, "");
  if (!message) {
    return `https://wa.me/${cleanNumber}`;
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function buildBookingMessage({
  carName,
  startDate,
  endDate,
  totalDays,
  totalPrice,
  customerName,
  orderId,
}: BookingMessage): string {
  const lines = [
    `🚗 ${businessUiCopy.bookingRequestPrefix}`,
    ``,
  ];

  if (orderId) {
    lines.push(`Order ID: ${orderId}`);
    lines.push(``);
  }

  lines.push(
    `Name: ${customerName}`,
    `Car: ${carName}`,
    `Dates: ${startDate} → ${endDate}`,
    `Duration: ${totalDays} days`,
    `Total: $${totalPrice}`,
    ``,
    `I'd like to book this car. Please confirm availability.`
  );

  return lines.join("\n");
}
