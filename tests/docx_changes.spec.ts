// tests/docx_changes.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Website Changes Document Verification Suite', () => {
  test('Navbar links and Logo Subtitle updated to TRB Training centre', async ({ page }) => {
    await page.goto('/');

    // 1. Logo Subtitle
    await expect(page.getByText('Teachers Recruitment Board (TRB) Training centre').first()).toBeVisible();

    // 2. Navigation items
    await expect(page.locator('header').getByRole('link', { name: 'HOME' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'ALL COURSES' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'OUR RESULTS' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'DOWNLOADS' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'CONTACT US' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'POLICY' })).toBeVisible();
  });

  test('Hero section modifications (semicolon, enquiry desk, poly lecturer, stats ribbon)', async ({ page }) => {
    await page.goto('/');

    // Semicolon in hero title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('TRB ACADEMY for PHYSICS; TRB Physics Online & Offline Classes');

    // Enquiry Desk badge
    await expect(page.getByText('ENQUIRY DESK')).toBeVisible();

    // Dropdown without "Target:" word and with "POLY TRB (Lecturer)"
    const select = page.locator('select#callbackExam');
    await expect(select).toBeVisible();
    await expect(select.locator('option[value="POLY TRB"]')).toHaveText('POLY TRB (Lecturer)');
    await expect(select.locator('option[value="PG TRB"]')).toHaveText('PG TRB Physics');

    // Hero demo button
    await expect(page.getByRole('link', { name: /Free Demo Class, Sample Notes & Exams/i })).toBeVisible();

    // Stats ribbon numbers
    await expect(page.getByText('3500+').first()).toBeVisible();
    await expect(page.getByText('STATE TOP RANKERS 3, 4, 9')).toBeVisible();
  });

  test('Success students BIO section with 11 toppers and Right to Left ticker', async ({ page }) => {
    await page.goto('/');

    const resultsSection = page.locator('section#results');
    await expect(resultsSection).toBeVisible();
    await expect(resultsSection.getByText('UG TRB-2024 TOPPERS').first()).toBeVisible();

    // Check specific students
    await expect(resultsSection.getByText('VENU PRIYA T').first()).toBeVisible();
    await expect(resultsSection.getByText('120').first()).toBeVisible();
    await expect(resultsSection.getByText(/435030218/).first()).toBeVisible();

    await expect(resultsSection.getByText('BHUVANESWARI S').first()).toBeVisible();
    await expect(resultsSection.getByText('103.5').first()).toBeVisible();
    await expect(resultsSection.getByText(/438010032/).first()).toBeVisible();

    await expect(resultsSection.getByText('KILLIVALAVAN G').first()).toBeVisible();
    await expect(resultsSection.getByText('101.5').first()).toBeVisible();

    await expect(resultsSection.getByText('KARUNANITHI').first()).toBeVisible();
    await expect(resultsSection.getByText('VINOTHKUMAR A').first()).toBeVisible();
    await expect(resultsSection.getByText('GOPINATH').first()).toBeVisible();
    await expect(resultsSection.getByText('SELVAPRIYA').first()).toBeVisible();
    await expect(resultsSection.getByText('HEMA MAALINI R').first()).toBeVisible();
    await expect(resultsSection.getByText('AYYAPPAN S').first()).toBeVisible();
    await expect(resultsSection.getByText('BALAJI R').first()).toBeVisible();
  });

  test('YouTube and Photos gallery section with link and Left to Right marquee', async ({ page }) => {
    await page.goto('/');

    const gallerySection = page.locator('#gallery').first();
    await expect(gallerySection).toBeVisible();
    const ytLink = gallerySection.locator('a[href*="youtube.com/@TIDE_PHYSICS_TVM"]');
    await expect(ytLink).toBeVisible();
  });

  test('Courses Section header, features and Education & Psychology TRB', async ({ page }) => {
    await page.goto('/');

    // Section header
    await expect(page.getByText('State Ranking BEST CLASSES & DEDICATIVE CBT TEST SERIES').first()).toBeVisible();
    await expect(page.getByText(/Dedicative multi-practice exams Topic-wise/i)).toBeVisible();
    await expect(page.getByText(/real TRB Board exam conducting experience/i)).toBeVisible();

    // Education & Psychology TRB presence in courses grid
    await expect(page.locator('#courses').getByText('Education & Psychology TRB')).toBeVisible();
  });

  test('Why Choose Us section: 3500+ Aspirants Trust Us & 3 Highlight Cards', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Why 3500+ Aspirants Trust Us').first()).toBeVisible();
    await expect(page.getByText(/We provide dedicated classes, intensive training, and real-life situational motivation/i).first()).toBeVisible();

    // 3 Cards
    await expect(page.getByText('EXPERT FACULTY – QUALITY EDUCATION').first()).toBeVisible();
    await expect(page.getByText('SET Qualified Professors').first()).toBeVisible();

    await expect(page.getByText(/PRINTED NOTES – DOORSTEP DELIVERY/i).first()).toBeVisible();
    await expect(page.getByText(/Detailed Topic-Wise Notes/i).first()).toBeVisible();

    await expect(page.getByText(/State Ranking CBT DEDICATIVE Test Series/i).first()).toBeVisible();
  });

  test('REASON!!.. WHY WE CHOOSE TIDE PHYSICS? Key Examinations Covered', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('REASON!!.. WHY WE CHOOSE TIDE PHYSICS?').first()).toBeVisible();
    await expect(page.getByText('UG-TRB / Graduate Assistant (BSc Level Syllabus)').first()).toBeVisible();
    await expect(page.getByText('PG-TRB / Post Graduate Assistant (MSc Level Syllabus)').first()).toBeVisible();
    await expect(page.getByText('Polytechnic TRB & Assistant Professor TRB (MSc + Advanced Level)').first()).toBeVisible();
    await expect(page.locator('section').getByText('Education & Psychology Module').first()).toBeVisible();
  });

  test('Footer elements: 270+ aspirants, Reviews, Selections, Landmark, Socials', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer.getByText(/Join over 270\+ aspirants/i)).toBeVisible();
    await expect(footer.getByText(/7K\+ Reviews/i)).toBeVisible();
    await expect(footer.getByText(/100\+ Selections/i)).toBeVisible();
    await expect(footer.getByText(/Opp\. Sankar DTP/i).first()).toBeVisible();
    await expect(footer.getByText(/Mon – Fri: 10.00 AM – 5 PM/i)).toBeVisible();
    await expect(footer.getByText('Similar TRB CBT Test Series')).toBeVisible();

    // Flagship programs ordering and contents
    const flagshipLinks = footer.locator('div:has(> h4:text("Flagship Programs")) a');
    await expect(flagshipLinks.last()).toHaveText('Education & Psychology TRB');
    await expect(footer.getByText('CSIR - NET Physical Science')).toBeVisible();

    // Social Links
    await expect(footer.locator('a[href*="youtube.com/@TRB_Coaching_Center"]')).toBeVisible();
    await expect(footer.locator('a[href*="t.me/tn_trb_exams"]')).toBeVisible();
  });

  test('All Courses page subtitle updated with TRB & BSc/MSc physics text', async ({ page }) => {
    await page.goto('/courses');

    await expect(page.getByText(/TIDE Physics Academy is a specialized coaching institute in Tamil Nadu \(Tiruvannamalai\)/i)).toBeVisible();
    await expect(page.getByText(/Bachelor of Science \(BSc\) and Master of Science \(MSc\)/i)).toBeVisible();
  });

  test('About page: stats, values, faculty, milestones', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByText('Teachers Recruitment Board (TRB) Training centre').first()).toBeVisible();
    await expect(page.getByText('7+').first()).toBeVisible();
    await expect(page.getByText('1000+').first()).toBeVisible();
    await expect(page.getByText('52.7%').first()).toBeVisible();
    await expect(page.getByText('28.97%').first()).toBeVisible();

    // Value title: "Exam-Oriented Approach" (no "Research &")
    await expect(page.getByRole('heading', { name: 'Exam-Oriented Approach', exact: true })).toBeVisible();

    // Faculty members
    await expect(page.getByText('THILEEPAN CHAKKARAVARTHY')).toBeVisible();
    await expect(page.getByText('Dr V. RAJARATHINAM Rtd.')).toBeVisible();
    await expect(page.getByText('SUBATHRA')).toBeVisible();
    await expect(page.getByText('NITHYANANTHAM')).toBeVisible();

    // Milestones
    await expect(page.getByRole('heading', { name: 'Over 20+ alumni' })).toBeVisible();
    await expect(page.getByText('170+ Active Scholars').first()).toBeVisible();
  });

  test('Login page: Tamil Nadu Premier Physics Coaching and 500+ students text, Hawking quote and Academy Motto', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByText('Tamil Nadu’s Premier')).toBeVisible();
    await expect(page.getByText(/500\+ Students Mastering for PG TRB & UG TRB with Bed\., SET\., AP TRB/i)).toBeVisible();

    // Stephen Hawking quote
    await expect(page.getByText(/Remember to look up at the stars and not down at your feet/i)).toBeVisible();
    await expect(page.getByText('— Stephen Hawking')).toBeVisible();

    // Motto & principles
    await expect(page.getByText('MASTER THE CONCEPTS, CONQUER THE EXAM.')).toBeVisible();
    await expect(page.getByText(/Think like Einstein\. Work like Newton\. Win like a champion\./i)).toBeVisible();
  });

  test('Privacy Policy: TIDE PHYSICS ACADEMY, 2nd bullet removed, updated address', async ({ page }) => {
    await page.goto('/privacy');

    // Replaced Physicscoach Pro
    await expect(page.locator('main').getByText(/TIDE PHYSICS ACADEMY \("we", "our"/i).first()).toBeVisible();
    await expect(page.getByText('Data Protection Office — TIDE PHYSICS ACADEMY')).toBeVisible();
    await expect(page.getByText(/Opp\. Sankar DTP/i).first()).toBeVisible();

    // Ensure 2nd bullet (Academic Profile) is removed
    await expect(page.getByText('Academic Profile: Enrolled institution')).toHaveCount(0);
    // Ensure 1st bullet is still there
    await expect(page.getByText(/Account Credentials:/i)).toBeVisible();
  });

  test('Terms page: TIDE PHYSICS ACADEMY replaced everywhere and jurisdiction updated', async ({ page }) => {
    await page.goto('/terms');

    await expect(page.locator('main').getByText(/accessing live lectures on TIDE PHYSICS ACADEMY/i).first()).toBeVisible();
    await expect(page.locator('main').getByText(/exclusive intellectual property of TIDE PHYSICS ACADEMY/i).first()).toBeVisible();
    await expect(page.locator('main').getByText(/TIDE PHYSICS ACADEMY reserves the right to suspend/i).first()).toBeVisible();
    await expect(page.locator('main').getByText(/competent courts in Tiruvannamalai, Tamil Nadu, India/i).first()).toBeVisible();
  });

  test('Dedicated Results and Downloads pages load correctly', async ({ page }) => {
    // /results
    await page.goto('/results');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Our Success Students BIO');
    await expect(page.locator('main').getByText('VENU PRIYA T').first()).toBeVisible();

    // /downloads
    await page.goto('/downloads');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Free Demo Class, Sample Notes & Exams');
    await expect(page.getByText(/High-Yield Physics Formula Pocket Handbook/i)).toBeVisible();
  });

  test('Student Leaderboard uses Similar TRB CBT branding instead of All-India', async ({ page, context }) => {
    await context.addCookies([
      { name: 'token', value: 'mock-jwt-token', domain: 'localhost', path: '/' },
      { name: 'user_role', value: 'student', domain: 'localhost', path: '/' },
    ]);

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

    await page.goto('/student/leaderboard');
    await expect(page.getByRole('heading', { name: 'Similar TRB CBT Aspirant Leaderboard' })).toBeVisible();
    await expect(page.getByText(/All-India Aspirant Leaderboard/i)).toHaveCount(0);
  });
});
