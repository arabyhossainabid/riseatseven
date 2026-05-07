import fs from 'fs';
import path from 'path';
import https from 'https';

const componentsDir = './components';
const publicImagesDir = './public/images';

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));
const regex = /https:\/\/rise-atseven\.transforms\.svdcdn\.com\/production\/images\/([^"'\?]+)[^"']*/g;

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let match;
  let changed = false;

  while ((match = regex.exec(content)) !== null) {
    const fullUrl = match[0];
    const imagePath = match[1];
    const filename = path.basename(imagePath);
    const localUrl = `/images/${filename}`;
    
    // Download image
    const downloadUrl = fullUrl.replace(/&amp;/g, '&');
    const localFilePath = path.join(publicImagesDir, filename);
    
    if (!fs.existsSync(localFilePath)) {
      console.log(`Downloading ${filename}...`);
      https.get(downloadUrl, (res) => {
        const fileStream = fs.createWriteStream(localFilePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
        });
      }).on('error', (err) => {
        console.error(`Error downloading ${filename}: ${err.message}`);
      });
    }

    // Replace in content
    content = content.replace(fullUrl, localUrl);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
