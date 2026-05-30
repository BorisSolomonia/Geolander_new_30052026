import { setRequestLocale, getTranslations } from "next-intl/server";
import { getFuelStations, getMarkets } from "@/lib/actions/travel-info";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, ShoppingCart, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "travelInfo" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TravelInfoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("travelInfo");
  const stations = await getFuelStations();
  const marketsList = await getMarkets();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader title={t("title")} subtitle={t("subtitle")} />

      {/* Fuel Stations */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-2">
          <Fuel className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{t("fuelStations")}</h2>
        </div>
        <p className="mb-6 text-muted-foreground">{t("fuelStationsDesc")}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <Card key={station.id}>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{station.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {locale === "ka" && station.descriptionKa
                    ? station.descriptionKa
                    : station.descriptionEn}
                </p>
                {station.website && (
                  <a
                    href={station.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    {t("visitWebsite")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Markets */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">{t("markets")}</h2>
        </div>
        <p className="mb-6 text-muted-foreground">{t("marketsDesc")}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marketsList.map((market) => (
            <Card key={market.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{market.name}</h3>
                  <Badge
                    variant="secondary"
                    className={
                      market.priceLevel === "budget"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : market.priceLevel === "premium"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : ""
                    }
                  >
                    {t(market.priceLevel === "mid-range" ? "midRange" : market.priceLevel)}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {locale === "ka" && market.descriptionKa
                    ? market.descriptionKa
                    : market.descriptionEn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
