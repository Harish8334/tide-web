// src/app/(public)/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/CourseCard';
import { courseApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { 
  GraduationCap, 
  Video, 
  BookOpen, 
  FileCheck2, 
  MessageSquare, 
  Smartphone, 
  Rocket, 
  Sparkles, 
  Download, 
  ArrowRight,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Award,
  Play,
  Check,
  Send,
} from 'lucide-react';
import styles from './page.module.css';

interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  level: string;
  isLive: boolean;
  features: string[];
}

// 1. Success Students Bio (UG TRB-2024)
const SUCCESS_STUDENTS = [
  {
    exam: 'UG TRB-2024',
    name: 'VENU PRIYA T',
    score: '120',
    regNo: 'Reg.NO:435030218',
    image: '/images/results/venu-priya.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'BHUVANESWARI S',
    score: '103.5',
    regNo: 'Reg.NO:438010032',
    image: '/images/results/bhuvaneswari.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'AMBIKA',
    score: '102.5',
    regNo: 'Reg.NO:412030148',
    image: '/images/results/ambika.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'KILLIVALAVAN G',
    score: '101.5',
    regNo: 'Reg.NO:436010176',
    image: '/images/results/killivalavan.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'KARUNANITHI',
    score: '101',
    regNo: 'Reg.NO:429010011',
    image: '/images/results/karunanithi.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'VINOTHKUMAR A',
    score: '100.5',
    regNo: 'Reg.NO:406020025',
    image: '/images/results/vinothkumar.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'GOPINATH',
    score: '99',
    regNo: 'Reg.NO:434010247',
    image: '/images/results/gopinath.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'SELVAPRIYA',
    score: '95.5',
    regNo: 'Reg.NO:422050449',
    image: '/images/results/selvapriya.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'HEMA MAALINI R',
    score: '95.5',
    regNo: 'Reg.NO:437030074',
    image: '/images/results/hema-maalini.png',
  },
  {
    exam: 'UG TRB-2024',
    name: 'AYYAPPAN S',
    score: '93.5',
    regNo: 'Reg.NO:417040069',
    image: '/images/results/ayyappan.jpeg',
  },
  {
    exam: 'UG TRB-2024',
    name: 'BALAJI R',
    score: '88.5',
    regNo: 'Reg.NO:429010028',
    image: '/images/results/balaji.png',
  },
];

// 2. YouTube & Photos Gallery
const GALLERY_PHOTOS = [
  { src: '/images/gallery/gallery-1.jpeg', title: 'Interactive TRB Classroom Batch' },
  { src: '/images/gallery/gallery-2.jpeg', title: 'Top Rankers Felicitation Ceremony' },
  { src: '/images/gallery/gallery-3.jpeg', title: 'Faculty Physics Seminar Hall' },
  { src: '/images/gallery/gallery-4.jpeg', title: 'Real-time CBT Mock Simulator Lab' },
  { src: '/images/gallery/gallery-5.jpeg', title: 'Personalized 1-on-1 Faculty Mentorship' },
  { src: '/images/gallery/gallery-6.jpeg', title: 'Annual State Toppers Award Function' },
  { src: '/images/gallery/gallery-7.jpeg', title: 'Printed Notes Distribution & Library' },
];

// 3. Courses Data (TRB Exams focus with Education & Psychology TRB last)
const COURSES_DATA: CourseData[] = [
  {
    id: 'pg-trb',
    title: 'PG TRB Physics',
    description: 'Targeted coaching for Tamil Nadu Post Graduate Assistant Teachers Examination in Physics. Classical, Quantum, Solid State, Nuclear, Electronics & Optics with unit tests & PYQ discussions.',
    category: 'TRB Exams',
    price: 4999,
    originalPrice: 9999,
    level: 'Advanced',
    isLive: true,
    features: [
      '150+ Hours Live & Recorded Classes',
      'Unit-wise OMR Tests & Discussion',
      'Tamil & English Medium Bilingual Notes',
      '10-Year Solved Question Papers',
    ],
  },
  {
    id: 'ug-trb',
    title: 'UG TRB Physics',
    description: 'Comprehensive coaching for Tamil Nadu Graduate Teachers (UG TRB) in Physics. Full Samacheer Kalvi & Graduate syllabus with chapter-wise DPPs and model test series.',
    category: 'TRB Exams',
    price: 4499,
    originalPrice: 8999,
    level: 'Intermediate',
    isLive: true,
    features: [
      'Complete UG Core Syllabus Coverage',
      'Chapter-wise DPPs & Video Derivations',
      'Computer-Based & OMR Practice Tests',
      'Personalized Faculty Doubt Support',
    ],
  },
  {
    id: 'ap-trb',
    title: 'AP TRB (Assistant Professor)',
    description: 'Prestige coaching for Collegiate Education Assistant Professor recruitment in Physics. Deep postgraduate curriculum, research orientation, and interview guidance.',
    category: 'TRB Exams',
    price: 6499,
    originalPrice: 12999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Postgraduate & Core Syllabus Mastery',
      'High-level Derivations & MCQ Shortcuts',
      'Interview Prep & Viva Voce Guidance',
      'Subject Expert Mentorship',
    ],
  },
  {
    id: 'poly-trb',
    title: 'POLY TRB (Lecturer)',
    description: 'Specialized coaching for Tamil Nadu Government Polytechnic College Lecturer recruitment. High-yield engineering physics concepts, numerical calculations, and CBT simulator.',
    category: 'TRB Exams',
    price: 5499,
    originalPrice: 10999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Engineering Physics & Core M.Sc Topics',
      'Numerical Problem Solving Techniques',
      'Similar TRB CBT Mock Test Engine',
      'Printed Formula Handbook Delivered',
    ],
  },
  {
    id: 'tn-set',
    title: 'TN SET Physical Sciences',
    description: 'Tamil Nadu State Eligibility Test (TN SET) Physical Sciences. Complete preparation for Paper 1 (Teaching & Research Aptitude) + Paper 2 (Core Physics) with 15-year solved papers.',
    category: 'TN SET & CSIR-NET',
    price: 5999,
    originalPrice: 11999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Paper 1 + Paper 2 Integrated Syllabus',
      '15-Year Solved SET & NET Papers',
      'Topic-wise Practice Tests & Analysis',
      'Live Doubt Clearance with Qualified Faculty',
    ],
  },
  {
    id: 'edu-psychology-trb',
    title: 'Education & Psychology TRB',
    description: 'High-scoring pedagogy module for all TRB competitive examinations: Educational Psychology, Child Development, Teaching Methodology, Educational Policies, and General Knowledge with 3,000+ MCQs.',
    category: 'TRB Exams',
    price: 2999,
    originalPrice: 5999,
    level: 'Intermediate',
    isLive: true,
    features: [
      'Child Development & Learning Theories',
      '3,000+ Topic-wise Pedagogy MCQs',
      'Tamil Nadu Education System & Policies',
      'Weekly Full-Length Model Tests',
    ],
  },
];

// 4. Highlight Features (Faculty, Printed Notes, CBT Test Series)
const FEATURE_HIGHLIGHTS = [
  {
    badge: 'EXPERT FACULTY',
    title: 'EXPERT FACULTY – QUALITY EDUCATION',
    intro: 'Classes are handled by highly qualified and experienced faculties, including:',
    bullets: [
      'SET Qualified Professors',
      'CSIR-NET Qualified Subject Experts',
      'Assistant Professors',
      'Associate Professors',
    ],
  },
  {
    badge: 'STUDY MATERIAL',
    title: '📚 PRINTED NOTES – DOORSTEP DELIVERY',
    intro: 'Get comprehensive, exam-oriented printed study materials delivered directly to your doorstep through postal service.',
    bullets: [
      '✔ Detailed Topic-Wise Notes',
      '✔ Previous Year Questions (PYQs)',
      '✔ Expected Questions & Important Concepts',
      '✔ Exam-Oriented Observation Patterns',
      '✔ Shortcuts, Formulae & Numerical Problems',
      '✔ Complete Competitive Examination Preparation',
    ],
  },
  {
    badge: 'CBT TEST ENGINE',
    title: 'State Ranking CBT DEDICATIVE Test Series',
    intro: 'State-level Computer-Based Test (CBT) - Dedicative multi-practice Unit-wise and Topic-wise test series will be PYQ’s and TRB Board exam recently conducted OMR offline exam similar manner test series, Offline & Online students have real time 3hr exam hall experience.',
    bullets: [
      'Unit-wise & Topic-wise Dedicative Multi-practice Exams',
      'Previous TRB PYQs & Recent Weightage Analysis',
      'Android & CBT-Online Simulator',
      'OMR Offline Exam 3-Hour Exam Hall Experience',
    ],
  },
];

// 5. Reason! Why We Choose Tide Physics?
const KEY_EXAMINATIONS = [
  {
    title: 'UG-TRB / Graduate Assistant (BSc Level Syllabus)',
    target: 'Middle school / Graduate teachers in Government schools.',
    syllabus: 'Core undergraduate physics topics (Mechanics, Optics, Thermodynamics, Electricity & Magnetism, Samacheer Kalvi state board syllabus base).',
  },
  {
    title: 'PG-TRB / Post Graduate Assistant (MSc Level Syllabus)',
    target: 'Higher Secondary School Teachers / PG Assistants.',
    syllabus: 'Advanced postgraduate physics topics including Quantum Mechanics, Classical Mechanics, Statistical Mechanics, Electrodynamics, Nuclear & Particle Physics, Electronics, and Solid State Physics.',
  },
  {
    title: 'Polytechnic TRB & Assistant Professor TRB (MSc + Advanced Level)',
    target: 'Lecturers in Government Polytechnic colleges and Assistant Professors in Government Arts & Science / Engineering colleges.',
    syllabus: 'Advanced MSc physics, mathematical physics methods, and specialized competitive problem-solving.',
  },
  {
    title: 'Education & Psychology Module',
    target: 'All TRB competitive recruitment examination candidates.',
    syllabus: 'High-yield modules covering Child Development, Educational Psychology, General Knowledge, and Teaching Methodology as required by TRB exam pattern.',
  },
];

const FAQS = [
  {
    q: 'Why is Tide Physics Academy recognized as the Best TRB Coaching Centre in Physics?',
    a: 'Tide Physics Academy is widely recognized as the premier TRB ACADEMY for PHYSICS in Tamil Nadu. We specialize exclusively in physics competitive examinations—including PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB (Assistant Professor), TN SET, ENGINEERING TRB, and SCERT TRB. With experienced faculty, unit-wise tests, bilingual materials, and 10-year solved papers, our aspirants consistently secure state top ranks.',
  },
  {
    q: 'Does Tide Physics Academy provide both TRB Physics Online & Offline Classes?',
    a: 'Yes! We offer both interactive live smartboard Online Classes (with HD recording replays, PDF lecture notes, and online CBT test simulator) and Classroom Offline Batches at our central campus located on Mathalangula Street, Periyar Statue Backside (Opp. Sankar DTP), Tiruvannamalai - 606601.',
  },
  {
    q: 'What competitive exams are covered under the Tide Physics curriculum?',
    a: 'We offer specialized, result-oriented batches for: 1. PG TRB, 2. UG TRB, 3. AP TRB (Assistant Professor), 4. POLY TRB (Lecturer), 5. TN SET Physical Sciences, and 6. Education & Psychology TRB.',
  },
  {
    q: 'What are the helpline numbers for admissions and student support?',
    a: 'You can directly contact our counseling desk and student helpline at 9994854604 or 9994850604. If you have any doubts regarding course selection or accessing the application after installation, our support team is available Monday through Saturday.',
  },
  {
    q: 'Can I access recorded lectures if I miss a live class session?',
    a: 'Yes! Every live class is recorded in high-definition (1080p) and uploaded to your student portal within 2 hours of completion. You enjoy unlimited replays on web and mobile app throughout your course validity.',
  },
  {
    q: 'Are printed study materials and handwritten formula compendiums delivered?',
    a: 'Yes! For all comprehensive 6-month and 12-month batches, comprehensive printed study material kits and handwritten formula compendiums are shipped via express postal service right to your doorstep.',
  },
];

export default function HomePage() {
  const [courses] = useState<CourseData[]>(COURSES_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackExam, setCallbackExam] = useState('PG TRB');
  const { showToast } = useToast();
  const studentsTrackRef = useRef<HTMLDivElement>(null);

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === 'All') return true;
    return (
      (c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      (c.title && c.title.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  });

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim() || !callbackName.trim()) {
      showToast('Please enter your name and contact number', 'warning');
      return;
    }
    showToast(`Thank you ${callbackName}! An academic counselor will call you within 15 minutes.`, 'success');
    setCallbackName('');
    setCallbackPhone('');
  };

  const scrollStudents = (direction: 'left' | 'right') => {
    if (studentsTrackRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      studentsTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.page}>
      {/* ── 1. HERO SECTION ── */}
      <section className={styles.hero} aria-label="Hero Section">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.trustBadge}>
              <span>⭐⭐⭐⭐⭐</span>
              <span>Best TRB Coaching Centre in Physics • TRB ACADEMY for PHYSICS</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.highlightText}>TRB ACADEMY for PHYSICS</span>; TRB Physics Online &amp; Offline Classes
            </h1>

            <p className={styles.heroSubtitle}>
              Tamil Nadu’s #1 dedicated coaching academy for <strong>PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, TN SET, ENGINEERING TRB, SCERT TRB</strong>. Experience live smartboard classes, printed bilingual notes, dedicative CBT test series &amp; 24/7 personalized faculty mentorship.
            </p>

            <div className={styles.heroActions}>
              <Link href="/courses" className={styles.heroEnrollBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Batches &amp; Enroll <Rocket size={18} />
              </Link>
              <Link href="/downloads" className={styles.heroDemoBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Free Demo Class, Sample Notes &amp; Exams <Video size={18} />
              </Link>
            </div>

            {/* Stats Ribbon */}
            <div className={styles.statsRibbon}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>#1 Rated</span>
                <span className={styles.statLbl}>Best TRB Coaching Centre in Physics</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>Online &amp; Offline</span>
                <span className={styles.statLbl}>TRB Coaching Classes</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>3500+</span>
                <span className={styles.statLbl}>Aspirants Guided</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>STATE TOP RANKERS 3, 4, 9</span>
                <span className={styles.statLbl}>State Rank Records</span>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Enquiry Desk Card */}
          <div className={styles.enquiryCard}>
            <div className={styles.enquiryHeader}>
              <span className={styles.enquiryBadge}>ENQUIRY DESK</span>
              <h2 className={styles.enquiryTitle}>Get Expert TRB Guidance</h2>
              <p className={styles.enquiryDesc}>
                Speak with our expert Physics faculty to assess your syllabus readiness and choose the right TRB / competitive batch.
              </p>
            </div>

            <form onSubmit={handleCallbackSubmit} className={styles.enquiryForm}>
              <label htmlFor="callbackName" className="sr-only">Your Full Name</label>
              <input
                id="callbackName"
                name="fullName"
                type="text"
                required
                placeholder="Your Full Name *"
                aria-label="Your Full Name"
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                className={styles.enquiryInput}
              />
              <label htmlFor="callbackPhone" className="sr-only">WhatsApp or Mobile Number</label>
              <input
                id="callbackPhone"
                name="phone"
                type="tel"
                required
                placeholder="WhatsApp / Mobile Number *"
                aria-label="WhatsApp or Mobile Number"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                className={styles.enquiryInput}
              />
              <label htmlFor="callbackExam" className="sr-only">Target Examination</label>
              <select
                id="callbackExam"
                name="targetExam"
                aria-label="Target Examination"
                value={callbackExam}
                onChange={(e) => setCallbackExam(e.target.value)}
                className={styles.enquirySelect}
              >
                <option value="PG TRB">PG TRB Physics</option>
                <option value="UG TRB">UG TRB Physics</option>
                <option value="POLY TRB">POLY TRB (Lecturer)</option>
                <option value="AP TRB">AP TRB (Assistant Professor)</option>
                <option value="TN SET">TN SET Physical Sciences</option>
                <option value="Education & Psychology TRB">Education &amp; Psychology TRB</option>
                <option value="TN SCERT TRB">TN SCERT TRB</option>
                <option value="Engg. TRB">Engg. TRB Physics</option>
                <option value="CSIR - NET">CSIR - NET (Physical Science)</option>
              </select>
              <button type="submit" className={styles.enquirySubmit} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Request Free Callback <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── 2. LIVE ADMISSIONS MARQUEE TICKER ── */}
      <div className={styles.tickerSection}>
        <span className={styles.tickerTag}>ANNOUNCEMENT</span>
        <div className={styles.tickerText}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Rocket size={14} color="#0056D2" /> TRB Physics Online &amp; Offline Classes: Admissions Open for PG TRB, UG TRB, POLY TRB &amp; TN SET
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Phone size={14} color="#22C55E" /> Helpline: 9994854604 / 9994850604 — Talk to Faculty
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={14} color="#DC2626" /> Campus: Mathalangula St, Periyar Statue Backside (Opp. Sankar DTP), Tiruvannamalai - 606601
          </span>
        </div>
      </div>

      {/* ── 3. SUCCESS STUDENTS BIO: UG TRB-2024 (Scroll RIGHT to LEFT) ── */}
      <section className={styles.resultsSection} id="results" aria-label="Success Students Bio">
        <div className={styles.resultsHeader}>
          <div>
            <span className={styles.resultsBadge}>UG TRB-2024 TOPPERS</span>
            <h2 className={styles.resultsTitle}>Our Success Students BIO</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem', margin: '0.35rem 0 0' }}>
              Consistently producing Tamil Nadu state rank records in Teachers Recruitment Board examinations.
            </p>
          </div>
          <div className={styles.tickerControls}>
            <button
              onClick={() => scrollStudents('left')}
              className={styles.tickerBtn}
              aria-label="Scroll toppers left"
              title="Previous Student"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollStudents('right')}
              className={styles.tickerBtn}
              aria-label="Scroll toppers right"
              title="Next Student"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.marqueeTrackWrapper} ref={studentsTrackRef}>
          <div className={styles.marqueeTrackRightToLeft}>
            {/* Render two sets for seamless infinite right-to-left marquee */}
            {[...SUCCESS_STUDENTS, ...SUCCESS_STUDENTS].map((stu, idx) => (
              <div key={`${stu.name}-${idx}`} className={styles.studentCard}>
                <div className={styles.studentImgWrapper}>
                  <img
                    src={stu.image}
                    alt={`${stu.name} UG TRB-2024 Topper`}
                    className={styles.studentImg}
                    loading="lazy"
                  />
                </div>
                <span className={styles.studentExamBadge}>{stu.exam}</span>
                <div className={styles.studentScore}>{stu.score}</div>
                <div className={styles.studentScoreLabel}>Score Secured</div>
                <div className={styles.studentName}>{stu.name}</div>
                <div className={styles.studentReg}>{stu.regNo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. YOUTUBE VIDEOS AND PHOTOS (Scroll LEFT to RIGHT with time gap) ── */}
      <section className={styles.gallerySection} id="gallery" aria-label="YouTube Videos and Photos">
        <div className={styles.galleryHeader}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
              <Play size={14} fill="#EF4444" color="#EF4444" /> CAMPUS LIFE &amp; VIDEO SESSIONS
            </div>
            <h2 className={styles.galleryTitle}>YouTube Videos and Classroom Moments</h2>
          </div>
          <a
            href="https://www.youtube.com/@TIDE_PHYSICS_TVM"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ytChannelBtn}
          >
            <Video size={18} /> Watch on @TIDE_PHYSICS_TVM <ExternalLink size={14} />
          </a>
        </div>

        <div className={styles.marqueeTrackWrapper}>
          <div className={styles.marqueeTrackLeftToRight}>
            {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((p, idx) => (
              <div key={`${p.src}-${idx}`} className={styles.galleryCard}>
                <img src={p.src} alt={p.title} loading="lazy" />
                <div className={styles.galleryCardOverlay}>
                  <span>{p.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COURSES SECTION ── */}
      <section className={styles.section} id="courses">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>STATE RANKING BEST CLASSES &amp; DEDICATIVE CBT TEST SERIES</span>
            <h2 className={styles.sectionTitle}>State Ranking BEST CLASSES &amp; DEDICATIVE CBT TEST SERIES</h2>
            <p className={styles.sectionSubtitle}>
              State-level Computer-Based Test (CBT) - Dedicative multi-practice exams Topic-wise, Unit-wise, Chapter-wise, Combined Exams and Model exams test series. Our Exams Questions will be previous PYQ’s Recently TRB Exam Board conducted Question weightage will be handled, Android &amp; CBT-online, OMR-offline exam gives a real TRB Board exam conducting experience with time management options.
            </p>
          </div>

          {/* Category Tabs (Removed School & Competitive) */}
          <div className={styles.tabsRow}>
            {['All', 'TRB Exams', 'TN SET & CSIR-NET'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ''}`}
              >
                {cat === 'All' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} color="#F59E0B" /> All Flagship Programs ({courses.length})
                  </span>
                ) : (
                  cat
                )}
              </button>
            ))}
          </div>

          {/* Course Cards Grid: Just course names and key features with enroll, no fees/discount/student count */}
          <div className={styles.coursesGrid}>
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                title={c.title}
                description={c.description}
                category={c.category}
                level={c.level}
                isLive={c.isLive}
                features={c.features}
                showPricing={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US (Why 3500+ Aspirants Trust Us) ── */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>THE TIDE PHYSICS ADVANTAGE</span>
            <h2 className={styles.sectionTitle}>Why 3500+ Aspirants Trust Us</h2>
            <p className={styles.sectionSubtitle}>
              &ldquo;We provide dedicated classes, intensive training, and real-life situational motivation to build students&apos; knowledge, confidence, and success in competitive examinations.&rdquo;
            </p>
          </div>

          {/* 3 Prominent Highlights: Expert Faculty, Printed Notes, State Ranking CBT */}
          <div className={styles.featureHighlightGrid}>
            {FEATURE_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className={styles.featureHighlightCard}>
                <div style={{ display: 'inline-block', width: 'fit-content', background: '#EFF6FF', color: '#0056D2', fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '4px' }}>
                  {item.badge}
                </div>
                <h3 className={styles.featureHighlightTitle}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  {item.intro}
                </p>
                <ul className={styles.featureBulletList}>
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className={styles.featureBulletItem}>
                      <span style={{ color: '#16A34A', fontWeight: 800 }}>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. REASON!!.. WHY WE CHOOSE TIDE PHYSICS? (Key Examinations Covered) ── */}
      <section className={styles.reasonSection} id="reason" aria-label="Why We Choose Tide Physics">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>CURRICULUM SPECIFICATIONS</span>
            <h2 className={styles.sectionTitle}>REASON!!.. WHY WE CHOOSE TIDE PHYSICS?</h2>
            <p className={styles.sectionSubtitle}>
              Key Examinations Covered with specialized syllabus architecture for Teaching Positions in Tamil Nadu.
            </p>
          </div>

          <div className={styles.reasonGrid}>
            {KEY_EXAMINATIONS.map((exam, idx) => (
              <div key={idx} className={styles.reasonCard}>
                <h3 className={styles.reasonCardTitle}>{exam.title}</h3>
                <div className={styles.reasonPostBox}>
                  <strong>Target Posts:</strong> {exam.target}
                </div>
                <div className={styles.reasonSyllabusBox}>
                  <strong>Syllabus Level:</strong> {exam.syllabus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FREE STUDY KIT DOWNLOAD BANNER ── */}
      <section className={styles.section} id="downloads" style={{ paddingTop: 0 }}>
        <div className={styles.sectionInner}>
          <div className={styles.downloadBanner}>
            <div className={styles.downloadContent}>
              <h2 className={styles.downloadTitle}>
                Free Demo Class, Sample Notes &amp; Exams
              </h2>
              <p className={styles.downloadDesc}>
                Get immediate access to high-yield formula sheets, chapter-wise weightage analysis,
                previous year question solutions, and sample model CBT exams curated by our senior faculty.
              </p>
            </div>
            <Link href="/downloads" className={styles.downloadBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Access Free Study Materials &amp; Demo <Download size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. CAMPUS LOCATION & DIRECT HELPLINE ── */}
      <section className={`${styles.section} ${styles.campusSection}`} id="campus">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>VISIT OUR ACADEMY</span>
            <h2 className={styles.sectionTitle}>Tiruvannamalai Campus &amp; Student Helpdesk</h2>
            <p className={styles.sectionSubtitle}>
              TRB ACADEMY for PHYSICS — Providing High-Performance TRB Physics Online &amp; Offline Classes
            </p>
          </div>

          <div className={styles.campusGrid}>
            <div className={styles.campusInfoCard}>
              <div className={styles.campusBadge}>
                <MapPin size={14} /> Institute Current Location
              </div>
              <h3 className={styles.campusHeading}>
                Best TRB Coaching Centre in Physics — Tiruvannamalai
              </h3>
              <p className={styles.campusDesc}>
                Whether you prefer classroom learning or interactive live online classes, our Tiruvannamalai headquarters provides cutting-edge physics labs, seminar halls, and personal counseling.
              </p>

              <div className={styles.campusAddressBox}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Physical Address
                </div>
                <div className={styles.campusAddressText}>
                  Mathalangula Street, Periyar Statue Backside,<br />
                  Tiruvannamalai - 606601, Tamil Nadu.
                </div>
                <div className={styles.campusLandmark}>
                  📍 Landmark: Opposite Sankar DTP (Opp. Sankar DTP, formerly Opposite Amma Medical)
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>
                  <strong>Institute Opening Time:</strong><br />
                  Mon – Fri: 10.00 AM – 5 PM (IST)<br />
                  Sat – Sun: 9 AM – 5 PM (IST)
                </div>
              </div>

              <div className={styles.campusHelplineGrid}>
                <div className={styles.campusHelplineCard}>
                  <span className={styles.campusHelplineLabel}>Admissions &amp; Batches</span>
                  <span className={styles.campusHelplineNumber}>9994854604</span>
                  <a href="tel:9994854604" className={styles.campusHelplineLink}>
                    <Phone size={13} /> Call 9994854604
                  </a>
                </div>
                <div className={styles.campusHelplineCard}>
                  <span className={styles.campusHelplineLabel}>App Access &amp; Support</span>
                  <span className={styles.campusHelplineNumber}>9994850604</span>
                  <a href="tel:9994850604" className={styles.campusHelplineLink}>
                    <Phone size={13} /> Call 9994850604
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.campusMapWrapper}>
              <iframe
                title="Tide Physics Academy Location Map (Opp. Sankar DTP)"
                src="https://maps.google.com/maps?q=12.2355155,79.0747604&hl=en&z=16&output=embed"
                className={styles.campusMapIframe}
                loading="lazy"
                allowFullScreen
              />
              <a
                href="https://maps.app.goo.gl/R5j7rKeV4ozKHRCSA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.campusMapBtn}
              >
                <Navigation size={16} /> Open in Google Maps (Opp. Sankar DTP) <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ACCORDION ── */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>FREQUENTLY ASKED QUESTIONS</span>
            <h2 className={styles.sectionTitle}>Got Questions? We’ve Got Answers.</h2>
          </div>

          <div className={styles.faqList}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={styles.faqItem}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className={styles.faqQuestion}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.faqArrow} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                      ▼
                    </span>
                  </button>
                  {isOpen && <div className={styles.faqAnswer}>{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
