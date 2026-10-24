// src/app/(public)/terms/page.tsx
import React from 'react';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'acceptance', label: '1. Acceptance of Terms' },
  { id: 'accounts', label: '2. User Accounts & Verification' },
  { id: 'enrollment', label: '3. Course Enrollment & Access' },
  { id: 'payments', label: '4. Payments & Refund Policies' },
  { id: 'ip', label: '5. Intellectual Property Rights' },
  { id: 'conduct', label: '6. Prohibited User Conduct' },
  { id: 'termination', label: '7. Account Termination' },
  { id: 'governing-law', label: '8. Governing Law & Jurisdiction' },
];

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className="section-tag">Terms of Service</div>
          <h1 className={styles.title}>Student Terms &amp; Conditions</h1>
          <p className={styles.meta}>Last Revised: January 1, 2026 | Binding Agreement</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Table of Contents Sticky Sidebar */}
          <aside className={styles.tocSidebar}>
            <div className={styles.tocSticky}>
              <h3 className={styles.tocTitle}>Agreement Index</h3>
              <nav className={styles.tocNav}>
                {SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className={styles.tocLink}>
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <article className={styles.content}>
            <section id="acceptance" className={styles.section}>
              <h2>1. Acceptance of Terms</h2>
              <p>
                By creating an account, browsing courses, or accessing live lectures on PhysicsCoach Pro, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree to all provisions, do not proceed with portal registration.
              </p>
            </section>

            <section id="accounts" className={styles.section}>
              <h2>2. User Accounts &amp; Verification</h2>
              <p>
                Registration requires providing truthful, accurate academic credentials. Newly registered student profiles are placed in a &quot;Pending Approval&quot; state until verified by institute administrative staff. Sharing student login credentials with non-enrolled individuals is strictly prohibited and subject to immediate suspension.
              </p>
            </section>

            <section id="enrollment" className={styles.section}>
              <h2>3. Course Enrollment &amp; Access</h2>
              <p>
                Enrollment grants a personal, non-transferable, revocable license to access course materials, live streaming sessions, lecture recordings, and test papers for the duration of the enrolled academic period.
              </p>
            </section>

            <section id="payments" className={styles.section}>
              <h2>4. Payments &amp; Refund Policies</h2>
              <p>
                All fees for premium batches and test series must be fulfilled prior to enrollment activation. Refund requests are admissible within 7 calendar days of course start date subject to administrative processing deductions.
              </p>
            </section>

            <section id="ip" className={styles.section}>
              <h2>5. Intellectual Property Rights</h2>
              <p>
                All lecture slides, digital whiteboards, proprietary problem sets, formulas handbooks, and simulated laboratory software are the exclusive intellectual property of PhysicsCoach Pro. Screen recording, downloading proprietary stream media, or redistributing course content will trigger legal prosecution under Indian copyright law.
              </p>
            </section>

            <section id="conduct" className={styles.section}>
              <h2>6. Prohibited User Conduct</h2>
              <p>Students must adhere to standard academic decorum during live sessions and doubt boards. The following activities are grounds for permanent expulsion:</p>
              <ul>
                <li>Disrupting live classes or harassing faculty and fellow aspirants in the interactive chat.</li>
                <li>Cheating during timed online examinations or submitting altered OMR response sheets.</li>
                <li>Attempting to bypass portal security or probe backend API infrastructure.</li>
              </ul>
            </section>

            <section id="termination" className={styles.section}>
              <h2>7. Account Termination</h2>
              <p>
                PhysicsCoach Pro reserves the right to suspend or terminate accounts that breach these terms without refund. Students may request voluntary account closure at any time through the profile management panel.
              </p>
            </section>

            <section id="governing-law" className={styles.section}>
              <h2>8. Governing Law &amp; Jurisdiction</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any legal disputes arising out of portal usage shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
