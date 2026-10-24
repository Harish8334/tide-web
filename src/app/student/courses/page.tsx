// src/app/student/courses/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { courseApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import CourseCard from '@/components/CourseCard';
import SkeletonCard from '@/components/SkeletonCard';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.css';
import { BookOpen, Search, CheckCircle, Clock } from 'lucide-react';

const CATEGORIES = ['All', 'M.Sc Physics', 'CSIR-NET/GATE', 'B.Ed & Pedagogy', 'Research & Lab'];

interface EnrolledCourse {
  _id: string;
  courseId?: {
    _id?: string;
    title?: string;
    description?: string;
    category?: string;
    level?: string;
    instructor?: { name?: string };
  };
  title?: string;
  category?: string;
  level?: string;
  status?: 'active' | 'pending' | 'completed';
  progress?: number;
}

interface CatalogCourse {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor?: { name?: string } | string;
  enrolledCount?: number;
}

const DEMO_ENROLLED: EnrolledCourse[] = [
  {
    _id: 'enr-1',
    title: 'M.Sc Physics — Core Advanced Classical Mechanics',
    category: 'M.Sc Physics',
    level: 'Advanced',
    status: 'active',
    progress: 45,
  },
  {
    _id: 'enr-2',
    title: 'CSIR-NET & GATE Physics Comprehensive Batch',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    status: 'pending',
    progress: 10,
  },
];

const DEFAULT_CATALOG: CatalogCourse[] = [
  {
    _id: 'c1',
    title: 'Advanced Quantum Mechanics Masterclass',
    description: 'Schrödinger equation in 3D, angular momentum algebra, and perturbation theory.',
    category: 'M.Sc Physics',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Sharma',
    enrolledCount: 342,
  },
  {
    _id: 'c2',
    title: 'Classical Electrodynamics & Tensor Calculus',
    description: 'Maxwell equations in tensor notation, relativistic kinematics, and radiation.',
    category: 'M.Sc Physics',
    level: 'Advanced',
    instructor: 'Dr. Vikram Malhotra',
    enrolledCount: 420,
  },
  {
    _id: 'c3',
    title: 'CSIR-NET Physical Sciences Comprehensive JRF Batch',
    description: 'Complete syllabus with rigorous previous year question solving and mock tests.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    instructor: 'Prof. Ananya Sen',
    enrolledCount: 680,
  },
  {
    _id: 'c4',
    title: 'B.Ed Physics Pedagogy & Demonstrations',
    description: 'Modern pedagogical methodologies, active learning models, and curriculum structuring.',
    category: 'B.Ed & Pedagogy',
    level: 'Intermediate',
    instructor: 'Faculty Council',
    enrolledCount: 155,
  },
  {
    _id: 'c5',
    title: 'GATE Physics Intensive Ranker Program',
    description: 'High-yield problem solving, virtual calculator shortcuts, and test analytics.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    instructor: 'Dr. Rajesh Sharma',
    enrolledCount: 512,
  },
];

function toArray<T>(val: unknown): T[] {
  if (!val) return [];
  if (Array.isArray(val)) return val as T[];
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    if (Array.isArray(obj.courses)) return obj.courses as T[];
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (obj.data && typeof obj.data === 'object') {
      const nested = obj.data as Record<string, unknown>;
      if (Array.isArray(nested.courses)) return nested.courses as T[];
      if (Array.isArray(nested.items)) return nested.items as T[];
      if (Array.isArray(nested.data)) return nested.data as T[];
    }
  }
  return [];
}

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'enrolled' | 'browse'>('enrolled');
  const [enrolledList, setEnrolledList] = useState<EnrolledCourse[]>(DEMO_ENROLLED);
  const [catalogList, setCatalogList] = useState<CatalogCourse[]>(DEFAULT_CATALOG);
  const [enrolledLoading, setEnrolledLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  // Load enrolled courses
  useEffect(() => {
    courseApi.getEnrolled()
      .then((res: unknown) => {
        const list = toArray<EnrolledCourse>(res);
        if (list.length > 0) {
          setEnrolledList(list);
        } else {
          setEnrolledList(DEMO_ENROLLED);
        }
      })
      .catch(() => {
        setEnrolledList(DEMO_ENROLLED);
      })
      .finally(() => setEnrolledLoading(false));
  }, []);

  // Load catalog courses
  useEffect(() => {
    courseApi.getAll()
      .then((res: unknown) => {
        const list = toArray<CatalogCourse>(res);
        if (list.length > 0) {
          setCatalogList(list);
        } else {
          setCatalogList(DEFAULT_CATALOG);
        }
      })
      .catch(() => {
        setCatalogList(DEFAULT_CATALOG);
      })
      .finally(() => setCatalogLoading(false));
  }, []);

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    try {
      await courseApi.enroll(courseId);
      showToast('Enrollment request submitted! Pending admin approval.', 'success');
      const safeCatalog = Array.isArray(catalogList) ? catalogList : DEFAULT_CATALOG;
      // Update local state to reflect pending enrollment
      setEnrolledList((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          _id: `enr-${Date.now()}`,
          title: safeCatalog.find((c) => c._id === courseId)?.title || 'Physics Program',
          category: safeCatalog.find((c) => c._id === courseId)?.category,
          status: 'pending',
          progress: 0,
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Enrollment failed';
      showToast(msg, 'error');
    } finally {
      setEnrollingId(null);
    }
  };

  const safeCatalog = Array.isArray(catalogList) ? catalogList : DEFAULT_CATALOG;
  const filteredCatalog = safeCatalog.filter((c) => {
    if (!c || typeof c !== 'object') return false;
    const matchCat = categoryFilter === 'All' || (c.category && c.category.includes(categoryFilter));
    const matchSearch =
      !searchQuery.trim() ||
      (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Courses &amp; Programs</h1>
          <p className={styles.subtitle}>
            Manage your active study modules, lecture schedules, and discover upcoming physics batches.
          </p>
        </div>

        <div className={styles.tabSwitch}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'enrolled' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('enrolled')}
          >
            Enrolled Courses ({enrolledList.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'browse' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse All Courses
          </button>
        </div>
      </div>

      {/* ENROLLED TAB */}
      {activeTab === 'enrolled' && (
        <section className={styles.section}>
          {enrolledLoading ? (
            <div className={styles.grid}>
              <SkeletonCard count={3} />
            </div>
          ) : enrolledList.length === 0 ? (
            <EmptyState
              icon={<BookOpen size={40} color="var(--primary-light)" />}
              title="You haven't enrolled in any courses yet"
              description="Browse our course catalog to find the right physics preparation batch for you."
              actionLabel="Explore Catalog"
              onAction={() => setActiveTab('browse')}
            />
          ) : (
            <div className={styles.enrolledGrid}>
              {enrolledList.map((item) => {
                const title = item.title || item.courseId?.title || 'Physics Course';
                const courseId = item.courseId?._id || item._id;
                const category = item.category || item.courseId?.category || 'Physics';
                const isPending = item.status === 'pending';
                const progress = item.progress || 0;

                return (
                  <div key={item._id} className={styles.enrolledCard}>
                    <div className={styles.cardTop}>
                      <span className={styles.catBadge}>{category}</span>
                      {isPending ? (
                        <span className={styles.pendingBadge}>
                          <Clock size={12} /> Pending Approval
                        </span>
                      ) : (
                        <span className={styles.activeBadge}>
                          <CheckCircle size={12} /> Active
                        </span>
                      )}
                    </div>

                    <h3 className={styles.courseTitle}>{title}</h3>

                    <div className={styles.progressContainer}>
                      <div className={styles.progressHeader}>
                        <span>Syllabus Progress</span>
                        <strong>{progress}%</strong>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      {isPending ? (
                        <button className="btn btn-ghost btn-sm" disabled>
                          Awaiting Verification
                        </button>
                      ) : (
                        <Link href={`/student/courses/${courseId}`} className="btn btn-primary btn-full">
                          Continue Learning →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* BROWSE ALL TAB */}
      {activeTab === 'browse' && (
        <section className={styles.section}>
          <div className={styles.catalogFilterBar}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search quantum, mechanics, net prep..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.categoryChips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.chip} ${categoryFilter === cat ? styles.chipActive : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {catalogLoading ? (
            <div className={styles.grid}>
              <SkeletonCard count={6} />
            </div>
          ) : filteredCatalog.length === 0 ? (
            <EmptyState
              icon={<Search size={36} color="var(--text-muted)" />}
              title="No courses matched your search"
              description="Try adjusting your filter category or keywords."
              actionLabel="Reset Search"
              onAction={() => {
                setCategoryFilter('All');
                setSearchQuery('');
              }}
            />
          ) : (
            <div className={styles.grid}>
              {filteredCatalog.map((c) => {
                const isAlreadyEnrolled = enrolledList.some(
                  (e) => (e.courseId?._id || e._id) === c._id
                );

                return (
                  <CourseCard
                    key={c._id}
                    _id={c._id}
                    title={c.title}
                    description={c.description}
                    category={c.category || 'Physics'}
                    level={c.level || 'Intermediate'}
                    instructor={c.instructor}
                    enrolledCount={c.enrolledCount}
                    isEnrolled={isAlreadyEnrolled}
                    onEnroll={() => handleEnroll(c._id)}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
