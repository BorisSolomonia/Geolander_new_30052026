import { setRequestLocale, getTranslations } from "next-intl/server";
import { getRegionWithLocations } from "@/lib/actions/places";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; regionSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { regionSlug } = await params;
  const region = await getRegionWithLocations(regionSlug);
  if (!region) return { title: "Region Not Found" };
  return { title: region.nameEn, description: region.descriptionEn };
}

export default async function RegionDetailPage({ params }: Props) {
  const { locale, regionSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const region = await getRegionWithLocations(regionSlug);

  if (!region) notFound();

  const name = locale === "ka" && region.nameKa ? region.nameKa : region.nameEn;
  const desc =
    locale === "ka" && region.descriptionKa
      ? region.descriptionKa
      : region.descriptionEn;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t("nav.home"), href: "/" },
          { label: t("places.title"), href: "/places" },
          { label: name },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{desc}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {region.locations.length} {t("places.locations")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {region.locations.map((location) => {
          const locName =
            locale === "ka" && location.nameKa
              ? location.nameKa
              : location.nameEn;
          const locDesc =
            locale === "ka" && location.descriptionKa
              ? location.descriptionKa
              : location.descriptionEn;
          const locSpecial =
            locale === "ka" && location.whatMakesItSpecialKa
              ? location.whatMakesItSpecialKa
              : location.whatMakesItSpecialEn;

          return (
            <Card key={location.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">{locName}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {locDesc}
                </p>
                {locSpecial && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase text-gold-dark">
                      {t("places.whatMakesItSpecial")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {locSpecial}
                    </p>
                  </div>
                )}
                {location.types.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {location.types.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                )}
                {location.googleMapsUrl && (
                  <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm text-navy hover:underline"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    {t("places.viewOnMap")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
