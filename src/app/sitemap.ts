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

  return [
    ...staticPaths.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
    ...cars.map((car) => ({
      url: `${baseUrl}/fleet/${car.id}`,
      lastModified: car.updatedAt,
    })),
    ...regions.map((region) => ({
      url: `${baseUrl}/places/${region.slug}`,
      lastModified: region.updatedAt,
    })),
    ...musicGenres.map((genre) => ({
      url: `${baseUrl}/music#${genre.slug}`,
      lastModified: genre.updatedAt,
    })),
  ];
}
