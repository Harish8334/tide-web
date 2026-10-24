// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('should render the login page with form elements and quick demo buttons', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/PhysicsCoach Pro/);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByText('Student Demo')).toBeVisible();
    await expect(page.getByText('Faculty Demo')).toBeVisible();
    await expect(page.getByText('Admin Demo')).toBeVisible();
  });

  test('should fill demo student credentials on demo button click', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Student Demo').click();
    await expect(page.locator('input[type="email"]')).toHaveValue('student@physics.edu');
    await expect(page.locator('input[type="password"]')).toHaveValue('physics123');
  });

  test('should show validation error on empty login submission', async ({ page }) => {
    await page.goto('/login');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('input[type="email"]')).toBeFocused();
  });

  test('should render the multi-step registration page', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByText('Select Your Role')).toBeVisible();
    await expect(page.getByText('Postgraduate / Aspirant')).toBeVisible();
  });

  test('should advance through registration steps', async ({ page }) => {
    await page.goto('/register');
    // Step 1: Select role
    await page.getByText('Next Step →').click();
    // Step 2: Personal details
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await page.locator('input[name="name"]').fill('Subhash Chandra');
    await page.locator('input[name="email"]').fill('subhash@iitk.ac.in');
    await page.locator('input[name="phone"]').fill('+919876543210');
    await page.locator('input[name="password"]').fill('QuantumPhys@2026');
    await page.getByText('Next Step →').click();
    // Step 3: Academic details
    await expect(page.locator('input[name="institution"]')).toBeVisible();
  });
});
