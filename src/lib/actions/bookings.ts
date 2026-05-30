"use server";

import { db } from "../db";
import { bookings, cars, coupons, blockedDates } from "../../../drizzle/schema";
import { eq, desc, and, sql, gte, lt, gt, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  bookingSchema,
  type BookingFormValues,
} from "../validations/booking";
import { generateOrderId, getDaysBetween } from "../utils";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import { getSeasonalDailyRate } from "../car-pricing";
import {
  createId,
  readBlockedDatesFile,
  readBookingsFile,
  readCarsFile,
  readCouponsFile,
  writeBlockedDatesFile,
  writeBookingsFile,
  writeCouponsFile,
} from "../file-data-store";

export async function getBookings() {
  await requireAdmin();
  if (!useDatabase) {
    const [bookingEntries, carEntries] = await Promise.all([
      readBookingsFile(),
      readCarsFile(),
    ]);
    return bookingEntries
      .map((booking) => ({
        booking,
        car: carEntries.find((car) => car.id === booking.carId) ?? null,
      }))
      .sort(
        (a, b) =>
          b.booking.createdAt.getTime() - a.booking.createdAt.getTime()
      );
  }
  return db
    .select({
      booking: bookings,
      car: cars,
    })
    .from(bookings)
    .leftJoin(cars, eq(bookings.carId, cars.id))
    .orderBy(desc(bookings.createdAt));
}

export async function getBookingById(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const [bookingEntries, carEntries] = await Promise.all([
      readBookingsFile(),
      readCarsFile(),
    ]);
    const booking = bookingEntries.find((entry) => entry.id === id);
    if (!booking) return null;
    return {
      booking,
      car: carEntries.find((entry) => entry.id === booking.carId) ?? null,
    };
  }
  const [result] = await db
    .select({
      booking: bookings,
      car: cars,
    })
    .from(bookings)
    .leftJoin(cars, eq(bookings.carId, cars.id))
    .where(eq(bookings.id, id))
    .limit(1);
  return result || null;
}

export async function createBooking(data: BookingFormValues) {
  const validated = bookingSchema.parse(data);
  if (!useDatabase) {
    const [carEntries, bookingEntries, blockedEntries, couponEntries] =
      await Promise.all([
        readCarsFile(),
        readBookingsFile(),
        readBlockedDatesFile(),
        readCouponsFile(),
      ]);

    const car = carEntries.find((entry) => entry.id === validated.carId);
    if (!car) throw new Error("Car not found");
    if (!car.available) throw new Error("Car is not available");

    const totalDays = getDaysBetween(validated.startDate, validated.endDate);
    if (totalDays <= 0) {
      throw new Error("Invalid booking date range");
    }

    const overlappingBooking = bookingEntries.find(
      (entry) =>
        entry.carId === validated.carId &&
        ["pending", "approved", "completed"].includes(entry.status) &&
        entry.startDate < validated.endDate &&
        entry.endDate > validated.startDate
    );

    if (overlappingBooking) {
      throw new Error("Selected dates are not available");
    }

    const blockedDateInRange = blockedEntries.find(
      (entry) =>
        entry.carId === validated.carId &&
        entry.date >= validated.startDate &&
        entry.date < validated.endDate
    );

    if (blockedDateInRange) {
      throw new Error("Selected dates are blocked");
    }

    const seasonalRate =
      getSeasonalDailyRate(car.pricing ?? [], {
        startDate: validated.startDate,
        totalDays,
      })?.rate ?? car.pricePerDay;

    const basePrice = seasonalRate * totalDays;
    let discountPercent = 0;

    if (validated.couponCode) {
      const normalizedCouponCode = validated.couponCode.toUpperCase();
      const now = new Date().toISOString().slice(0, 10);
      const couponIndex = couponEntries.findIndex(
        (entry) =>
          entry.code === normalizedCouponCode &&
          entry.active &&
          (!entry.validFrom || entry.validFrom <= now) &&
          (!entry.validUntil || entry.validUntil >= now) &&
          (!entry.maxUses || entry.currentUses < entry.maxUses)
      );

      if (couponIndex >= 0) {
        discountPercent = couponEntries[couponIndex].discountPercent;
        couponEntries[couponIndex] = {
          ...couponEntries[couponIndex],
          currentUses: couponEntries[couponIndex].currentUses + 1,
        };
        await writeCouponsFile(couponEntries);
      }
    }

    const booking = {
      id: createId(),
      orderId: generateOrderId(),
      carId: validated.carId,
      startDate: validated.startDate,
      endDate: validated.endDate,
      customerName: validated.customerName,
      customerPhone: validated.customerPhone,
      customerEmail: validated.customerEmail || null,
      totalDays,
      basePrice,
      discountPercent,
      totalPrice: basePrice * (1 - discountPercent / 100),
      couponCode: validated.couponCode?.toUpperCase() || null,
      status: "pending" as const,
      paymentIntentId: null,
      notes: validated.notes || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    bookingEntries.push(booking);
    await writeBookingsFile(bookingEntries);
    revalidatePath("/admin/bookings");
    return booking;
  }

  const [car] = await db
    .select()
    .from(cars)
    .where(eq(cars.id, validated.carId))
    .limit(1);

  if (!car) throw new Error("Car not found");
  if (!car.available) throw new Error("Car is not available");

  const totalDays = getDaysBetween(validated.startDate, validated.endDate);
  if (totalDays <= 0) {
    throw new Error("Invalid booking date range");
  }

  const overlappingBooking = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(
      and(
        eq(bookings.carId, validated.carId),
        inArray(bookings.status, ["pending", "approved", "completed"]),
        lt(bookings.startDate, validated.endDate),
        gt(bookings.endDate, validated.startDate)
      )
    )
    .limit(1);

  if (overlappingBooking.length > 0) {
    throw new Error("Selected dates are not available");
  }

  const blockedDateInRange = await db
    .select({ id: blockedDates.id })
    .from(blockedDates)
    .where(
      and(
        eq(blockedDates.carId, validated.carId),
        gte(blockedDates.date, validated.startDate),
        lt(blockedDates.date, validated.endDate)
      )
    )
    .limit(1);

  if (blockedDateInRange.length > 0) {
    throw new Error("Selected dates are blocked");
  }

  const seasonalRate =
    getSeasonalDailyRate(car.pricing ?? [], {
      startDate: validated.startDate,
      totalDays,
    })?.rate ?? car.pricePerDay;

  const basePrice = seasonalRate * totalDays;
  let discountPercent = 0;

  if (validated.couponCode) {
    const [coupon] = await db
      .select()
      .from(coupons)
      .where(
        and(
          eq(coupons.code, validated.couponCode.toUpperCase()),
          eq(coupons.active, true)
        )
      )
      .limit(1);

    if (coupon) {
      const now = new Date().toISOString().slice(0, 10);
      const validFrom = !coupon.validFrom || coupon.validFrom <= now;
      const validUntil = !coupon.validUntil || coupon.validUntil >= now;
      const hasUses =
        !coupon.maxUses || coupon.currentUses < coupon.maxUses;

      if (validFrom && validUntil && hasUses) {
        const updatedCoupons = await db
          .update(coupons)
          .set({ currentUses: sql`${coupons.currentUses} + 1` })
          .where(
            coupon.maxUses
              ? and(eq(coupons.id, coupon.id), lt(coupons.currentUses, coupon.maxUses))
              : eq(coupons.id, coupon.id)
          )
          .returning({ id: coupons.id });

        if (updatedCoupons.length > 0) {
          discountPercent = coupon.discountPercent;
        }
      }
    }
  }

  const totalPrice = basePrice * (1 - discountPercent / 100);

  const [booking] = await db
    .insert(bookings)
    .values({
      orderId: generateOrderId(),
      carId: validated.carId,
      startDate: validated.startDate,
      endDate: validated.endDate,
      customerName: validated.customerName,
      customerPhone: validated.customerPhone,
      customerEmail: validated.customerEmail || null,
      totalDays,
      basePrice,
      discountPercent,
      totalPrice,
      couponCode: validated.couponCode?.toUpperCase() || null,
      notes: validated.notes || null,
    })
    .returning();

  revalidatePath("/admin/bookings");
  return booking;
}

function getDatesInRange(startDateStr: string, endDateStr: string): string[] {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const dates: string[] = [];
  const current = new Date(start);
  while (current < end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

async function handleBlockedDatesForBooking(
  booking: { carId: string; startDate: string; endDate: string; orderId: string },
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed"
) {
  const reasonText = `Booking: ${booking.orderId}`;
  
  if (!useDatabase) {
    let blockedEntries = await readBlockedDatesFile();
    // Always clear existing blocked entries for this booking first
    blockedEntries = blockedEntries.filter((entry) => entry.reason !== reasonText);

    if (status === "approved") {
      const datesToBlock = getDatesInRange(booking.startDate, booking.endDate);
      for (const d of datesToBlock) {
        blockedEntries.push({
          id: createId(),
          carId: booking.carId,
          date: d,
          reason: reasonText,
          createdAt: new Date(),
        });
      }
    }
    
    await writeBlockedDatesFile(blockedEntries);
  } else {
    // Database mode
    // Always clear existing blocked dates for this order first
    await db.delete(blockedDates).where(eq(blockedDates.reason, reasonText));

    if (status === "approved") {
      const datesToBlock = getDatesInRange(booking.startDate, booking.endDate);
      if (datesToBlock.length > 0) {
        await db.insert(blockedDates).values(
          datesToBlock.map((d) => ({
            carId: booking.carId,
            date: d,
            reason: reasonText,
          }))
        );
      }
    }
  }
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed"
) {
  await requireAdmin();
  if (!useDatabase) {
    const bookingEntries = await readBookingsFile();
    const index = bookingEntries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Booking not found");
    const updated = {
      ...bookingEntries[index],
      status,
      updatedAt: new Date(),
    };
    bookingEntries[index] = updated;
    await writeBookingsFile(bookingEntries);

    // Call date blocker side effects
    await handleBlockedDatesForBooking(updated, status);

    revalidatePath("/admin/bookings");
    return updated;
  }
  const [booking] = await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookings.id, id))
    .returning();

  if (booking) {
    // Call date blocker side effects
    await handleBlockedDatesForBooking(booking, status);
  }

  revalidatePath("/admin/bookings");
  return booking;
}

export async function getBookingStats() {
  await requireAdmin();
  if (!useDatabase) {
    const bookingEntries = await readBookingsFile();
    const totalBookings = bookingEntries.length;
    const pendingBookings = bookingEntries.filter(
      (entry) => entry.status === "pending"
    ).length;
    const totalRevenue = bookingEntries
      .filter(
        (entry) => entry.status === "completed" || entry.status === "approved"
      )
      .reduce((sum, entry) => sum + entry.totalPrice, 0);
    return { totalBookings, pendingBookings, totalRevenue };
  }
  const allBookings = await db.select().from(bookings);
  const totalBookings = allBookings.length;
  const pendingBookings = allBookings.filter(
    (b) => b.status === "pending"
  ).length;
  const totalRevenue = allBookings
    .filter((b) => b.status === "completed" || b.status === "approved")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  return { totalBookings, pendingBookings, totalRevenue };
}
