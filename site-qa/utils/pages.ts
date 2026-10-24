import fs from 'fs';
import path from 'path';
import { siteConfig } from '../site.config';

export const PAGES_FILE = path.join(__dirname, '..', '.cache', 'pages.json');

/** Pages found by `npm run discover` (+ extraPaths). Falls back to "/" + extraPaths. */
export function loadPages(): string[] {
  let found: string[] = [];
  try {
    found = JSON.parse(fs.readFileSync(PAGES_FILE, 'utf-8')).pages ?? [];
  } catch {
    console.warn('[site-qa] .cache/pages.json not found — run "npm run discover" first. Testing "/" + extraPaths only.');
  }
  const all = new Set<string>(['/', ...found, ...siteConfig.extraPaths]);
  return [...all].sort();
}
