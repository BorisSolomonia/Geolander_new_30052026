import { readCarsFile, writeCarsFile, createId } from "../src/lib/file-data-store";
import { defaultFleetCars } from "../src/content/fleet-cars";
import type { Car } from "../src/types";

async function run() {
  console.log("=== Syncing active cars.json database with updated fleet-cars seed ===");
  
  const existingCars = await readCarsFile();
  console.log(`Current active database car count: ${existingCars.length}`);

  const mergedCars: Car[] = [];
  
  // We will map existing cars by registration number for easy lookup
  const existingMap = new Map<string, Car>();
  for (const car of existingCars) {
    existingMap.set(car.registrationNumber.toUpperCase(), car);
  }

  let newAddedCount = 0;
  let updatedCount = 0;

  for (let i = 0; i < defaultFleetCars.length; i++) {
    const seedCar = defaultFleetCars[i];
    const regUpper = seedCar.registrationNumber.toUpperCase();
    const existing = existingMap.get(regUpper);

    if (existing) {
      // Update year and other details, but preserve ID and images
      const updated: Car = {
        ...existing,
        brand: seedCar.brand,
        model: seedCar.model,
        year: seedCar.year,
        color: seedCar.color,
        bodyType: seedCar.bodyType,
        licenseCategory: seedCar.licenseCategory,
        seats: seedCar.seats,
        transmission: seedCar.transmission,
        fuelType: seedCar.fuelType,
        sortOrder: seedCar.sortOrder,
        pricing: seedCar.pricing,
        pricePerDay: seedCar.pricePerDay,
        updatedAt: new Date()
      };
      mergedCars.push(updated);
      updatedCount++;
    } else {
      // Create new car entry
      // Use clean sequential IDs matching the existing ones
      const nextIdNum = mergedCars.length + 1;
      const formattedNum = String(nextIdNum).padStart(12, '0');
      const newId = `00000000-0000-0000-0000-${formattedNum}`;
      
      const newCar: Car = {
        id: newId,
        brand: seedCar.brand,
        model: seedCar.model,
        registrationNumber: seedCar.registrationNumber,
        year: seedCar.year,
        color: seedCar.color,
        bodyType: seedCar.bodyType,
        licenseCategory: seedCar.licenseCategory,
        seats: seedCar.seats,
        transmission: seedCar.transmission,
        fuelType: seedCar.fuelType,
        features: seedCar.features,
        images: seedCar.images,
        descriptionEn: seedCar.descriptionEn,
        descriptionKa: seedCar.descriptionKa,
        available: seedCar.available,
        sortOrder: seedCar.sortOrder,
        pricing: seedCar.pricing,
        pricePerDay: seedCar.pricePerDay,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mergedCars.push(newCar);
      newAddedCount++;
    }
  }

  // Also include any other cars that might be in the database but not in the seed list
  for (const car of existingCars) {
    const regUpper = car.registrationNumber.toUpperCase();
    const isInSeed = defaultFleetCars.some(seed => seed.registrationNumber.toUpperCase() === regUpper);
    if (!isInSeed) {
      mergedCars.push(car);
    }
  }

  console.log(`Writing merged cars array back to cars.json...`);
  await writeCarsFile(mergedCars);
  
  console.log(`Synchronization complete!`);
  console.log(`- Updated existing: ${updatedCount}`);
  console.log(`- Added new: ${newAddedCount}`);
  console.log(`- Total cars in database: ${mergedCars.length}`);
}

run().catch(console.error);
