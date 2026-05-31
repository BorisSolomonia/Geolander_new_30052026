const fs = require('fs');
const path = require('path');

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

const publicCarsDir = path.join(__dirname, '..', 'public', 'cars');

// Ensure public/cars directory exists
if (!fs.existsSync(publicCarsDir)) {
  fs.mkdirSync(publicCarsDir, { recursive: true });
}

carsList.forEach(car => {
  // Generate clean slug for folder name
  const folderSlug = `${car.brand}-${car.model}-${car.reg}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');

  const carFolderDir = path.join(publicCarsDir, folderSlug);

  if (!fs.existsSync(carFolderDir)) {
    fs.mkdirSync(carFolderDir, { recursive: true });
    console.log(`Created: public/cars/${folderSlug}`);
  }

  // Create a placeholder file so Git tracks this folder
  const placeholderPath = path.join(carFolderDir, 'place_your_images_here.txt');
  const instructions = 
`Instructions for ${car.brand} ${car.model} (${car.reg}):
1. Rename your photos to: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg (up to 5 photos are pre-configured).
2. Place them in this folder.
3. Commit and push your changes to Git.
`;
  
  fs.writeFileSync(placeholderPath, instructions);
});

console.log('All folders prepared successfully!');
