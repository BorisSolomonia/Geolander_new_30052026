const fs = require('fs');
const path = require('path');

const carsJsonPath = path.join(__dirname, '..', 'data', 'cars.json');
if (fs.existsSync(carsJsonPath)) {
  let cars = JSON.parse(fs.readFileSync(carsJsonPath, 'utf8'));

  cars = cars.map(car => {
    const reg = car.registrationNumber;
    const folderSlug = `${car.brand}-${car.model}-${reg}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
      
    car.images = [
      `/cars/${folderSlug}/1.jpg`,
      `/cars/${folderSlug}/2.jpg`,
      `/cars/${folderSlug}/3.jpg`,
      `/cars/${folderSlug}/4.jpg`,
      `/cars/${folderSlug}/5.jpg`
    ];
    console.log(`Updated data/cars.json entry for: ${car.brand} ${car.model} (${reg})`);
    return car;
  });

  fs.writeFileSync(carsJsonPath, JSON.stringify(cars, null, 2), 'utf8');
  console.log('Finished updating data/cars.json!');
} else {
  console.log('data/cars.json not found, skipping.');
}
