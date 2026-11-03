const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const standaloneDir = path.join(rootDir, '.next', 'standalone');

if (!fs.existsSync(standaloneDir)) {
  console.error('Error: .next/standalone does not exist. Run "next build" first.');
  process.exit(1);
}

// 1. Copy public directory
const publicSrc = path.join(rootDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
if (fs.existsSync(publicSrc)) {
  fs.cpSync(publicSrc, publicDest, { recursive: true });
  console.log('✓ Copied public/ to .next/standalone/public');
}

// 2. Copy .next/static directory
const staticSrc = path.join(rootDir, '.next', 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
if (fs.existsSync(staticSrc)) {
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  console.log('✓ Copied .next/static to .next/standalone/.next/static');
}

// 3. Ensure custom runner (tide.js) is in standalone
const tideSrc = path.join(rootDir, 'tide.js');
const tideDest = path.join(standaloneDir, 'tide.js');
if (fs.existsSync(tideSrc)) {
  fs.copyFileSync(tideSrc, tideDest);
  console.log('✓ Copied tide.js to .next/standalone/tide.js');
}

console.log('\n🎉 Standalone package is ready for deployment in .next/standalone!');
console.log('You can run: node .next/standalone/server.js or node .next/standalone/tide.js');
