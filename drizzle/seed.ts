import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import "dotenv/config";
import * as schema from "./schema";
import { seededSiteSettings } from "../src/content/business-defaults";
import { defaultFleetCars } from "../src/content/fleet-cars";
import {
  staticFuelStations,
  staticLocations,
  staticMarkets,
  staticMusicGenres,
  staticRegions,
  staticTestimonials,
} from "../src/lib/static-data";
import { serverConfig } from "../src/lib/server-config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for db:seed");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function upsertAdminUser() {
  const passwordHash = await bcrypt.hash(serverConfig.seedAdminPassword, 12);
  const [existing] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, serverConfig.seedAdminEmail))
    .limit(1);

  if (existing) {
    await db
      .update(schema.users)
      .set({
        passwordHash,
        name: serverConfig.seedAdminName,
        role: "admin",
      })
      .where(eq(schema.users.id, existing.id));
    return existing.id;
  }

  const [created] = await db
    .insert(schema.users)
    .values({
      email: serverConfig.seedAdminEmail,
      passwordHash,
      name: serverConfig.seedAdminName,
      role: "admin",
    })
    .returning({ id: schema.users.id });

  return created.id;
}

async function upsertSiteSettings() {
  for (const setting of seededSiteSettings) {
    const [existing] = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.key, setting.key))
      .limit(1);

    if (existing) {
      await db
        .update(schema.siteSettings)
        .set({ value: setting.value, updatedAt: new Date() })
        .where(eq(schema.siteSettings.id, existing.id));
    } else {
      await db.insert(schema.siteSettings).values(setting);
    }
  }
}

async function upsertCars() {
  const desiredRegistrations = new Set(defaultFleetCars.map((car) => car.registrationNumber));

  for (const car of defaultFleetCars) {
    const [existing] = await db
      .select()
      .from(schema.cars)
      .where(eq(schema.cars.registrationNumber, car.registrationNumber))
      .limit(1);

    if (existing) {
      await db
        .update(schema.cars)
        .set({ ...car, updatedAt: new Date() })
        .where(eq(schema.cars.id, existing.id));
    } else {
      await db.insert(schema.cars).values(car);
    }
  }

  const existingCars = await db.select().from(schema.cars);
  for (const existing of existingCars) {
    if (desiredRegistrations.has(existing.registrationNumber)) continue;
    if (!existing.available) continue;

    await db
      .update(schema.cars)
      .set({
        available: false,
        updatedAt: new Date(),
      })
      .where(eq(schema.cars.id, existing.id));
  }
}

async function upsertRegionsAndLocations() {
  const regionIdBySlug = new Map<string, string>();
  const regionSlugByStaticId = new Map(staticRegions.map((region) => [region.id, region.slug]));

  for (const region of staticRegions) {
    const regionPayload = {
      slug: region.slug,
      nameEn: region.nameEn,
      nameKa: region.nameKa,
      descriptionEn: region.descriptionEn,
      descriptionKa: region.descriptionKa,
      image: region.image,
      sortOrder: region.sortOrder,
    };

    const [existing] = await db
      .select()
      .from(schema.regions)
      .where(eq(schema.regions.slug, region.slug))
      .limit(1);

    if (existing) {
      await db
        .update(schema.regions)
        .set({ ...regionPayload, updatedAt: new Date() })
        .where(eq(schema.regions.id, existing.id));
      regionIdBySlug.set(region.slug, existing.id);
    } else {
      const [created] = await db
        .insert(schema.regions)
        .values(regionPayload)
        .returning({ id: schema.regions.id });
      regionIdBySlug.set(region.slug, created.id);
    }
  }

  for (const location of staticLocations) {
    const regionSlug = regionSlugByStaticId.get(location.regionId);
    const regionId = regionSlug ? regionIdBySlug.get(regionSlug) : undefined;
    if (!regionId) continue;

    const payload = {
      regionId,
      nameEn: location.nameEn,
      nameKa: location.nameKa,
      descriptionEn: location.descriptionEn,
      descriptionKa: location.descriptionKa,
      whatMakesItSpecialEn: location.whatMakesItSpecialEn,
      whatMakesItSpecialKa: location.whatMakesItSpecialKa,
      types: location.types,
      images: location.images,
      googleMapsUrl: location.googleMapsUrl,
      latitude: location.latitude,
      longitude: location.longitude,
      sortOrder: location.sortOrder,
    };

    const existing = (await db
      .select()
      .from(schema.touristLocations)
      .where(eq(schema.touristLocations.regionId, regionId)))
      .find((entry) => entry.nameEn === location.nameEn);

    if (existing) {
      await db
        .update(schema.touristLocations)
        .set({ ...payload, updatedAt: new Date() })
        .where(eq(schema.touristLocations.id, existing.id));
    } else {
      await db.insert(schema.touristLocations).values(payload);
    }
  }
}

async function upsertMusicGenres() {
  for (const genre of staticMusicGenres) {
    const payload = {
      slug: genre.slug,
      nameEn: genre.nameEn,
      nameKa: genre.nameKa,
      descriptionEn: genre.descriptionEn,
      descriptionKa: genre.descriptionKa,
      youtubeLinks: genre.youtubeLinks,
      images: genre.images,
      sortOrder: genre.sortOrder,
    };

    const [existing] = await db
      .select()
      .from(schema.musicGenres)
      .where(eq(schema.musicGenres.slug, genre.slug))
      .limit(1);

    if (existing) {
      await db
        .update(schema.musicGenres)
        .set({ ...payload, updatedAt: new Date() })
        .where(eq(schema.musicGenres.id, existing.id));
    } else {
      await db.insert(schema.musicGenres).values(payload);
    }
  }
}

async function upsertFuelStations() {
  const existingStations = await db.select().from(schema.fuelStations);
  for (const station of staticFuelStations) {
    const payload = {
      name: station.name,
      descriptionEn: station.descriptionEn,
      descriptionKa: station.descriptionKa,
      website: station.website,
      logo: station.logo,
      sortOrder: station.sortOrder,
    };
    const existing = existingStations.find((entry) => entry.name === station.name);
    if (existing) {
      await db
        .update(schema.fuelStations)
        .set(payload)
        .where(eq(schema.fuelStations.id, existing.id));
    } else {
      await db.insert(schema.fuelStations).values(payload);
    }
  }
}

async function upsertMarkets() {
  const existingMarkets = await db.select().from(schema.markets);
  for (const market of staticMarkets) {
    const payload = {
      name: market.name,
      priceLevel: market.priceLevel,
      descriptionEn: market.descriptionEn,
      descriptionKa: market.descriptionKa,
      logo: market.logo,
      sortOrder: market.sortOrder,
    };
    const existing = existingMarkets.find((entry) => entry.name === market.name);
    if (existing) {
      await db
        .update(schema.markets)
        .set(payload)
        .where(eq(schema.markets.id, existing.id));
    } else {
      await db.insert(schema.markets).values(payload);
    }
  }
}

async function upsertTestimonials() {
  const existingTestimonials = await db.select().from(schema.testimonials);
  for (const testimonial of staticTestimonials) {
    const payload = {
      name: testimonial.name,
      route: testimonial.route,
      textEn: testimonial.textEn,
      textKa: testimonial.textKa,
      rating: testimonial.rating,
      visible: testimonial.visible,
      sortOrder: testimonial.sortOrder,
    };
    const existing = existingTestimonials.find(
      (entry) => entry.name === testimonial.name && (entry.route ?? "") === (testimonial.route ?? "")
    );
    if (existing) {
      await db
        .update(schema.testimonials)
        .set(payload)
        .where(eq(schema.testimonials.id, existing.id));
    } else {
      await db.insert(schema.testimonials).values(payload);
    }
  }
}

async function seed() {
  console.log("Running idempotent bootstrap/import...");
  await upsertAdminUser();
  await upsertSiteSettings();
  await upsertCars();
  await upsertRegionsAndLocations();
  await upsertMusicGenres();
  await upsertFuelStations();
  await upsertMarkets();
  await upsertTestimonials();
  console.log("Bootstrap/import complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
