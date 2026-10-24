/**
 * Finds every page on the site:
 *   1. reads /sitemap.xml (and nested sitemaps)
 *   2. crawls internal links with a real browser (works for Angular / React / Vue SPAs)
 *   3. adds siteConfig.extraPaths
 * Output: .cache/pages.json
 */
import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '../site.config';
import { PAGES_FILE } from './pages';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const base = new URL(siteConfig.baseURL);
  const seen = new Set<string>();
  const queue: string[] = [];
  const statuses: Record<string, number> = {};
  let dropped = 0;

  const norm = (href: string, from: string): string | null => {
    try {
      const u = new URL(href, from);
      if (!/^https?:$/.test(u.protocol) || u.origin !== base.origin) return null;
      let p = u.pathname.replace(/\/{2,}/g, '/');
      if (p.length > 1) p = p.replace(/\/$/, '');
      if (siteConfig.excludePaths.some((r) => r.test(p))) return null;
      return p;
    } catch {
      return null;
    }
  };

  const enqueue = (p: string | null) => {
    if (!p || seen.has(p)) return;
    if (seen.size >= siteConfig.maxPages) {
      dropped++;
      return;
    }
    seen.add(p);
    queue.push(p);
  };

  // 1. sitemap
  const readSitemap = async (url: string, depth = 0) => {
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
      for (const loc of locs) {
        if (/\.xml(\.gz)?$/i.test(loc) && depth < 2) await readSitemap(loc, depth + 1);
        else enqueue(norm(loc, base.origin));
      }
    } catch {
      /* no sitemap — fine */
    }
  };

  enqueue('/');
  await readSitemap(`${base.origin}/sitemap.xml`);
  siteConfig.extraPaths.forEach((p) => enqueue(p));
  console.log(`[discover] start: ${queue.length} seed page(s) from sitemap / extraPaths`);

  // 2. crawl
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] } : {},
  );
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, baseURL: base.origin });
  let active = 0;

  const worker = async () => {
    const page = await ctx.newPage();
    for (;;) {
      const p = queue.shift();
      if (!p) {
        if (active === 0) break;
        await sleep(100);
        continue;
      }
      active++;
      try {
        const res = await page.goto(base.origin + p, { waitUntil: 'domcontentloaded', timeout: 30_000 });
        statuses[p] = res?.status() ?? 0;
        await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {});
        if (statuses[p] < 400) {
          const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => (a as HTMLAnchorElement).href));
          hrefs.forEach((h) => enqueue(norm(h, page.url())));
          // Same-origin redirects: also register where we landed
          enqueue(norm(page.url(), base.origin));
        }
      } catch (e) {
        statuses[p] = 0;
        console.warn(`[discover] could not open ${p}: ${(e as Error).message.split('\n')[0]}`);
      } finally {
        active--;
      }
    }
    await page.close();
  };

  await Promise.all(Array.from({ length: 4 }, worker));
  await browser.close();

  // Pages that answered with an error are NOT tested as pages (they would fail every spec);
  // they are listed as broken internal links instead and reported by 03-links.
  const all = [...seen].sort();
  const brokenInternal = all.filter((p) => statuses[p] >= 400 || statuses[p] === 0);
  const pages = all.filter((p) => !brokenInternal.includes(p) || siteConfig.extraPaths.includes(p) || p === '/');
  fs.mkdirSync(path.dirname(PAGES_FILE), { recursive: true });
  fs.writeFileSync(
    PAGES_FILE,
    JSON.stringify({ baseURL: siteConfig.baseURL, generatedAt: new Date().toISOString(), pages, brokenInternal, statuses }, null, 2),
  );

  console.log(`[discover] found ${pages.length} testable page(s) on ${base.origin}`);
  pages.forEach((p) => console.log(`   ✓ ${p}`));
  if (brokenInternal.length) {
    console.warn(`[discover] ${brokenInternal.length} internal URL(s) linked but NOT loading (reported as broken links):`);
    brokenInternal.forEach((p) => console.warn(`   ✗ ${p}  (HTTP ${statuses[p] || 'no response'})`));
  }
  if (dropped) console.warn(`[discover] ${dropped} page(s) skipped — raise MAX_PAGES to include them`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
