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

const CATEGORIES = ['All', 'M.Sc Physics', 'CSIR-NET/GATE', 'B.Ed & Pedagogy', 'Research & Lab'];
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
    _id: 'c1',
    title: 'Advanced Quantum Mechanics',
    description: 'Schrödinger equation in 3D, angular momentum algebra, identical particles, and time-independent perturbation theory.',
    category: 'M.Sc Physics',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Sharma',
    enrolledCount: 342,
  },
  {
    _id: 'c2',
    title: 'Classical Electrodynamics',
    description: 'Maxwell equations in tensor notation, relativistic kinematics, radiation by moving charges, and wave guides.',
    category: 'M.Sc Physics',
    level: 'Advanced',
    instructor: 'Dr. Vikram Malhotra',
    enrolledCount: 420,
  },
  {
    _id: 'c3',
    title: 'CSIR-NET Physical Sciences Comprehensive',
    description: 'Complete syllabus with rigorous previous year question solving, full-length mock tests, and doubt sessions.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    instructor: 'Prof. Ananya Sen',
    enrolledCount: 680,
  },
  {
    _id: 'c4',
    title: 'B.Ed Physics Pedagogy & Practical Demonstrations',
    description: 'Modern pedagogical methodologies, active learning models, curriculum structuring, and micro-teaching practices.',
    category: 'B.Ed & Pedagogy',
    level: 'Intermediate',
    instructor: 'Faculty Council',
    enrolledCount: 155,
  },
  {
    _id: 'c5',
    title: 'Core Classical Mechanics & Special Relativity',
    description: 'Lagrangian and Hamiltonian dynamics, canonical transformations, Hamilton-Jacobi theory, and relativistic kinematics.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Sharma',
    enrolledCount: 490,
  },
  {
    _id: 'c6',
    title: 'Modern Physics Lab Simulations & Research Methods',
    description: 'Hands-on virtual lab training in Millikan oil drop, Franck-Hertz, Zeeman effect, and computational data fitting.',
    category: 'Research & Lab',
    level: 'Beginner',
    instructor: 'Dr. Vikram Malhotra',
    enrolledCount: 180,
  },
];

function CoursesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  const { showToast } = useToast();

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

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
            From university semester examinations to India&apos;s toughest national entrances — curated by India&apos;s leading Physics faculty.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
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
                href={`/courses`}
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
