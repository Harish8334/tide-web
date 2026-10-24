// src/app/admin/exams/[id]/stats/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { BarChart2, Target } from 'lucide-react';
import styles from '../../page.module.css';

const SCORE_HISTOGRAM = [
  { range: '0-20%', count: 3 },
  { range: '21-40%', count: 7 },
  { range: '41-60%', count: 18 },
  { range: '61-80%', count: 42 },
  { range: '81-100%', count: 26 },
];

const QUESTION_ANALYSIS = [
  { id: 'Q1', text: 'First-order correction to energy in V\' = λx³ (Odd parity theorem)', correctPct: 88, difficulty: 'Easy' },
  { id: 'Q2', text: 'Commutator [L_x, L_y] in orbital angular momentum algebra', correctPct: 92, difficulty: 'Easy' },
  { id: 'Q3', text: 'Linear Stark effect splitting for n=2 hydrogen state', correctPct: 54, difficulty: 'Hard' },
  { id: 'Q4', text: 'Variational ground state trial wavefunction optimization', correctPct: 62, difficulty: 'Medium' },
  { id: 'Q5', text: 'Relativistic Dirac matrix trace theorem Tr(γ^μ γ^ν)', correctPct: 41, difficulty: 'Hard' },
];

const STUDENT_RESULTS = [
  { id: '1', name: 'Arjun Verma', score: 94, total: 100, timeTaken: '48 mins', status: 'Passed (Rank 1)' },
  { id: '2', name: 'Priya Sharma', score: 88, total: 100, timeTaken: '52 mins', status: 'Passed (Rank 2)' },
  { id: '3', name: 'Rohan Mehra', score: 82, total: 100, timeTaken: '56 mins', status: 'Passed (Rank 3)' },
  { id: '4', name: 'Ananya Roy', score: 74, total: 100, timeTaken: '60 mins', status: 'Passed' },
  { id: '5', name: 'Kavita Joshi', score: 48, total: 100, timeTaken: '58 mins', status: 'Needs Review' },
];

export default function AdminExamStatsPage() {
  const params = useParams();
  const examId = params?.id as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <Link href="/admin/exams" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Exams List
          </Link>
          <h1 className={styles.title} style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={24} color="#0056D2" /> Exam Analytics: Quantum Mechanics Mid-Semester
          </h1>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>AVERAGE SCORE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38BDF8' }}>74.8%</div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.25rem' }}>+6.2% vs previous cohort</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>HIGHEST SCORE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10B981' }}>98.0%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Arjun Verma</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>PASS RATE</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F59E0B' }}>89.6%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Threshold: 50%</div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>TOTAL CANDIDATES</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#8B5CF6' }}>96</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Submissions evaluated</div>
        </div>
      </div>

      {/* Score Histogram */}
      <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
          Histogram: Score Distribution Across Candidates
        </h3>
        <div style={{ height: '240px', width: '100%' }}>
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCORE_HISTOGRAM}>
                <XAxis dataKey="range" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1E2D40', borderColor: '#334155', color: '#F8FAFC' }} />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              Loading histogram...
            </div>
          )}
        </div>
      </div>

      {/* Per-Question Analysis */}
      <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Target size={18} color="#0056D2" /> Per-Question Concept Breakdown &amp; Pitfalls
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {QUESTION_ANALYSIS.map((q) => (
            <div
              key={q.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--color-surface-hover)',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                gap: '1rem',
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 700, color: '#38BDF8', marginRight: '0.5rem' }}>{q.id}:</span>
                <span style={{ fontSize: '0.9rem' }}>{q.text}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 700, color: q.correctPct > 70 ? '#10B981' : q.correctPct > 50 ? '#F59E0B' : '#EF4444' }}>
                  {q.correctPct}% Success
                </span>
                <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>
                  {q.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Results Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Time Taken</th>
              <th>Result Status</th>
            </tr>
          </thead>
          <tbody>
            {STUDENT_RESULTS.map((st) => (
              <tr key={st.id}>
                <td><strong>{st.name}</strong></td>
                <td>{st.score} / {st.total}</td>
                <td style={{ fontWeight: 700, color: st.score >= 80 ? '#10B981' : '#F59E0B' }}>
                  {((st.score / st.total) * 100).toFixed(0)}%
                </td>
                <td>{st.timeTaken}</td>
                <td>{st.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
