import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  staticCars,
  staticFuelStations,
  staticLocations,
  staticMarkets,
  staticMusicGenres,
  staticRegions,
  staticSettings,
  staticTestimonials,
} from "./static-data";
import type {
  BlockedDate,
  Booking,
  Car,
  Coupon,
  FuelStation,
  Market,
  MusicGenre,
  Region,
  Testimonial,
  TouristLocation,
} from "@/types";

type FileKey =
  | "cars"
  | "blocked-dates"
  | "bookings"
  | "coupons"
  | "fuel-stations"
  | "markets"
  | "music-genres"
  | "regions"
  | "settings"
  | "testimonials"
  | "tourist-locations";

const DATA_DIR = process.env.LOCAL_DATA_DIR?.trim() || "data";

function getDataFilePath(key: FileKey) {
  return path.join(process.cwd(), DATA_DIR, `${key}.json`);
}

async function ensureDataDir() {
  await mkdir(path.join(process.cwd(), DATA_DIR), { recursive: true });
}

function deepClone<T>(value: T): T {
  return structuredClone(value);
}

async function readJsonFile<T>(
  key: FileKey,
  createInitialValue: () => T
): Promise<T> {
  await ensureDataDir();
  const filePath = getDataFilePath(key);

  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== "ENOENT") {
      throw error;
    }

    const initialValue = createInitialValue();
    await writeJsonFile(key, initialValue);
    return initialValue;
  }
}

async function writeJsonFile<T>(key: FileKey, value: T) {
  await ensureDataDir();
  const filePath = getDataFilePath(key);
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const serialized = JSON.stringify(value, null, 2);
  await writeFile(tempPath, serialized, "utf8");
  try {
    await rename(tempPath, filePath);
  } catch {
    await writeFile(filePath, serialized, "utf8");
    await unlink(tempPath).catch(() => {});
  }
}

function reviveRowsWithDates<T extends Record<string, unknown>>(
  rows: Array<Record<string, unknown>>,
  dateFields: string[]
) {
  return rows.map((row) => {
    const revived = { ...row };
    for (const field of dateFields) {
      const value = revived[field];
      if (typeof value === "string") {
        revived[field] = new Date(value);
      }
    }
    return revived as T;
  });
}

export async function readCarsFile(): Promise<Car[]> {
  const rows = await readJsonFile("cars", () => deepClone(staticCars));
  return reviveRowsWithDates<Car>(rows as Array<Record<string, unknown>>, [
    "createdAt",
    "updatedAt",
  ]);
}

export async function writeCarsFile(rows: Car[]) {
  await writeJsonFile("cars", rows);
}

export async function readBlockedDatesFile(): Promise<BlockedDate[]> {
  const rows = await readJsonFile<BlockedDate[]>("blocked-dates", () => []);
  return reviveRowsWithDates<BlockedDate>(
    rows as Array<Record<string, unknown>>,
    ["createdAt"]
  );
}

export async function writeBlockedDatesFile(rows: BlockedDate[]) {
  await writeJsonFile("blocked-dates", rows);
}

export async function readBookingsFile(): Promise<Booking[]> {
  const rows = await readJsonFile<Booking[]>("bookings", () => []);
  return reviveRowsWithDates<Booking>(
    rows as Array<Record<string, unknown>>,
    ["createdAt", "updatedAt"]
  );
}

export async function writeBookingsFile(rows: Booking[]) {
  await writeJsonFile("bookings", rows);
}

export async function readCouponsFile(): Promise<Coupon[]> {
  const rows = await readJsonFile<Coupon[]>("coupons", () => []);
  return reviveRowsWithDates<Coupon>(
    rows as Array<Record<string, unknown>>,
    ["createdAt"]
  );
}

export async function writeCouponsFile(rows: Coupon[]) {
  await writeJsonFile("coupons", rows);
}

export async function readFuelStationsFile(): Promise<FuelStation[]> {
  const rows = await readJsonFile("fuel-stations", () =>
    deepClone(staticFuelStations)
  );
  return reviveRowsWithDates<FuelStation>(
    rows as Array<Record<string, unknown>>,
    ["createdAt"]
  );
}

export async function writeFuelStationsFile(rows: FuelStation[]) {
  await writeJsonFile("fuel-stations", rows);
}

export async function readMarketsFile(): Promise<Market[]> {
  const rows = await readJsonFile("markets", () => deepClone(staticMarkets));
  return reviveRowsWithDates<Market>(
    rows as Array<Record<string, unknown>>,
    ["createdAt"]
  );
}

export async function writeMarketsFile(rows: Market[]) {
  await writeJsonFile("markets", rows);
}

export async function readMusicGenresFile(): Promise<MusicGenre[]> {
  const rows = await readJsonFile("music-genres", () =>
    deepClone(staticMusicGenres)
  );
  return reviveRowsWithDates<MusicGenre>(
    rows as Array<Record<string, unknown>>,
    ["createdAt", "updatedAt"]
  );
}

export async function writeMusicGenresFile(rows: MusicGenre[]) {
  await writeJsonFile("music-genres", rows);
}

export async function readRegionsFile(): Promise<Region[]> {
  const rows = await readJsonFile("regions", () => deepClone(staticRegions));
  return reviveRowsWithDates<Region>(
    rows as Array<Record<string, unknown>>,
    ["createdAt", "updatedAt"]
  );
}

export async function writeRegionsFile(rows: Region[]) {
  await writeJsonFile("regions", rows);
}

export async function readTouristLocationsFile(): Promise<TouristLocation[]> {
  const rows = await readJsonFile("tourist-locations", () =>
    deepClone(staticLocations)
  );
  return reviveRowsWithDates<TouristLocation>(
    rows as Array<Record<string, unknown>>,
    ["createdAt", "updatedAt"]
  );
}

export async function writeTouristLocationsFile(rows: TouristLocation[]) {
  await writeJsonFile("tourist-locations", rows);
}

export async function readSettingsFile(): Promise<Record<string, string>> {
  return readJsonFile("settings", () => deepClone(staticSettings));
}

export async function writeSettingsFile(settings: Record<string, string>) {
  await writeJsonFile("settings", settings);
}

export async function readTestimonialsFile(): Promise<Testimonial[]> {
  const rows = await readJsonFile("testimonials", () =>
    deepClone(staticTestimonials)
  );
  return reviveRowsWithDates<Testimonial>(
    rows as Array<Record<string, unknown>>,
    ["createdAt"]
  );
}

export async function writeTestimonialsFile(rows: Testimonial[]) {
  await writeJsonFile("testimonials", rows);
}

export function createId() {
  return randomUUID();
}
