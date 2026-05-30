"use server";

import { db } from "../db";
import { cars, blockedDates } from "../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { carSchema, type CarFormValues } from "../validations/car";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import { getMinimumSeasonalRate } from "../car-pricing";
import {
  createId,
  readBlockedDatesFile,
  readCarsFile,
  writeBlockedDatesFile,
  writeCarsFile,
} from "../file-data-store";

export async function getCars() {
  if (!useDatabase) return readCarsFile();
  return db.select().from(cars).orderBy(asc(cars.sortOrder));
}

export async function getAvailableCars() {
  if (!useDatabase) {
    const entries = await readCarsFile();
    return entries.filter((entry) => entry.available);
  }
  return db
    .select()
    .from(cars)
    .where(eq(cars.available, true))
    .orderBy(asc(cars.sortOrder));
}

export async function getCarById(id: string) {
  if (!useDatabase) {
    const entries = await readCarsFile();
    return entries.find((entry) => entry.id === id) ?? null;
  }
  const [car] = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
  return car || null;
}

export async function getCarWithBlockedDates(id: string) {
  if (!useDatabase) {
    const [entries, dates] = await Promise.all([
      readCarsFile(),
      readBlockedDatesFile(),
    ]);
    const car = entries.find((entry) => entry.id === id);
    if (!car) return null;
    return {
      ...car,
      blockedDates: dates.filter((entry) => entry.carId === id),
    };
  }
  const [car] = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
  if (!car) return null;

  const dates = await db
    .select()
    .from(blockedDates)
    .where(eq(blockedDates.carId, id));

  return { ...car, blockedDates: dates };
}

export async function createCar(data: CarFormValues) {
  await requireAdmin();
  const validated = carSchema.parse(data);
  if (!useDatabase) {
    const entries = await readCarsFile();
    const car = {
      id: createId(),
      ...validated,
      pricePerDay: getMinimumSeasonalRate(validated.pricing),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    entries.push(car);
    await writeCarsFile(entries);
    revalidatePath("/fleet");
    revalidatePath("/admin/cars");
    return car;
  }
  const [car] = await db
    .insert(cars)
    .values({
      ...validated,
      pricePerDay: getMinimumSeasonalRate(validated.pricing),
    })
    .returning();
  revalidatePath("/fleet");
  revalidatePath("/admin/cars");
  return car;
}

export async function updateCar(id: string, data: CarFormValues) {
  await requireAdmin();
  const validated = carSchema.parse(data);
  if (!useDatabase) {
    const entries = await readCarsFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Car not found");
    const updated = {
      ...entries[index],
      ...validated,
      pricePerDay: getMinimumSeasonalRate(validated.pricing),
      updatedAt: new Date(),
    };
    entries[index] = updated;
    await writeCarsFile(entries);
    revalidatePath("/fleet");
    revalidatePath(`/fleet/${id}`);
    revalidatePath("/admin/cars");
    return updated;
  }
  const [car] = await db
    .update(cars)
    .set({
      ...validated,
      pricePerDay: getMinimumSeasonalRate(validated.pricing),
      updatedAt: new Date(),
    })
    .where(eq(cars.id, id))
    .returning();
  revalidatePath("/fleet");
  revalidatePath(`/fleet/${id}`);
  revalidatePath("/admin/cars");
  return car;
}

export async function deleteCar(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readCarsFile();
    await writeCarsFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/fleet");
    revalidatePath("/admin/cars");
    return;
  }
  await db.delete(cars).where(eq(cars.id, id));
  revalidatePath("/fleet");
  revalidatePath("/admin/cars");
}

export async function addBlockedDate(
  carId: string,
  date: string,
  reason?: string
) {
  await requireAdmin();
  if (!useDatabase) {
    const dates = await readBlockedDatesFile();
    dates.push({
      id: createId(),
      carId,
      date,
      reason: reason ?? null,
      createdAt: new Date(),
    });
    await writeBlockedDatesFile(dates);
    revalidatePath(`/fleet/${carId}`);
    revalidatePath("/admin/cars");
    return;
  }
  await db.insert(blockedDates).values({ carId, date, reason });
  revalidatePath(`/fleet/${carId}`);
  revalidatePath("/admin/cars");
}

export async function removeBlockedDate(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const dates = await readBlockedDatesFile();
    const deleted = dates.find((entry) => entry.id === id);
    await writeBlockedDatesFile(dates.filter((entry) => entry.id !== id));
    if (deleted) {
      revalidatePath(`/fleet/${deleted.carId}`);
      revalidatePath("/admin/cars");
    }
    return;
  }
  const [deleted] = await db
    .delete(blockedDates)
    .where(eq(blockedDates.id, id))
    .returning();
  if (deleted) {
    revalidatePath(`/fleet/${deleted.carId}`);
    revalidatePath("/admin/cars");
  }
}
