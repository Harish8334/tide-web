// src/app/admin/dpp/page.tsx
'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { BookOpen, Plus } from 'lucide-react';
import styles from '../students/page.module.css';

interface DPPItem {
  id: string;
  title: string;
  course: string;
  batch: string;
  date: string;
  questionsCount: number;
  isPublished: boolean;
}

const INITIAL_DPP: DPPItem[] = [
  { id: '1', title: 'DPP-14: Angular Momentum Operators & Commutators', course: 'Advanced Quantum Mechanics', batch: 'Alpha 2026 CSIR', date: '24 Oct 2026', questionsCount: 5, isPublished: true },
  { id: '2', title: 'DPP-15: First-Order Perturbation in 1D Harmonic Potential', course: 'Advanced Quantum Mechanics', batch: 'Alpha 2026 CSIR', date: '25 Oct 2026', questionsCount: 5, isPublished: true },
  { id: '3', title: 'DPP-08: Poynting Vector & Energy Flux Radiation', course: 'Classical Electrodynamics', batch: 'Gamma Cohort', date: '26 Oct 2026', questionsCount: 6, isPublished: false },
  { id: '4', title: 'DPP-09: Maxwell Stress Tensor in Dielectric Boundary', course: 'Classical Electrodynamics', batch: 'Gamma Cohort', date: '27 Oct 2026', questionsCount: 5, isPublished: false },
];

export default function AdminDPPPage() {
  const [dpps, setDpps] = useState<DPPItem[]>(INITIAL_DPP);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Advanced Quantum Mechanics');
  const [batch, setBatch] = useState('Alpha 2026 CSIR');
  const [questionsCount, setQuestionsCount] = useState('5');
  const { showToast } = useToast();

  const handleTogglePublish = (id: string) => {
    setDpps((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isPublished: !d.isPublished } : d))
    );
    showToast('DPP status updated!', 'info');
  };

  const handleDelete = (id: string) => {
    setDpps(dpps.filter((d) => d.id !== id));
    showToast('DPP removed', 'info');
  };

  const handleCreateDPP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newItem: DPPItem = {
      id: String(Date.now()),
      title,
      course,
      batch,
      date: 'Today',
      questionsCount: Number(questionsCount) || 5,
      isPublished: true,
    };

    setDpps([newItem, ...dpps]);
    showToast('Daily Practice Problem set published to students!', 'success');
    setShowModal(false);
    setTitle('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={24} color="#0056D2" /> Daily Practice Problems (DPP) Management
        </h1>
        <button onClick={() => setShowModal(true)} className={styles.iconBtn} style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Create New DPP
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>DPP Title</th>
              <th>Course / Discipline</th>
              <th>Target Batch</th>
              <th>Scheduled Date</th>
              <th>Problems</th>
              <th>Publish Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dpps.map((d) => (
              <tr key={d.id}>
                <td><strong>{d.title}</strong></td>
                <td>{d.course}</td>
                <td style={{ color: '#38BDF8' }}>{d.batch}</td>
                <td>{d.date}</td>
                <td>{d.questionsCount} Questions</td>
                <td>
                  <button
                    onClick={() => handleTogglePublish(d.id)}
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: d.isPublished ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.2)',
                      color: d.isPublished ? '#10B981' : '#94A3B8',
                    }}
                  >
                    {d.isPublished ? 'LIVE / PUBLISHED' : 'DRAFT'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(d.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create New DPP Sheet</h2>
            <form onSubmit={handleCreateDPP} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>DPP Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DPP-16: Fine Structure of Hydrogen & Relativistic Correction"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="Advanced Quantum Mechanics">Advanced Quantum Mechanics</option>
                  <option value="Classical Electrodynamics">Classical Electrodynamics</option>
                  <option value="Statistical Mechanics">Statistical Mechanics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="Alpha 2026 CSIR">Alpha 2026 CSIR</option>
                  <option value="Beta Cohort">Beta Cohort</option>
                  <option value="Gamma Cohort">Gamma Cohort</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Number of Problems</label>
                <input
                  type="number"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1.25rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '6px', fontWeight: 600 }}
                >
                  Publish DPP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
