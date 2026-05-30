import { z } from "zod";

const pricingTierSchema = z.object({
  days1To2: z.number().min(1),
  days3To4: z.number().min(1),
  days5To7: z.number().min(1),
  days8To12: z.number().min(1),
  days13To18: z.number().min(1),
  days19To30: z.number().min(1),
  days31Plus: z.number().min(1),
});

const seasonalPricingSchema = z.object({
  season: z.number().int().min(1),
  period: z.string().min(1, "Pricing period is required"),
  prices: pricingTierSchema,
});

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  year: z.number().min(2000).max(2030),
  color: z.string().min(1, "Color is required"),
  bodyType: z.string().min(1, "Body type is required"),
  licenseCategory: z.string().min(1, "License category is required"),
  pricePerDay: z.number().min(0).default(0),
  seats: z.number().min(1).max(12),
  transmission: z.enum(["automatic", "manual"]),
  fuelType: z.enum(["gasoline", "diesel", "electric", "hybrid"]),
  pricing: z.array(seasonalPricingSchema).min(1, "Pricing is required"),
  features: z.array(z.string()).default([]),
  images: z.array(z.string()).min(1, "At least 1 image is required").max(5, "Maximum 5 images allowed").default([]),
  descriptionEn: z.string().default(""),
  descriptionKa: z.string().default(""),
  available: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type CarFormValues = z.input<typeof carSchema>;
