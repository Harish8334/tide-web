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
    title: 'Research-Oriented Approach',
    desc: 'Our curriculum goes beyond exam syllabus, exposing students to cutting-edge research paradigms and laboratory methodologies essential for CSIR-NET & GATE.',
  },
  {
    icon: <Users size={28} className={styles.valIcon} />,
    title: 'Student-First Philosophy',
    desc: 'Personalized doubt clearance, mistake notebooks, and continuous 1-on-1 mentorship to ensure no aspirant is left behind.',
  },
  {
    icon: <Award size={28} className={styles.valIcon} />,
    title: 'Proven Track Record',
    desc: 'Consistently producing top 100 All India Ranks in CSIR-NET, GATE, and premier university M.Sc entrances across the nation.',
  },
];

const FACULTY = [
  {
    name: 'Dr. Rajesh Sharma',
    role: 'Head of Quantum Physics & Electrodynamics',
    qual: 'Ph.D. IIT Delhi | Postdoc TIFR Mumbai',
    exp: '14+ Years Teaching Experience',
    specialty: 'Quantum Mechanics, Condensed Matter',
    avatarLetter: 'RS',
    avatarColor: '#0056D2',
  },
  {
    name: 'Prof. Ananya Sen',
    role: 'Lead Faculty — Mathematical & Classical Physics',
    qual: 'M.Sc Gold Medalist, JNU | CSIR-NET JRF AIR 3',
    exp: '10+ Years Teaching Experience',
    specialty: 'Classical Mechanics, Mathematical Physics',
    avatarLetter: 'AS',
    avatarColor: '#7C3AED',
  },
  {
    name: 'Dr. Vikram Malhotra',
    role: 'Dean of Research & Statistical Mechanics',
    qual: 'Ph.D. IISc Bangalore',
    exp: '12+ Years Academic Leadership',
    specialty: 'Thermodynamics, Nuclear & Particle Physics',
    avatarLetter: 'VM',
    avatarColor: '#0EA5E9',
  },
];

const MILESTONES = [
  { year: '2020', title: 'Institute Inception', desc: 'Started with 45 dedicated students and a mission to democratize elite Physics coaching.' },
  { year: '2022', title: 'National Recognition', desc: 'Over 500 alumni cleared CSIR-NET and GATE with 12 students in the Top 50 AIR.' },
  { year: '2024', title: 'Digital Innovation', desc: 'Launched full interactive live class suite, smart OMR scanning, and virtual lab simulations.' },
  { year: '2026', title: '2,000+ Active Scholars', desc: 'India’s fastest growing dedicated physics coaching community with a 95% pass rate.' },
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
                Built by Physicists.<br />
                <span className="gradient-text">For Future Physicists.</span>
              </h1>
              <p className={styles.heroLead}>
                Tide Physics Academy was established with a singular vision: to bridge the gap between abstract physics theory and competitive mastery. We empower students targeting M.Sc, CSIR-NET, GATE, and B.Ed pedagogy exams with conceptual depth and rigorous problem-solving skills.
              </p>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>6+</span>
                  <span className={styles.statLabel}>Years of Excellence</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>2,000+</span>
                  <span className={styles.statLabel}>Alumni Scholars</span>
                </div>
                <div className={styles.statBox}>
                  <span className={styles.statNum}>95%</span>
                  <span className={styles.statLabel}>Success Rate</span>
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
