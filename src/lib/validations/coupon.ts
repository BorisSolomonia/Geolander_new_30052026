import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .transform((v) => v.toUpperCase()),
  discountPercent: z
    .number()
    .min(1, "Must be at least 1%")
    .max(100, "Cannot exceed 100%"),
  maxUses: z.number().nullable().default(null),
  validFrom: z.string().nullable().default(null),
  validUntil: z.string().nullable().default(null),
  active: z.boolean().default(true),
});

export type CouponFormValues = z.input<typeof couponSchema>;
