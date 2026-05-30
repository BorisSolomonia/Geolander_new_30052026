"use server";

import { db } from "../db";
import { coupons } from "../../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { couponSchema, type CouponFormValues } from "../validations/coupon";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import {
  createId,
  readCouponsFile,
  writeCouponsFile,
} from "../file-data-store";

export async function getCoupons() {
  await requireAdmin();
  if (!useDatabase) return readCouponsFile();
  return db.select().from(coupons);
}

export async function validateCoupon(code: string) {
  if (!useDatabase) {
    const entries = await readCouponsFile();
    const coupon = entries.find(
      (entry) => entry.code === code.toUpperCase() && entry.active
    );
    if (!coupon) return null;

    const now = new Date().toISOString().slice(0, 10);
    if (coupon.validFrom && coupon.validFrom > now) return null;
    if (coupon.validUntil && coupon.validUntil < now) return null;
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) return null;
    return coupon;
  }
  const [coupon] = await db
    .select()
    .from(coupons)
    .where(and(eq(coupons.code, code.toUpperCase()), eq(coupons.active, true)))
    .limit(1);

  if (!coupon) return null;

  const now = new Date().toISOString().slice(0, 10);
  if (coupon.validFrom && coupon.validFrom > now) return null;
  if (coupon.validUntil && coupon.validUntil < now) return null;
  if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) return null;

  return coupon;
}

export async function createCoupon(data: CouponFormValues) {
  await requireAdmin();
  const validated = couponSchema.parse(data);
  if (!useDatabase) {
    const entries = await readCouponsFile();
    const coupon = {
      id: createId(),
      ...validated,
      currentUses: 0,
      createdAt: new Date(),
    };
    entries.push(coupon);
    await writeCouponsFile(entries);
    revalidatePath("/admin/coupons");
    return coupon;
  }
  const [coupon] = await db.insert(coupons).values(validated).returning();
  revalidatePath("/admin/coupons");
  return coupon;
}

export async function updateCoupon(id: string, data: Partial<CouponFormValues>) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readCouponsFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Coupon not found");
    const updated = { ...entries[index], ...data };
    entries[index] = updated;
    await writeCouponsFile(entries);
    revalidatePath("/admin/coupons");
    return updated;
  }
  const [coupon] = await db
    .update(coupons)
    .set(data)
    .where(eq(coupons.id, id))
    .returning();
  revalidatePath("/admin/coupons");
  return coupon;
}

export async function deleteCoupon(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readCouponsFile();
    await writeCouponsFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/admin/coupons");
    return;
  }
  await db.delete(coupons).where(eq(coupons.id, id));
  revalidatePath("/admin/coupons");
}
