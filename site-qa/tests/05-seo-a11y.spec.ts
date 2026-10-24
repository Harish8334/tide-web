import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { loadPages } from '../utils/pages';
import { open, slug } from '../utils/helpers';

const RUN_ON = ['desktop-1440', 'mobile-390'];

for (const path of loadPages()) {
  test.describe(`seo + a11y ${path}`, () => {
    test('SEO basics', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-1440', 'run once on desktop');
      await open(page, path);

      const m = await page.evaluate(() => ({
        title: document.title.trim(),
        description: document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '',
        h1: document.querySelectorAll('h1').length,
        lang: document.documentElement.lang,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
        ogTitle: !!document.querySelector('meta[property="og:title"]'),
        ogImage: !!document.querySelector('meta[property="og:image"]'),
        favicon: !!document.querySelector('link[rel~="icon"]'),
        noindex: /noindex/i.test(document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? ''),
      }));

      expect.soft(m.title.length, 'title length should be 10–70 chars').toBeGreaterThanOrEqual(10);
      expect.soft(m.title.length, 'title too long (>70)').toBeLessThanOrEqual(70);
      expect.soft(m.description.length, 'meta description missing (aim for 50–160 chars)').toBeGreaterThanOrEqual(50);
      expect.soft(m.description.length, 'meta description too long (>170)').toBeLessThanOrEqual(170);
      expect.soft(m.h1, 'page should have exactly one <h1>').toBe(1);
      expect.soft(m.lang, '<html lang> missing').not.toBe('');
      expect.soft(m.canonical, 'canonical link missing').not.toBe('');
      expect.soft(m.ogTitle && m.ogImage, 'Open Graph tags (og:title + og:image) missing — poor link previews').toBe(true);
      expect.soft(m.favicon, 'favicon link missing').toBe(true);
      expect.soft(m.noindex, 'page has robots noindex — intended?').toBe(false);
    });

    test('accessibility (axe, WCAG 2.1 A/AA)', async ({ page }, testInfo) => {
      test.skip(!RUN_ON.includes(testInfo.project.name), 'desktop + one mobile viewport');
      await open(page, path);

      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      await testInfo.attach(`axe-${slug(path)}.json`, { body: JSON.stringify(results.violations, null, 2), contentType: 'application/json' });

      const major = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      const minor = results.violations.filter((v) => !(v.impact === 'serious' || v.impact === 'critical'));
      minor.forEach((v) => testInfo.annotations.push({ type: 'a11y-minor', description: `${v.id} (${v.nodes.length}): ${v.help}` }));

      expect
        .soft(
          major.map((v) => `[${v.impact}] ${v.id} ×${v.nodes.length}: ${v.help} — e.g. ${v.nodes[0]?.target?.join(' ')}`),
          'serious/critical accessibility violations',
        )
        .toEqual([]);
    });
  });
}
