// tests/courses.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Course Catalogue & Discovery', () => {
  test('should display public course catalogue with filters and search bar', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.locator('input[placeholder*="Search by title"]')).toBeVisible();
    await expect(page.getByText('Advanced Quantum Mechanics')).toBeVisible();
    await expect(page.getByText('Classical Electrodynamics')).toBeVisible();
  });

  test('should filter courses by search query', async ({ page }) => {
    await page.goto('/courses');
    const searchInput = page.locator('input[placeholder*="Search by title"]');
    await searchInput.fill('Quantum');
    await expect(page.getByText('Advanced Quantum Mechanics')).toBeVisible();
  });

  test('should filter courses by category buttons', async ({ page }) => {
    await page.goto('/courses');
    const csirFilter = page.getByRole('button', { name: 'CSIR-NET/GATE' });
    await csirFilter.click();
    await expect(page.getByText('CSIR-NET Physical Sciences Comprehensive')).toBeVisible();
  });

  test('should display course cards with prices and enrolled statistics', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.getByText(/₹[0-9,]+/).first()).toBeVisible();
    await expect(page.getByText(/Enrolled|students/i).first()).toBeVisible();
  });

  test('should open course details when course card is clicked', async ({ page }) => {
    await page.goto('/courses');
    const viewBtn = page.getByRole('link', { name: 'View Curriculum' }).first();
    await viewBtn.click();
    await expect(page).toHaveURL(/\/courses\/.+/);
  });

  test('should successfully load /courses/c1 with curriculum, faculty and enrollment', async ({ page }) => {
    await page.goto('/courses/c1');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/Tide Physics Academy/i).first()).toBeVisible();
    await expect(page.getByText(/Comprehensive Course Syllabus/i)).toBeVisible();
    await expect(page.getByText(/₹4,999|₹[0-9,]+/).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Enroll Now in Live Batch 🚀' })).toBeVisible();
  });



  test('should serve sitemap.xml with live course URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('https://tidephysics.com');
    expect(body).toContain('/courses');
  });

  test('should serve robots.txt permitting crawling', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body.toLowerCase()).toContain('user-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain('sitemap.xml');
  });
});


