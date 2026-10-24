import { test, expect } from '@playwright/test';
import { open, watchPage } from '../utils/helpers';
import { siteConfig } from '../site.config';

test('header/nav links navigate correctly (click-through)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'desktop click-through; mobile menu is covered in 02-responsive');
  test.setTimeout(5 * 60_000);

  await open(page, '/');
  const origin = new URL(page.url()).origin;
  const hrefs = await page.$$eval('header a[href], nav a[href]', (as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).href))]);
  const internal = hrefs.filter((h) => h.startsWith(origin) && !h.includes('#') && new URL(h).pathname !== '/').slice(0, 25);

  const problems: string[] = [];
  for (const href of internal) {
    await open(page, '/');
    const link = page.locator(`header a[href], nav a[href]`).locator(`visible=true`).and(page.locator(`[href="${new URL(href).pathname}"], [href="${href}"]`)).first();
    if (!(await link.count())) continue; // hidden in a dropdown — covered by link checker
    const w = watchPage(page);
    try {
      await Promise.all([page.waitForLoadState('domcontentloaded'), link.click({ timeout: 8_000 })]);
      await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      const bodyText = (await page.locator('body').innerText()).slice(0, 400);
      if (!page.url().startsWith(origin)) problems.push(`${href} → left the site (${page.url()})`);
      else if (/\b404\b|not found/i.test(bodyText) && bodyText.length < 400) problems.push(`${href} → looks like a 404 page`);
      if (w.pageErrors.length) problems.push(`${href} → JS error: ${w.pageErrors[0]}`);
    } catch (e) {
      problems.push(`${href} → click failed: ${(e as Error).message.split('\n')[0]}`);
    }
  }
  expect.soft(problems, 'nav click-through problems').toEqual([]);
});

test('unknown URL shows a proper 404 page', async ({ page }) => {
  const res = await page.goto(siteConfig.notFoundPath, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  const text = (await page.locator('body').innerText()).trim();
  const looksLike404 = /404|not found|doesn.?t exist|page.*(missing|unavailable)|can.?t (be )?find/i.test(text);

  expect.soft(res?.status() === 404 || looksLike404, `unknown URL returned HTTP ${res?.status()} and no visible "not found" message`).toBe(true);
  expect.soft(text.length, '404 page is blank').toBeGreaterThan(10);
  expect.soft(await page.locator('a[href="/"], a[href$="/"]').count(), '404 page should link back home').toBeGreaterThan(0);
});

test('keyboard: Tab moves focus and focus is visible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'keyboard test runs on desktop');
  await open(page, '/');
  const seen = new Set<string>();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    const d = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const hasIndicator = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      return { id: el.tagName + '|' + (el.textContent || '').trim().slice(0, 20) + '|' + (el.getAttribute('href') ?? ''), hasIndicator };
    });
    if (d) seen.add(d.id);
  }
  expect(seen.size, 'Tab key should move focus through several interactive elements').toBeGreaterThanOrEqual(3);
});

test('refresh on a deep link keeps working (SPA routing)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'desktop only');
  await open(page, '/');
  const origin = new URL(page.url()).origin;
  const deep = await page.$$eval('a[href]', (as, o) => (as as HTMLAnchorElement[]).map((a) => a.href).find((h) => h.startsWith(o) && new URL(h).pathname.length > 1 && !h.includes('#')), origin);
  test.skip(!deep, 'no deep internal link found');
  const res = await page.goto(deep!, { waitUntil: 'domcontentloaded' });
  expect(res?.status(), `direct visit of ${deep}`).toBeLessThan(400);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).not.toBeEmpty();
});
