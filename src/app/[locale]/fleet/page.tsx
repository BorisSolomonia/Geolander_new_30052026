import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAvailableCars } from "@/lib/actions/cars";
import { SectionHeader } from "@/components/shared/section-header";
import { FleetGrid } from "@/components/fleet/fleet-grid";
import type { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo-server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "fleet" });
  return getSeoMetadata("/fleet", locale, t("title"), t("subtitle"));
}

export default async function FleetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("fleet");
  const cars = await getAvailableCars();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <FleetGrid cars={cars} />
    </div>
  );
}
