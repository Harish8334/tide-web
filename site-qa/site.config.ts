/**
 * ONE place to configure the whole suite.
 * Set the URL with:  BASE_URL=https://your-site.com npm test
 */
export const siteConfig = {
  baseURL: process.env.BASE_URL ?? 'http://localhost:3000',

  /** Crawler safety cap. */
  maxPages: Number(process.env.MAX_PAGES ?? 150),

  /**
   * Pages the crawler cannot find on its own: hidden pages, thank-you pages,
   * dynamic routes with real sample IDs, etc. Example: ['/product/12', '/thank-you']
   */
  extraPaths: [
    '/student/dashboard',
    '/student/courses',
    '/student/exams',
    '/student/live-classes',
    '/student/formulas',
    '/student/doubts',
    '/student/leaderboard',
    '/student/mistakes',
    '/student/lab',
    '/student/omr',
    '/student/profile',
  ] as string[],

  /** Paths the crawler must NOT visit (logout links, files, admin consoles). */
  excludePaths: [
    /^\/(logout|signout|sign-out)/i,
    /\.(pdf|zip|docx?|xlsx?|pptx?|jpe?g|png|gif|webp|svg|ico|mp4|mp3|xml|txt)$/i,
    /^\/wp-admin/i,
    /^\/cdn-cgi\//i,
  ],

  /** Console errors matching any of these are ignored (third-party noise). */
  ignoreConsole: [
    /favicon\.ico/i,
    /^Failed to load resource/i,
    /Could not validate that a segment in your UI has instant navigation/i,
    /status of 401/i,
  ],

  /** Failed / 4xx / 5xx requests to these URLs are ignored. */
  ignoreRequests: [
    /googletagmanager|google-analytics|doubleclick|facebook\.(net|com)|hotjar|clarity\.ms|fonts\.gstatic/i,
    /\/favicon\.ico/i,
    /\/api\/auth\/stats/i,
  ],

  /** Performance budgets (soft assertions). */
  budgets: { loadMs: 5000, lcpMs: 4000, cls: 0.25 },

  /** External hosts that block bots (403/429/999 there is a warning, not a failure). */
  botBlockingHosts: ['linkedin.com', 'instagram.com', 'facebook.com', 'twitter.com', 'x.com', 'wa.me', 'youtube.com', 't.me'],

  /** Safe URL used to check the 404 page. */
  notFoundPath: '/this-page-does-not-exist-qa-check',
};
