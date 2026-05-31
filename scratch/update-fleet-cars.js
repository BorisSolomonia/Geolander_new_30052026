const fs = require('fs');
const path = require('path');

const fleetCarsFilePath = path.join(__dirname, '..', 'src', 'content', 'fleet-cars.ts');
let content = fs.readFileSync(fleetCarsFilePath, 'utf8');

const carsList = [
  { brand: "Mitsubishi", model: "Outlander", reg: "QY-045-QY" },
  { brand: "Mitsubishi", model: "Outlander", reg: "QY075QY" },
  { brand: "Subaru", model: "Forester", reg: "LL802ML" },
  { brand: "Subaru", model: "Forester", reg: "TT902FT" },
  { brand: "Subaru", model: "Forester", reg: "UU108UL" },
  { brand: "Subaru", model: "Forester", reg: "BC-402-CC" },
  { brand: "Subaru", model: "Forester", reg: "EE346EL" },
  { brand: "Toyota", model: "RAV4", reg: "GG581WG" },
  { brand: "Subaru", model: "Forester", reg: "JZ602ZJ" },
  { brand: "Subaru", model: "Forester", reg: "WX-356-WX" },
  { brand: "Jeep", model: "Renegade", reg: "NN-545-KN" },
  { brand: "Mitsubishi", model: "Outlander", reg: "LC-235-LL" },
  { brand: "Toyota", model: "Highlander", reg: "LC-785-LL" },
  { brand: "Subaru", model: "Crosstrek", reg: "DY-089-DY" },
  { brand: "Subaru", model: "Crosstrek", reg: "RZ117ZR" },
  { brand: "Jeep", model: "Wrangler", reg: "YS-105-SY" }
];

carsList.forEach(car => {
  const folderSlug = `${car.brand}-${car.model}-${car.reg}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const regStr = `registrationNumber: "${car.reg}"`;
  const regStrAlt = `registrationNumber: '${car.reg}'`;
  
  let pos = content.indexOf(regStr);
  if (pos === -1) {
    pos = content.indexOf(regStrAlt);
  }

  if (pos === -1) {
    console.warn(`Could not find car with registration: ${car.reg}`);
    return;
  }

  // Find the first 'images: [],' after this registration number
  const imagesIdx = content.indexOf('images: [],', pos);
  
  if (imagesIdx === -1) {
    console.warn(`Could not find images array for car: ${car.reg}`);
    return;
  }

  const replacement = `images: [
      "/cars/${folderSlug}/1.jpg",
      "/cars/${folderSlug}/2.jpg",
      "/cars/${folderSlug}/3.jpg",
      "/cars/${folderSlug}/4.jpg",
      "/cars/${folderSlug}/5.jpg"
    ],`;

  // Apply replacement by slicing around the 'images: [],'
  content = content.slice(0, imagesIdx) + replacement + content.slice(imagesIdx + 'images: [],'.length);
  console.log(`Updated images for: ${car.brand} ${car.model} (${car.reg})`);
});

fs.writeFileSync(fleetCarsFilePath, content, 'utf8');
console.log('Finished updating fleet-cars.ts!');
