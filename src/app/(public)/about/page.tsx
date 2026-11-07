// src/app/(public)/about/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Atom, Users, Award, BookOpen, GraduationCap, CheckCircle, Rocket, Sparkles } from 'lucide-react';
import styles from './page.module.css';

const VALUES = [
  {
    icon: <Target size={28} className={styles.valIcon} />,
    title: 'Excellence in Teaching',
    desc: 'Pedagogy rooted in first-principles understanding rather than rote memorization. We break down complex quantum and classical mechanics into intuitive concepts.',
  },
  {
    icon: <Atom size={28} className={styles.valIcon} />,
    title: 'Exam-Oriented Approach',
    desc: 'Our curriculum combines first-principles physics intuition with high-yield problem solving, question shortcuts, and 10-year previous papers analysis for TRB, SET & NET examinations.',
  },
  {
    icon: <Users size={28} className={styles.valIcon} />,
    title: 'Student-First Philosophy',
    desc: 'Personalized doubt clearance, mistake notebooks, and continuous 1-on-1 mentorship to ensure no aspirant is left behind.',
  },
  {
    icon: <Award size={28} className={styles.valIcon} />,
    title: 'Proven Track Record',
    desc: 'Consistently producing state top ranks in PG TRB, UG TRB, Polytechnic TRB, AP TRB, TN SET, CSIR-NET, JEE & NEET across Tamil Nadu.',
  },
];

const FACULTY = [
  {
    name: 'THILEEPAN CHAKKARAVARTHY',
    role: 'Former STATE JEE CENTRE Faculty Expert in Physics',
    qual: 'MSc., Med., MPhil., SET.',
    exp: '7+ Years Teaching Experience',
    specialty: 'Quantum Mechanics & Classical Dynamics',
    avatarLetter: 'TC',
    avatarColor: '#0056D2',
  },
  {
    name: 'Dr V. RAJARATHINAM Rtd.',
    role: 'Lead faculty- Condensed Matter & High energy Physics',
    qual: 'MSc., Bed., SET., PhD., Department of Physics, Anna University',
    exp: '13+ Year experience',
    specialty: 'Condensed Matter, Atomic & Molecular Physics',
    avatarLetter: 'VR',
    avatarColor: '#7C3AED',
  },
  {
    name: 'SUBATHRA',
    role: 'Former NEET Trainer & Academician',
    qual: 'MSc., Bed., SET.',
    exp: '5+ Years experience',
    specialty: 'Electromagnetic Theory & Electronics',
    avatarLetter: 'SU',
    avatarColor: '#0EA5E9',
  },
  {
    name: 'NITHYANANTHAM',
    role: 'Research Assistant in Mathematical Physics',
    qual: 'MSc., Bed., SET.',
    exp: '7+ Years experience',
    specialty: 'Mathematical Physics',
    avatarLetter: 'NI',
    avatarColor: '#10B981',
  },
];

const MILESTONES = [
  { year: '2020', title: 'Institute Inception', desc: 'Started with dedicated students and a mission to democratize elite TRB Physics coaching.' },
  { year: '2022', title: 'Over 20+ alumni', desc: 'Over 20+ alumni cleared PG TRB, POLY TRB, TN-SET and CSIR-NET with state top ranks.' },
  { year: '2024', title: 'Digital & Classroom Innovation', desc: 'Launched full interactive live class suite, smart OMR scanning, and modern classroom offline center in Tiruvannamalai.' },
  { year: '2026', title: '170+ Active Scholars', desc: 'Tamil Nadu’s #1 dedicated TRB Physics coaching community with 1000+ alumni and top selection rates.' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Atom size={14} /> About Tide Physics Academy
              </div>
              <h1 className={styles.heroTitle}>
                Teachers Recruitment Board (TRB) Training centre<br />
                <span className="gradient-text">PG TRB, UG TRB, POLY. TRB, AP TRB, TN SET, SCERT, Engg. TRB Exams Coaching.</span>
              </h1>
              <p className={styles.heroLead}>
                Tide Physics Academy is Tamil Nadu&apos;s foremost institute for TRB Physics examinations. We specialize in PG TRB, Education &amp; Psychology TRB, UG TRB, POLYTECHNIC TRB, AP TRB (Assistant Professor), TN SET, ENGINEERING TRB, SCERT TRB, CSIR-NET, JEE &amp; NEET with high-impact Online &amp; Offline Classes.
              </p>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>7+</span>
                  <span className={styles.statLabel}>Years of Excellence</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>1000+</span>
                  <span className={styles.statLabel}>Alumni Scholars</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>52.7%</span>
                  <span className={styles.statLabel}>Highest Successive Rate</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>28.97%</span>
                  <span className={styles.statLabel}>Average Successive Rate</span>
                </div>
              </div>
            </div>

            <div className={styles.heroGraphic}>
              <div className={styles.graphicCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.dot} />
                  <span>Physics Laboratory Benchmark</span>
                </div>
                <div className={styles.graphicBody}>
                  <div className={styles.equation}>iℏ ∂Ψ/∂t = ĤΨ</div>
                  <div className={styles.equation}>∇ × E = -∂B/∂t</div>
                  <div className={styles.equation}>S = k_B ln(Ω)</div>
                  <div className={styles.labHighlight}>
                    <GraduationCap size={20} color="var(--accent)" />
                    <span>Premier CSIR-NET Physics Training Hub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={14} /> Our Pillars
            </div>
            <h2>Principles That Guide Our Pedagogy</h2>
            <p>Every lecture, problem set, and test series is engineered around four core tenets.</p>
          </div>

          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.iconWrapper}>{v.icon}</div>
                <h3 className={styles.valTitle}>{v.title}</h3>
                <p className={styles.valDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY ── */}
      <section className={`section ${styles.facultySection}`}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <GraduationCap size={14} /> Mentorship
            </div>
            <h2>Learn From Distinguished Physicists</h2>
            <p>Our educators are former research scientists, gold medalists, and top percentile rankers.</p>
          </div>

          <div className={styles.facultyGrid}>
            {FACULTY.map((f, i) => (
              <div key={i} className={styles.facultyCard}>
                <div className={styles.facultyAvatar} style={{ background: f.avatarColor, color: '#FFFFFF', fontWeight: 800, fontSize: '1.25rem' }}>
                  {f.avatarLetter}
                </div>
                <h3 className={styles.facultyName}>{f.name}</h3>
                <div className={styles.facultyRole}>{f.role}</div>
                <div className={styles.facultyQual}>{f.qual}</div>
                <div className={styles.facultyDivider} />
                <div className={styles.facultySpecialty}>
                  <strong>Focus:</strong> {f.specialty}
                </div>
                <div className={styles.facultyExp}>
                  <CheckCircle size={14} color="var(--success)" />
                  <span>{f.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Rocket size={14} /> Our Journey
            </div>
            <h2>Milestones Along the Way</h2>
            <p>From a small tutorial room to a premier digital coaching portal.</p>
          </div>

          <div className={styles.timeline}>
            {MILESTONES.map((m, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineMarker} />
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to Join India&apos;s Leading Physics Community?</h2>
            <p>Explore our courses or speak to an academic counselor today.</p>
            <div className={styles.ctaActions}>
              <Link href="/courses" className="btn btn-primary btn-lg">Explore Courses</Link>
              <Link href="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
