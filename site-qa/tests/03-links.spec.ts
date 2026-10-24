import { test, expect } from '@playwright/test';
import { loadPages } from '../utils/pages';
import { open } from '../utils/helpers';
import { siteConfig } from '../site.config';

test('every link on every page resolves (no 404s, valid mailto/tel)', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'run once on desktop');
  test.setTimeout(15 * 60_000);

  const urls = new Map<string, string>(); // url -> first page it was found on
  const badContacts: string[] = [];
  const unsafeBlank: string[] = [];

  for (const p of loadPages()) {
    await open(page, p);
    const found = await page.$$eval('a[href]', (as) =>
      as.map((a) => {
        const el = a as HTMLAnchorElement;
        return { href: el.href, raw: el.getAttribute('href') ?? '', target: el.target, rel: el.rel };
      }),
    );
    for (const l of found) {
      if (l.raw.startsWith('mailto:')) {
        if (!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+/i.test(l.raw)) badContacts.push(`${p}: ${l.raw}`);
      } else if (l.raw.startsWith('tel:')) {
        if (!/^tel:\+?[\d\s\-().]{6,}$/i.test(l.raw)) badContacts.push(`${p}: ${l.raw}`);
      } else if (/^https?:/i.test(l.href)) {
        const clean = l.href.split('#')[0];
        if (!urls.has(clean)) urls.set(clean, p);
        const external = new URL(l.href).origin !== new URL(page.url()).origin;
        if (l.target === '_blank' && external && !/noopener|noreferrer/.test(l.rel)) unsafeBlank.push(`${p}: ${l.href}`);
      } else if (l.raw === '#' || l.raw === '' || /^javascript:/i.test(l.raw)) {
        // placeholder links are reported but not failed
        testInfo.annotations.push({ type: 'placeholder-link', description: `${p}: href="${l.raw}"` });
      }
    }
  }

  const check = async (url: string): Promise<number> => {
    try {
      let res = await request.head(url, { timeout: 20_000, maxRedirects: 5 });
      if (res.status() >= 400) res = await request.get(url, { timeout: 20_000, maxRedirects: 5 });
      return res.status();
    } catch {
      return 0;
    }
  };

  const entries = [...urls.entries()];
  const broken: string[] = [];
  const warnings: string[] = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (i < entries.length) {
        const [url, from] = entries[i++];
        const status = await check(url);
        if (status > 0 && status < 400) continue;
        const host = new URL(url).hostname;
        const botBlocked = siteConfig.botBlockingHosts.some((h) => host.endsWith(h)) && [0, 403, 429, 999].includes(status);
        (botBlocked ? warnings : broken).push(`${status || 'NO RESPONSE'}  ${url}   (found on ${from})`);
      }
    }),
  );

  warnings.forEach((w) => testInfo.annotations.push({ type: 'warning-bot-blocked', description: w }));
  console.log(`[links] checked ${entries.length} unique URLs — ${broken.length} broken, ${warnings.length} bot-blocked warnings`);

  expect.soft(broken, 'broken links').toEqual([]);
  expect.soft(badContacts, 'malformed mailto: / tel: links').toEqual([]);
  expect.soft(unsafeBlank, 'external target=_blank links without rel="noopener"').toEqual([]);
});
