// src/app/student/study-material/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { courseApi, fileApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.css';
import { Video, FileText, Download, Play, BookOpen, Layers } from 'lucide-react';

interface EnrolledCourse {
  _id: string;
  title?: string;
  courseId?: { _id: string; title: string };
}

interface Lecture {
  _id: string;
  title: string;
  duration?: string;
  unitNumber?: number;
}

interface Material {
  _id: string;
  title: string;
  fileSize?: string;
  fileUrl?: string;
}

export default function StudyMaterialPage() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'lectures' | 'materials'>('lectures');

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);

  // Load enrolled courses
  useEffect(() => {
    courseApi.getEnrolled()
      .then((res: unknown) => {
        const list = (res as { data?: EnrolledCourse[] }).data || (Array.isArray(res) ? res : []);
        if (list.length > 0) {
          setCourses(list);
          const firstId = list[0].courseId?._id || list[0]._id;
          setSelectedCourseId(firstId);
        } else {
          // Demo courses
          const demo = [
            { _id: 'c1', title: 'M.Sc Quantum Mechanics & Electrodynamics' },
            { _id: 'c2', title: 'CSIR-NET JRF Super 30 Preparation' },
          ];
          setCourses(demo);
          setSelectedCourseId(demo[0]._id);
        }
      })
      .catch(() => {
        const demo = [
          { _id: 'c1', title: 'M.Sc Quantum Mechanics & Electrodynamics' },
          { _id: 'c2', title: 'CSIR-NET JRF Super 30 Preparation' },
        ];
        setCourses(demo);
        setSelectedCourseId(demo[0]._id);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fetch course lectures & materials when course changes
  useEffect(() => {
    if (!selectedCourseId) return;
    setContentLoading(true);

    Promise.all([
      fileApi.getLectures(selectedCourseId).catch(() => ({ data: [] })),
      fileApi.getMaterials(selectedCourseId).catch(() => ({ data: [] })),
    ])
      .then(([lecRes, matRes]: [any, any]) => {
        const lecs = lecRes.data || (Array.isArray(lecRes) ? lecRes : []);
        const mats = matRes.data || (Array.isArray(matRes) ? matRes : []);

        if (lecs.length > 0) {
          setLectures(lecs);
        } else {
          setLectures([
            { _id: 'lec-1', title: 'Unit 1: Quantum Postulates & Hilbert Space Formalism', duration: '58 mins', unitNumber: 1 },
            { _id: 'lec-2', title: 'Unit 1: Harmonic Oscillator via Dirac Ladder Operators', duration: '62 mins', unitNumber: 1 },
            { _id: 'lec-3', title: 'Unit 2: Orbital Angular Momentum & Addition of Spins', duration: '54 mins', unitNumber: 2 },
            { _id: 'lec-4', title: 'Unit 3: Time-Independent Perturbation Theory in Depth', duration: '70 mins', unitNumber: 3 },
          ]);
        }

        if (mats.length > 0) {
          setMaterials(mats);
        } else {
          setMaterials([
            { _id: 'mat-1', title: 'Unit 1 Comprehensive Handwritten Lecture Notes.pdf', fileSize: '4.8 MB' },
            { _id: 'mat-2', title: 'Quantum Mechanics Formulas & Special Functions Reference.pdf', fileSize: '2.1 MB' },
            { _id: 'mat-3', title: 'CSIR-NET & GATE Solved Problem Bank (2014-2024).pdf', fileSize: '9.4 MB' },
            { _id: 'mat-4', title: 'Daily Practice Problem (DPP) Set 01 to 05 Solutions.pdf', fileSize: '3.6 MB' },
          ]);
        }
      })
      .finally(() => setContentLoading(false));
  }, [selectedCourseId]);

  if (loading) {
    return <Loader fullPage text="Accessing your digital library..." />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag">Academic Archive</div>
          <h1 className={styles.title}>Study Material &amp; Video Vault</h1>
          <p className={styles.subtitle}>
            Unlimited replays of recorded live sessions and high-resolution lecture PDFs.
          </p>
        </div>

        {/* Course Dropdown */}
        <div className={styles.courseSelectBox}>
          <label className={styles.selectLabel}>Select Enrolled Course:</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className={styles.courseSelect}
          >
            {courses.map((c) => (
              <option key={c._id} value={c.courseId?._id || c._id}>
                {c.title || c.courseId?.title || 'Physics Program'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'lectures' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('lectures')}
        >
          <Video size={16} /> Recorded Lectures ({lectures.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'materials' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <FileText size={16} /> Documents &amp; Notes ({materials.length})
        </button>
      </div>

      {/* Content */}
      {contentLoading ? (
        <Loader text="Loading course assets..." />
      ) : activeTab === 'lectures' ? (
        lectures.length === 0 ? (
          <EmptyState
            icon={<Video size={40} color="var(--primary-light)" />}
            title="No lectures recorded yet"
            description="Live class recordings will be processed and posted here within 2 hours of broadcast."
          />
        ) : (
          <div className={styles.lecturesGrid}>
            {lectures.map((lec) => (
              <div key={lec._id} className={styles.lectureCard}>
                <div className={styles.videoThumbnail}>
                  <div className={styles.playOverlay}>
                    <Play size={24} fill="#fff" />
                  </div>
                  <span className={styles.videoDuration}>{lec.duration || '60 mins'}</span>
                </div>
                <div className={styles.lectureBody}>
                  <span className={styles.unitTag}>Unit {lec.unitNumber || 1}</span>
                  <h3 className={styles.lecTitle}>{lec.title}</h3>
                  <Link href={`/student/video/${lec._id}`} className="btn btn-primary btn-sm" style={{ marginTop: 'auto' }}>
                    Watch Recording →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      ) : materials.length === 0 ? (
        <EmptyState
          icon={<FileText size={40} color="var(--primary-light)" />}
          title="No materials uploaded"
          description="Instructor reference notes will appear here."
        />
      ) : (
        <div className={styles.materialsList}>
          {materials.map((mat) => (
            <div key={mat._id} className={styles.materialItem}>
              <div className={styles.pdfBadge}>PDF</div>
              <div className={styles.matInfo}>
                <h3 className={styles.matTitle}>{mat.title}</h3>
                <span className={styles.matSize}>{mat.fileSize || '3.2 MB'}</span>
              </div>
              <div className={styles.matBtns}>
                <Link href={`/student/pdf/${mat._id}`} className="btn btn-outline btn-sm">
                  View Document
                </Link>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => showToast('Initiating file download...', 'info')}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
