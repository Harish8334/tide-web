// src/app/student/mistakes/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import styles from './page.module.css';
import { BookMarked, Play, RotateCcw, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface MistakeItem {
  id: string;
  course: string;
  exam: string;
  question: string;
  myAnswer: string;
  correctAnswer: string;
  explanation: string;
}

const DEMO_MISTAKES: MistakeItem[] = [
  {
    id: 'm1',
    course: 'Quantum Mechanics',
    exam: 'Assessment 1: Operators',
    question: 'In a canonical ensemble, the partition function Z is related to Helmholtz free energy F by:',
    myAnswer: 'B: F = k_B T ln(Z)',
    correctAnswer: 'A: F = -k_B T ln(Z)',
    explanation: 'Thermodynamic definition of free energy: F = U - TS = -k_B T ln(Z). Notice the critical negative sign.',
  },
  {
    id: 'm2',
    course: 'Electrodynamics',
    exam: 'Midterm Examination',
    question: 'What is the divergence of the magnetic B-field across a boundary separating two magnetic media?',
    myAnswer: 'C: Equal to free surface current density',
    correctAnswer: 'D: Always strictly zero (continuous B_normal)',
    explanation: 'From Gauss’s law for magnetism ∇·B = 0, the normal component of B is always continuous across any interface (B1_n = B2_n).',
  },
  {
    id: 'm3',
    course: 'Quantum Mechanics',
    exam: 'Assessment 2: Angular Momentum',
    question: 'For a particle in state |j, m⟩, the expectation value ⟨J_x⟩ is:',
    myAnswer: 'B: ℏ √[j(j+1)]',
    correctAnswer: 'A: 0',
    explanation: 'Since J_x = (J+ + J-)/2, its action on |j, m⟩ produces orthogonal states |j, m±1⟩, whose inner product with ⟨j, m| vanishes identically.',
  },
];

export default function MistakeNotebookPage() {
  const { showToast } = useToast();
  const [courseFilter, setCourseFilter] = useState('All');
  const [practicingId, setPracticingId] = useState<string | null>(null);

  const filtered = DEMO_MISTAKES.filter(
    (m) => courseFilter === 'All' || m.course === courseFilter
  );

  const handlePractice = (mId: string) => {
    setPracticingId(mId);
    showToast('Starting focused re-quiz on this question...', 'info');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <BookMarked size={14} color="var(--primary-light)" /> Self-Correction Engine
          </div>
          <h1 className={styles.title}>Student Mistake Notebook</h1>
          <p className={styles.subtitle}>
            Every incorrectly answered exam question is cataloged with step-by-step physical derivations.
          </p>
        </div>

        <div className={styles.filterBox}>
          <label className={styles.filterLabel}>Filter by Subject:</label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="All">All Courses ({DEMO_MISTAKES.length})</option>
            <option value="Quantum Mechanics">Quantum Mechanics</option>
            <option value="Electrodynamics">Electrodynamics</option>
          </select>
        </div>
      </div>

      <div className={styles.cardsList}>
        {filtered.map((item) => (
          <div key={item.id} className={styles.mistakeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.courseTagGroup}>
                <span className={styles.courseTag}>{item.course}</span>
                <span className={styles.examTag}>{item.exam}</span>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handlePractice(item.id)}
              >
                <RotateCcw size={14} /> Practice Again
              </button>
            </div>

            <p className={styles.questionText}>{item.question}</p>

            <div className={styles.answersSplit}>
              <div className={styles.wrongBox}>
                <div className={styles.boxTitle}>
                  <XCircle size={15} color="var(--error)" />
                  <span>Your Submitted Choice:</span>
                </div>
                <div className={styles.answerText}>{item.myAnswer}</div>
              </div>

              <div className={styles.correctBox}>
                <div className={styles.boxTitle}>
                  <CheckCircle2 size={15} color="var(--success)" />
                  <span>Correct Answer:</span>
                </div>
                <div className={styles.answerText}>{item.correctAnswer}</div>
              </div>
            </div>

            <div className={styles.explanationBox}>
              <div className={styles.expHeader}>
                <Lightbulb size={16} color="var(--accent)" />
                <strong>Concept Derivation &amp; Pitfall Analysis:</strong>
              </div>
              <p>{item.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
