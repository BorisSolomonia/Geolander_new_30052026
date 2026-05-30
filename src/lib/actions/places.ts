"use server";

import { db } from "../db";
import { regions, touristLocations } from "../../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  regionSchema,
  touristLocationSchema,
  type RegionFormValues,
  type TouristLocationFormValues,
} from "../validations/place";
import { useDatabase } from "../db-mode";
import { requireAdmin } from "../permissions";
import {
  createId,
  readRegionsFile,
  readTouristLocationsFile,
  writeRegionsFile,
  writeTouristLocationsFile,
} from "../file-data-store";

// ─── Regions ───────────────────────────────────────────────────────
export async function getRegions() {
  if (!useDatabase) return readRegionsFile();
  return db.select().from(regions).orderBy(asc(regions.sortOrder));
}

export async function getRegionBySlug(slug: string) {
  if (!useDatabase) {
    const items = await readRegionsFile();
    return items.find((region) => region.slug === slug) ?? null;
  }
  const [region] = await db
    .select()
    .from(regions)
    .where(eq(regions.slug, slug))
    .limit(1);
  return region || null;
}

export async function getRegionWithLocations(slug: string) {
  if (!useDatabase) {
    const [regionEntries, locationEntries] = await Promise.all([
      readRegionsFile(),
      readTouristLocationsFile(),
    ]);
    const region = regionEntries.find((entry) => entry.slug === slug);
    if (!region) return null;
    const locations = locationEntries.filter(
      (entry) => entry.regionId === region.id
    );
    return { ...region, locations };
  }
  const [region] = await db
    .select()
    .from(regions)
    .where(eq(regions.slug, slug))
    .limit(1);
  if (!region) return null;

  const locations = await db
    .select()
    .from(touristLocations)
    .where(eq(touristLocations.regionId, region.id))
    .orderBy(asc(touristLocations.sortOrder));

  return { ...region, locations };
}

export async function getRegionsWithLocations() {
  if (!useDatabase) {
    const [regionEntries, locationEntries] = await Promise.all([
      readRegionsFile(),
      readTouristLocationsFile(),
    ]);
    return regionEntries.map((region) => ({
      ...region,
      locations: locationEntries.filter((entry) => entry.regionId === region.id),
    }));
  }
  const allRegions = await db
    .select()
    .from(regions)
    .orderBy(asc(regions.sortOrder));

  const result = await Promise.all(
    allRegions.map(async (region) => {
      const locations = await db
        .select()
        .from(touristLocations)
        .where(eq(touristLocations.regionId, region.id))
        .orderBy(asc(touristLocations.sortOrder));
      return { ...region, locations };
    })
  );

  return result;
}

export async function createRegion(data: RegionFormValues) {
  await requireAdmin();
  const validated = regionSchema.parse(data);
  if (!useDatabase) {
    const items = await readRegionsFile();
    const region = {
      id: createId(),
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    items.push(region);
    await writeRegionsFile(items);
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return region;
  }
  const [region] = await db.insert(regions).values(validated).returning();
  revalidatePath("/places");
  revalidatePath("/admin/places");
  return region;
}

export async function updateRegion(id: string, data: RegionFormValues) {
  await requireAdmin();
  const validated = regionSchema.parse(data);
  if (!useDatabase) {
    const items = await readRegionsFile();
    const index = items.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Region not found");
    const updated = {
      ...items[index],
      ...validated,
      updatedAt: new Date(),
    };
    items[index] = updated;
    await writeRegionsFile(items);
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return updated;
  }
  const [region] = await db
    .update(regions)
    .set({ ...validated, updatedAt: new Date() })
    .where(eq(regions.id, id))
    .returning();
  revalidatePath("/places");
  revalidatePath("/admin/places");
  return region;
}

export async function deleteRegion(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const [regionEntries, locationEntries] = await Promise.all([
      readRegionsFile(),
      readTouristLocationsFile(),
    ]);
    await Promise.all([
      writeRegionsFile(regionEntries.filter((entry) => entry.id !== id)),
      writeTouristLocationsFile(
        locationEntries.filter((entry) => entry.regionId !== id)
      ),
    ]);
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return;
  }
  await db.delete(regions).where(eq(regions.id, id));
  revalidatePath("/places");
  revalidatePath("/admin/places");
}

// ─── Tourist Locations ─────────────────────────────────────────────
export async function getLocationsByRegion(regionId: string) {
  if (!useDatabase) {
    const items = await readTouristLocationsFile();
    return items.filter((entry) => entry.regionId === regionId);
  }
  return db
    .select()
    .from(touristLocations)
    .where(eq(touristLocations.regionId, regionId))
    .orderBy(asc(touristLocations.sortOrder));
}

export async function createLocation(data: TouristLocationFormValues) {
  await requireAdmin();
  const validated = touristLocationSchema.parse(data);
  if (!useDatabase) {
    const items = await readTouristLocationsFile();
    const location = {
      id: createId(),
      ...validated,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    items.push(location);
    await writeTouristLocationsFile(items);
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return location;
  }
  const [location] = await db
    .insert(touristLocations)
    .values(validated)
    .returning();
  revalidatePath("/places");
  revalidatePath("/admin/places");
  return location;
}

export async function updateLocation(
  id: string,
  data: TouristLocationFormValues
) {
  await requireAdmin();
  const validated = touristLocationSchema.parse(data);
  if (!useDatabase) {
    const items = await readTouristLocationsFile();
    const index = items.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error("Location not found");
    const updated = {
      ...items[index],
      ...validated,
      updatedAt: new Date(),
    };
    items[index] = updated;
    await writeTouristLocationsFile(items);
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return updated;
  }
  const [location] = await db
    .update(touristLocations)
    .set({ ...validated, updatedAt: new Date() })
    .where(eq(touristLocations.id, id))
    .returning();
  revalidatePath("/places");
  revalidatePath("/admin/places");
  return location;
}

export async function deleteLocation(id: string) {
  await requireAdmin();
  if (!useDatabase) {
    const items = await readTouristLocationsFile();
    await writeTouristLocationsFile(items.filter((entry) => entry.id !== id));
    revalidatePath("/places");
    revalidatePath("/admin/places");
    return;
  }
  await db.delete(touristLocations).where(eq(touristLocations.id, id));
  revalidatePath("/places");
  revalidatePath("/admin/places");
}
