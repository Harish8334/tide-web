// src/app/(public)/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Gift, 
  Radio, 
  Sparkles, 
  Download, 
  ArrowRight,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle,
  Navigation,
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

const COURSES_DATA: CourseData[] = [
  {
    id: 'pg-trb',
    title: 'PG TRB Physics (Post Graduate Assistant)',
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
    id: 'edu-psychology-trb',
    title: 'Education & Psychology TRB (Pedagogy & GK)',
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
  {
    id: 'ug-trb',
    title: 'UG TRB Physics (Graduate Teacher / B.T. Assistant)',
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
    id: 'poly-trb',
    title: 'POLY TRB Physics (Polytechnic College Lecturers)',
    description: 'Specialized coaching for Tamil Nadu Government Polytechnic College Lecturer recruitment. High-yield engineering physics concepts, numerical calculations, and CBT simulator.',
    category: 'TRB Exams',
    price: 5499,
    originalPrice: 10999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Engineering Physics & Core M.Sc Topics',
      'Numerical Problem Solving Techniques',
      'All-India Level CBT Mock Test Engine',
      'Printed Formula Handbook Delivered',
    ],
  },
  {
    id: 'tn-set',
    title: 'TN SET Physical Sciences (Assistant Professor)',
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
    id: 'ap-trb',
    title: 'AP TRB (Assistant Professor TRB - Govt Arts & Science)',
    description: 'Prestige coaching for Collegiate Education Assistant Professor recruitment in Physics. Deep postgraduate curriculum, research orientation, and interview guidance.',
    category: 'TRB Exams',
    price: 6499,
    originalPrice: 12999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Postgraduate & Research Core Syllabus',
      'High-level Derivations & MCQ Shortcuts',
      'Interview Prep & Viva Voce Guidance',
      'Subject Expert Mentorship',
    ],
  },
  {
    id: 'tn-scert-trb',
    title: 'TN SCERT TRB Physics (Senior / DIET Lecturer)',
    description: 'Structured preparation for Tamil Nadu SCERT & DIET Lecturer recruitment examinations in Physics with pedagogy, curriculum methodology, and full-length model exams.',
    category: 'TRB Exams',
    price: 5499,
    originalPrice: 10999,
    level: 'Advanced',
    isLive: true,
    features: [
      'SCERT / DIET Exam Syllabus Coverage',
      'Curriculum Pedagogy & Physics Specialization',
      'Regular Timed Online Mock Tests',
      'Exclusive Study Compendium',
    ],
  },
  {
    id: 'engg-trb',
    title: 'Engg. TRB Physics (Govt Engineering Colleges)',
    description: 'Targeted coaching for Tamil Nadu Government Engineering Colleges Lecturer recruitment in Physics. Advanced mathematical methods, electrodynamics, quantum physics, and thermodynamics.',
    category: 'TRB Exams',
    price: 5999,
    originalPrice: 11999,
    level: 'Advanced',
    isLive: true,
    features: [
      'Higher Technical Physics Syllabus',
      'Formula Compendium & Derivations',
      'Previous Years Examination Analysis',
      'Live Interactive Problem Solving',
    ],
  },
  {
    id: 'csir-net',
    title: 'CSIR - NET Physical Science (JRF & Lectureship)',
    description: 'National benchmark coaching for CSIR UGC-NET JRF in Physical Sciences. 350+ hours live classes covering Parts A, B, and C with full mock test series and printed study kits.',
    category: 'TN SET & CSIR-NET',
    price: 6999,
    originalPrice: 13999,
    level: 'Advanced',
    isLive: true,
    features: [
      '350+ Hours Live Smartboard Classes',
      'Complete Part A Aptitude + Part B & C Physics',
      'Full NTA Computer-Based Mock Simulator',
      'Doorstep Courier of Printed Notes',
    ],
  },
  {
    id: 'jee',
    title: 'JEE Physics (Main & Advanced Foundation & Ranker)',
    description: 'Conceptual intuition and rigorous numerical problem-solving for IIT-JEE Main & Advanced. In-depth HC Verma, Irodov, and 20-year PYQ mastery.',
    category: 'School & Competitive',
    price: 4999,
    originalPrice: 9999,
    level: 'Intermediate',
    isLive: true,
    features: [
      'Concept-First Problem Solving Methodology',
      'HC Verma, Irodov & PYQ Mastery',
      'Weekly CBT Test Series with Negative Marking',
      '24/7 WhatsApp Doubt Desk',
    ],
  },
  {
    id: 'neet',
    title: 'NEET Physics (Medical Entrance Score Booster 160+)',
    description: 'Master NEET Physics with line-by-line NCERT coverage, speed-solving tricks, formula handbooks, daily 50-MCQ sheets, and full-length OMR test simulation.',
    category: 'School & Competitive',
    price: 4499,
    originalPrice: 8999,
    level: 'Intermediate',
    isLive: true,
    features: [
      'NCERT Line-by-Line Decoded',
      'Calculation Speed Optimization Techniques',
      'Daily 50-Question Practice Sets',
      'Full-Length NEET OMR Simulation Exams',
    ],
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: <GraduationCap size={28} color="#0056D2" />,
    title: 'Illustrious Faculty from IITs & IISc',
    desc: 'Learn directly from passionate Ph.D. scholars and CSIR-NET JRF rank holders with over a decade of proven teaching excellence.',
  },
  {
    icon: <Video size={28} color="#7C3AED" />,
    title: '1080p Interactive Smartboard Classes',
    desc: 'Real-time two-way audio, interactive physics chalkboard, hand-raise feature, and crystal-clear whiteboard equations.',
  },
  {
    icon: <BookOpen size={28} color="#0056D2" />,
    title: 'Printed Study Kits & Handwritten Notes',
    desc: 'Delivered to your doorstep. Detailed concept notes, formula compendiums, and previous 15 years solved papers.',
  },
  {
    icon: <FileCheck2 size={28} color="#22C55E" />,
    title: 'National Ranking CBT Test Series',
    desc: 'Exact replica of the NTA CSIR-NET computer-based test interface with sectional cutoffs, negative marking, and All-India Rank.',
  },
  {
    icon: <MessageSquare size={28} color="#F59E0B" />,
    title: '24/7 Dedicated Doubt Resolution Desk',
    desc: 'Never get stuck. Ask doubts during live classes or submit mathematical equations anytime on our physics symbols doubt portal.',
  },
  {
    icon: <Smartphone size={28} color="#0056D2" />,
    title: 'Seamless Mobile & Web Learning App',
    desc: 'Attend live classes, attempt quizzes, download notes offline, and review mistake notebooks on desktop or mobile seamlessly.',
  },
];

const RANKERS = [
  {
    name: 'Aditya Verma',
    rank: 'AIR 4 (CSIR-NET JRF)',
    college: 'M.Sc Delhi University',
    quote: 'PhysicsCoach Pro transformed my preparation. The live classes felt more personal and rigorous than any offline coaching I tried. The mistake notebook helped me eliminate silly calculation slips in Paper C.',
  },
  {
    name: 'Sneha Reddy',
    rank: 'AIR 11 (GATE Physical Sciences)',
    college: 'IIT Madras M.Sc Alum',
    quote: 'The faculty’s mathematical rigor in Electrodynamics and Quantum Mechanics is unmatched anywhere in India. The formula handbook and test series were crucial to my top 15 national ranking.',
  },
  {
    name: 'Prakash Swaminathan',
    rank: 'Cleared TN-SET & TRB',
    college: 'Loyola College Chennai',
    quote: 'The bilingual pedagogy and daily DPP problem sheets made advanced physics concepts effortless to grasp. I cleared my Assistant Professor exam in my very first attempt thanks to this platform!',
  },
];

const FAQS = [
  {
    q: 'Why is Tide Physics Academy recognized as the Best TRB Coaching Centre in Physics?',
    a: 'Tide Physics Academy is widely recognized as the premier TRB ACADEMY for PHYSICS in Tamil Nadu. We specialize exclusively in physics competitive examinations—including PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB (Assistant Professor), TN SET, ENGINEERING TRB, and SCERT TRB. With experienced faculty, unit-wise tests, bilingual materials, and 10-year solved papers, our aspirants consistently secure top ranks.',
  },
  {
    q: 'Does Tide Physics Academy provide both TRB Physics Online & Offline Classes?',
    a: 'Yes! We offer both interactive live smartboard Online Classes (with HD recording replays, PDF lecture notes, and online CBT test simulator) and Classroom Offline Batches at our central campus located on Mathalangula Street, Periyar Statue Backside (Opp. Amma Medical), Tiruvannamalai - 606601.',
  },
  {
    q: 'What competitive exams are covered under the Tide Physics curriculum?',
    a: 'We offer specialized, result-oriented batches for: 1. PG TRB, 2. Education & Psychology TRB, 3. UG TRB, 4. POLY TRB, 5. TN SET, 6. AP TRB (Assistant Professor TRB), 7. TN SCERT TRB, 8. Engg. TRB, 9. CSIR - NET (Physical Science), 10. JEE (Main & Advanced), and 11. NEET (UG Physics).',
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
    a: 'Yes! For all comprehensive 6-month and 12-month batches, comprehensive printed study material kits and handwritten formula compendiums are shipped via express courier right to your doorstep.',
  },
];

export default function HomePage() {
  const [courses, setCourses] = useState<CourseData[]>(COURSES_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackExam, setCallbackExam] = useState('PG TRB');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    courseApi.getAll()
      .then((res: unknown) => {
        const list = (res as { data?: any[] }).data || (Array.isArray(res) ? res : []);
        if (list.length > 0) {
          const liveMapped: CourseData[] = list.map((c: any) => ({
            id: c._id || c.id,
            title: c.title,
            description: c.description || 'Comprehensive curriculum with live interactive lectures, study materials, and tests.',
            category: c.category || 'Physics',
            price: c.price || 5999,
            originalPrice: c.originalPrice || Math.round((c.price || 5999) * 1.8),
            level: c.level || 'Advanced',
            isLive: c.isActive !== false,
            features: c.tags
              ? c.tags.split(' ').filter((t: string) => t.length > 3).slice(0, 4)
              : [
                  '350+ Hours Live HD Classes',
                  'Printed Theory Books Courier',
                  'Computer-Based Mock Test Simulator',
                  'WhatsApp Faculty Doubt Desk',
                ],
          }));
          setCourses(liveMapped);
        }
      })
      .catch(() => {});
  }, []);

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
    setFormSubmitted(true);
    showToast(`Thank you ${callbackName}! An academic counselor will call you within 15 minutes.`, 'success');
    setCallbackName('');
    setCallbackPhone('');
  };

  return (
    <div className={styles.page}>
      {/* ── 1. HERO SECTION (Professor Academy Signature) ── */}
      <section className={styles.hero} aria-label="Hero Section">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.trustBadge}>
              <span>⭐⭐⭐⭐⭐</span>
              <span>Best TRB Coaching Centre in Physics • TRB ACADEMY for PHYSICS</span>
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.highlightText}>TRB ACADEMY for PHYSICS</span> — TRB Physics Online &amp; Offline Classes
            </h1>

            <p className={styles.heroSubtitle}>
              Tamil Nadu’s #1 dedicated coaching academy for <strong>PG TRB, UG TRB, POLYTECHNIC TRB, AP TRB, TN SET, ENGINEERING TRB, SCERT TRB, CSIR-NET, JEE &amp; NEET</strong>. Experience live smartboard classes, printed bilingual notes, national CBT test series &amp; 24/7 personalized faculty mentorship.
            </p>

            <div className={styles.heroActions}>
              <Link href="/courses" className={styles.heroEnrollBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Batches &amp; Enroll <Rocket size={18} />
              </Link>
              <Link href="/courses" className={styles.heroDemoBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free Demo Class <Video size={18} />
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
                <span className={styles.statNum}>15,000+</span>
                <span className={styles.statLbl}>Aspirants Guided</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>AIR 1, 4, 11</span>
                <span className={styles.statLbl}>State &amp; National Top Ranks</span>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Enquiry / Free Consultation Card */}
          <div className={styles.enquiryCard}>
            <div className={styles.enquiryHeader}>
              <span className={styles.enquiryBadge}>FREE ACADEMIC COUNSELLING</span>
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
                <option value="PG TRB">Target: PG TRB Physics</option>
                <option value="Education & Psychology TRB">Target: Education &amp; Psychology TRB</option>
                <option value="UG TRB">Target: UG TRB Physics</option>
                <option value="POLY TRB">Target: POLY TRB (Polytechnic)</option>
                <option value="TN SET">Target: TN SET Physical Sciences</option>
                <option value="AP TRB">Target: AP TRB (Assistant Professor)</option>
                <option value="TN SCERT TRB">Target: TN SCERT TRB</option>
                <option value="Engg. TRB">Target: Engg. TRB Physics</option>
                <option value="CSIR - NET">Target: CSIR - NET (Physical Science)</option>
                <option value="JEE">Target: JEE (Main &amp; Advanced)</option>
                <option value="NEET">Target: NEET (UG Physics)</option>
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
            <MapPin size={14} color="#DC2626" /> Campus: Mathalangula St, Periyar Statue Backside (Opp. Amma Medical), Tiruvannamalai - 606601
          </span>
        </div>
      </div>

      {/* ── 3. FEATURED COURSES & CATEGORY TABS (Professor Academy Signature) ── */}
      <section className={styles.section} id="courses">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>POPULAR CURRICULA</span>
            <h2 className={styles.sectionTitle}>Explore Premier Physics Batches</h2>
            <p className={styles.sectionSubtitle}>
              Structured, comprehensive programs designed by top educators with proven national and state rank records.
            </p>
          </div>

          {/* Category Tabs */}
          <div className={styles.tabsRow}>
            {['All', 'TRB Exams', 'TN SET & CSIR-NET', 'School & Competitive'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ''}`}
              >
                {cat === 'All' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} color="#F59E0B" /> All Programs (11)
                  </span>
                ) : (
                  cat
                )}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className={styles.coursesGrid}>
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                title={c.title}
                description={c.description}
                category={c.category}
                price={c.price}
                originalPrice={c.originalPrice}
                level={c.level}
                isLive={c.isLive}
                features={c.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US (Illustrated Grid) ── */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>THE TIDE PHYSICS ADVANTAGE</span>
            <h2 className={styles.sectionTitle}>Why 15,000+ Aspirants Trust Us</h2>
            <p className={styles.sectionSubtitle}>
              We combine pedagogical clarity with examination rigor to make competitive physics effortless.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <div key={idx} className={styles.whyCard}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HALL OF FAME / RANKERS WALL ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>PROVEN ACHIEVEMENTS</span>
            <h2 className={styles.sectionTitle}>Hall of Fame: Our National Rankers</h2>
            <p className={styles.sectionSubtitle}>
              Read how Tide Physics Academy helped students script their success stories across India.
            </p>
          </div>

          <div className={styles.rankersGrid}>
            {RANKERS.map((r, idx) => (
              <div key={idx} className={styles.rankerCard}>
                <div className={styles.rankerTop}>
                  <div className={styles.rankerAvatar}>
                    {r.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className={styles.rankerInfo}>
                    <div className={styles.rankerName}>{r.name}</div>
                    <div className={styles.rankerProgram}>{r.college}</div>
                    <div className={styles.rankBadge}>{r.rank}</div>
                  </div>
                </div>
                <p className={styles.quoteText}>&ldquo;{r.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FREE STUDY KIT DOWNLOAD BANNER ── */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.sectionInner}>
          <div className={styles.downloadBanner}>
            <div className={styles.downloadContent}>
              <h2 className={styles.downloadTitle}>
                Download Free Physics Formula Handbook & 15-Year Solved Papers
              </h2>
              <p className={styles.downloadDesc}>
                Get immediate access to high-yield formula sheets, chapter-wise weightage analysis,
                and previous year question solutions curated by our senior faculty.
              </p>
            </div>
            <Link href="/courses" className={styles.downloadBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Download Free Study Kit <Download size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. CAMPUS LOCATION & DIRECT HELPLINE ── */}
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
                  📍 Landmark: Opposite Amma Medical
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
                title="Tide Physics Academy Location Map"
                src="https://maps.google.com/maps?q=12.2355155,79.0747604&z=16&output=embed"
                className={styles.campusMapIframe}
                loading="lazy"
              />
              <a
                href="https://maps.app.goo.gl/R5j7rKeV4ozKHRCSA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.campusMapBtn}
              >
                <Navigation size={16} /> Open in Google Maps <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ACCORDION ── */}
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
