# site-qa — full-website Playwright test kit

Automatically finds **every page** of a website and tests each one on 5 viewports
(desktop 1440, laptop 1280, tablet 768, mobile 390, mobile 360).

## Quick start

```bash
cd site-qa
npm run setup                                   # installs packages + Chromium (once)
BASE_URL=https://your-site.com npm test         # discover pages, then run everything
npm run report                                  # open the HTML report
npm run summary                                 # writes QA_SUMMARY.md (good for AI agents)
```

Windows PowerShell: `$env:BASE_URL="https://your-site.com"; npm test`

## What it checks

| Spec | Checks |
|---|---|
| `01-pages` | HTTP status, JS exceptions, console errors, failed/4xx/5xx requests, blank page, `undefined`/`NaN`/lorem ipsum, broken images, missing alt |
| `02-responsive` | horizontal overflow, viewport meta, oversized images, tap targets (≥24px), hamburger/menu, landscape, full-page screenshots |
| `03-links` | every link on every page (404s), malformed `mailto:`/`tel:`, `target=_blank` without `noopener` |
| `04-forms` | labels, submit button, required validation, email validation — **never submits** |
| `05-seo-a11y` | title/description/H1/lang/canonical/OG tags, axe accessibility (WCAG A/AA) |
| `06-performance` | load time, LCP, CLS, request count, transfer size |
| `07-navigation` | nav click-through, custom 404 page, keyboard Tab focus, deep-link refresh |

## Useful commands

| Command | Purpose |
|---|---|
| `npm run discover` | re-crawl and rebuild `.cache/pages.json` |
| `npm run test:mobile` / `test:tablet` / `test:desktop` | one device group |
| `npx playwright test tests/02-responsive.spec.ts` | one spec |
| `npx playwright test -g "/pricing"` | one page |
| `npm run test:headed` | watch the browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:cross` | add Firefox + Safari (WebKit) + iPhone (`npx playwright install firefox webkit` first) |
| `npm run test:visual:update` then `npm run test:visual` | visual regression baseline + compare |

## Configure (`site.config.ts`)

- `extraPaths` — pages the crawler can't reach (hidden, dynamic, thank-you pages)
- `excludePaths` — never visit (logout, files)
- `ignoreConsole` / `ignoreRequests` — third-party noise (analytics etc.)
- `budgets` — load / LCP / CLS limits

## Login-protected pages

Create `auth.setup.ts` that logs in once and saves `storageState`, then add
`storageState: '.auth/user.json'` to `use` in `playwright.config.ts`. HTTP basic-auth staging sites:
`HTTP_USER=x HTTP_PASS=y npm test`.

## Notes

- Soft assertions are used so one run reports **all** problems on a page, not just the first.
- Screenshots: `screenshots/<viewport>/<page>.png`. Failures: `test-results/` (traces) and `qa-report/`.
- Don't point this at production with form-submitting tests added — the shipped suite never submits anything.
