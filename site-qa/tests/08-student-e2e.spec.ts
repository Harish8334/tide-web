import { test, expect } from '@playwright/test';
import path from 'path';
import { watchPage, open } from '../utils/helpers';

const studentAuthPath = path.resolve(__dirname, '../.auth/student.json');

test.use({ storageState: studentAuthPath });

test.describe('Student Portal E2E Suite (Priya Patel Session)', () => {
  test('01: Student Dashboard Loads with Priya Patel session', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/dashboard');
    await expect(page).toHaveURL(/.*\/student\/dashboard/);

    // Verify student name and greeting
    const heroName = page.locator('div[class*="heroName"]');
    await expect(heroName).toContainText(/Priya|Student/i);

    // Verify stats cards rendered
    const statCards = page.locator('div[class*="statCard"]');
    await expect(statCards).toHaveCount(4);

    // Verify Quick Access links
    const quickSection = page.locator('section[class*="quickSection"]');
    await expect(quickSection).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on student dashboard').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on student dashboard').toEqual([]);
  });

  test('02: Student Courses Page — Enrolled & Catalog Browsing', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/courses');
    await expect(page).toHaveURL(/.*\/student\/courses/);

    // Heading should be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    // Tab buttons exist
    const tabs = page.locator('button[class*="tabBtn"]');
    await expect(tabs).toHaveCount(2);

    // Check Browse Catalog tab
    await tabs.nth(1).click();
    await page.waitForTimeout(400);

    // Filter controls should be visible
    const searchInput = page.locator('input[placeholder*="quantum" i]');
    await expect(searchInput).toBeVisible();

    // Type in search box
    await searchInput.fill('Quantum');
    await page.waitForTimeout(300);

    expect.soft(w.pageErrors, 'uncaught exceptions on courses page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on courses page').toEqual([]);
  });

  test('03: Student Exams & Quizzes Page', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/exams');
    await expect(page).toHaveURL(/.*\/student\/exams/);

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on exams page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on exams page').toEqual([]);
  });

  test('04: Student Live Classes Schedule', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/live-classes');
    await expect(page).toHaveURL(/.*\/student\/live-classes/);

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on live classes page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on live classes page').toEqual([]);
  });

  test('05: Physics Formula Compendium — Search & Copy', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/formulas');
    await expect(page).toHaveURL(/.*\/student\/formulas/);

    // Verify search input
    const searchInput = page.locator('input[placeholder*="Search Schrödinger"]');
    await expect(searchInput).toBeVisible();

    // Search for Schrödinger
    await searchInput.fill('Schrödinger');
    await page.waitForTimeout(300);

    // Verify formula card
    const card = page.locator('div[class*="formulaCard"]').first();
    await expect(card).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on formulas page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on formulas page').toEqual([]);
  });

  test('06: Doubt Resolution Desk — Math Symbols & Questions', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/doubts');
    await expect(page).toHaveURL(/.*\/student\/doubts/);

    // Verify ask doubt input
    const subjectInput = page.locator('#subjectInput');
    await expect(subjectInput).toBeVisible();

    // Verify math symbols toolbar
    const symbolBtns = page.locator('button[class*="symbolBtn"]');
    await expect(symbolBtns.first()).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on doubts page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on doubts page').toEqual([]);
  });

  test('07: All-India Aspirant Leaderboard', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/leaderboard');
    await expect(page).toHaveURL(/.*\/student\/leaderboard/);

    // Verify podium section
    const podium = page.locator('section[class*="podiumSection"]');
    await expect(podium).toBeVisible();

    // Verify table of rankings
    const table = page.locator('table');
    await expect(table).toBeVisible();

    expect.soft(w.pageErrors, 'uncaught exceptions on leaderboard page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on leaderboard page').toEqual([]);
  });

  test('08: Student Mistake Notebook & Analytics', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/mistakes');
    await expect(page).toHaveURL(/.*\/student\/mistakes/);

    expect.soft(w.pageErrors, 'uncaught exceptions on mistakes page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on mistakes page').toEqual([]);
  });

  test('09: Student Virtual Physics Laboratory', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/lab');
    await expect(page).toHaveURL(/.*\/student\/lab/);

    expect.soft(w.pageErrors, 'uncaught exceptions on lab page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on lab page').toEqual([]);
  });

  test('10: Student Smart OMR Evaluation', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/omr');
    await expect(page).toHaveURL(/.*\/student\/omr/);

    expect.soft(w.pageErrors, 'uncaught exceptions on omr page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on omr page').toEqual([]);
  });

  test('11: Student Profile Page — Personal & Academic Details', async ({ page }) => {
    const w = watchPage(page);
    await open(page, '/student/profile');
    await expect(page).toHaveURL(/.*\/student\/profile/);

    // Check user name heading
    const userName = page.locator('h1[class*="userName"]');
    await expect(userName).toContainText(/Priya/i);

    // Check email in form or header
    const emailField = page.locator('input[type="email"]');
    if (await emailField.count() > 0) {
      await expect(emailField).toHaveValue('priya.patel@gmail.com');
    }

    expect.soft(w.pageErrors, 'uncaught exceptions on profile page').toEqual([]);
    expect.soft(w.consoleErrors, 'console errors on profile page').toEqual([]);
  });
});
