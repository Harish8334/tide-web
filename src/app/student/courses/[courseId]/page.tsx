// src/app/student/courses/[courseId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { courseApi, examApi, fileApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import ExamCard from '@/components/ExamCard';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.css';
import { ArrowLeft, BookOpen, Video, FileText, Award, User, Layers, CheckCircle } from 'lucide-react';

interface CourseDetail {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  instructor?: { name?: string } | string;
  enrolledCount?: number;
  units?: {
    id?: string;
    title: string;
    description?: string;
    topics?: string[];
  }[];
}

interface LectureItem {
  _id: string;
  title: string;
  unitNumber?: number;
  duration?: string;
  videoUrl?: string;
}

interface MaterialItem {
  _id: string;
  title: string;
  fileSize?: string;
  fileUrl?: string;
  fileType?: string;
}

interface ExamItem {
  _id: string;
  title: string;
  duration: number;
  totalMarks: number;
  startDate?: string;
  isAttempted?: boolean;
  score?: number;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const courseId = params?.courseId as string;

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'lectures' | 'materials' | 'exams'>('overview');

  const [lectures, setLectures] = useState<LectureItem[]>([]);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    if (!courseId) return;

    courseApi.getById(courseId)
      .then((res: unknown) => {
        const data = (res as { data?: CourseDetail }).data || (res as CourseDetail);
        setCourse(data);
      })
      .catch(() => {
        // Fallback demo data
        setCourse({
          _id: courseId,
          title: 'Quantum Mechanics & Advanced Electrodynamics',
          description: 'A comprehensive study of quantum operators, perturbation theory, spin angular momentum, and relativistic electrodynamics tailored for CSIR-NET JRF and university examinations.',
          category: 'M.Sc Physics',
          level: 'Advanced',
          instructor: 'Dr. Rajesh Sharma',
          enrolledCount: 380,
          units: [
            {
              title: 'Unit 1: Postulates of Quantum Mechanics',
              description: 'State vectors, observables as Hermitian operators, uncertainty principle, and time evolution.',
              topics: ['Wave functions & Hilbert space', 'Schrödinger vs Heisenberg picture', 'Harmonic oscillator ladder operators'],
            },
            {
              title: 'Unit 2: Angular Momentum & Spin Algebra',
              description: 'Orbital angular momentum, Pauli spin matrices, addition of angular momenta, Clebsch-Gordan coefficients.',
              topics: ['Commutation relations', 'Spin-orbit coupling', 'Zeeman effect in weak & strong fields'],
            },
            {
              title: 'Unit 3: Approximation Methods',
              description: 'Non-degenerate and degenerate perturbation theory, variational method, WKB approximation.',
              topics: ['Stark effect in hydrogen atom', 'Helium atom ground state', 'Tunneling through potential barriers'],
            },
          ],
        });
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  // Load lectures, materials, exams on tab change
  useEffect(() => {
    if (!courseId) return;

    if (activeTab === 'lectures') {
      setTabLoading(true);
      fileApi.getLectures(courseId)
        .then((res: unknown) => {
          const list = (res as { data?: LectureItem[] }).data || (Array.isArray(res) ? res : []);
          setLectures(list);
        })
        .catch(() => {
          setLectures([
            { _id: 'lec-1', title: 'Lecture 1: Formalism of Quantum Mechanics & Hilbert Space', unitNumber: 1, duration: '58 mins' },
            { _id: 'lec-2', title: 'Lecture 2: Harmonic Oscillator via Dirac Ladder Operators', unitNumber: 1, duration: '64 mins' },
            { _id: 'lec-3', title: 'Lecture 3: Orbital Angular Momentum & Spherical Harmonics', unitNumber: 2, duration: '52 mins' },
            { _id: 'lec-4', title: 'Lecture 4: Perturbation Theory & Anharmonic Oscillator', unitNumber: 3, duration: '71 mins' },
          ]);
        })
        .finally(() => setTabLoading(false));
    } else if (activeTab === 'materials') {
      setTabLoading(true);
      fileApi.getMaterials(courseId)
        .then((res: unknown) => {
          const list = (res as { data?: MaterialItem[] }).data || (Array.isArray(res) ? res : []);
          setMaterials(list);
        })
        .catch(() => {
          setMaterials([
            { _id: 'mat-1', title: 'Unit 1 Handwritten Class Notes — Quantum Postulates.pdf', fileSize: '4.2 MB', fileType: 'pdf' },
            { _id: 'mat-2', title: 'Formula Handbook & Essential Identities Sheet.pdf', fileSize: '1.8 MB', fileType: 'pdf' },
            { _id: 'mat-3', title: 'CSIR-NET Previous 10 Years Solved Problems.pdf', fileSize: '8.5 MB', fileType: 'pdf' },
          ]);
        })
        .finally(() => setTabLoading(false));
    } else if (activeTab === 'exams') {
      setTabLoading(true);
      examApi.getByCourse(courseId)
        .then((res: unknown) => {
          const list = (res as { data?: ExamItem[] }).data || (Array.isArray(res) ? res : []);
          setExams(list);
        })
        .catch(() => {
          setExams([
            { _id: 'ex-1', title: 'Weekly Assessment 1: Quantum Postulates & Operators', duration: 45, totalMarks: 50, isAttempted: true, score: 44 },
            { _id: 'ex-2', title: 'Unit Test 2: Angular Momentum & Spin Selection Rules', duration: 60, totalMarks: 100, isAttempted: false },
            { _id: 'ex-3', title: 'Full Course Midterm Mock Examination', duration: 90, totalMarks: 100, startDate: '2026-11-15T10:00:00Z', isAttempted: false },
          ]);
        })
        .finally(() => setTabLoading(false));
    }
  }, [courseId, activeTab]);

  if (loading) {
    return <Loader fullPage text="Loading course syllabus..." />;
  }

  if (!course) {
    return (
      <div className={styles.page}>
        <EmptyState
          title="Course Not Found"
          description="The requested physics course could not be retrieved."
          actionLabel="Return to My Courses"
          onAction={() => router.push('/student/courses')}
        />
      </div>
    );
  }

  const instructorName = typeof course.instructor === 'object' ? course.instructor?.name : course.instructor || 'Lead Faculty';

  return (
    <div className={styles.page}>
      {/* Back link */}
      <Link href="/student/courses" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Courses
      </Link>

      {/* Hero Card */}
      <div className={styles.heroCard}>
        <div className={styles.heroBadges}>
          <span className="badge badge-primary">{course.category || 'M.Sc Physics'}</span>
          <span className="badge badge-warning">{course.level || 'Advanced'}</span>
          <span className="badge badge-success">
            <CheckCircle size={12} /> Enrolled
          </span>
        </div>

        <h1 className={styles.courseTitle}>{course.title}</h1>
        <p className={styles.courseDesc}>{course.description}</p>

        <div className={styles.heroMeta}>
          <div className={styles.metaItem}>
            <User size={16} />
            <span>Instructor: <strong>{instructorName}</strong></span>
          </div>
          <div className={styles.metaItem}>
            <Layers size={16} />
            <span>Syllabus: <strong>{course.units?.length || 3} Units</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabItem} ${activeTab === 'overview' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen size={16} /> Overview &amp; Syllabus
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === 'lectures' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('lectures')}
        >
          <Video size={16} /> Recorded Lectures
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === 'materials' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <FileText size={16} /> Study Materials (PDF)
        </button>
        <button
          className={`${styles.tabItem} ${activeTab === 'exams' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('exams')}
        >
          <Award size={16} /> Test Series &amp; Exams
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className={styles.overviewSection}>
          <h2 className={styles.unitHeader}>Syllabus Breakdown &amp; Topic Units</h2>
          <div className={styles.unitsList}>
            {course.units?.map((u, i) => (
              <div key={i} className={styles.unitCard}>
                <div className={styles.unitTop}>
                  <span className={styles.unitBadge}>Unit {i + 1}</span>
                  <h3 className={styles.unitName}>{u.title}</h3>
                </div>
                {u.description && <p className={styles.unitDesc}>{u.description}</p>}
                {u.topics && u.topics.length > 0 && (
                  <div className={styles.topicsBox}>
                    <span className={styles.topicsLabel}>Covered Topics:</span>
                    <ul className={styles.topicsList}>
                      {u.topics.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: LECTURES */}
      {activeTab === 'lectures' && (
        <div className={styles.tabSection}>
          {tabLoading ? (
            <Loader text="Loading video lectures..." />
          ) : lectures.length === 0 ? (
            <EmptyState
              icon={<Video size={36} color="var(--primary-light)" />}
              title="No lectures uploaded yet"
              description="Recordings will appear here after live class sessions conclude."
            />
          ) : (
            <div className={styles.lecturesGrid}>
              {lectures.map((lec) => (
                <div key={lec._id} className={styles.lectureCard}>
                  <div className={styles.lectureIconCircle}>
                    <Video size={20} />
                  </div>
                  <div className={styles.lectureInfo}>
                    <span className={styles.lectureUnit}>Unit {lec.unitNumber || 1} Lecture</span>
                    <h4 className={styles.lectureTitle}>{lec.title}</h4>
                    <span className={styles.lectureDuration}>Duration: {lec.duration || '60 mins'}</span>
                  </div>
                  <Link href={`/student/video/${lec._id}`} className="btn btn-primary btn-sm">
                    Watch Video →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: MATERIALS */}
      {activeTab === 'materials' && (
        <div className={styles.tabSection}>
          {tabLoading ? (
            <Loader text="Loading study materials..." />
          ) : materials.length === 0 ? (
            <EmptyState
              icon={<FileText size={36} color="var(--primary-light)" />}
              title="No study materials available"
              description="Instructor notes, formula handbooks, and reference PDFs will be posted here."
            />
          ) : (
            <div className={styles.materialsList}>
              {materials.map((mat) => (
                <div key={mat._id} className={styles.materialCard}>
                  <div className={styles.pdfIcon}>PDF</div>
                  <div className={styles.matInfo}>
                    <h4 className={styles.matTitle}>{mat.title}</h4>
                    <span className={styles.matSize}>{mat.fileSize || '3.5 MB'}</span>
                  </div>
                  <div className={styles.matActions}>
                    <Link href={`/student/pdf/${mat._id}`} className="btn btn-outline btn-sm">
                      View Document
                    </Link>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => showToast('Starting document download...', 'info')}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: EXAMS */}
      {activeTab === 'exams' && (
        <div className={styles.tabSection}>
          {tabLoading ? (
            <Loader text="Loading tests..." />
          ) : exams.length === 0 ? (
            <EmptyState
              icon={<Award size={36} color="var(--primary-light)" />}
              title="No exams currently scheduled"
              description="Assigned unit tests and mock exams for this course will appear here."
            />
          ) : (
            <div className={styles.examsGrid}>
              {exams.map((ex) => (
                <ExamCard
                  key={ex._id}
                  id={ex._id}
                  title={ex.title}
                  courseTitle={course.title}
                  duration={ex.duration}
                  totalMarks={ex.totalMarks}
                  startDate={ex.startDate}
                  isAttempted={ex.isAttempted}
                  score={ex.score}
                  onAttempt={() => router.push(`/student/exams/${ex._id}/attempt`)}
                  onViewResult={() => router.push(`/student/exams/${ex._id}/result`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
