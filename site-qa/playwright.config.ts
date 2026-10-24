import { defineConfig, devices } from '@playwright/test';
import { siteConfig } from './site.config';

const crossBrowser = !!process.env.CROSS_BROWSER;

const chromiumDesktop = devices['Desktop Chrome'];
const pixel = devices['Pixel 7'];

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'qa-report', open: 'never' }],
    ['json', { outputFile: 'qa-report/results.json' }],
  ],
  outputDir: 'test-results',
  snapshotPathTemplate: '{testDir}/__snapshots__/{projectName}/{arg}{ext}',

  use: {
    baseURL: siteConfig.baseURL,
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    // Optional: use an already-installed Chrome instead of the downloaded Chromium (CHROME_PATH=/path/to/chrome)
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] } : {},
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    httpCredentials:
      process.env.HTTP_USER && process.env.HTTP_PASS
        ? { username: process.env.HTTP_USER, password: process.env.HTTP_PASS }
        : undefined,
  },

  projects: [
    { name: 'desktop-1440', use: { ...chromiumDesktop, viewport: { width: 1440, height: 900 } } },
    { name: 'laptop-1280', use: { ...chromiumDesktop, viewport: { width: 1280, height: 720 } } },
    { name: 'tablet-768', use: { ...chromiumDesktop, viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'mobile-390', use: { ...pixel, viewport: { width: 390, height: 844 } } },
    { name: 'mobile-360', use: { ...pixel, viewport: { width: 360, height: 640 } } },

    // Enable with: CROSS_BROWSER=1 npm test   (needs: npx playwright install firefox webkit)
    ...(crossBrowser
      ? [
          { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
          { name: 'webkit-desktop', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
          { name: 'iphone-14', use: { ...devices['iPhone 14'] } },
        ]
      : []),
  ],
});
