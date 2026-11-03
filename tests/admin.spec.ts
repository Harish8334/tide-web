// tests/admin.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Admin & Instructor Control Suite', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'token', value: 'mock-admin-token-jwt-secret', path: '/', domain: 'localhost' },
      { name: 'user_role', value: 'admin', path: '/', domain: 'localhost' },
    ]);
  });

  test('should display admin dashboard with 8 hero stat cards and charts', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page.getByText('Total Students').first()).toBeVisible();
    await expect(page.getByText('Active Courses').first()).toBeVisible();
    await expect(page.getByText('Total Batches').first()).toBeVisible();
    await expect(page.getByText('Live Classes Today').first()).toBeVisible();
    await expect(page.getByText('Quick Admin Actions').first()).toBeVisible();
  });

  test('should display students directory with status filter and action buttons', async ({ page }) => {
    await page.goto('/admin/students');
    await expect(page.getByText('Student Directory & Approvals').first()).toBeVisible();
    await expect(page.locator('input[placeholder*="Search student"]').first()).toBeVisible();
    await expect(page.locator('table').first()).toBeVisible();
  });

  test('should render create course form with dynamic units builder', async ({ page }) => {
    await page.goto('/admin/courses/new');
    await expect(page.locator('input[placeholder*="Relativistic"]').first()).toBeVisible();
    await expect(page.getByText('Curriculum & Syllabus Units').first()).toBeVisible();
    await expect(page.getByRole('button', { name: '+ Add Unit' })).toBeVisible();
  });

  test('should render create exam form with question palette builder', async ({ page }) => {
    await page.goto('/admin/exams/new');
    await expect(page.locator('input[placeholder*="CSIR-NET"]').first()).toBeVisible();
    await expect(page.getByRole('button', { name: '+ Add Question' })).toBeVisible();
  });

  test('should display live class management table and host launch studio button', async ({ page }) => {
    await page.goto('/admin/live-classes');
    await expect(page.getByText('Manage Live Virtual Classes').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Schedule Live Class/i })).toBeVisible();
  });
});
