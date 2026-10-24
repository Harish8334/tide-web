// src/app/student/exams/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { examApi, courseApi } from '@/lib/api';
import ExamCard from '@/components/ExamCard';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.css';
import { Award, FileText, CheckCircle, Clock } from 'lucide-react';

interface ExamItem {
  _id: string;
  title: string;
  courseTitle?: string;
  duration: number;
  totalMarks: number;
  startDate?: string;
  isAttempted?: boolean;
  score?: number;
}

const DEMO_EXAMS: ExamItem[] = [
  {
    _id: 'ex-101',
    title: 'CSIR-NET Physics Grand Mock Test 1 (Full Syllabus)',
    courseTitle: 'CSIR-NET JRF Super 30',
    duration: 180,
    totalMarks: 200,
    isAttempted: false,
  },
  {
    _id: 'ex-102',
    title: 'Unit Assessment: Angular Momentum & Spin Selection Rules',
    courseTitle: 'M.Sc Quantum Mechanics',
    duration: 60,
    totalMarks: 100,
    isAttempted: true,
    score: 88,
  },
  {
    _id: 'ex-103',
    title: 'Electrodynamics & Relativity Mid-Term Examination',
    courseTitle: 'GATE Physics Target 2026',
    duration: 90,
    totalMarks: 100,
    isAttempted: true,
    score: 72,
  },
  {
    _id: 'ex-104',
    title: 'GATE 2026 Physics National Rank Booster Simulation',
    courseTitle: 'GATE Physics Target 2026',
    duration: 180,
    totalMarks: 100,
    startDate: '2026-11-20T09:00:00Z',
    isAttempted: false,
  },
];

export default function StudentExamsPage() {
  const router = useRouter();
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'ready' | 'completed'>('all');

  useEffect(() => {
    courseApi.getEnrolled()
      .then(async (enrolledRes: unknown) => {
        const enrolled = (enrolledRes as { data?: { courseId?: { _id?: string } }[] }).data || [];
        if (enrolled.length > 0) {
          const promises = enrolled.map((c) =>
            examApi.getByCourse(c.courseId?._id || '').catch(() => ({ data: [] }))
          );
          const results = await Promise.all(promises);
          const merged = results.flatMap((r: unknown) => (r as { data?: ExamItem[] }).data || []);
          if (merged.length > 0) {
            setExams(merged);
            return;
          }
        }
        setExams(DEMO_EXAMS);
      })
      .catch(() => {
        setExams(DEMO_EXAMS);
      })
      .finally(() => setLoading(false));
  }, []);

  const readyExams = exams.filter((e) => !e.isAttempted && (!e.startDate || new Date(e.startDate).getTime() <= Date.now()));
  const completedExams = exams.filter((e) => e.isAttempted);

  const filteredExams = exams.filter((e) => {
    if (activeTab === 'ready') return !e.isAttempted;
    if (activeTab === 'completed') return e.isAttempted;
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag">Assessment Center</div>
          <h1 className={styles.title}>MCQ Examination Portal</h1>
          <p className={styles.subtitle}>
            Practice auto-graded mock examinations, track accuracy, and review step-by-step solutions.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className={styles.statsSummary}>
          <div className={styles.statChip}>
            <Clock size={14} color="var(--primary-light)" />
            <span>Ready: <strong>{readyExams.length}</strong></span>
          </div>
          <div className={styles.statChip}>
            <CheckCircle size={14} color="var(--success)" />
            <span>Completed: <strong>{completedExams.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Exams ({exams.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'ready' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('ready')}
        >
          Ready to Attempt ({readyExams.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedExams.length})
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <Loader text="Loading test series..." />
      ) : filteredExams.length === 0 ? (
        <EmptyState
          icon={<Award size={40} color="var(--primary-light)" />}
          title="No exams in this category"
          description="Check your enrolled courses or review previously submitted tests."
          actionLabel="View All Tests"
          onAction={() => setActiveTab('all')}
        />
      ) : (
        <div className={styles.grid}>
          {filteredExams.map((ex) => (
            <ExamCard
              key={ex._id}
              id={ex._id}
              title={ex.title}
              courseTitle={ex.courseTitle}
              duration={ex.duration}
              totalMarks={ex.totalMarks}
              startDate={ex.startDate}
              isAttempted={ex.isAttempted}
              score={ex.score}
              onAttempt={() => router.push(`/student/exams/${ex._id}/attempt`)}
              onViewResult={() => router.push(`/student/exams/${ex._id}/result`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
