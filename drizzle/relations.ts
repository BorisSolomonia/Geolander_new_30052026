import { relations } from "drizzle-orm";
import {
  cars,
  blockedDates,
  bookings,
  regions,
  touristLocations,
} from "./schema";

export const carsRelations = relations(cars, ({ many }) => ({
  blockedDates: many(blockedDates),
  bookings: many(bookings),
}));

export const blockedDatesRelations = relations(blockedDates, ({ one }) => ({
  car: one(cars, {
    fields: [blockedDates.carId],
    references: [cars.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  car: one(cars, {
    fields: [bookings.carId],
    references: [cars.id],
  }),
}));

export const regionsRelations = relations(regions, ({ many }) => ({
  locations: many(touristLocations),
}));

export const touristLocationsRelations = relations(
  touristLocations,
  ({ one }) => ({
    region: one(regions, {
      fields: [touristLocations.regionId],
      references: [regions.id],
    }),
  })
);
