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
              Targeting Top Ranks in TRB Physics &amp; Competitive Exams?
            </h3>
            <p className={styles.preFooterSubtitle}>
              Join over 270+ aspirants learning from Tamil Nadu&apos;s leading TRB Academy for Physics.
            </p>
          </div>
          <div className={styles.preFooterActions}>
            <Link href="/courses" className={styles.preFooterPrimaryBtn}>
              Explore Batches <Rocket size={16} style={{ marginLeft: 6 }} />
            </Link>
            <a href="tel:9994854604" className={styles.preFooterSecondaryBtn}>
              <Phone size={15} style={{ marginRight: 6 }} /> Call Helpline
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
                <div className={styles.logoSub}>Teachers Recruitment Board (TRB) Training centre</div>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              PG TRB, UG TRB, POLY. TRB, AP TRB, TN SET, SCERT, Engg. TRB Exams Coaching. Best TRB coaching centre in physics in Tamil Nadu — Online &amp; Offline Classes.
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>
                <Star size={13} fill="#FFB800" color="#FFB800" style={{ marginRight: 4, display: 'inline' }} />
                4.9/5 Rating (7K+ Reviews)
              </span>
              <span className={styles.trustBadge}>
                <Trophy size={13} color="#FFB800" style={{ marginRight: 4, display: 'inline' }} />
                100+ Selections
              </span>
              <span className={styles.trustBadge}>
                <GraduationCap size={13} color="#CBD5E1" style={{ marginRight: 4, display: 'inline' }} />
                Top Rank Faculty
              </span>
            </div>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className={styles.colTitle}>Flagship Programs</h4>
            <div className={styles.linkList}>
              <Link href="/courses" className={styles.linkItem}>PG TRB Coaching Batch</Link>
              <Link href="/courses" className={styles.linkItem}>UG TRB &amp; POLY TRB</Link>
              <Link href="/courses" className={styles.linkItem}>TN SET Physical Sciences</Link>
              <Link href="/courses" className={styles.linkItem}>AP TRB (Assistant Professor)</Link>
              <Link href="/courses" className={styles.linkItem}>Engg. TRB &amp; TN SCERT TRB</Link>
              <Link href="/courses" className={styles.linkItem}>CSIR - NET Physical Science</Link>
              <Link href="/courses" className={styles.linkItem}>Education &amp; Psychology TRB</Link>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className={styles.colTitle}>Student Desk</h4>
            <div className={styles.linkList}>
              <Link href="/login" className={styles.linkItem}>Student Portal Login</Link>
              <Link href="/register" className={styles.linkItem}>New Aspirant Registration</Link>
              <Link href="/student/profile" className={styles.linkItem}>Student Helpdesk &amp; Profile</Link>
              <Link href="/student/live-classes" className={styles.linkItem}>Live Classroom Schedule</Link>
              <Link href="/student/exams" className={styles.linkItem}>Similar TRB CBT Test Series</Link>
              <Link href="/student/formulas" className={styles.linkItem}>Formula Pocket Handbook</Link>
            </div>
          </div>

          {/* Contact & Campus */}
          <div>
            <h4 className={styles.colTitle}>Campus &amp; Helplines</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>Mathalangula Street, Periyar Statue Backside (Opp. Sankar DTP), Tiruvannamalai - 606601</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} className={styles.contactIcon} />
                <span>
                  <a href="tel:9994854604" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99948 54604</a> / <a href="tel:9994850604" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99948 50604</a>
                </span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} className={styles.contactIcon} />
                <span>admissions@tidephysics.com</span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={16} className={styles.contactIcon} />
                <span>Mon – Fri: 10.00 AM – 5 PM (IST) | Sat – Sun: 9 AM – 5 PM (IST)</span>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <a
                href="https://maps.app.goo.gl/R5j7rKeV4ozKHRCSA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.8rem',
                  color: 'var(--primary-light)',
                  fontWeight: 700,
                  textDecoration: 'underline',
                }}
              >
                <MapPin size={13} /> View on Google Maps (Opp. Sankar DTP)
              </a>
            </div>

            {/* Social Community Badges */}
            <div className={styles.socialBadges}>
              <a
                href="https://www.youtube.com/@TRB_Coaching_Center"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Video size={14} style={{ marginRight: 6 }} /> YouTube (@TRB_Coaching_Center)
              </a>
              <a
                href="https://t.me/tn_trb_exams"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialPill}
              >
                <Send size={14} style={{ marginRight: 6 }} /> Telegram (@tn_trb_exams)
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
