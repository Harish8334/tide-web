// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Global Navigation & Route Accessibility', () => {
  const publicRoutes = [
    { path: '/', titleSnippet: 'PhysicsCoach Pro' },
    { path: '/about', titleSnippet: 'About' },
    { path: '/courses', titleSnippet: 'Courses' },
    { path: '/contact', titleSnippet: 'Contact' },
    { path: '/privacy', titleSnippet: 'Privacy' },
    { path: '/terms', titleSnippet: 'Terms' },
    { path: '/login', titleSnippet: 'Login' },
    { path: '/register', titleSnippet: 'Register' },
  ];

  for (const route of publicRoutes) {
    test(`should successfully load public route: ${route.path}`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('body')).not.toBeEmpty();
    });
  }

  test('should display interactive 404 page for non-existent routes', async ({ page }) => {
    const response = await page.goto('/non-existent-quantum-singularity');
    expect(response?.status()).toBe(404);
  });
});
