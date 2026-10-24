import { test, expect } from '@playwright/test';
import { loadPages } from '../utils/pages';
import { open, autoScroll, slug, isMobileProject } from '../utils/helpers';

const NAV_TOGGLE = [
  'button[aria-label*="menu" i]',
  'button[aria-label*="nav" i]',
  'button[class*="menu" i]',
  'button[class*="burger" i]',
  'button[class*="toggle" i]',
  '[class*="hamburger" i]',
  '.navbar-toggler',
  'button[aria-controls]',
  'button[aria-expanded]',
].join(', ');

for (const path of loadPages()) {
  test.describe(`responsive ${path}`, () => {
    test('no horizontal overflow, viewport meta, images fit', async ({ page }, testInfo) => {
      await open(page, path);
      await autoScroll(page);

      const r = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const label = (el: Element) =>
          el.tagName.toLowerCase() +
          (el.id ? '#' + el.id : '') +
          (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
        const offenders = Array.from(document.querySelectorAll('body *'))
          .filter((el) => {
            const b = el.getBoundingClientRect();
            return b.width > 0 && b.height > 0 && (b.right > vw + 1 || b.left < -1);
          })
          .slice(0, 8)
          .map(label);
        const wideImages = Array.from(document.images)
          .filter((i) => i.getBoundingClientRect().width > vw + 1)
          .map((i) => i.currentSrc || i.src)
          .slice(0, 8);
        return { vw, sw, offenders, wideImages };
      });

      expect(r.sw, `page is ${r.sw}px wide in a ${r.vw}px viewport (horizontal scroll). Possible culprits: ${r.offenders.join(', ')}`).toBeLessThanOrEqual(r.vw + 1);
      expect.soft(r.wideImages, 'images wider than the viewport').toEqual([]);
      expect.soft(await page.locator('meta[name="viewport"]').count(), 'missing <meta name="viewport">').toBeGreaterThan(0);

      // Screenshot per page per viewport (open them to eyeball the layout)
      const shot = `screenshots/${testInfo.project.name}/${slug(path)}.png`;
      await page.screenshot({ path: shot, fullPage: true });
      await testInfo.attach('full-page', { path: shot, contentType: 'image/png' });

      if (process.env.VISUAL) {
        await expect(page).toHaveScreenshot(`${slug(path)}.png`, { fullPage: true, maxDiffPixelRatio: 0.02, animations: 'disabled' });
      }
    });

    test('touch targets are big enough (WCAG 2.2: 24px)', async ({ page }, testInfo) => {
      test.skip(!testInfo.project.use.hasTouch && !isMobileProject(testInfo.project.name), 'touch viewports only');
      await open(page, path);

      const small = await page.evaluate(() => {
        const isVisible = (el: Element) => {
          const b = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
        };
        return Array.from(document.querySelectorAll('a[href], button, [role="button"], input:not([type=hidden]), select, textarea'))
          .filter(isVisible)
          .filter((el) => !(el.tagName === 'A' && getComputedStyle(el).display === 'inline')) // inline text links are exempt
          .filter((el) => {
            const b = el.getBoundingClientRect();
            return b.width < 24 || b.height < 24;
          })
          .slice(0, 10)
          .map((el) => {
            const b = el.getBoundingClientRect();
            return `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`;
          });
      });
      expect.soft(small, 'tap targets smaller than 24x24 px').toEqual([]);
    });

    test('navigation works at this width (menu / hamburger)', async ({ page }) => {
      await open(page, path);
      const width = page.viewportSize()!.width;
      const links = page.locator('header a:visible, nav a:visible');

      if (width <= 900) {
        if ((await links.count()) === 0) {
          const toggle = page.locator(NAV_TOGGLE).locator('visible=true').first();
          expect.soft(await toggle.count(), 'no visible nav links and no menu/hamburger button found on mobile').toBeGreaterThan(0);
          if (await toggle.count()) {
            await toggle.click();
            await expect.soft(page.locator('header a:visible, nav a:visible').first(), 'menu opens and shows links after tapping the toggle').toBeVisible();
          }
        }
      } else {
        expect.soft(await links.count(), 'no visible navigation links on desktop').toBeGreaterThan(0);
      }
    });
  });
}

test('mobile landscape has no horizontal overflow (home page)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-390', 'one mobile project is enough');
  await page.setViewportSize({ width: 844, height: 390 });
  await open(page, '/');
  const { sw, vw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth }));
  expect(sw, `landscape: page ${sw}px wide in ${vw}px viewport`).toBeLessThanOrEqual(vw + 1);
});
