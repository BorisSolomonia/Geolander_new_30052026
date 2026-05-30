import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  real,
  uuid,
  date,
  jsonb,
} from "drizzle-orm/pg-core";
import type { CarSeasonalPricing } from "../src/lib/car-pricing";

// ─── Cars ──────────────────────────────────────────────────────────
export const cars = pgTable("cars", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  registrationNumber: text("registration_number").notNull().default("").unique(),
  year: integer("year").notNull(),
  color: text("color").notNull().default(""),
  bodyType: text("body_type").notNull().default(""),
  licenseCategory: text("license_category").notNull().default("B"),
  pricePerDay: real("price_per_day").notNull(),
  seats: integer("seats").notNull().default(5),
  transmission: text("transmission", {
    enum: ["automatic", "manual"],
  }).notNull(),
  fuelType: text("fuel_type", {
    enum: ["gasoline", "diesel", "electric", "hybrid"],
  }).notNull(),
  pricing: jsonb("pricing").$type<CarSeasonalPricing[]>().notNull().default([]),
  features: text("features").array().notNull().default([]),
  images: text("images").array().notNull().default([]),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  available: boolean("available").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Blocked Dates ─────────────────────────────────────────────────
export const blockedDates = pgTable("blocked_dates", {
  id: uuid("id").primaryKey().defaultRandom(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  date: date("date", { mode: "string" }).notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Bookings ──────────────────────────────────────────────────────
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: text("order_id").notNull().unique(),
  carId: uuid("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "restrict" }),
  startDate: date("start_date", { mode: "string" }).notNull(),
  endDate: date("end_date", { mode: "string" }).notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  totalDays: integer("total_days").notNull(),
  basePrice: real("base_price").notNull(),
  discountPercent: real("discount_percent").default(0),
  totalPrice: real("total_price").notNull(),
  couponCode: text("coupon_code"),
  status: text("status", {
    enum: ["pending", "approved", "rejected", "cancelled", "completed"],
  })
    .notNull()
    .default("pending"),
  paymentIntentId: text("payment_intent_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Regions ───────────────────────────────────────────────────────
export const regions = pgTable("regions", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameKa: text("name_ka").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  image: text("image"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Tourist Locations ─────────────────────────────────────────────
export const touristLocations = pgTable("tourist_locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  regionId: uuid("region_id")
    .notNull()
    .references(() => regions.id, { onDelete: "cascade" }),
  nameEn: text("name_en").notNull(),
  nameKa: text("name_ka").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  whatMakesItSpecialEn: text("what_makes_it_special_en").notNull().default(""),
  whatMakesItSpecialKa: text("what_makes_it_special_ka").notNull().default(""),
  types: text("types").array().notNull().default([]),
  images: text("images").array().notNull().default([]),
  googleMapsUrl: text("google_maps_url"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Music Genres ──────────────────────────────────────────────────
export const musicGenres = pgTable("music_genres", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameKa: text("name_ka").notNull().default(""),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  youtubeLinks: text("youtube_links").array().notNull().default([]),
  images: text("images").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Fuel Stations ─────────────────────────────────────────────────
export const fuelStations = pgTable("fuel_stations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  website: text("website"),
  logo: text("logo"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Markets ───────────────────────────────────────────────────────
export const markets = pgTable("markets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  priceLevel: text("price_level", {
    enum: ["budget", "mid-range", "premium"],
  }).notNull(),
  descriptionEn: text("description_en").notNull().default(""),
  descriptionKa: text("description_ka").notNull().default(""),
  logo: text("logo"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Coupons ───────────────────────────────────────────────────────
export const coupons = pgTable("coupons", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  discountPercent: real("discount_percent").notNull(),
  maxUses: integer("max_uses"),
  currentUses: integer("current_uses").notNull().default(0),
  validFrom: date("valid_from", { mode: "string" }),
  validUntil: date("valid_until", { mode: "string" }),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Testimonials ──────────────────────────────────────────────────
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  route: text("route"),
  textEn: text("text_en").notNull().default(""),
  textKa: text("text_ka").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Site Settings ─────────────────────────────────────────────────
export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Users (Admin) ─────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "editor"] })
    .notNull()
    .default("editor"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
