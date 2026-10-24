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
  ArrowRight 
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
    id: '1',
    title: 'CSIR-NET Physical Sciences Comprehensive JRF Batch',
    description: 'Complete 350+ hours live syllabus coverage including Quantum Mechanics, Electrodynamics, Mathematical Physics, and Classical Mechanics with 50+ Full Mock Tests.',
    category: 'CSIR-NET JRF',
    price: 6999,
    originalPrice: 13999,
    level: 'Advanced',
    isLive: true,
    features: [
      '350+ Hours Live Smartboard Classes',
      'Printed Theory Books & Handwritten Notes',
      '50+ All-India Full Length Mock Tests',
      'Daily Practice Problems (DPP) with Video Solutions',
    ],
  },
  {
    id: '2',
    title: 'GATE Physics Intensive Ranker Program',
    description: 'Targeted preparation for GATE Physical Sciences. Deep problem-solving sessions on previous 20 years papers, numerical answering techniques, and formula optimization.',
    category: 'GATE Physical Sciences',
    price: 5999,
    originalPrice: 11999,
    level: 'Advanced',
    isLive: true,
    features: [
      '250+ Hours Live Theory & Numericals',
      '20-Year Previous Years Solved Papers',
      'Computer-Based Virtual Calculator Training',
      'Weekly Doubt Clearing with IIT Alumni Faculty',
    ],
  },
  {
    id: '3',
    title: 'Advanced Quantum Mechanics & Perturbation Theory',
    description: 'Postgraduate core paper covering Hilbert spaces, Dirac bra-ket notation, stationary & time-dependent perturbation theory, Stark effect, and relativistic Dirac equations.',
    category: 'M.Sc Physics',
    price: 3999,
    originalPrice: 7999,
    level: 'Post-Grad',
    isLive: true,
    features: [
      'Full Mathematical Derivations & State Vectors',
      'Handwritten Notes for University Exams',
      'Weekly Conceptual MCQ & Subjective Quizzes',
      'Lifetime Access to Video Recordings',
    ],
  },
  {
    id: '4',
    title: 'Classical Electrodynamics & Radiation Masterclass',
    description: 'From Maxwell equations and boundary-value problems to relativistic electrodynamics, Poynting energy flux, and radiation from accelerating charges.',
    category: 'M.Sc Physics',
    price: 3499,
    originalPrice: 6999,
    level: 'Intermediate',
    isLive: false,
    features: [
      'Rigorous Vector Calculus & Tensor Notation',
      'Boundary Value Problems & Green Functions',
      'Complete PDF Notes & Formula Compendium',
      'Self-Paced with 1080p HD Replays',
    ],
  },
  {
    id: '5',
    title: 'TRB / State SET Assistant Professor Physics Foundation',
    description: 'Tailored for State Eligibility Tests and Teacher Recruitment Board examinations with high-frequency objective question practice and bilingual pedagogy.',
    category: 'State SET',
    price: 4499,
    originalPrice: 8999,
    level: 'Intermediate',
    isLive: true,
    features: [
      'Complete Core + Applied Physics Curriculum',
      '10,000+ Topic-wise Question Bank',
      'Weekly OMR Simulation Evaluation',
      'Faculty Mentorship & Interview Guidance',
    ],
  },
  {
    id: '6',
    title: 'Statistical Mechanics & Phase Transitions Cohort',
    description: 'Microcanonical, Canonical & Grand Canonical ensembles, Maxwell-Boltzmann, Bose-Einstein & Fermi-Dirac distributions with Ising model transitions.',
    category: 'M.Sc Physics',
    price: 3499,
    originalPrice: 6999,
    level: 'Post-Grad',
    isLive: false,
    features: [
      'Partition Function Derivations Made Simple',
      'Quantum Statistics & Density Matrix',
      '15+ Graded Assignment Problem Sets',
      'Instant Doubt Chat with Faculty',
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
    q: 'Can I access recorded lectures if I miss a live class session?',
    a: 'Yes! Every live class is recorded in high-definition (1080p) and uploaded to your student portal within 2 hours of completion. You enjoy unlimited replays on web and mobile throughout your course validity.',
  },
  {
    q: 'How does the test series compare to the real NTA CSIR-NET exam?',
    a: 'Our exam engine is an exact replica of the official NTA computer-based interface, featuring identical countdown timers, question palettes, Part A/B/C sectional navigation, and -0.25/-0.5 negative marking calculation.',
  },
  {
    q: 'Are printed study materials and handwritten notes delivered to my home address?',
    a: 'Yes, for all comprehensive 6-month and 12-month batches, comprehensive printed study material kits and handwritten formula compendiums are shipped via express courier right to your doorstep.',
  },
  {
    q: 'Can I pay the course admission fees in monthly installments (EMI)?',
    a: 'Yes, we provide 0% interest flexible EMI options through credit/debit cards and Razorpay, allowing you to pay in easy 2 or 3 monthly installments without any additional surcharge.',
  },
];

export default function HomePage() {
  const [courses, setCourses] = useState<CourseData[]>(COURSES_DATA);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackExam, setCallbackExam] = useState('CSIR-NET Physical Sciences');
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
              <span>India’s #1 Dedicated Physics Coaching Academy</span>
            </div>

            <h1 className={styles.heroTitle}>
              Crack <span className={styles.highlightText}>CSIR-NET, GATE</span> & M.Sc Physics with India’s Top Faculty
            </h1>

            <p className={styles.heroSubtitle}>
              Join over 15,000 successful aspirants. Experience 1080p live interactive smartboard sessions,
              complete printed theory materials, computer-based national test series, and 24/7 personalized faculty mentorship.
            </p>

            <div className={styles.heroActions}>
              <Link href="/courses" className={styles.heroEnrollBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Batches & Enroll <Rocket size={18} />
              </Link>
              <Link href="/courses" className={styles.heroDemoBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free Demo Class <Video size={18} />
              </Link>
            </div>

            {/* Stats Ribbon */}
            <div className={styles.statsRibbon}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>15,000+</span>
                <span className={styles.statLbl}>Aspirants Guided</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>98.4%</span>
                <span className={styles.statLbl}>Success Rate</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>AIR 1, 4, 11</span>
                <span className={styles.statLbl}>National Top Ranks</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNum}>350+ Hrs</span>
                <span className={styles.statLbl}>Live Teaching per Batch</span>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Enquiry / Free Consultation Card */}
          <div className={styles.enquiryCard}>
            <div className={styles.enquiryHeader}>
              <span className={styles.enquiryBadge}>FREE ACADEMIC COUNSELLING</span>
              <h2 className={styles.enquiryTitle}>Get Expert Guidance</h2>
              <p className={styles.enquiryDesc}>
                Speak with our IIT/IISc physics faculty to assess your preparation level and select the right batch.
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
                <option value="CSIR-NET Physical Sciences">Target: CSIR-NET Physical Sciences</option>
                <option value="GATE Physics">Target: GATE Physics</option>
                <option value="M.Sc Physics Entrances">Target: M.Sc Physics (IIT-JAM / CUET)</option>
                <option value="TRB / State SET">Target: TRB / State SET Assistant Professor</option>
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
            <Rocket size={14} color="#0056D2" /> New CSIR-NET Alpha Batch Starting This Monday (Seats Limited)
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Gift size={14} color="#22C55E" /> Download Free Formula Compendium & 10-Year Solved Papers
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Radio size={14} color="#DC2626" /> Sunday Live Masterclass: Relativistic Dirac Equation at 6:00 PM IST
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
              Structured, comprehensive programs designed by top educators with proven national rank records.
            </p>
          </div>

          {/* Category Tabs */}
          <div className={styles.tabsRow}>
            {['All', 'CSIR-NET JRF', 'GATE Physical Sciences', 'M.Sc Physics', 'State SET'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.tabBtn} ${selectedCategory === cat ? styles.tabBtnActive : ''}`}
              >
                {cat === 'All' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} color="#F59E0B" /> All Programs
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

      {/* ── 7. FAQ ACCORDION ── */}
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
