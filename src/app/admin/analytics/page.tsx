// src/app/admin/analytics/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { useToast } from '@/context/ToastContext';
import { TrendingUp, Download, Target, Trophy, CalendarCheck, Lightbulb, AlertTriangle } from 'lucide-react';
import styles from '../dashboard/page.module.css';

const STUDENTS = [
  { id: '1', name: 'Arjun Verma', email: 'arjun@physics.iitb.ac.in', batch: 'Alpha 2026 CSIR' },
  { id: '2', name: 'Priya Sharma', email: 'priya.sharma@du.ac.in', batch: 'Beta Cohort' },
  { id: '3', name: 'Rohan Mehra', email: 'rohan.mehra@iisc.ac.in', batch: 'Gamma Intensive' },
];

const STUDENT_TRENDS: Record<string, any[]> = {
  '1': [
    { exam: 'Mock 01', score: 72 },
    { exam: 'Mock 02', score: 78 },
    { exam: 'Mock 03', score: 85 },
    { exam: 'Mock 04', score: 94 },
  ],
  '2': [
    { exam: 'Mock 01', score: 65 },
    { exam: 'Mock 02', score: 74 },
    { exam: 'Mock 03', score: 82 },
    { exam: 'Mock 04', score: 88 },
  ],
  '3': [
    { exam: 'Mock 01', score: 70 },
    { exam: 'Mock 02', score: 71 },
    { exam: 'Mock 03', score: 79 },
    { exam: 'Mock 04', score: 82 },
  ],
};

const MISSED_TOPICS = [
  { topic: 'Stark Splitting', count: 6 },
  { topic: 'Dirac Matrices', count: 5 },
  { topic: 'Poynting Flux', count: 4 },
  { topic: 'Bose Condensation', count: 3 },
  { topic: 'Lagrangian Gauge', count: 2 },
];

export default function AdminAnalyticsPage() {
  const [selectedStudentId, setSelectedStudentId] = useState('1');
  const [mounted, setMounted] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentStudent = STUDENTS.find((s) => s.id === selectedStudentId) || STUDENTS[0];
  const trendData = STUDENT_TRENDS[selectedStudentId] || STUDENT_TRENDS['1'];

  const handleDownloadReport = () => {
    showToast(`Generating Academic Performance Dossier for ${currentStudent.name}...`, 'info');
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={24} color="#0056D2" /> Student Diagnostic Analytics
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            Deep-dive into individual student test trajectory and conceptual weak-points.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            style={{
              padding: '0.65rem 1rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            {STUDENTS.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name} ({st.batch})
              </option>
            ))}
          </select>

          <button
            onClick={handleDownloadReport}
            style={{
              padding: '0.65rem 1.25rem',
              background: 'var(--color-primary)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Download size={14} /> Export Report PDF
          </button>
        </div>
      </div>

      {/* 4 Metric Chips */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statIcon}><Target size={22} color="#38BDF8" /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>88.4%</div>
            <div className={styles.statLabel}>Cumulative Average</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statIcon}><Trophy size={22} color="#10B981" /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>#1</div>
            <div className={styles.statLabel}>Current Batch Rank</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardAmber}`}>
          <div className={styles.statIcon}><CalendarCheck size={22} color="#F59E0B" /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>94.2%</div>
            <div className={styles.statLabel}>Live Attendance Rate</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardPurple}`}>
          <div className={styles.statIcon}><Lightbulb size={22} color="#A855F7" /></div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>14</div>
            <div className={styles.statLabel}>Doubts Resolved</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <TrendingUp size={16} color="#0056D2" /> Performance Progression Trend: {currentStudent.name}
          </div>
          <div className={styles.chartBody}>
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis dataKey="exam" stroke="#64748B" fontSize={12} />
                  <YAxis domain={[50, 100]} stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E2D40', borderColor: '#334155', color: '#F8FAFC' }} />
                  <Line type="monotone" dataKey="score" stroke="#0056D2" strokeWidth={3} dot={{ r: 6, fill: '#38BDF8' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div>Loading chart...</div>
            )}
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={16} color="#F59E0B" /> Most Frequent Conceptual Slip-ups
          </div>
          <div className={styles.chartBody}>
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MISSED_TOPICS} layout="vertical">
                  <XAxis type="number" stroke="#64748B" fontSize={12} />
                  <YAxis type="category" dataKey="topic" stroke="#64748B" fontSize={11} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1E2D40', borderColor: '#334155', color: '#F8FAFC' }} />
                  <Bar dataKey="count" fill="#EF4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div>Loading chart...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
