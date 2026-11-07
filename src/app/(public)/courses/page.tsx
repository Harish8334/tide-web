// src/app/(public)/courses/page.tsx
'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CourseCard from '@/components/CourseCard';
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import { courseApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';
import { Search, Filter, BookOpen, X } from 'lucide-react';

const CATEGORIES = ['All', 'TRB Exams', 'TN SET & CSIR-NET', 'School & Competitive'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

interface CourseItem {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor?: { name?: string } | string;
  thumbnailUrl?: string;
  price?: number;
  enrolledCount?: number;
  isEnrolled?: boolean;
}

const FALLBACK_COURSES: CourseItem[] = [
  {
    _id: 'pg-trb',
    title: 'PG TRB Physics (Post Graduate Assistant)',
    description: 'Targeted coaching for Tamil Nadu Post Graduate Assistant Teachers Examination in Physics. Classical, Quantum, Solid State, Nuclear, Electronics & Optics with unit tests & PYQ discussions.',
    category: 'TRB Exams',
    level: 'Advanced',
    instructor: 'Tide Faculty Team',
    price: 4999,
    enrolledCount: 840,
  },
  {
    _id: 'edu-psychology-trb',
    title: 'Education & Psychology TRB (Pedagogy & GK)',
    description: 'High-scoring pedagogy module for all TRB competitive exams: Educational Psychology, Child Development, Teaching Methodology, Educational Policies, and General Knowledge with 3,000+ MCQs.',
    category: 'TRB Exams',
    level: 'Intermediate',
    instructor: 'Dr. Education Specialist',
    price: 2999,
    enrolledCount: 920,
  },
  {
    _id: 'ug-trb',
    title: 'UG TRB Physics (Graduate Teacher / B.T. Assistant)',
    description: 'Comprehensive coaching for Tamil Nadu Graduate Teachers (UG TRB) in Physics. Full Samacheer Kalvi & Graduate syllabus with chapter-wise DPPs and model test series.',
    category: 'TRB Exams',
    level: 'Intermediate',
    instructor: 'Tide Faculty Team',
    price: 4499,
    enrolledCount: 710,
  },
  {
    _id: 'poly-trb',
    title: 'POLY TRB Physics (Lecturer)',
    description: 'Specialized coaching for Tamil Nadu Government Polytechnic College Lecturer recruitment. High-yield engineering physics concepts, numerical calculations, and CBT simulator.',
    category: 'TRB Exams',
    level: 'Advanced',
    instructor: 'Senior Physics Faculty',
    price: 5499,
    enrolledCount: 650,
  },
  {
    _id: 'tn-set',
    title: 'TN SET Physical Sciences (Assistant Professor)',
    description: 'Tamil Nadu State Eligibility Test (TN SET) Physical Sciences. Complete preparation for Paper 1 (Teaching & Research Aptitude) + Paper 2 (Core Physics) with 15-year solved papers.',
    category: 'TN SET & CSIR-NET',
    level: 'Advanced',
    instructor: 'Prof. Ananya Sen & Panel',
    price: 5999,
    enrolledCount: 580,
  },
  {
    _id: 'ap-trb',
    title: 'AP TRB (Assistant Professor TRB - Govt Arts & Science)',
    description: 'Prestige coaching for Collegiate Education Assistant Professor recruitment in Physics. Deep postgraduate curriculum, research orientation, and interview guidance.',
    category: 'TRB Exams',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Sharma & Team',
    price: 6499,
    enrolledCount: 520,
  },
  {
    _id: 'tn-scert-trb',
    title: 'TN SCERT TRB Physics (Senior / DIET Lecturer)',
    description: 'Structured preparation for Tamil Nadu SCERT & DIET Lecturer recruitment examinations in Physics with pedagogy, curriculum methodology, and full-length model exams.',
    category: 'TRB Exams',
    level: 'Advanced',
    instructor: 'Tide Faculty Panel',
    price: 5499,
    enrolledCount: 430,
  },
  {
    _id: 'engg-trb',
    title: 'Engg. TRB Physics (Govt Engineering Colleges)',
    description: 'Targeted coaching for Tamil Nadu Government Engineering Colleges Lecturer recruitment in Physics. Advanced mathematical methods, electrodynamics, quantum physics, and thermodynamics.',
    category: 'TRB Exams',
    level: 'Advanced',
    instructor: 'Senior Engineering Physics Panel',
    price: 5999,
    enrolledCount: 490,
  },
  {
    _id: 'csir-net',
    title: 'CSIR - NET Physical Science (JRF & Lectureship)',
    description: 'National benchmark coaching for CSIR UGC-NET JRF in Physical Sciences. 350+ hours live classes covering Parts A, B, and C with full mock test series and printed study kits.',
    category: 'TN SET & CSIR-NET',
    level: 'Advanced',
    instructor: 'Prof. Ananya Sen (CSIR-NET AIR 3)',
    price: 6999,
    enrolledCount: 1120,
  },
  {
    _id: 'jee',
    title: 'JEE Physics (Main & Advanced Foundation & Ranker)',
    description: 'Conceptual intuition and rigorous numerical problem-solving for IIT-JEE Main & Advanced. In-depth HC Verma, Irodov, and 20-year PYQ mastery.',
    category: 'School & Competitive',
    level: 'Intermediate',
    instructor: 'IITian Physics Faculty',
    price: 4999,
    enrolledCount: 880,
  },
  {
    _id: 'neet',
    title: 'NEET Physics (Medical Entrance Score Booster 160+)',
    description: 'Master NEET Physics with line-by-line NCERT coverage, speed-solving tricks, formula handbooks, daily 50-MCQ sheets, and full-length OMR test simulation.',
    category: 'School & Competitive',
    level: 'Intermediate',
    instructor: 'Medical Physics Mentor',
    price: 4499,
    enrolledCount: 950,
  },
];

function CoursesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  const { showToast } = useToast();

  const [courses, setCourses] = useState<CourseItem[]>(FALLBACK_COURSES);
  const [loading, setLoading] = useState(false);

  // Read URL query params
  const initialCategory = searchParams.get('category') || 'All';
  const initialLevel = searchParams.get('level') || 'All';
  const initialSearch = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    courseApi.getAll()
      .then((res: unknown) => {
        let list: CourseItem[] = [];
        if (Array.isArray(res)) {
          list = res;
        } else if (res && typeof res === 'object') {
          const obj = res as Record<string, unknown>;
          if (Array.isArray(obj.courses)) list = obj.courses as CourseItem[];
          else if (Array.isArray(obj.data)) list = obj.data as CourseItem[];
          else if (obj.data && typeof obj.data === 'object') {
            const nested = obj.data as Record<string, unknown>;
            if (Array.isArray(nested.courses)) list = nested.courses as CourseItem[];
            else if (Array.isArray(nested.items)) list = nested.items as CourseItem[];
          }
        }
        if (list.length > 0) {
          const liveIds = new Set(list.map((c) => c._id));
          const merged = [...list, ...FALLBACK_COURSES.filter((f) => !liveIds.has(f._id))];
          setCourses(merged);
        } else {
          setCourses(FALLBACK_COURSES);
        }
      })
      .catch(() => {
        setCourses(FALLBACK_COURSES);
      })
      .finally(() => setLoading(false));
  }, []);

  // Update URL params smoothly
  const updateFilters = (cat: string, lvl: string, query: string) => {
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    if (lvl !== 'All') params.set('level', lvl);
    if (query.trim()) params.set('q', query.trim());
    router.replace(`/courses?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateFilters(cat, selectedLevel, searchTerm);
  };

  const handleLevelChange = (lvl: string) => {
    setSelectedLevel(lvl);
    updateFilters(selectedCategory, lvl, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateFilters(selectedCategory, selectedLevel, val);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearchTerm('');
    router.replace('/courses', { scroll: false });
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory =
        selectedCategory === 'All' ||
        (c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      const matchLevel =
        selectedLevel === 'All' ||
        (c.level && c.level.toLowerCase() === selectedLevel.toLowerCase());
      const matchQuery =
        !searchTerm.trim() ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchLevel && matchQuery;
    });
  }, [courses, selectedCategory, selectedLevel, searchTerm]);

  const handleEnrollClick = (courseId: string) => {
    if (!isSignedIn) {
      showToast('Please log in to enroll in courses', 'info');
      router.push(`/login?redirect=/student/courses/${courseId}`);
    } else {
      router.push(`/student/courses/${courseId}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <div className="section-tag">Explore Programs</div>
          <h1 className={styles.heroTitle}>Comprehensive Physics Course Catalog</h1>
          <p className={styles.heroSubtitle}>
            TIDE Physics Academy is a specialized coaching institute in Tamil Nadu (Tiruvannamalai) that prepares candidates for competitive recruitment exams conducted by the Teachers Recruitment Board (TRB) and other competitive bodies. They structure their curriculum around both Bachelor of Science (BSc) and Master of Science (MSc) level Physics syllabi to cater to different categories of teaching positions.
          </p>
        </div>
      </div>

      <div className={styles.container} style={{ paddingBottom: '4rem' }}>
        {/* Filter Controls */}
        <div className={styles.filtersBar}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title, quantum, classical mechanics, CSIR..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.chipRow}>
            <div className={styles.chips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.chip} ${selectedCategory === cat ? styles.chipActive : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={styles.levelSelectWrapper}>
              <Filter size={15} color="var(--text-secondary)" />
              <label htmlFor="courseLevelSelect" className="sr-only">Filter by Course Level</label>
              <select
                id="courseLevelSelect"
                name="courseLevel"
                aria-label="Filter by Course Level"
                value={selectedLevel}
                onChange={(e) => handleLevelChange(e.target.value)}
                className={styles.levelSelect}
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level: {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results summary */}
        <div className={styles.resultsMeta}>
          Showing <strong>{filteredCourses.length}</strong> courses
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchTerm) && (
            <button onClick={handleClearFilters} className={styles.clearBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              Reset Filters <X size={14} />
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className={styles.grid}>
            <SkeletonCard count={6} />
          </div>
        ) : filteredCourses.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={36} color="var(--primary-light)" />}
            title="No matching courses found"
            description="Try adjusting your search terms or clearing the selected category filters."
            actionLabel="Clear All Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <div className={styles.grid}>
            {filteredCourses.map((c) => (
              <CourseCard
                key={c._id}
                _id={c._id}
                title={c.title}
                description={c.description}
                category={c.category || 'Physics'}
                level={c.level || 'Intermediate'}
                instructor={c.instructor}
                enrolledCount={c.enrolledCount}
                href={`/courses/${c._id}`}
                showPricing={true}
                price={c.price}
                onEnroll={() => handleEnrollClick(c._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="flex-center" style={{ minHeight: '60vh', color: 'var(--text-secondary)' }}>Loading catalog...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
