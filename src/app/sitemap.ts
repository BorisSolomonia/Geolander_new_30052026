import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { getCars } from "@/lib/actions/cars";
import { getRegions } from "@/lib/actions/places";
import { getMusicGenres } from "@/lib/actions/music";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, cars, regions, musicGenres] = await Promise.all([
    getSiteSettings(),
    getCars(),
    getRegions(),
    getMusicGenres(),
  ]);

  const baseUrl = (settings.site_url || "http://localhost:3015").replace(/\/$/, "");
  const staticPaths = ["", "/fleet", "/places", "/music", "/travel-info", "/contact", "/terms"];
  const locales = ["en", "ka", "he", "ar"];

  const getAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const prefix = locale === "en" ? "" : `/${locale}`;
      languages[locale] = `${baseUrl}${prefix}${path}`;
    }
    return { languages };
  };

  return [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      alternates: getAlternates(path),
    })),
    ...cars.map((car) => ({
      url: `${baseUrl}/fleet/${car.id}`,
      lastModified: car.updatedAt,
      alternates: getAlternates(`/fleet/${car.id}`),
    })),
    ...regions.map((region) => ({
      url: `${baseUrl}/places/${region.slug}`,
      lastModified: region.updatedAt,
      alternates: getAlternates(`/places/${region.slug}`),
    })),
    ...musicGenres.map((genre) => ({
      url: `${baseUrl}/music#${genre.slug}`,
      lastModified: genre.updatedAt,
      alternates: getAlternates(`/music#${genre.slug}`),
    })),
  ];
}
