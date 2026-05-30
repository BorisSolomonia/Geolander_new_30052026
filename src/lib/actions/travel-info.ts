"use server";

import { db } from "../db";
import { fuelStations, markets } from "../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import {
  createId,
  readFuelStationsFile,
  readMarketsFile,
  writeFuelStationsFile,
  writeMarketsFile,
} from "../file-data-store";

export async function getFuelStations() {
  if (!useDatabase) return readFuelStationsFile();
  return db.select().from(fuelStations).orderBy(asc(fuelStations.sortOrder));
}

export async function createFuelStation(data: {
  name: string;
  descriptionEn?: string;
  descriptionKa?: string;
  website?: string;
  logo?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readFuelStationsFile();
    const station = {
      id: createId(),
      name: data.name,
      descriptionEn: data.descriptionEn ?? "",
      descriptionKa: data.descriptionKa ?? "",
      website: data.website ?? null,
      logo: data.logo ?? null,
      sortOrder: data.sortOrder ?? 0,
      createdAt: new Date(),
    };
    entries.push(station);
    await writeFuelStationsFile(entries);
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return station;
  }
  const [station] = await db.insert(fuelStations).values(data).returning();
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
  return station;
}

export async function updateFuelStation(
  id: string,
  data: Partial<{
    name: string;
    descriptionEn: string;
    descriptionKa: string;
    website: string;
    logo: string;
    sortOrder: number;
  }>
) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readFuelStationsFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Fuel station not found");
    const updated = { ...entries[index], ...data };
    entries[index] = updated;
    await writeFuelStationsFile(entries);
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return updated;
  }
  const [station] = await db
    .update(fuelStations)
    .set(data)
    .where(eq(fuelStations.id, id))
    .returning();
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
  return station;
}

export async function deleteFuelStation(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readFuelStationsFile();
    await writeFuelStationsFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return;
  }
  await db.delete(fuelStations).where(eq(fuelStations.id, id));
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
}

export async function getMarkets() {
  if (!useDatabase) return readMarketsFile();
  return db.select().from(markets).orderBy(asc(markets.sortOrder));
}

export async function createMarket(data: {
  name: string;
  priceLevel: "budget" | "mid-range" | "premium";
  descriptionEn?: string;
  descriptionKa?: string;
  logo?: string;
  sortOrder?: number;
}) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMarketsFile();
    const market = {
      id: createId(),
      name: data.name,
      priceLevel: data.priceLevel,
      descriptionEn: data.descriptionEn ?? "",
      descriptionKa: data.descriptionKa ?? "",
      logo: data.logo ?? null,
      sortOrder: data.sortOrder ?? 0,
      createdAt: new Date(),
    };
    entries.push(market);
    await writeMarketsFile(entries);
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return market;
  }
  const [market] = await db.insert(markets).values(data).returning();
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
  return market;
}

export async function updateMarket(
  id: string,
  data: Partial<{
    name: string;
    priceLevel: "budget" | "mid-range" | "premium";
    descriptionEn: string;
    descriptionKa: string;
    logo: string;
    sortOrder: number;
  }>
) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMarketsFile();
    const index = entries.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Market not found");
    const updated = { ...entries[index], ...data };
    entries[index] = updated;
    await writeMarketsFile(entries);
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return updated;
  }
  const [market] = await db
    .update(markets)
    .set(data)
    .where(eq(markets.id, id))
    .returning();
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
  return market;
}

export async function deleteMarket(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const entries = await readMarketsFile();
    await writeMarketsFile(entries.filter((entry) => entry.id !== id));
    revalidatePath("/travel-info");
    revalidatePath("/admin/travel-info");
    return;
  }
  await db.delete(markets).where(eq(markets.id, id));
  revalidatePath("/travel-info");
  revalidatePath("/admin/travel-info");
}
