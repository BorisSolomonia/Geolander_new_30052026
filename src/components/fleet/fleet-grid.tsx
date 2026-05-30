"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Settings2, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Car } from "@/types";
import { motion } from "framer-motion";

interface FleetGridProps {
  cars: Car[];
}

export function FleetGrid({ cars }: FleetGridProps) {
  const t = useTranslations("fleet");
  const tc = useTranslations("common");

  if (cars.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        {tc("noResults")}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, i) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
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
                ${car.pricePerDay}{tc("perDay")}
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
                  {car.seats} {t("seats")}
                </span>
                <span className="flex items-center gap-1">
                  <Settings2 className="h-4 w-4" />
                  {t(car.transmission)}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="h-4 w-4" />
                  {t(car.fuelType)}
                </span>
              </div>

              {car.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {car.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {car.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{car.features.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <Button
                asChild
                className="mt-4 w-full bg-navy hover:bg-navy-dark"
              >
                <Link href={`/fleet/${car.id}`}>
                  {tc("bookNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
