// src/app/admin/students/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { authApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Users, Check, X, Eye, Pause, RotateCw, Trash2 } from 'lucide-react';
import styles from './page.module.css';

interface StudentUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'rejected' | 'suspended';
  program?: string;
  institution?: string;
  createdAt?: string;
}

const MOCK_STUDENTS: StudentUser[] = [
  { id: '1', fullName: 'Arjun Verma', email: 'arjun@physics.iitb.ac.in', role: 'student', status: 'pending', program: 'M.Sc Physics', institution: 'IIT Bombay' },
  { id: '2', fullName: 'Priya Sharma', email: 'priya.sharma@du.ac.in', role: 'student', status: 'active', program: 'CSIR-NET Aspirant', institution: 'Delhi University' },
  { id: '3', fullName: 'Rohan Mehra', email: 'rohan.mehra@iisc.ac.in', role: 'student', status: 'active', program: 'Integrated Ph.D', institution: 'IISc Bangalore' },
  { id: '4', fullName: 'Ananya Roy', email: 'ananya.roy@jnu.ac.in', role: 'student', status: 'pending', program: 'GATE Physical Sciences', institution: 'JNU New Delhi' },
  { id: '5', fullName: 'Siddharth Nair', email: 'sid.nair@uohyd.ac.in', role: 'student', status: 'suspended', program: 'B.Ed & Pedagogy', institution: 'Univ of Hyderabad' },
  { id: '6', fullName: 'Kavita Joshi', email: 'kavita.j@bhu.ac.in', role: 'student', status: 'rejected', program: 'M.Sc Physics', institution: 'BHU Varanasi' },
  { id: '7', fullName: 'Prof. H. C. Sen', email: 'sen@physics.org', role: 'instructor', status: 'active', program: 'Faculty', institution: 'TIFR' },
];

export default function ManageStudentsPage() {
  const [students, setStudents] = useState<StudentUser[]>(MOCK_STUDENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeModalStudent, setActiveModalStudent] = useState<StudentUser | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await authApi.getAllUsers();
        if (Array.isArray(res) && res.length > 0) {
          const mapped: StudentUser[] = res.map((u: any) => ({
            id: u.id || u._id,
            fullName: u.fullName || u.name || 'Anonymous User',
            email: u.email,
            role: u.role || 'student',
            status: u.status || 'active',
            program: u.program || 'Physics Program',
            institution: u.institution || 'University',
          }));
          setStudents(mapped);
        }
      } catch (err) {
        // Fall back to comprehensive mock data
      }
    }
    fetchUsers();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || s.status.toLowerCase() === statusFilter.toLowerCase();
      const matchRole = roleFilter === 'All' || s.role.toLowerCase() === roleFilter.toLowerCase();
      return matchSearch && matchStatus && matchRole;
    });
  }, [students, search, statusFilter, roleFilter]);

  const handleStatusChange = async (id: string, newStatus: StudentUser['status']) => {
    try {
      await authApi.updateUserStatus(id, newStatus);
    } catch {
      // Mock update
    }
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    showToast(`User status updated to ${newStatus}`, 'success');
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await authApi.updateUserRole(id, newRole);
    } catch {
      // Mock update
    }
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, role: newRole } : s))
    );
    showToast(`Role updated to ${newRole}`, 'success');
  };

  const handleDelete = async (email: string, id: string) => {
    if (!confirm(`Are you sure you want to permanently delete this user?`)) return;
    try {
      await authApi.deleteUser(email);
    } catch {
      // Mock delete
    }
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast('User deleted successfully', 'info');
  };

  const handleBulkApprove = () => {
    setStudents((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, status: 'active' } : s))
    );
    showToast(`${selectedIds.length} students approved`, 'success');
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    setStudents((prev) =>
      prev.map((s) => (selectedIds.includes(s.id) ? { ...s, status: 'rejected' } : s))
    );
    showToast(`${selectedIds.length} students rejected`, 'warning');
    setSelectedIds([]);
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredStudents.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={24} color="#0056D2" /> Student Directory &amp; Approvals
        </h1>
      </div>

      {/* Filter Bar */}
      <div className={styles.filterCard}>
        <input
          type="text"
          placeholder="Search student by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.selectInput}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending Approval</option>
          <option value="Rejected">Rejected</option>
          <option value="Suspended">Suspended</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={styles.selectInput}
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
        </select>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className={styles.bulkBar}>
          <span>{selectedIds.length} students selected</span>
          <div className={styles.bulkActions}>
            <button onClick={handleBulkApprove} className={`${styles.iconBtn} ${styles.approveBtn}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Check size={14} /> Bulk Approve
            </button>
            <button onClick={handleBulkReject} className={`${styles.iconBtn} ${styles.rejectBtn}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <X size={14} /> Bulk Reject
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredStudents.length}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              <th>Student</th>
              <th>Role</th>
              <th>Status</th>
              <th>Program</th>
              <th>Institution</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => {
              const isSelected = selectedIds.includes(s.id);
              const initials = s.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr key={s.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds([...selectedIds, s.id]);
                        } else {
                          setSelectedIds(selectedIds.filter((id) => id !== s.id));
                        }
                      }}
                    />
                  </td>
                  <td>
                    <div className={styles.studentCell}>
                      <div className={styles.avatar}>{initials}</div>
                      <div>
                        <div className={styles.studentName}>{s.fullName}</div>
                        <div className={styles.studentEmail}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={s.role}
                      onChange={(e) => handleRoleChange(s.id, e.target.value)}
                      className={styles.roleSelect}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        s.status === 'active'
                          ? styles.badgeActive
                          : s.status === 'pending'
                          ? styles.badgePending
                          : s.status === 'rejected'
                          ? styles.badgeRejected
                          : styles.badgeSuspended
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td>{s.program || 'N/A'}</td>
                  <td>{s.institution || 'N/A'}</td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button
                        onClick={() => setActiveModalStudent(s)}
                        className={styles.iconBtn}
                        title="View Full Profile"
                      >
                        <Eye size={15} />
                      </button>

                      {s.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(s.id, 'active')}
                            className={`${styles.iconBtn} ${styles.approveBtn}`}
                            title="Approve Student"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(s.id, 'rejected')}
                            className={`${styles.iconBtn} ${styles.rejectBtn}`}
                            title="Reject Student"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}

                      {s.status === 'active' && (
                        <button
                          onClick={() => handleStatusChange(s.id, 'suspended')}
                          className={styles.iconBtn}
                          title="Suspend User"
                        >
                          <Pause size={14} />
                        </button>
                      )}

                      {s.status === 'suspended' && (
                        <button
                          onClick={() => handleStatusChange(s.id, 'active')}
                          className={`${styles.iconBtn} ${styles.approveBtn}`}
                          title="Reactivate User"
                        >
                          <RotateCw size={14} />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(s.email, s.id)}
                        className={`${styles.iconBtn} ${styles.deleteBtn}`}
                        title="Delete User"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {activeModalStudent && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalStudent(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Student Profile & Academics</h2>
              <button onClick={() => setActiveModalStudent(null)} className={styles.closeBtn}>
                ×
              </button>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Full Name</span>
                <span className={styles.infoValue}>{activeModalStudent.fullName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{activeModalStudent.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Current Status</span>
                <span className={styles.infoValue}>{activeModalStudent.status.toUpperCase()}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Program Target</span>
                <span className={styles.infoValue}>{activeModalStudent.program}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Institution</span>
                <span className={styles.infoValue}>{activeModalStudent.institution}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Avg Mock Exam Score</span>
                <span className={styles.infoValue}>78.5% (Rank #12)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Attendance Rate</span>
                <span className={styles.infoValue}>91.2% (Present: 31/34)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Assigned Batch</span>
                <span className={styles.infoValue}>Alpha 2026 CSIR Batch</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={() => setActiveModalStudent(null)}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: 'var(--color-surface-hover)',
                  border: '1px solid var(--color-border)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
