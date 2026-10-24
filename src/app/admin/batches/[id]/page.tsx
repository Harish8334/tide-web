// src/app/admin/batches/[id]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import styles from '../page.module.css';

interface EnrolledStudent {
  id: string;
  name: string;
  email: string;
  addedOn: string;
}

const CANDIDATE_STUDENTS = [
  { id: '101', name: 'Manish Kumar', email: 'manish.k@iitd.ac.in' },
  { id: '102', name: 'Deepa Swaminathan', email: 'deepa.s@tifr.res.in' },
  { id: '103', name: 'Alok Nath', email: 'alok.nath@bhu.ac.in' },
  { id: '104', name: 'Pooja Hegde', email: 'pooja.h@du.ac.in' },
];

export default function AdminBatchDetailPage() {
  const params = useParams();
  const batchId = params?.id as string;
  const { showToast } = useToast();

  const [batchInfo, setBatchInfo] = useState({
    name: 'Alpha 2026 CSIR-NET Batch',
    course: 'CSIR-NET Physical Sciences Comprehensive',
    instructor: 'Dr. Vikram Raman',
    schedule: 'Mon, Wed, Fri @ 18:00 IST',
    capacity: 50,
  });

  const [students, setStudents] = useState<EnrolledStudent[]>([
    { id: '1', name: 'Arjun Verma', email: 'arjun@physics.iitb.ac.in', addedOn: '10 Oct 2026' },
    { id: '2', name: 'Priya Sharma', email: 'priya.sharma@du.ac.in', addedOn: '12 Oct 2026' },
    { id: '3', name: 'Rohan Mehra', email: 'rohan.mehra@iisc.ac.in', addedOn: '15 Oct 2026' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([]);
  const [candidateSearch, setCandidateSearch] = useState('');

  const handleRemove = (studentId: string, name: string) => {
    if (!confirm(`Remove ${name} from this batch?`)) return;
    setStudents(students.filter((s) => s.id !== studentId));
    showToast(`Removed ${name} from batch`, 'info');
  };

  const handleAddSubmit = () => {
    const toAdd = CANDIDATE_STUDENTS.filter((c) => selectedToAdd.includes(c.id)).map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      addedOn: 'Today',
    }));
    setStudents([...students, ...toAdd]);
    showToast(`Added ${toAdd.length} students to batch!`, 'success');
    setShowAddModal(false);
    setSelectedToAdd([]);
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link href="/admin/batches" style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to All Batches
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.25rem' }}>{batchInfo.name}</h1>
          <p style={{ color: '#38BDF8', fontSize: '0.9rem', fontWeight: 600 }}>{batchInfo.course}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className={styles.createBtn}>
          + Add Students
        </button>
      </div>

      <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>INSTRUCTOR</div>
          <div style={{ fontWeight: 600 }}>{batchInfo.instructor}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SCHEDULE</div>
          <div style={{ fontWeight: 600 }}>{batchInfo.schedule}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ENROLLED COUNT</div>
          <div style={{ fontWeight: 700, color: '#10B981' }}>{students.length} / {batchInfo.capacity} Students</div>
        </div>
      </div>

      <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface-hover)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>Student Name</th>
              <th style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>Email Address</th>
              <th style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>Assigned Date</th>
              <th style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((st) => (
              <tr key={st.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>{st.name}</td>
                <td style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-secondary)' }}>{st.email}</td>
                <td style={{ padding: '0.85rem 1.25rem' }}>{st.addedOn}</td>
                <td style={{ padding: '0.85rem 1.25rem' }}>
                  <button
                    onClick={() => handleRemove(st.id, st.name)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Add Students to Batch</h2>
            <input
              type="text"
              placeholder="Filter students by name..."
              value={candidateSearch}
              onChange={(e) => setCandidateSearch(e.target.value)}
              style={{ padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {CANDIDATE_STUDENTS.filter((c) => c.name.toLowerCase().includes(candidateSearch.toLowerCase())).map((cand) => (
                <label key={cand.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', background: 'var(--color-surface-hover)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedToAdd.includes(cand.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedToAdd([...selectedToAdd, cand.id]);
                      else setSelectedToAdd(selectedToAdd.filter((x) => x !== cand.id));
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{cand.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{cand.email}</div>
                  </div>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '6px' }}>
                Cancel
              </button>
              <button onClick={handleAddSubmit} style={{ padding: '0.5rem 1.25rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '6px', fontWeight: 600 }}>
                Add Selected ({selectedToAdd.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
