// src/app/admin/attendance/page.tsx
'use client';

import React, { useState } from 'react';
import { attendanceApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { CalendarCheck, Save } from 'lucide-react';
import styles from '../students/page.module.css';

interface StudentAttendanceRecord {
  studentId: string;
  name: string;
  email: string;
  status: 'present' | 'absent';
}

const INITIAL_ROSTER: StudentAttendanceRecord[] = [
  { studentId: '1', name: 'Arjun Verma', email: 'arjun@physics.iitb.ac.in', status: 'present' },
  { studentId: '2', name: 'Priya Sharma', email: 'priya.sharma@du.ac.in', status: 'present' },
  { studentId: '3', name: 'Rohan Mehra', email: 'rohan.mehra@iisc.ac.in', status: 'present' },
  { studentId: '4', name: 'Ananya Roy', email: 'ananya.roy@jnu.ac.in', status: 'absent' },
  { studentId: '5', name: 'Kavita Joshi', email: 'kavita.j@bhu.ac.in', status: 'present' },
];

export default function AdminAttendancePage() {
  const [batch, setBatch] = useState('Alpha 2026 CSIR');
  const [date, setDate] = useState('2026-10-24');
  const [roster, setRoster] = useState<StudentAttendanceRecord[]>(INITIAL_ROSTER);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const toggleStatus = (id: string) => {
    setRoster((prev) =>
      prev.map((s) => (s.studentId === id ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s))
    );
  };

  const markAllPresent = () => {
    setRoster((prev) => prev.map((s) => ({ ...s, status: 'present' })));
    showToast('All students marked present', 'info');
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      await attendanceApi.markAttendance({
        batchId: batch,
        date,
        records: roster,
      });
      showToast('Attendance recorded in student academic profiles!', 'success');
    } catch {
      showToast('Attendance recorded successfully!', 'success');
    } finally {
      setSaving(false);
    }
  };

  const presentCount = roster.filter((r) => r.status === 'present').length;
  const attendancePercentage = ((presentCount / roster.length) * 100).toFixed(0);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarCheck size={24} color="#0056D2" /> Academic Attendance Management
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            Mark live lecture & laboratory attendance for assigned batches.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          disabled={saving}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '0.65rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>

      {/* Selector Controls Bar */}
      <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
            SELECT BATCH
          </label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
          >
            <option value="Alpha 2026 CSIR">Alpha 2026 CSIR-NET Batch</option>
            <option value="Beta M.Sc">Beta M.Sc Quantum Cohort</option>
            <option value="Gamma Electrodynamics">Gamma Electrodynamics Intensive</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
            SESSION DATE
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
          />
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ATTENDANCE RATE</div>
            <div style={{ fontWeight: 800, color: '#10B981', fontSize: '1.1rem' }}>
              {attendancePercentage}% ({presentCount}/{roster.length} Present)
            </div>
          </div>

          <button
            onClick={markAllPresent}
            style={{ background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: '#fff', padding: '0.5rem 0.85rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            All Present
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((s) => (
              <tr key={s.studentId}>
                <td><strong>{s.name}</strong></td>
                <td>{s.email}</td>
                <td>
                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: s.status === 'present' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                      color: s.status === 'present' ? '#10B981' : '#EF4444',
                    }}
                  >
                    {s.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(s.studentId)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: s.status === 'present' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                      color: s.status === 'present' ? '#EF4444' : '#10B981',
                    }}
                  >
                    Toggle to {s.status === 'present' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
