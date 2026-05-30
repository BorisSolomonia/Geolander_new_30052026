import fs from 'fs';
import path from 'path';

const nameToImage = {
  "Sighnaghi (City of Love)": "sighnaghi.jpg",
  "Alazani Valley": "alazani_valley.jpg",
  "David Gareja Monastery Complex": "david_gareja.jpg",
  "Tsinandali Estate": "tsinandali.jpg",
  "Gremi Fortress": "gremi_fortress.jpg",
  "Bodbe Monastery": "bodbe_monastery.jpg",
  "Alaverdi Cathedral": "alaverdi_cathedral.jpg",
  "Telavi": "telavi.jpg",
  "Ali and Nino Statue": "ali_nino.jpg",
  "Batumi Boulevard": "batumi_boulevard.jpg",
  "Alphabet Tower": "alphabet_tower.jpg",
  "Batumi Botanical Garden": "batumi_botanical.jpg",
  "Gonio Fortress": "gonio_fortress.jpg",
  "Makhuntseti Waterfall": "makhuntseti_waterfall.jpg",
  "Svetitskhoveli Cathedral": "svetitskhoveli.jpg",
  "Jvari Monastery": "jvari_monastery.jpg",
  "Ananuri Fortress": "ananuri_fortress.jpg",
  "Gergeti Trinity Church": "gergeti_trinity.jpg",
  "Gudauri Ski Resort": "gudauri.jpg",
  "Georgian Military Highway": "military_highway.jpg",
  "Mestia": "mestia.jpg",
  "Ushguli": "ushguli.jpg",
  "Chalaadi Glacier": "chalaadi_glacier.jpg",
  "Hatsvali Ski Resort": "hatsvali.jpg",
  "Narikala Fortress": "narikala.jpg",
  "Holy Trinity Cathedral": "sameba_cathedral.jpg",
  "Old Tbilisi": "old_tbilisi.jpg",
  "Bridge of Peace": "bridge_peace.jpg",
  "Abanotubani (Sulfur Baths)": "abanotubani.jpg",
  "Mtatsminda Park": "mtatsminda.jpg",
  "Rustaveli Avenue": "rustaveli_avenue.jpg",
  "Dadiani Palace": "dadiani_palace.jpg",
  "Martvili Canyon": "martvili_canyon.jpg",
  "Kolkheti National Park": "kolkheti_national_park.jpg",
  "Nokalakevi (Archaeopolis)": "nokalakevi.jpg",
  "Tobavarchkhili Lakes": "tobavarchkhili.jpg"
};

// 1. Update data/tourist-locations.json
const jsonPath = path.resolve('data/tourist-locations.json');
if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let updatedCount = 0;
  for (const item of data) {
    const filename = nameToImage[item.nameEn];
    if (filename) {
      item.images = [`/places/${filename}`];
      updatedCount++;
    } else {
      console.warn(`No cover image mapped for JSON item: ${item.nameEn}`);
    }
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} entries in ${jsonPath}`);
} else {
  console.error(`File not found: ${jsonPath}`);
}

// 2. Update src/lib/static-data.ts
const tsPath = path.resolve('src/lib/static-data.ts');
if (fs.existsSync(tsPath)) {
  let content = fs.readFileSync(tsPath, 'utf8');
  let updatedCount = 0;
  for (const [name, filename] of Object.entries(nameToImage)) {
    const nameEscaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(nameEn:\\s*"${nameEscaped}"[^}]*?images:\\s*)\\[.*?\\](?:\\s*as\\s*string\\[\\])?`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1["/places/${filename}"]`);
      updatedCount++;
    } else {
      // Check if it was already updated or not found
      if (!content.includes(`/places/${filename}`)) {
        console.warn(`Could not find or match location in TS file: ${name}`);
      }
    }
  }
  fs.writeFileSync(tsPath, content, 'utf8');
  console.log(`Successfully updated ${updatedCount} entries in ${tsPath}`);
} else {
  console.error(`File not found: ${tsPath}`);
}
