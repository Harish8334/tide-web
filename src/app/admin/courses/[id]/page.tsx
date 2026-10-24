// src/app/admin/courses/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { courseApi, examApi, fileApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Edit3 } from 'lucide-react';
import styles from './page.module.css';

interface StudentRow {
  id: string;
  name: string;
  email: string;
  enrolledAt: string;
  status: string;
}

export default function AdminCourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'info' | 'students' | 'materials' | 'exams'>('info');
  const [course, setCourse] = useState<any>({
    id: courseId,
    title: 'Advanced Quantum Mechanics & Perturbation Theory',
    category: 'M.Sc Physics',
    level: 'Advanced',
    instructor: 'Dr. Vikram Raman',
    price: 4999,
    description: 'Postgraduate level course covering Hilbert state vectors, time-independent perturbation, Stark effect, and fine structure transitions.',
  });

  const [students, setStudents] = useState<StudentRow[]>([
    { id: '1', name: 'Arjun Verma', email: 'arjun@physics.iitb.ac.in', enrolledAt: '12 Oct 2026', status: 'Active' },
    { id: '2', name: 'Priya Sharma', email: 'priya.sharma@du.ac.in', enrolledAt: '14 Oct 2026', status: 'Active' },
    { id: '3', name: 'Rohan Mehra', email: 'rohan.mehra@iisc.ac.in', enrolledAt: '18 Oct 2026', status: 'Active' },
  ]);

  const [materials, setMaterials] = useState<any[]>([
    { id: '1', title: 'Unit 1 Lecture Notes (PDF)', type: 'PDF', url: '/files/unit1.pdf' },
    { id: '2', title: 'Perturbation Theory Derivation Video', type: 'Lecture', url: 'https://youtube.com' },
  ]);

  const [exams, setExams] = useState<any[]>([
    { id: '1', title: 'Quantum Mechanics Mid-Semester MCQ Exam', duration: 90, totalMarks: 100 },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('PDF');
  const [uploadUrl, setUploadUrl] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!courseId) return;
      try {
        const cRes = await courseApi.getById(courseId);
        if (cRes && (cRes as any).title) {
          setCourse(cRes);
        }
      } catch {
        // Fallback
      }
    }
    loadData();
  }, [courseId]);

  const handleRemoveStudent = (studentId: string, name: string) => {
    if (!confirm(`Remove ${name} from this course?`)) return;
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    showToast(`Removed ${name} from course`, 'info');
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    const newMat = {
      id: String(Date.now()),
      title: uploadTitle,
      type: uploadType,
      url: uploadUrl || '#',
    };
    setMaterials([...materials, newMat]);
    showToast('Material added to course successfully!', 'success');
    setShowUploadModal(false);
    setUploadTitle('');
    setUploadUrl('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroCard}>
        <div className={styles.heroLeft}>
          <Link href="/admin/courses" className={styles.backLink}>
            ← Back to All Courses
          </Link>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <div className={styles.metaRow}>
            <span className={styles.badge} style={{ background: 'rgba(0,86,210,0.15)', color: '#38BDF8' }}>
              {course.category}
            </span>
            <span className={styles.badge} style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>
              {course.level}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Instructor: <strong>{course.instructor?.fullName || course.instructor || 'Faculty'}</strong>
            </span>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{students.length + 139}</span>
              <span className={styles.statLbl}>Active Students</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>3</span>
              <span className={styles.statLbl}>Pending Approvals</span>
            </div>
          </div>
          <Link href={`/admin/courses/${courseId}/edit`} className={styles.actionBtn} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Edit3 size={15} /> Edit Course
          </Link>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab('info')}
          className={`${styles.tabBtn} ${activeTab === 'info' ? styles.tabBtnActive : ''}`}
        >
          Curriculum & Info
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`${styles.tabBtn} ${activeTab === 'students' ? styles.tabBtnActive : ''}`}
        >
          Enrolled Students ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`${styles.tabBtn} ${activeTab === 'materials' ? styles.tabBtnActive : ''}`}
        >
          Study Materials ({materials.length})
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`${styles.tabBtn} ${activeTab === 'exams' ? styles.tabBtnActive : ''}`}
        >
          Exams ({exams.length})
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'info' && (
          <div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Course Overview</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {course.description}
            </p>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Syllabus Units</h3>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Unit 1: Hilbert space, Dirac notation, and state operators</li>
              <li>Unit 2: Stationary Non-Degenerate & Degenerate Perturbation Theory</li>
              <li>Unit 3: Fine structure of Hydrogen & Zeeman Effect</li>
              <li>Unit 4: Variational methods & WKB Approximation</li>
            </ul>
          </div>
        )}

        {activeTab === 'students' && (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Enrolled On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st.id}>
                    <td><strong>{st.name}</strong></td>
                    <td>{st.email}</td>
                    <td>{st.enrolledAt}</td>
                    <td><span style={{ color: '#10B981', fontWeight: 600 }}>{st.status}</span></td>
                    <td>
                      <button
                        onClick={() => handleRemoveStudent(st.id, st.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Course Study Materials</h3>
              <button onClick={() => setShowUploadModal(true)} className={styles.actionBtn}>
                + Upload Material
              </button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Material Title</th>
                  <th>Type</th>
                  <th>URL / File</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.id}>
                    <td><strong>{m.title}</strong></td>
                    <td>{m.type}</td>
                    <td><span style={{ color: '#38BDF8' }}>{m.url}</span></td>
                    <td>
                      <button
                        onClick={() => setMaterials(materials.filter((item) => item.id !== m.id))}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'exams' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Linked Course Exams</h3>
              <Link href={`/admin/exams/new?courseId=${courseId}`} className={styles.actionBtn}>
                + Add Exam
              </Link>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td><strong>{ex.title}</strong></td>
                    <td>{ex.duration} mins</td>
                    <td>{ex.totalMarks} Marks</td>
                    <td>
                      <Link href={`/admin/exams/${ex.id}/stats`} style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 600 }}>
                        View Stats
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Material Modal */}
      {showUploadModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowUploadModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Upload Course Material</h2>
            <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Document / Video Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3 Handwritten Formula Sheet"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Material Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="PDF">PDF Document / Notes</option>
                  <option value="Lecture">Recorded Video Lecture</option>
                  <option value="Assignment">Assignment Sheet</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>File Download or Video Stream URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1.25rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '6px', fontWeight: 600 }}
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
