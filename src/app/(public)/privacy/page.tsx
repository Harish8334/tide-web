// src/app/(public)/privacy/page.tsx
import React from 'react';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'collection', label: '1. Information We Collect' },
  { id: 'usage', label: '2. How We Use Information' },
  { id: 'security', label: '3. Data Security & Storage' },
  { id: 'cookies', label: '4. Cookies & Tracking Technologies' },
  { id: 'third-parties', label: '5. Third-Party Services' },
  { id: 'rights', label: '6. Your Rights & Choices' },
  { id: 'contact', label: '7. Privacy Inquiries' },
];

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className="section-tag">Legal Documentation</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.meta}>Effective Date: January 1, 2026 | Version 2.4</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Table of Contents Sticky Sidebar */}
          <aside className={styles.tocSidebar}>
            <div className={styles.tocSticky}>
              <h3 className={styles.tocTitle}>Table of Contents</h3>
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
            <section id="collection" className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>
                PhysicsCoach Pro (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) collects information necessary to deliver educational instruction, conduct live video webinars, evaluate examinations, and manage academic enrollment.
              </p>
              <ul>
                <li><strong>Account Credentials:</strong> Full name, verified email address, contact telephone number, and encrypted password hash.</li>
                <li><strong>Academic Profile:</strong> Enrolled institution, degree program (M.Sc, B.Ed, etc.), target examination (CSIR-NET, GATE), and geographic district.</li>
                <li><strong>Examination &amp; Learning Records:</strong> Test answers, MCQ scores, OMR upload scans, lecture viewing progress, and attendance metrics.</li>
                <li><strong>Technical Telemetry:</strong> IP address, device browser type, operating system, and session timestamps.</li>
              </ul>
            </section>

            <section id="usage" className={styles.section}>
              <h2>2. How We Use Information</h2>
              <p>The collected information is processed solely for academic operations, including:</p>
              <ul>
                <li>Provisioning course access, live stream sessions, and study material downloads.</li>
                <li>Generating automated exam scorecards, percentile rankings, and personalized mistake notebooks.</li>
                <li>Verifying student eligibility and prevent unauthorized credential sharing.</li>
                <li>Communicating schedule modifications, live class alerts, and doubt responses.</li>
              </ul>
            </section>

            <section id="security" className={styles.section}>
              <h2>3. Data Security &amp; Storage</h2>
              <p>
                We employ industry-standard cryptographic protocols (TLS/HTTPS in transit and AES-256 for sensitive storage). Access to student data is strictly restricted to authenticated instructors and authorized administrative personnel under confidentiality agreements.
              </p>
            </section>

            <section id="cookies" className={styles.section}>
              <h2>4. Cookies &amp; Tracking Technologies</h2>
              <p>
                PhysicsCoach Pro utilizes essential HTTP cookies and local storage items solely to sustain your authenticated login session and remember your course player preferences. We do not use third-party behavioral advertising trackers.
              </p>
            </section>

            <section id="third-parties" className={styles.section}>
              <h2>5. Third-Party Services</h2>
              <p>
                To provide interactive real-time classroom experiences and streaming, we interface with secure infrastructure partners (including Socket.io media signaling and cloud file delivery). Third-party providers are strictly prohibited from utilizing student data for independent commercial purposes.
              </p>
            </section>

            <section id="rights" className={styles.section}>
              <h2>6. Your Rights &amp; Choices</h2>
              <p>
                Students have the unconditional right to access their academic profile, request export of exam history, update personal details, or request full account de-registration by submitting an inquiry to our administrative grievance team.
              </p>
            </section>

            <section id="contact" className={styles.section}>
              <h2>7. Privacy Inquiries</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to report an data issue, contact our designated Data Protection Officer:
              </p>
              <div className={styles.contactCard}>
                <strong>Data Protection Office — PhysicsCoach Pro</strong>
                <span>Email: privacy@physicscoachpro.com</span>
                <span>Address: Education Hub, Connaught Place, New Delhi, India 110001</span>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
