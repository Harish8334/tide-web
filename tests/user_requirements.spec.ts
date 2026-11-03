// tests/user_requirements.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Requirements Verification: SEO, Helplines, Location & Courses', () => {
  test('SEO & Branding on Homepage and Metadata', async ({ page }) => {
    await page.goto('/');

    // Check SEO Meta title & description
    await expect(page).toHaveTitle(/Best TRB Coaching Centre in Physics/i);
    await expect(page).toHaveTitle(/Tide Physics Academy/i);

    // 1. Best TRB coaching centre in physics
    await expect(page.getByText('Best TRB Coaching Centre in Physics').first()).toBeVisible();

    // 2. All exams mentioned
    await expect(page.getByText(/PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB/i).first()).toBeVisible();

    // 3. TRB Physics Online & Offline Classes
    await expect(page.getByText(/TRB Physics Online & Offline Classes/i).first()).toBeVisible();

    // 4. TRB ACADEMY for PHYSICS
    await expect(page.getByText(/TRB ACADEMY for PHYSICS/i).first()).toBeVisible();

    // 5. TRB Coaching classes
    await expect(page.getByText(/TRB Coaching Classes/i).first()).toBeVisible();

    // Check Helplines & Location on homepage
    await expect(page.getByText('9994854604').first()).toBeVisible();
    await expect(page.getByText('9994850604').first()).toBeVisible();
    await expect(page.getByText(/Mathalangula Street/i).first()).toBeVisible();
    await expect(page.getByText(/Tiruvannamalai - 606601/i).first()).toBeVisible();
    await expect(page.getByText(/Opposite Amma Medical/i).first()).toBeVisible();

    // Google Maps link
    const mapsLink = page.locator('a[href*="maps.app.goo.gl/R5j7rKeV4ozKHRCSA"]').first();
    await expect(mapsLink).toBeVisible();
  });

  test('All 11 Requested Courses Are Listed in Catalog', async ({ page }) => {
    await page.goto('/courses');

    const expectedCourses = [
      'PG TRB',
      'Education & Psychology TRB',
      'UG TRB',
      'POLY TRB',
      'TN SET',
      'AP TRB',
      'TN SCERT TRB',
      'Engg. TRB',
      'CSIR - NET',
      'JEE',
      'NEET',
    ];

    for (const courseName of expectedCourses) {
      await expect(page.getByText(new RegExp(courseName, 'i')).first()).toBeVisible();
    }
  });

  test('Helpline & Location Details on Contact Page', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByText('9994854604').first()).toBeVisible();
    await expect(page.getByText('9994850604').first()).toBeVisible();
    await expect(page.getByText(/Mathalangula Street/i).first()).toBeVisible();
    await expect(page.getByText(/Periyar Statue Backside/i).first()).toBeVisible();
    await expect(page.getByText(/Tiruvannamalai - 606601/i).first()).toBeVisible();
    await expect(page.getByText(/Opposite Amma Medical/i).first()).toBeVisible();

    const mapsBtn = page.locator('a[href*="maps.app.goo.gl/R5j7rKeV4ozKHRCSA"]').first();
    await expect(mapsBtn).toBeVisible();
  });

  test('Student Self Profile Page displays Helplines, Location, Landmark & Maps link', async ({ page, context }) => {
    // Inject cookies for Next.js middleware
    await context.addCookies([
      { name: 'token', value: 'mock-jwt-token', domain: 'localhost', path: '/' },
      { name: 'user_role', value: 'student', domain: 'localhost', path: '/' },
    ]);

    // Inject auth state for student in localStorage
    await page.addInitScript(() => {
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        _id: 'std_1',
        name: 'Suresh Kumar',
        firstName: 'Suresh',
        lastName: 'Kumar',
        email: 'suresh@example.com',
        role: 'student',
        status: 'active',
        phone: '9994854604',
        program: 'PG TRB',
        district: 'Tiruvannamalai',
      }));
    });

    await page.goto('/student/profile');

    // Helpdesk Card
    await expect(page.getByText(/Application Access & Support|Need Help Accessing/i).first()).toBeVisible();
    await expect(page.getByText('9994854604').first()).toBeVisible();
    await expect(page.getByText('9994850604').first()).toBeVisible();

    // Physical Location & Landmark
    await expect(page.getByText(/Mathalangula Street/i).first()).toBeVisible();
    await expect(page.getByText(/Periyar Statue Backside/i).first()).toBeVisible();
    await expect(page.getByText(/Tiruvannamalai - 606601/i).first()).toBeVisible();
    await expect(page.getByText(/Opposite Amma Medical/i).first()).toBeVisible();

    // Google Maps link
    const mapsLink = page.locator('a[href*="maps.app.goo.gl/R5j7rKeV4ozKHRCSA"]').first();
    await expect(mapsLink).toBeVisible();

    // Verify target course options include TRB courses
    const select = page.locator('select#program');
    await expect(select).toBeVisible();
    await expect(select.locator('option[value="PG TRB"]')).toBeAttached();
    await expect(select.locator('option[value="Education & Psychology TRB"]')).toBeAttached();
    await expect(select.locator('option[value="UG TRB"]')).toBeAttached();
    await expect(select.locator('option[value="POLY TRB"]')).toBeAttached();
    await expect(select.locator('option[value="TN SET"]')).toBeAttached();
    await expect(select.locator('option[value="AP TRB"]')).toBeAttached();
    await expect(select.locator('option[value="TN SCERT TRB"]')).toBeAttached();
    await expect(select.locator('option[value="Engg. TRB"]')).toBeAttached();
    await expect(select.locator('option[value="CSIR - NET"]')).toBeAttached();
    await expect(select.locator('option[value="JEE"]')).toBeAttached();
    await expect(select.locator('option[value="NEET"]')).toBeAttached();
  });
});
