const fs = require('fs');
const path = require('path');

// Exact list of registration numbers in the order shown in the screenshot
const screenshotOrder = [
  "NN-545-KN", // Jeep Renegade
  "QY-045-QY", // Mitsubishi Outlander
  "QY075QY",   // Mitsubishi Outlander
  "LL802ML",   // Subaru Forester
  "TT902FT",   // Subaru Forester
  "UU108UL",   // Subaru Forester
  "EE346EL",   // Subaru Forester
  "JZ602ZJ",   // Subaru Forester
  "BC-402-CC", // Subaru Forester
  "WX-356-WX", // Subaru Forester
  "GG581WG",   // Toyota RAV4
  "LC-235-LL", // Mitsubishi Outlander
  "LC-785-LL", // Toyota Highlander
  "DY-089-DY", // Subaru Crosstrek
  "RZ117ZR",   // Subaru Crosstrek
  "YS-105-SY"  // Jeep Wrangler
];

// --- 1. Update src/content/fleet-cars.ts ---
const fleetCarsFilePath = path.join(__dirname, '..', 'src', 'content', 'fleet-cars.ts');
if (fs.existsSync(fleetCarsFilePath)) {
  let content = fs.readFileSync(fleetCarsFilePath, 'utf8');

  screenshotOrder.forEach((reg, index) => {
    const newSortOrder = index + 1;
    
    // Find the car registration line and then replace its sortOrder
    const regStr = `registrationNumber: "${reg}"`;
    const regStrAlt = `registrationNumber: '${reg}'`;
    
    let pos = content.indexOf(regStr);
    if (pos === -1) {
      pos = content.indexOf(regStrAlt);
    }

    if (pos === -1) {
      console.warn(`Could not find registration number in fleet-cars.ts: ${reg}`);
      return;
    }

    // Find the next occurrence of `sortOrder: <number>` after this registration number
    const sortOrderPos = content.indexOf('sortOrder:', pos);
    if (sortOrderPos === -1) {
      console.warn(`Could not find sortOrder for car: ${reg}`);
      return;
    }

    // Replace the sortOrder: <number> line
    const endLinePos = content.indexOf(',', sortOrderPos);
    if (endLinePos === -1) return;

    const originalSortOrderLine = content.slice(sortOrderPos, endLinePos);
    content = content.replace(originalSortOrderLine, `sortOrder: ${newSortOrder}`);
    console.log(`Updated fleet-cars.ts: ${reg} -> sortOrder: ${newSortOrder}`);
  });

  fs.writeFileSync(fleetCarsFilePath, content, 'utf8');
  console.log('Successfully updated fleet-cars.ts sortOrder!');
}

// --- 2. Update data/cars.json ---
const carsJsonPath = path.join(__dirname, '..', 'data', 'cars.json');
if (fs.existsSync(carsJsonPath)) {
  const cars = JSON.parse(fs.readFileSync(carsJsonPath, 'utf8'));

  cars.forEach(car => {
    const reg = car.registrationNumber;
    const orderIndex = screenshotOrder.indexOf(reg);
    if (orderIndex !== -1) {
      car.sortOrder = orderIndex + 1;
      console.log(`Updated data/cars.json: ${car.brand} ${car.model} (${reg}) -> sortOrder: ${car.sortOrder}`);
    } else {
      console.warn(`Warning: data/cars.json contains unknown registration number: ${reg}`);
    }
  });

  // Sort array by sortOrder to maintain clean file order
  cars.sort((a, b) => a.sortOrder - b.sortOrder);

  fs.writeFileSync(carsJsonPath, JSON.stringify(cars, null, 2), 'utf8');
  console.log('Successfully updated and sorted data/cars.json!');
}
