// src/app/admin/enrollments/page.tsx
'use client';

import React, { useState } from 'react';
import { courseApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { ClipboardList, Check, X } from 'lucide-react';
import styles from '../students/page.module.css';

interface EnrollmentReq {
  id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  courseId: string;
  dateRequested: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_REQUESTS: EnrollmentReq[] = [
  { id: '1', studentName: 'Arjun Verma', studentEmail: 'arjun@physics.iitb.ac.in', courseTitle: 'Advanced Quantum Mechanics', courseId: '1', dateRequested: '24 Oct 2026', status: 'pending' },
  { id: '2', studentName: 'Ananya Roy', studentEmail: 'ananya.roy@jnu.ac.in', courseTitle: 'CSIR-NET Physical Sciences Crash Course', courseId: '3', dateRequested: '23 Oct 2026', status: 'pending' },
  { id: '3', studentName: 'Kavita Joshi', studentEmail: 'kavita.j@bhu.ac.in', courseTitle: 'Classical Electrodynamics & Radiation', courseId: '2', dateRequested: '22 Oct 2026', status: 'pending' },
  { id: '4', studentName: 'Deepa Swaminathan', studentEmail: 'deepa.s@tifr.res.in', courseTitle: 'Statistical Mechanics & Phase Transitions', courseId: '4', dateRequested: '21 Oct 2026', status: 'pending' },
];

export default function AdminEnrollmentsPage() {
  const [requests, setRequests] = useState<EnrollmentReq[]>(INITIAL_REQUESTS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { showToast } = useToast();

  const handleApprove = async (req: EnrollmentReq) => {
    try {
      await courseApi.approveEnrollment(req.courseId, req.id);
    } catch {}
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: 'approved' } : r))
    );
    showToast(`Approved enrollment for ${req.studentName}!`, 'success');
  };

  const handleReject = async (req: EnrollmentReq) => {
    try {
      await courseApi.rejectEnrollment(req.courseId, req.id);
    } catch {}
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: 'rejected' } : r))
    );
    showToast(`Rejected request from ${req.studentName}`, 'warning');
  };

  const handleBulkApprove = () => {
    setRequests((prev) =>
      prev.map((r) => (selectedIds.includes(r.id) ? { ...r, status: 'approved' } : r))
    );
    showToast(`Approved ${selectedIds.length} enrollments in bulk!`, 'success');
    setSelectedIds([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ClipboardList size={24} color="#0056D2" /> Student Course Enrollment Requests
        </h1>
      </div>

      {selectedIds.length > 0 && (
        <div className={styles.bulkBar}>
          <span>{selectedIds.length} requests selected</span>
          <div className={styles.bulkActions}>
            <button onClick={handleBulkApprove} className={`${styles.iconBtn} ${styles.approveBtn}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Check size={14} /> Bulk Approve All
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === requests.length}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedIds(requests.map((r) => r.id));
                    else setSelectedIds([]);
                  }}
                />
              </th>
              <th>Student Details</th>
              <th>Requested Course</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(req.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds([...selectedIds, req.id]);
                      else setSelectedIds(selectedIds.filter((x) => x !== req.id));
                    }}
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{req.studentName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{req.studentEmail}</div>
                </td>
                <td style={{ color: '#38BDF8', fontWeight: 600 }}>{req.courseTitle}</td>
                <td>{req.dateRequested}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      req.status === 'approved'
                        ? styles.badgeActive
                        : req.status === 'rejected'
                        ? styles.badgeRejected
                        : styles.badgePending
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>
                  {req.status === 'pending' ? (
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => handleApprove(req)}
                        className={`${styles.iconBtn} ${styles.approveBtn}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        title="Approve Enrollment"
                      >
                        Approve <Check size={13} />
                      </button>
                      <button
                        onClick={() => handleReject(req)}
                        className={`${styles.iconBtn} ${styles.rejectBtn}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        title="Reject Enrollment"
                      >
                        Reject <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
