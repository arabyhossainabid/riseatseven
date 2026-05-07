import fs from 'fs';
import path from 'path';
import https from 'https';

const urls = fs.readFileSync('svdcdn_urls.txt', 'utf-8').split('\n').filter(Boolean);
const imagesDir = './public/images';

const files = fs.readdirSync(imagesDir);

for (const file of files) {
  if (file === '.DS_Store') continue;
  // find matching url
  const matchUrl = urls.find(u => u.includes(file));
  if (matchUrl) {
    console.log(`Found signed URL for ${file}`);
    const localFilePath = path.join(imagesDir, file);
    
    // Download
    https.get(matchUrl, (res) => {
      const fileStream = fs.createWriteStream(localFilePath);
      res.pipe(fileStream);
    }).on('error', (err) => {
      console.error(`Error downloading ${file}:`, err);
    });
  } else {
    console.log(`No signed URL found for ${file}`);
  }
}
