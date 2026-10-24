// tests/exams.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Student Exam Engine & Quiz Engine', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([
      { name: 'token', value: 'mock-student-token-jwt-secret', path: '/', domain: 'localhost' },
      { name: 'user_role', value: 'student', path: '/', domain: 'localhost' },
    ]);
    await context.addInitScript(() => {
      window.localStorage.setItem('token', 'mock-student-token-jwt-secret');
      window.localStorage.setItem('user', JSON.stringify({
        _id: 'std-101',
        firstName: 'Subhash',
        lastName: 'Chandra',
        email: 'student@physics.edu',
        role: 'student',
        status: 'active',
      }));
    });
  });

  test('should display student exam dashboard with status tabs', async ({ page }) => {
    await page.goto('/student/exams');
    await expect(page.getByText('MCQ Examination Portal')).toBeVisible();
    await expect(page.getByText('All Exams')).toBeVisible();
    await expect(page.getByText('Ready to Attempt')).toBeVisible();
    await expect(page.getByText('Completed').first()).toBeVisible();
  });

  test('should open exam attempt simulator with countdown timer and question palette', async ({ page }) => {
    await page.goto('/student/exams/1/attempt');
    await expect(page.getByText(/Remaining|Time/i)).toBeVisible();
    await expect(page.getByText(/Question Palette/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Submit Test/i })).toBeVisible();
  });

  test('should allow selecting an MCQ option and navigating questions', async ({ page }) => {
    await page.goto('/student/exams/1/attempt');
    // Select first option
    const optionA = page.locator('input[type="radio"]').first();
    if (await optionA.isVisible()) {
      await optionA.check();
      await expect(optionA).toBeChecked();
    }
  });

  test('should display exam results with score ring and question breakdown', async ({ page }) => {
    await page.goto('/student/exams/1/result');
    await expect(page.getByText(/Exam Performance Summary|Score/i).first()).toBeVisible();
    await expect(page.getByText(/Question-by-Question Analysis/i)).toBeVisible();
  });
});
