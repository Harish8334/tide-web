import { test, expect } from '@playwright/test';

test.describe('Cross-Device Responsiveness Suite', () => {

  test('should display mobile navbar and hamburger drawer on iPhone SE (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check no horizontal scrollbar / overflow on root
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // Verify desktop nav links are hidden on mobile
    const desktopNav = page.locator('nav ul').first();
    await expect(desktopNav).toBeHidden();

    // Verify mobile hamburger toggle button is visible
    const toggleBtn = page.getByRole('button', { name: /Open Navigation Menu/i });
    await expect(toggleBtn).toBeVisible();

    // Click toggle button to open drawer
    await toggleBtn.click();

    // Drawer should now be visible and open
    const drawerLink = page.getByRole('link', { name: 'All Courses' }).last();
    await expect(drawerLink).toBeVisible();

    // Click on All Courses inside drawer
    await drawerLink.click();
    await expect(page).toHaveURL(/\/courses/);
  });

  test('should render courses catalogue without horizontal scroll on iPhone 14 (390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/courses');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // Search and filter controls should be visible and usable
    const searchInput = page.locator('input[placeholder*="Search by title"]');
    await expect(searchInput).toBeVisible();

    // First course card should be cleanly within viewport
    const firstCard = page.locator('[class*="card"]').first();
    await expect(firstCard).toBeVisible();
  });

  test('should render dynamic course details /courses/c1 responsively on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/courses/c1');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // Title and syllabus accordion should be visible
    await expect(page.locator('h1')).toBeVisible();
    const enrollBtn = page.getByRole('link', { name: 'Enroll Now in Live Batch 🚀' });
    await expect(enrollBtn).toBeVisible();
  });

  test('should support mobile navigation drawer in admin portal (375x667)', async ({ page, context }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await context.addCookies([
      { name: 'token', value: 'mock-admin-token-jwt-secret', path: '/', domain: 'localhost' },
      { name: 'user_role', value: 'admin', path: '/', domain: 'localhost' },
    ]);

    await page.goto('/admin/dashboard');

    // Admin toggle button should be visible
    const adminToggle = page.getByRole('button', { name: /Open admin navigation/i });
    await expect(adminToggle).toBeVisible();

    // Open admin navigation drawer
    await adminToggle.click();

    // Links inside admin sidebar should now be accessible
    const studentsLink = page.getByRole('link', { name: /Students/i }).first();
    await expect(studentsLink).toBeVisible();
  });

  test('should render tablet view without horizontal scroll on iPad (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalOverflow).toBeFalsy();

    // Footer should be visible and cleanly wrapped
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

});
