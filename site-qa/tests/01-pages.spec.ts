import { test, expect } from '@playwright/test';
import { loadPages } from '../utils/pages';
import { watchPage, open, autoScroll } from '../utils/helpers';

for (const path of loadPages()) {
  test.describe(`page ${path}`, () => {
    test('loads without errors', async ({ page }) => {
      const w = watchPage(page);
      const res = await open(page, path);

      expect(res, 'no response received').not.toBeNull();
      expect(res!.status(), 'HTTP status').toBeLessThan(400);
      await expect(page.locator('body')).toBeVisible();
      await expect(page, 'page has a <title>').toHaveTitle(/\S+/);

      await autoScroll(page);

      expect.soft(w.pageErrors, 'uncaught JavaScript exceptions').toEqual([]);
      expect.soft(w.consoleErrors, 'console errors').toEqual([]);
      expect.soft(w.failed, 'failed / 4xx / 5xx network requests').toEqual([]);
    });

    test('content sanity (blank page, placeholder text, broken images)', async ({ page }) => {
      await open(page, path);
      await autoScroll(page);

      const text = (await page.locator('body').innerText()).trim();
      expect.soft(text.length, 'page looks blank / almost empty').toBeGreaterThan(50);

      const bad = text.match(/\bundefined\b|\bNaN\b|\[object Object\]|lorem ipsum|{{.*?}}/i);
      expect.soft(bad?.[0] ?? null, 'placeholder / template-leak text visible on page').toBeNull();

      const brokenImages = await page.evaluate(() =>
        Array.from(document.images)
          .filter((i) => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src))
          .map((i) => i.currentSrc || i.src),
      );
      expect.soft(brokenImages, 'broken images').toEqual([]);

      const noAlt = await page.evaluate(
        () => Array.from(document.images).filter((i) => !i.hasAttribute('alt')).map((i) => i.currentSrc || i.src).slice(0, 15),
      );
      expect.soft(noAlt, 'images missing alt attribute').toEqual([]);
    });
  });
}
