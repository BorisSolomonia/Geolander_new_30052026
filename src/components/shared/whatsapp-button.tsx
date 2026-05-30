"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/lib/constants";
import { businessUiCopy } from "@/content/business-defaults";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = businessUiCopy.whatsappLeadMessage,
  className,
}: WhatsAppButtonProps) {
  const cleanNumber = phoneNumber.replace(/[^+\d]/g, "");
  const url = `${WHATSAPP_BASE_URL}${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
