import https from 'https';

const title = process.argv[2] || 'Sighnaghi';

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

async function run() {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects=1&titles=${encodeURIComponent(title)}`;
  console.log(`Querying URL: ${url}`);
  try {
    const res = await getJson(url);
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
