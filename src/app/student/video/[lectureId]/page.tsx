// src/app/student/video/[lectureId]/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ArrowLeft, Play, User, BookOpen, Clock, Download, CheckCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function VideoPlayerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const lectureId = params?.lectureId as string;

  const [completed, setCompleted] = useState(false);

  const handleMarkComplete = () => {
    setCompleted(true);
    showToast('Lecture marked as completed! Progress updated.', 'success');
  };

  return (
    <div className={styles.page}>
      <Link href="/student/study-material" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Study Materials
      </Link>

      <div className={styles.playerContainer}>
        {/* HTML5 Video element */}
        <div className={styles.videoWrapper}>
          <video
            controls
            poster="/hero-physics.png"
            className={styles.videoElement}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video Metadata */}
        <div className={styles.metaCard}>
          <div className={styles.metaHeader}>
            <div>
              <span className="badge badge-primary">Unit 1 Lecture Recording</span>
              <h1 className={styles.videoTitle}>Formalism of Quantum Mechanics &amp; Hilbert Space Observables</h1>
            </div>

            <button
              className={`btn ${completed ? 'btn-outline' : 'btn-primary'}`}
              onClick={handleMarkComplete}
            >
              <CheckCircle size={16} color={completed ? 'var(--success)' : '#fff'} />
              {completed ? 'Completed' : 'Mark Complete'}
            </button>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.infoItem}>
              <User size={16} color="var(--primary-light)" />
              <span>Instructor: <strong>Dr. Rajesh Sharma</strong></span>
            </div>
            <div className={styles.infoItem}>
              <BookOpen size={16} color="var(--accent)" />
              <span>Subject: <strong>Quantum Mechanics</strong></span>
            </div>
            <div className={styles.infoItem}>
              <Clock size={16} color="var(--text-muted)" />
              <span>Duration: <strong>58 Minutes</strong></span>
            </div>
          </div>

          <div className={styles.summaryBox}>
            <h3>Lecture Syllabus Summary</h3>
            <p>
              In this core session, we develop the mathematical axioms of quantum mechanics, defining Dirac bra-ket notation, self-adjoint linear operators, eigenvalues, and complete orthonormal bases in Hilbert space. We conclude by proving the generalized Heisenberg uncertainty relation via the Schwarz inequality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
