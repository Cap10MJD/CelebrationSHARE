import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple icon using sharp
async function generateIcons() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    // Create a simple icon with text
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${size * 0.25}" fill="#3B82F6"/>
        <circle cx="${size * 0.5}" cy="${size * 0.4}" r="${size * 0.15}" fill="#FFFFFF"/>
        <path d="M${size * 0.35} ${size * 0.55} L${size * 0.65} ${size * 0.55} L${size * 0.5} ${size * 0.75} Z" fill="#FFFFFF"/>
        <circle cx="${size * 0.35}" cy="${size * 0.35}" r="${size * 0.02}" fill="#3B82F6"/>
        <circle cx="${size * 0.65}" cy="${size * 0.35}" r="${size * 0.02}" fill="#3B82F6"/>
        <circle cx="${size * 0.5}" cy="${size * 0.25}" r="${size * 0.02}" fill="#3B82F6"/>
        <text x="${size * 0.5}" y="${size * 0.85}" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="${size * 0.06}" font-weight="bold">CS</text>
      </svg>
    `;

    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(__dirname, '../public', `icon-${size}x${size}.png`));
    
    console.log(`Generated icon-${size}x${size}.png`);
  }
  
  // Create apple touch icon
  await sharp(Buffer.from(`
    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="40" fill="#3B82F6"/>
      <circle cx="90" cy="70" r="25" fill="#FFFFFF"/>
      <path d="M65 85 L115 85 L90 110 Z" fill="#FFFFFF"/>
      <circle cx="70" cy="60" r="3" fill="#3B82F6"/>
      <circle cx="110" cy="60" r="3" fill="#3B82F6"/>
      <circle cx="90" cy="45" r="3" fill="#3B82F6"/>
      <text x="90" y="140" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="16" font-weight="bold">CS</text>
    </svg>
  `))
    .png()
    .toFile(path.join(__dirname, '../public', 'apple-touch-icon.png'));
  
  console.log('Generated apple-touch-icon.png');
  
  // Create favicon
  await sharp(Buffer.from(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#3B82F6"/>
      <circle cx="16" cy="12" r="4" fill="#FFFFFF"/>
      <path d="M12 15 L20 15 L16 19 Z" fill="#FFFFFF"/>
      <circle cx="13" cy="10" r="1" fill="#3B82F6"/>
      <circle cx="19" cy="10" r="1" fill="#3B82F6"/>
      <circle cx="16" cy="8" r="1" fill="#3B82F6"/>
    </svg>
  `))
    .png()
    .toFile(path.join(__dirname, '../public', 'favicon.ico'));
  
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error); 