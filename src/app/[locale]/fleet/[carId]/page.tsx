import { setRequestLocale, getTranslations } from "next-intl/server";
import { getCarWithBlockedDates } from "@/lib/actions/cars";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CarDetail } from "@/components/fleet/car-detail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCarWithBlockedDates(carId);
  if (!car) return { title: "Car Not Found" };
  return {
    title: `${car.brand} ${car.model} ${car.year}`,
    description: car.descriptionEn,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { locale, carId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const car = await getCarWithBlockedDates(carId);

  if (!car) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
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
