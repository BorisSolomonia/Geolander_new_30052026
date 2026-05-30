import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getAvailableCars } from "@/lib/actions/cars";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Users,
  Fuel,
  Settings2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export async function FleetPreview() {
  const t = await getTranslations();
  const cars = await getAvailableCars();

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title={t("fleet.title")}
          subtitle={t("fleet.subtitle")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card
              key={car.id}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {car.images.length > 0 ? (
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Settings2 className="h-12 w-12" />
                  </div>
                )}
                <Badge className="absolute left-3 top-3 bg-gold text-navy">
                  ${car.pricePerDay}{t("common.perDay")}
                </Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold">
                  {car.brand} {car.model}
                </h3>
                <p className="text-sm text-muted-foreground">{car.year}</p>

                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {car.seats}
                  </span>
                  <span className="flex items-center gap-1">
                    <Settings2 className="h-4 w-4" />
                    {t(`fleet.${car.transmission}`)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" />
                    {t(`fleet.${car.fuelType}`)}
                  </span>
                </div>

                <Button
                  asChild
                  className="mt-4 w-full"
                >
                  <Link href={`/fleet/${car.id}`}>
                    {t("common.bookNow")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {cars.length > 3 && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/fleet">{t("common.viewAll")}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
