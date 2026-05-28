#!/usr/bin/env node
// Scans all mood image folders and writes manifest.json.
// Run automatically by Vercel at build time; also usable locally.
//   node generate-manifest.js

const fs   = require('fs');
const path = require('path');

const MOOD_FOLDERS = [
  'Cloudy:Soft Light',
  'Fog:Mist',
  'Golden Hour:Partly Cloudy',
  'Hot',
  'Night:Overcast Evening',
  'Rain',
  'Snow',
  'Storm',
  'Sunny',
];

const manifest = {};
const root = __dirname;

console.log('Scanning mood folders…\n');

for (const folder of MOOD_FOLDERS) {
  const dir = path.join(root, folder);
  try {
    const files = fs.readdirSync(dir)
      .filter(f => /\.webp$/i.test(f))
      .sort();
    manifest[folder] = files;
    console.log(`  ✓  ${folder}  (${files.length} images)`);
  } catch (e) {
    console.warn(`  ⚠  Could not read "${folder}": ${e.message}`);
    manifest[folder] = [];
  }
}

const out = path.join(root, 'manifest.json');
fs.writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n✓ manifest.json written`);
