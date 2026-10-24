import { test, expect } from '@playwright/test';
import { loadPages } from '../utils/pages';
import { open } from '../utils/helpers';

/**
 * SAFE form checks: nothing is ever submitted, so no emails are sent and no data is created.
 * Checks labels, a submit control, required-field validation and email-type validation.
 */
for (const path of loadPages()) {
  test(`forms on ${path}`, async ({ page }, testInfo) => {
    test.skip(!['desktop-1440', 'mobile-390'].includes(testInfo.project.name), 'desktop + one mobile viewport');
    await open(page, path);

    const formCount = await page.locator('form').count();
    test.skip(formCount === 0, 'no <form> on this page');

    const report = await page.evaluate(() =>
      Array.from(document.forms).map((form, idx) => {
        const fields = Array.from(form.elements).filter((el): el is HTMLInputElement => {
          const t = (el as HTMLInputElement).type;
          return /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && !['hidden', 'submit', 'button', 'reset', 'image'].includes(t);
        });

        const name = (el: HTMLElement) => {
          const id = el.id;
          const byFor = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
          return !!(byFor || el.closest('label') || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title'));
        };

        const unlabeled = fields.filter((f) => !name(f)).map((f) => `${f.tagName.toLowerCase()}[name="${f.name}"][type="${f.type}"]`);
        const hasSubmit = !!form.querySelector('button[type=submit], button:not([type]), input[type=submit]');
        const required = fields.filter((f) => f.required);
        const requiredEmptyInvalid = required.length === 0 ? null : !form.checkValidity();

        const emailFields = fields.filter((f) => f.type === 'email');
        const badEmailAccepted: string[] = [];
        for (const f of emailFields) {
          const before = f.value;
          f.value = 'not-an-email';
          if (!f.validity.typeMismatch) badEmailAccepted.push(f.name || f.id);
          f.value = before;
        }
        return { idx, fieldCount: fields.length, unlabeled, hasSubmit, requiredCount: required.length, requiredEmptyInvalid, badEmailAccepted };
      }),
    );

    for (const f of report) {
      const tag = `form #${f.idx + 1} (${f.fieldCount} fields)`;
      if (f.fieldCount === 0) continue; // e.g. a hidden helper form
      expect.soft(f.unlabeled, `${tag}: fields without an accessible label`).toEqual([]);
      expect.soft(f.hasSubmit, `${tag}: no submit button`).toBe(true);
      if (f.requiredCount === 0) {
        testInfo.annotations.push({ type: 'manual-check', description: `${tag}: no "required" fields — verify validation manually` });
      } else {
        expect.soft(f.requiredEmptyInvalid, `${tag}: empty form is considered valid even though it has required fields`).toBe(true);
      }
      expect.soft(f.badEmailAccepted, `${tag}: email field accepts "not-an-email"`).toEqual([]);
    }
  });
}
