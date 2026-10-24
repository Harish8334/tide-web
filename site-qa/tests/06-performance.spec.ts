import { test, expect } from '@playwright/test';
import { loadPages } from '../utils/pages';
import { slug } from '../utils/helpers';
import { siteConfig } from '../site.config';

/** Lab-measured (not a replacement for Lighthouse/PageSpeed, but catches slow or jumpy pages). */
for (const path of loadPages()) {
  test(`performance ${path}`, async ({ page }, testInfo) => {
    test.skip(!['desktop-1440', 'mobile-390'].includes(testInfo.project.name), 'desktop + one mobile viewport');

    await page.addInitScript(() => {
      const w = window as any;
      w.__lcp = 0;
      w.__cls = 0;
      try {
        new PerformanceObserver((list) => {
          for (const e of list.getEntries()) w.__lcp = e.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries() as any[]) if (!e.hadRecentInput) w.__cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
      } catch {
        /* unsupported browser */
      }
    });

    await page.goto(path, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(1500);

    const m = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const w = window as any;
      return {
        domContentLoaded: Math.round(nav?.domContentLoadedEventEnd ?? 0),
        load: Math.round(nav?.loadEventEnd ?? 0),
        lcp: Math.round(w.__lcp ?? 0),
        cls: Number((w.__cls ?? 0).toFixed(3)),
        requests: resources.length,
        transferKB: Math.round(resources.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024),
      };
    });

    testInfo.annotations.push({ type: 'metrics', description: JSON.stringify(m) });
    console.log(`[perf] ${testInfo.project.name} ${slug(path)}: ${JSON.stringify(m)}`);

    expect.soft(m.load, `load event took ${m.load}ms (budget ${siteConfig.budgets.loadMs}ms)`).toBeLessThanOrEqual(siteConfig.budgets.loadMs);
    if (m.lcp > 0) expect.soft(m.lcp, `LCP ${m.lcp}ms (budget ${siteConfig.budgets.lcpMs}ms)`).toBeLessThanOrEqual(siteConfig.budgets.lcpMs);
    expect.soft(m.cls, `layout shift (CLS) ${m.cls} (budget ${siteConfig.budgets.cls})`).toBeLessThanOrEqual(siteConfig.budgets.cls);
  });
}
