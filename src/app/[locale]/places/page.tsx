import { setRequestLocale, getTranslations } from "next-intl/server";
import { getRegionsWithLocations } from "@/lib/actions/places";
import { SectionHeader } from "@/components/shared/section-header";
import { RegionList } from "@/components/places/region-list";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "places" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function PlacesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("places");
  const regions = await getRegionsWithLocations();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />
      <RegionList regions={regions} locale={locale} />
    </div>
  );
}
