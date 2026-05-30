"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  Fuel,
  Settings2,
  Calendar,
  MessageCircle,
  Check,
} from "lucide-react";
import Image from "next/image";
import type { CarWithBlockedDates } from "@/types";
import { formatCurrency, getDaysBetween } from "@/lib/utils";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { businessUiCopy } from "@/content/business-defaults";
import { getSeasonalDailyRate, pricingTierMetadata } from "@/lib/car-pricing";
import { createBooking } from "@/lib/actions/bookings";
import { toast } from "sonner";

interface CarDetailProps {
  car: CarWithBlockedDates;
  locale: string;
}

export function CarDetail({ car, locale }: CarDetailProps) {
  const t = useTranslations("fleet");
  const tc = useTranslations("common");
  const tb = useTranslations("booking");

  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const totalDays =
    startDate && endDate ? getDaysBetween(startDate, endDate) : 0;
  const selectedRate =
    startDate && totalDays > 0
      ? getSeasonalDailyRate(car.pricing ?? [], {
          startDate,
          totalDays,
        })?.rate ?? car.pricePerDay
      : car.pricePerDay;
  const totalPrice = totalDays * selectedRate;

  const description = locale === "ka" ? car.descriptionKa : car.descriptionEn;

  const handleBookWhatsApp = async () => {
    setIsBooking(true);
    try {
      const booking = await createBooking({
        carId: car.id,
        startDate,
        endDate,
        customerName: name,
        customerPhone: phone,
      });

      const message = buildBookingMessage({
        carName: `${car.brand} ${car.model}`,
        startDate,
        endDate,
        totalDays,
        totalPrice,
        customerName: name,
        orderId: booking.orderId,
      });

      const url = buildWhatsAppUrl(WHATSAPP_NUMBER, message);
      window.open(url, "_blank");

      // Redirect to the success page
      window.location.assign(`/${locale}/booking/success`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create booking");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Left - Images + Details */}
      <div className="lg:col-span-3">
        {/* Image Gallery */}
        <div className="overflow-hidden rounded-xl bg-muted">
          <div className="relative aspect-[16/10]">
            {car.images.length > 0 ? (
              <Image
                src={car.images[selectedImage] || car.images[0]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <Settings2 className="h-16 w-16" />
              </div>
            )}
          </div>
          {car.images.length > 1 && (
            <div className="flex gap-2 p-3">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-16 w-20 overflow-hidden rounded-md border-2 transition-colors ${
                    i === selectedImage
                      ? "border-primary"
                      : "border-border/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Car Info */}
        <div className="mt-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {car.brand} {car.model}
              </h1>
              <p className="text-lg text-muted-foreground">{car.year}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(car.pricePerDay)}
              </p>
              <p className="text-sm text-muted-foreground">{tc("perDay")}</p>
            </div>
          </div>

          {description && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}

          {/* Specs */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-border p-3 text-center">
              <Users className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-sm font-medium">
                {car.seats} {t("seats")}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <Settings2 className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-sm font-medium">
                {t(car.transmission)}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3 text-center">
              <Fuel className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-sm font-medium">{t(car.fuelType)}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Registration
              </p>
              <p className="mt-1 font-medium">{car.registrationNumber}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Body Type
              </p>
              <p className="mt-1 font-medium">{car.bodyType}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Color
              </p>
              <p className="mt-1 font-medium">{car.color}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                License Category
              </p>
              <p className="mt-1 font-medium">{car.licenseCategory}</p>
            </div>
          </div>

          {/* Features */}
          {car.features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">{t("features")}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {car.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="gap-1"
                  >
                    <Check className="h-3 w-3" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {car.pricing.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Seasonal Pricing</h3>
              <div className="mt-3 space-y-4">
                {car.pricing.map((season) => (
                  <div key={season.season} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">Season {season.season}</p>
                      <p className="text-sm text-muted-foreground">
                        {season.period}
                      </p>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {pricingTierMetadata.map((tier) => (
                        <div key={tier.key} className="rounded-md bg-muted px-3 py-2">
                          <p className="text-xs text-muted-foreground">
                            {tier.maxDays
                              ? `${tier.minDays}-${tier.maxDays} days`
                              : `${tier.minDays}+ days`}
                          </p>
                          <p className="font-medium">
                            {formatCurrency(season.prices[tier.key])}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right - Booking Form */}
      <div className="lg:col-span-2">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gold" />
              {tb("title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startDate">{t("pickupDate")}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">{t("returnDate")}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name">{tb("yourName")}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={businessUiCopy.bookingCustomerNamePlaceholder}
              />
            </div>

            <div>
              <Label htmlFor="phone">{tb("phoneNumber")}</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={businessUiCopy.bookingCustomerPhonePlaceholder}
              />
            </div>

            {/* Summary */}
            {totalDays > 0 && (
              <div className="rounded-lg bg-muted p-4">
                <h4 className="font-medium">{tb("summary")}</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("pricePerDay")}
                    </span>
                    <span>{formatCurrency(selectedRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("totalDays")}
                    </span>
                    <span>
                      {totalDays} {tc("days")}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>{t("totalPrice")}</span>
                    <span className="text-primary font-bold">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => void handleBookWhatsApp()}
              disabled={isBooking || !startDate || !endDate || !name || !phone}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {isBooking ? (
                <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <MessageCircle className="mr-2 h-5 w-5" />
              )}
              {t("bookViaWhatsApp")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
