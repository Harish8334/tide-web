// src/app/admin/exams/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { examApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { FileCheck2, BarChart2, Plus } from 'lucide-react';
import styles from './page.module.css';

interface ExamRow {
  id: string;
  title: string;
  courseTitle: string;
  duration: number;
  totalMarks: number;
  questionsCount: number;
  startDate: string;
  status: string;
}

const MOCK_EXAMS: ExamRow[] = [
  { id: '1', title: 'CSIR-NET Physical Sciences Full Mock 04', courseTitle: 'CSIR-NET Crash Course', duration: 180, totalMarks: 200, questionsCount: 50, startDate: '28 Oct 2026', status: 'Upcoming' },
  { id: '2', title: 'Quantum State Vectors & Operators Test', courseTitle: 'Advanced Quantum Mechanics', duration: 60, totalMarks: 50, questionsCount: 20, startDate: '20 Oct 2026', status: 'Active' },
  { id: '3', title: 'Relativistic Electrodynamics Mid-Term', courseTitle: 'Classical Electrodynamics', duration: 90, totalMarks: 100, questionsCount: 30, startDate: '15 Oct 2026', status: 'Completed' },
  { id: '4', title: 'Thermodynamics & Partition Functions Quiz', courseTitle: 'Statistical Mechanics', duration: 45, totalMarks: 30, questionsCount: 15, startDate: '10 Oct 2026', status: 'Completed' },
];

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamRow[]>(MOCK_EXAMS);
  const { showToast } = useToast();

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete exam "${title}"?`)) return;
    setExams(exams.filter((e) => e.id !== id));
    showToast(`Exam "${title}" deleted`, 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCheck2 size={24} color="#0056D2" /> Manage MCQ Exams &amp; Quizzes
        </h1>
        <Link href="/admin/exams/new" className={styles.createBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Create New Exam
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Course</th>
              <th>Duration</th>
              <th>Total Marks</th>
              <th>Questions</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((ex) => (
              <tr key={ex.id}>
                <td><strong>{ex.title}</strong></td>
                <td>{ex.courseTitle}</td>
                <td>{ex.duration} mins</td>
                <td>{ex.totalMarks} Marks</td>
                <td>{ex.questionsCount} MCQs</td>
                <td>{ex.startDate}</td>
                <td>
                  <span
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background:
                        ex.status === 'Active'
                          ? 'rgba(16,185,129,0.15)'
                          : ex.status === 'Upcoming'
                          ? 'rgba(245,158,11,0.15)'
                          : 'rgba(100,116,139,0.2)',
                      color:
                        ex.status === 'Active'
                          ? '#10B981'
                          : ex.status === 'Upcoming'
                          ? '#F59E0B'
                          : '#94A3B8',
                    }}
                  >
                    {ex.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <Link href={`/admin/exams/${ex.id}/stats`} className={styles.statsLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      Analytics <BarChart2 size={13} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ex.id, ex.title)}
                      className={styles.deleteBtn}
                      title="Delete Exam"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
