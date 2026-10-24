// src/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import AcademyLogo from './AcademyLogo';
import {
  Trophy,
  Rocket,
  Phone,
  Star,
  GraduationCap,
  MapPin,
  Mail,
  Clock,
  Video,
  Send,
} from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Pre-Footer Action Banner */}
      <div className={styles.preFooterStrip}>
        <div className={styles.preFooterInner}>
          <div className={styles.preFooterContent}>
            <div className={styles.preFooterBadge}>
              <Trophy size={14} style={{ display: 'inline', marginRight: 6 }} />
              ADMISSIONS OPEN 2026-27
            </div>
            <h3 className={styles.preFooterTitle}>
              Ready to Master Physics and Secure an All-India Rank?
            </h3>
            <p className={styles.preFooterSubtitle}>
              Join over 15,000 aspirants learning from India’s foremost CSIR-NET &amp; GATE Physics faculty.
            </p>
          </div>
          <div className={styles.preFooterActions}>
            <Link href="/courses" className={styles.preFooterPrimaryBtn}>
              Explore Live Batches <Rocket size={16} style={{ marginLeft: 6 }} />
            </Link>
            <a href="tel:+919876543210" className={styles.preFooterSecondaryBtn}>
              <Phone size={15} style={{ marginRight: 6 }} /> Talk to Mentor
            </a>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <AcademyLogo size={42} />
              <div className={styles.logoTextContainer}>
                <div className={styles.logoTitle}>
                  Tide <span>Physics</span> Academy
                </div>
                <div className={styles.logoSub}>Premier Institute for Physical Sciences</div>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              India’s premier institute for higher physics education and competitive examinations.
              Guiding aspirants to clear CSIR-NET JRF, GATE Physical Sciences, TRB Assistant Professor,
              and premier M.Sc entrances with stellar national ranks.
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>
                <Star size={13} fill="#FFB800" color="#FFB800" style={{ marginRight: 4, display: 'inline' }} />
                4.9/5 Rating (12k+ Reviews)
              </span>
              <span className={styles.trustBadge}>
                <Trophy size={13} color="#FFB800" style={{ marginRight: 4, display: 'inline' }} />
                15,000+ Selections
              </span>
              <span className={styles.trustBadge}>
                <GraduationCap size={13} color="#CBD5E1" style={{ marginRight: 4, display: 'inline' }} />
                Top IIT &amp; IISc Faculty
              </span>
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className={styles.colTitle}>Flagship Programs</h4>
            <div className={styles.linkList}>
              <Link href="/courses" className={styles.linkItem}>CSIR-NET Physical Sciences</Link>
              <Link href="/courses" className={styles.linkItem}>GATE Physics Comprehensive</Link>
              <Link href="/courses" className={styles.linkItem}>M.Sc Physics (IIT-JAM / CUET)</Link>
              <Link href="/courses" className={styles.linkItem}>TRB Assistant Professor Exam</Link>
              <Link href="/courses" className={styles.linkItem}>Classical Electrodynamics Core</Link>
              <Link href="/courses" className={styles.linkItem}>Advanced Quantum Mechanics</Link>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className={styles.colTitle}>Student Desk</h4>
            <div className={styles.linkList}>
              <Link href="/login" className={styles.linkItem}>Student Portal Login</Link>
              <Link href="/register" className={styles.linkItem}>New Aspirant Registration</Link>
              <Link href="/student/live-classes" className={styles.linkItem}>Live Classroom Schedule</Link>
              <Link href="/student/exams" className={styles.linkItem}>All-India CBT Test Series</Link>
              <Link href="/student/formulas" className={styles.linkItem}>Formula Pocket Handbook</Link>
              <Link href="/student/leaderboard" className={styles.linkItem}>National AIR Leaderboard</Link>
            </div>
          </div>

          {/* Contact & Campus */}
          <div>
            <h4 className={styles.colTitle}>National Campus</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Ramanujan Academic Tower, 42 Science Enclave, New Delhi - 110016</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span>+91 98765 43210 / +91 70707 01005</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>admissions@tidephysics.com</span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={16} className={styles.contactIcon} />
                <span>Mon – Sat: 8:00 AM – 8:30 PM (IST)</span>
              </div>
            </div>

            {/* Social Community Badges */}
            <div className={styles.socialBadges}>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Video size={14} style={{ marginRight: 6 }} /> YouTube (Free PYQs)
              </a>
              <a
                href="https://t.me/tidephysics"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Send size={14} style={{ marginRight: 6 }} /> Telegram (25k+)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightText}>
            © 2026 Tide Physics Academy Pvt. Ltd. Registered under Ministry of Corporate Affairs, Govt. of India. ISO 9001:2015 Certified Educational Institute.
          </div>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms &amp; Conditions</Link>
            <Link href="/contact" className={styles.legalLink}>Grievance Officer</Link>
            <Link href="/sitemap.xml" className={styles.legalLink}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
