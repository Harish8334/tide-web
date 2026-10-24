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

console.log('\n🎉 Standalone package is ready for deployment in .next/standalone!');
console.log('You can run: node .next/standalone/server.js');
