"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RegionWithLocations } from "@/types";

interface RegionListProps {
  regions: RegionWithLocations[];
  locale: string;
}

export function RegionList({ regions, locale }: RegionListProps) {
  const t = useTranslations("places");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div>
      {/* Region Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <Button
          variant={activeRegion === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveRegion(null)}
          className={activeRegion === null ? "bg-navy" : ""}
        >
          {t("allRegions")}
        </Button>
        {regions.map((region) => (
          <Button
            key={region.id}
            variant={activeRegion === region.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveRegion(region.id)}
            className={activeRegion === region.id ? "bg-navy" : ""}
          >
            {locale === "ka" && region.nameKa ? region.nameKa : region.nameEn}
          </Button>
        ))}
      </div>

      {/* Regions */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {regions
            .filter((r) => !activeRegion || r.id === activeRegion)
            .map((region) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {locale === "ka" && region.nameKa
                      ? region.nameKa
                      : region.nameEn}
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    {locale === "ka" && region.descriptionKa
                      ? region.descriptionKa
                      : region.descriptionEn}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {region.locations.length} {t("locations")}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {region.locations.map((location) => (
                    <Card
                      key={location.id}
                      className="overflow-hidden transition-shadow hover:shadow-md flex flex-col h-full"
                    >
                      {location.images && location.images.length > 0 && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={location.images[0]}
                            alt={locale === "ka" && location.nameKa ? location.nameKa : location.nameEn}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <CardContent className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {locale === "ka" && location.nameKa
                              ? location.nameKa
                              : location.nameEn}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                            {locale === "ka" && location.descriptionKa
                              ? location.descriptionKa
                              : location.descriptionEn}
                          </p>

                          {location.types.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {location.types.slice(0, 3).map((type) => (
                                <Badge
                                  key={type}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        {location.googleMapsUrl && (
                          <div className="mt-4 pt-2 border-t border-muted">
                            <a
                              href={location.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-navy hover:underline font-medium"
                            >
                              <MapPin className="h-3.5 w-3.5" />
                              {t("viewOnMap")}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
