import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCarWithBlockedDates } from "@/lib/actions/cars";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CarDetail } from "@/components/fleet/car-detail";
import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo-server";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, carId } = await params;
  const car = await getCarWithBlockedDates(carId);
  if (!car) return { title: "Car Not Found" };
  const title = `${car.brand} ${car.model} ${car.year}`;
  return getSeoMetadata(`/fleet/${carId}`, locale, title, car.descriptionEn);
}

export default async function CarDetailPage({ params }: Props) {
  const { locale, carId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const car = await getCarWithBlockedDates(carId);

  if (!car) notFound();

  const settings = await getSiteSettings();
  const baseUrl = (settings.site_url || "https://geo-lander.com").replace(/\/$/, "");

  const carJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.brand} ${car.model} ${car.year}`,
    image: car.images.length > 0
      ? (car.images[0].startsWith("http") ? car.images[0] : `${baseUrl}${car.images[0]}`)
      : `${baseUrl}/logo.png`,
    description: locale === "ka" ? car.descriptionKa : car.descriptionEn,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    model: car.model,
    vehicleModelDate: car.year.toString(),
    color: car.color || undefined,
    bodyType: car.bodyType || undefined,
    vehicleSeatingCapacity: car.seats,
    vehicleTransmission: car.transmission,
    fuelType: car.fuelType,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: car.pricePerDay,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: car.pricePerDay,
        priceCurrency: "USD",
        unitText: "DAY",
      },
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(carJsonLd),
        }}
      />
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("fleet.title"), href: "/fleet" },
          { label: `${car.brand} ${car.model}` },
        ]}
      />
      <CarDetail car={car} locale={locale} />
    </div>
  );
}
