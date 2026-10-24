import { Page, Response } from '@playwright/test';
import { siteConfig } from '../site.config';

export function slug(p: string): string {
  const s = p.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  return s || 'home';
}

/** Collects JS exceptions, console errors and failed / 4xx / 5xx requests. Call BEFORE navigating. */
export function watchPage(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failed: string[] = [];
  const ignored = (url: string) => siteConfig.ignoreRequests.some((r) => r.test(url));

  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (!siteConfig.ignoreConsole.some((r) => r.test(t))) consoleErrors.push(t);
  });
  page.on('pageerror', (e) => pageErrors.push(e.message));
  page.on('requestfailed', (r) => {
    const reason = r.failure()?.errorText ?? 'failed';
    if (reason.includes('ERR_ABORTED') || ignored(r.url())) return;
    failed.push(`${r.method()} ${r.url()} — ${reason}`);
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !ignored(r.url())) failed.push(`${r.status()} ${r.request().method()} ${r.url()}`);
  });
  return { consoleErrors, pageErrors, failed };
}

/** Navigate and wait for the page to settle (SPA-friendly). */
export async function open(page: Page, path: string): Promise<Response | null> {
  const res = await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  return res;
}

/** Scrolls the whole page to trigger lazy-loaded images / sections, then returns to top. */
export async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const step = Math.max(400, Math.round(window.innerHeight * 0.8));
      let y = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.documentElement.scrollHeight + step || y > 40_000) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 120);
    });
  });
  await page.waitForTimeout(400);
}

export const isDesktopProject = (name: string) => name.startsWith('desktop') || name.startsWith('webkit') || name.startsWith('firefox');
export const isMobileProject = (name: string) => name.startsWith('mobile') || name.startsWith('iphone');
