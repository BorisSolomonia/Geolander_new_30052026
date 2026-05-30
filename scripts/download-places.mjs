import fs from 'fs';
import path from 'path';
import https from 'https';

const places = [
  { file: 'sighnaghi.jpg', title: 'Sighnaghi' },
  { file: 'alazani_valley.jpg', title: 'Alazani' },
  { file: 'david_gareja.jpg', title: 'David Gareja monastery' },
  { file: 'tsinandali.jpg', title: 'Tsinandali' },
  { file: 'gremi_fortress.jpg', title: 'Gremi' },
  { file: 'bodbe_monastery.jpg', title: 'Bodbe Monastery' },
  { file: 'alaverdi_cathedral.jpg', title: 'Alaverdi Cathedral' },
  { file: 'telavi.jpg', title: 'Telavi' },
  { file: 'ali_nino.jpg', title: 'Ali and Nino' },
  { file: 'batumi_boulevard.jpg', title: 'Batumi' },
  { file: 'alphabet_tower.jpg', title: 'Alphabetic Tower' },
  { file: 'batumi_botanical.jpg', title: 'Batumi Botanical Garden' },
  { file: 'gonio_fortress.jpg', title: 'Gonio Fortress' },
  { file: 'makhuntseti_waterfall.jpg', title: 'Keda Municipality' },
  { file: 'svetitskhoveli.jpg', title: 'Svetitskhoveli Cathedral' },
  { file: 'jvari_monastery.jpg', title: 'Jvari (monastery)' },
  { file: 'ananuri_fortress.jpg', title: 'Ananuri' },
  { file: 'gergeti_trinity.jpg', title: 'Gergeti Trinity Church' },
  { file: 'gudauri.jpg', title: 'Gudauri' },
  { file: 'military_highway.jpg', title: 'Russia–Georgia Friendship Monument' },
  { file: 'mestia.jpg', title: 'Mestia' },
  { file: 'ushguli.jpg', title: 'Ushguli' },
  { file: 'chalaadi_glacier.jpg', title: 'Ushba' }, // Fallback to Ushba for glacier
  { file: 'hatsvali.jpg', title: 'Mestia' }, // Fallback to Mestia for Hatsvali
  { file: 'narikala.jpg', title: 'Narikala' },
  { file: 'sameba_cathedral.jpg', title: 'Holy Trinity Cathedral of Tbilisi' },
  { file: 'old_tbilisi.jpg', title: 'Old Tbilisi' },
  { file: 'bridge_peace.jpg', title: 'Bridge of Peace' },
  { file: 'abanotubani.jpg', title: 'Abanotubani' },
  { file: 'mtatsminda.jpg', title: 'Mtatsminda Park' },
  { file: 'rustaveli_avenue.jpg', title: 'Rustaveli Avenue' },
  // Samegrelo
  { file: 'dadiani_palace.jpg', title: 'Dadiani Palace' },
  { file: 'martvili_canyon.jpg', title: 'Gachedili' },
  { file: 'kolkheti_national_park.jpg', title: 'Kolkheti National Park' },
  { file: 'nokalakevi.jpg', title: 'Nokalakevi' },
  { file: 'tobavarchkhili.jpg', title: 'Egrisi Range' }
];

const destDir = path.resolve('public/places');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'GeolanderWeb/1.0 (contact@geolander.ge)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'GeolanderWeb/1.0 (contact@geolander.ge)' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get image: ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function fetchImageForPlace(place) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects=1&titles=${encodeURIComponent(place.title)}`;
  try {
    const res = await getJson(url);
    const pages = res?.query?.pages;
    if (!pages) {
      console.warn(`No page found for ${place.title}`);
      return false;
    }
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];
    const imageUrl = page?.original?.source;
    if (!imageUrl) {
      console.warn(`No image URL found for ${place.title} (Page: ${page?.title || 'Unknown'})`);
      return false;
    }
    
    const destPath = path.join(destDir, place.file);
    console.log(`Downloading ${place.title} cover to ${place.file}...`);
    await downloadFile(imageUrl, destPath);
    console.log(`Success: ${place.file}`);
    return true;
  } catch (err) {
    console.error(`Error fetching image for ${place.title}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`Starting downloads for ${places.length} places...`);
  const failed = [];
  for (const place of places) {
    const success = await fetchImageForPlace(place);
    if (!success) {
      failed.push(place);
    }
    // Delay to respect API rate limits
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('Finished downloads.');
  if (failed.length > 0) {
    console.log('Failed for places:', failed.map(p => p.title).join(', '));
  }
}

main();
