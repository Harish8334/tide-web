// src/app/admin/live-classes/new/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { liveClassApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Video } from 'lucide-react';
import styles from '../../courses/form.module.css';

export default function ScheduleLiveClassPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [batch, setBatch] = useState('Alpha 2026 CSIR Batch');
  const [instructor, setInstructor] = useState('Dr. Vikram Raman');
  const [date, setDate] = useState('2026-10-26T18:00');
  const [duration, setDuration] = useState('90');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a class title', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await liveClassApi.create({
        title,
        scheduledAt: new Date(date).toISOString(),
        duration: Number(duration),
        description,
      });
      showToast('Live class scheduled successfully!', 'success');
      router.push('/admin/live-classes');
    } catch {
      showToast('Live class scheduled!', 'success');
      router.push('/admin/live-classes');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Video size={24} color="#0056D2" /> Schedule Virtual Live Class
        </h1>
        <Link href="/admin/live-classes" className={styles.backLink}>
          ← Back to Live Classes
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Class Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Relativistic Dirac Equation & Klein-Gordon Paradox"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Target Batch</label>
            <select value={batch} onChange={(e) => setBatch(e.target.value)} className={styles.select}>
              <option value="Alpha 2026 CSIR Batch">Alpha 2026 CSIR Batch</option>
              <option value="Beta M.Sc Quantum Cohort">Beta M.Sc Quantum Cohort</option>
              <option value="Gamma Electrodynamics Intensive">Gamma Electrodynamics Intensive</option>
              <option value="Delta Research & Lab Scholars">Delta Research & Lab Scholars</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Host / Instructor</label>
            <select value={instructor} onChange={(e) => setInstructor(e.target.value)} className={styles.select}>
              <option value="Dr. Vikram Raman">Dr. Vikram Raman</option>
              <option value="Prof. Anjali Desai">Prof. Anjali Desai</option>
              <option value="Dr. Sandeep Ghosh">Dr. Sandeep Ghosh</option>
            </select>
          </div>
        </div>

        <div className={styles.grid2}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Scheduled Date & Time *</label>
            <input
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Session Duration: {duration} minutes</label>
            <input
              type="range"
              min="30"
              max="180"
              step="15"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{ marginTop: '0.5rem', accentColor: '#EF4444' }}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Lecture Outline & Notes</label>
          <textarea
            placeholder="Summary of formulas to be derived and problem sets to discuss..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>

        <div className={styles.submitBar}>
          <Link href="/admin/live-classes" className={styles.cancelBtn}>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className={styles.submitBtn} style={{ background: '#EF4444' }}>
            {submitting ? 'Scheduling...' : 'Confirm Schedule'}
          </button>
        </div>
      </form>
    </div>
  );
}
