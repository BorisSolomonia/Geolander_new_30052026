import type {
  cars,
  bookings,
  regions,
  touristLocations,
  musicGenres,
  fuelStations,
  markets,
  coupons,
  testimonials,
  siteSettings,
  users,
  blockedDates,
} from "../../drizzle/schema";

// Infer types from Drizzle schema
export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;

export type BlockedDate = typeof blockedDates.$inferSelect;
export type NewBlockedDate = typeof blockedDates.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type Region = typeof regions.$inferSelect;
export type NewRegion = typeof regions.$inferInsert;

export type TouristLocation = typeof touristLocations.$inferSelect;
export type NewTouristLocation = typeof touristLocations.$inferInsert;

export type MusicGenre = typeof musicGenres.$inferSelect;
export type NewMusicGenre = typeof musicGenres.$inferInsert;

export type FuelStation = typeof fuelStations.$inferSelect;
export type NewFuelStation = typeof fuelStations.$inferInsert;

export type Market = typeof markets.$inferSelect;
export type NewMarket = typeof markets.$inferInsert;

export type Coupon = typeof coupons.$inferSelect;
export type NewCoupon = typeof coupons.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Extended types with relations
export type CarWithBlockedDates = Car & {
  blockedDates: BlockedDate[];
};

export type RegionWithLocations = Region & {
  locations: TouristLocation[];
};

export type BookingWithCar = Booking & {
  car: Car;
};
