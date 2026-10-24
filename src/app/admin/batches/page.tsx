// src/app/admin/batches/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { batchApi, courseApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Layers, User, Clock, Plus } from 'lucide-react';
import styles from './page.module.css';

interface BatchItem {
  id: string;
  name: string;
  courseTitle: string;
  instructor: string;
  schedule: string;
  studentsCount: number;
  maxStudents: number;
}

const MOCK_BATCHES: BatchItem[] = [
  { id: '1', name: 'Alpha 2026 CSIR-NET Batch', courseTitle: 'CSIR-NET Physical Sciences Crash Course', instructor: 'Dr. Vikram Raman', schedule: 'Mon, Wed, Fri @ 18:00', studentsCount: 42, maxStudents: 50 },
  { id: '2', name: 'Beta M.Sc Quantum Cohort', courseTitle: 'Advanced Quantum Mechanics', instructor: 'Dr. Vikram Raman', schedule: 'Tue, Thu, Sat @ 17:00', studentsCount: 35, maxStudents: 40 },
  { id: '3', name: 'Gamma Electrodynamics Intensive', courseTitle: 'Classical Electrodynamics & Radiation', instructor: 'Prof. Anjali Desai', schedule: 'Mon, Thu @ 19:30', studentsCount: 28, maxStudents: 35 },
  { id: '4', name: 'Delta Research & Lab Scholars', courseTitle: 'Statistical Mechanics & Phase Transitions', instructor: 'Dr. Sandeep Ghosh', schedule: 'Wed, Sat @ 11:00', studentsCount: 19, maxStudents: 25 },
];

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<BatchItem[]>(MOCK_BATCHES);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [courseTitle, setCourseTitle] = useState('Advanced Quantum Mechanics');
  const [instructor, setInstructor] = useState('Dr. Vikram Raman');
  const [schedule, setSchedule] = useState('Mon, Wed, Fri @ 18:00');
  const [maxStudents, setMaxStudents] = useState('45');
  const { showToast } = useToast();

  useEffect(() => {
    async function loadBatches() {
      try {
        const res = await batchApi.getAll();
        if (Array.isArray(res) && res.length > 0) {
          const mapped = res.map((b: any) => ({
            id: b.id || b._id,
            name: b.name,
            courseTitle: b.course?.title || 'Physics Program',
            instructor: b.instructor?.fullName || 'Faculty',
            schedule: b.schedule || 'Weekdays @ 18:00',
            studentsCount: b.students?.length || 30,
            maxStudents: b.maxStudents || 50,
          }));
          setBatches(mapped);
        }
      } catch {
        // Fallback
      }
    }
    loadBatches();
  }, []);

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await batchApi.create({
        name,
        instructor,
        schedule,
        maxStudents: Number(maxStudents),
      });
    } catch {
      // Mock creation
    }

    const newBatch: BatchItem = {
      id: String(Date.now()),
      name,
      courseTitle,
      instructor,
      schedule,
      studentsCount: 0,
      maxStudents: Number(maxStudents) || 50,
    };

    setBatches([...batches, newBatch]);
    showToast('New academic batch created!', 'success');
    setShowModal(false);
    setName('');
  };

  const handleDelete = (id: string, batchName: string) => {
    if (!confirm(`Delete batch "${batchName}"?`)) return;
    setBatches(batches.filter((b) => b.id !== id));
    showToast(`Batch "${batchName}" deleted`, 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers size={24} color="#0056D2" /> Manage Academic Batches &amp; Cohorts
        </h1>
        <button onClick={() => setShowModal(true)} className={styles.createBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Create New Batch
        </button>
      </div>

      <div className={styles.grid}>
        {batches.map((b) => (
          <div key={b.id} className={styles.batchCard}>
            <div className={styles.batchTop}>
              <div>
                <div className={styles.batchName}>{b.name}</div>
                <div className={styles.courseTag}>{b.courseTitle}</div>
              </div>
              <span className={styles.badge}>
                {b.studentsCount}/{b.maxStudents} Seats
              </span>
            </div>

            <div className={styles.infoRow}>
              <User size={15} color="#60A5FA" />
              <span>{b.instructor}</span>
            </div>

            <div className={styles.infoRow}>
              <Clock size={15} color="#94A3B8" />
              <span>{b.schedule}</span>
            </div>

            <div className={styles.cardFooter}>
              <Link href={`/admin/batches/${b.id}`} className={styles.cardLink}>
                Manage Batch & Students →
              </Link>
              <button onClick={() => handleDelete(b.id, b.name)} className={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Create New Academic Batch</h2>
            <form onSubmit={handleCreateBatch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Batch Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omega 2026 GATE Physics Cohort"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Course Curriculum</label>
                <select
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="Advanced Quantum Mechanics">Advanced Quantum Mechanics</option>
                  <option value="Classical Electrodynamics">Classical Electrodynamics</option>
                  <option value="CSIR-NET Physical Sciences">CSIR-NET Physical Sciences</option>
                  <option value="Statistical Mechanics">Statistical Mechanics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Instructor</label>
                <select
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="Dr. Vikram Raman">Dr. Vikram Raman</option>
                  <option value="Prof. Anjali Desai">Prof. Anjali Desai</option>
                  <option value="Dr. Sandeep Ghosh">Dr. Sandeep Ghosh</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Weekly Schedule & Timings</label>
                <input
                  type="text"
                  placeholder="e.g. Mon, Wed, Fri @ 18:30 IST"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Seat Capacity (Max Students)</label>
                <input
                  type="number"
                  placeholder="40"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(e.target.value)}
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
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
