// src/app/admin/live-classes/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { liveClassApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Video, Mic, Square, Play, Trash2, Plus } from 'lucide-react';
import styles from './page.module.css';

interface LiveClassRow {
  id: string;
  title: string;
  batchName: string;
  instructor: string;
  scheduledAt: string;
  duration: number;
  status: 'upcoming' | 'live' | 'completed';
}

const MOCK_CLASSES: LiveClassRow[] = [
  { id: '1', title: 'Perturbation Theory & Zeeman Effect Live Seminar', batchName: 'Alpha 2026 CSIR Batch', instructor: 'Dr. Vikram Raman', scheduledAt: 'Today @ 18:00 IST', duration: 90, status: 'live' },
  { id: '2', title: 'Maxwell Equations in Tensor Formulation', batchName: 'Gamma Electrodynamics Cohort', instructor: 'Prof. Anjali Desai', scheduledAt: 'Tomorrow @ 17:30 IST', duration: 60, status: 'upcoming' },
  { id: '3', title: 'Ensemble Theory & Microcanonical Partitions', batchName: 'Delta Research Scholars', instructor: 'Dr. Sandeep Ghosh', scheduledAt: 'Friday @ 19:00 IST', duration: 75, status: 'upcoming' },
  { id: '4', title: 'Hydrogen Atom Exact Wavefunctions', batchName: 'Alpha 2026 CSIR Batch', instructor: 'Dr. Vikram Raman', scheduledAt: '22 Oct 2026', duration: 90, status: 'completed' },
];

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClassRow[]>(MOCK_CLASSES);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');
  const { showToast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await liveClassApi.getAll();
        if (Array.isArray(res) && res.length > 0) {
          const mapped = res.map((c: any) => ({
            id: c.id || c._id,
            title: c.title,
            batchName: c.batch?.name || 'Open Batch',
            instructor: c.instructor?.fullName || 'Faculty',
            scheduledAt: new Date(c.scheduledAt).toLocaleString(),
            duration: c.duration || 60,
            status: c.status || 'upcoming',
          }));
          setClasses(mapped);
        }
      } catch {
        // Fallback to mock
      }
    }
    loadData();
  }, []);

  const filtered = classes.filter((c) => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  const handleStartClass = async (id: string, title: string) => {
    try {
      await liveClassApi.start(id);
    } catch {}
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'live' } : c)));
    showToast(`Live Class "${title}" is now broadcasting!`, 'success');
  };

  const handleEndClass = async (id: string, title: string) => {
    try {
      await liveClassApi.end(id);
    } catch {}
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'completed' } : c)));
    showToast(`Broadcasting ended for "${title}"`, 'info');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this scheduled class?')) return;
    setClasses(classes.filter((c) => c.id !== id));
    showToast('Class removed', 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Video size={24} color="#0056D2" /> Manage Live Virtual Classes
        </h1>
        <Link href="/admin/live-classes/new" className={styles.scheduleBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Schedule Live Class
        </Link>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab('all')}
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
        >
          All ({classes.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`${styles.tabBtn} ${activeTab === 'live' ? styles.tabBtnActive : ''}`}
        >
          Live Now ({classes.filter((c) => c.status === 'live').length})
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.tabBtnActive : ''}`}
        >
          Upcoming ({classes.filter((c) => c.status === 'upcoming').length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.tabBtnActive : ''}`}
        >
          Past / Completed ({classes.filter((c) => c.status === 'completed').length})
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Class Title</th>
              <th>Batch</th>
              <th>Instructor</th>
              <th>Schedule</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.title}</strong></td>
                <td>{c.batchName}</td>
                <td>{c.instructor}</td>
                <td>{c.scheduledAt}</td>
                <td>{c.duration} mins</td>
                <td>
                  {c.status === 'live' ? (
                    <span className={styles.liveBadge}>
                      <span className={styles.pulseDot} />
                      LIVE NOW
                    </span>
                  ) : c.status === 'upcoming' ? (
                    <span style={{ color: '#F59E0B', fontWeight: 600 }}>Upcoming</span>
                  ) : (
                    <span style={{ color: '#94A3B8' }}>Completed</span>
                  )}
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    {c.status === 'live' && (
                      <>
                        <Link href={`/admin/live-classes/${c.id}/host`} className={styles.hostBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          Host Studio <Mic size={14} />
                        </Link>
                        <button
                          onClick={() => handleEndClass(c.id, c.title)}
                          className={styles.iconBtn}
                          style={{ color: '#EF4444' }}
                          title="End Broadcast"
                        >
                          <Square size={14} />
                        </button>
                      </>
                    )}

                    {c.status === 'upcoming' && (
                      <>
                        <button
                          onClick={() => handleStartClass(c.id, c.title)}
                          className={styles.hostBtn}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                          title="Start Broadcasting"
                        >
                          Start <Play size={13} fill="currentColor" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className={styles.iconBtn} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}

                    {c.status === 'completed' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Recorded</span>
                    )}
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
