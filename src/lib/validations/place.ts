import { z } from "zod";

export const regionSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameKa: z.string().default(""),
  descriptionEn: z.string().default(""),
  descriptionKa: z.string().default(""),
  image: z.string().nullable().default(null),
  sortOrder: z.number().default(0),
});

export type RegionFormValues = z.input<typeof regionSchema>;

export const touristLocationSchema = z.object({
  regionId: z.string().uuid("Region is required"),
  nameEn: z.string().min(1, "English name is required"),
  nameKa: z.string().default(""),
  descriptionEn: z.string().default(""),
  descriptionKa: z.string().default(""),
  whatMakesItSpecialEn: z.string().default(""),
  whatMakesItSpecialKa: z.string().default(""),
  types: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  googleMapsUrl: z.string().nullable().default(null),
  latitude: z.number().nullable().default(null),
  longitude: z.number().nullable().default(null),
  sortOrder: z.number().default(0),
});

export type TouristLocationFormValues = z.input<typeof touristLocationSchema>;
