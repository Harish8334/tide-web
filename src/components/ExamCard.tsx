// src/components/ExamCard.tsx
'use client';

import React from 'react';
import styles from './ExamCard.module.css';
import { FileText, Clock, Award, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export interface ExamCardProps {
  id?: string;
  title: string;
  courseTitle?: string;
  duration: number; // in minutes
  totalMarks: number;
  startDate?: string;
  isAttempted?: boolean;
  score?: number;
  onAttempt?: () => void;
  onViewResult?: () => void;
}

export default function ExamCard({
  title,
  courseTitle,
  duration,
  totalMarks,
  startDate,
  isAttempted = false,
  score,
  onAttempt,
  onViewResult,
}: ExamCardProps) {
  const isLocked = startDate ? new Date(startDate).getTime() > new Date().getTime() : false;
  const percentage = isAttempted && score !== undefined ? Math.round((score / totalMarks) * 100) : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {courseTitle && <span className={styles.courseTag}>{courseTitle}</span>}
        {isAttempted ? (
          <span className={styles.attemptedBadge}>
            <CheckCircle size={13} /> Completed
          </span>
        ) : isLocked ? (
          <span className={styles.lockedBadge}>
            <Lock size={13} /> Scheduled
          </span>
        ) : (
          <span className={styles.readyBadge}>Ready to Attempt</span>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.detailsRow}>
        <div className={styles.detailItem}>
          <Clock size={15} />
          <span>{duration} Mins</span>
        </div>
        <div className={styles.detailItem}>
          <Award size={15} />
          <span>{totalMarks} Marks</span>
        </div>
        {startDate && (
          <div className={styles.detailItem}>
            <FileText size={15} />
            <span>{new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        {isAttempted ? (
          <div className={styles.resultRow}>
            <div className={styles.scoreInfo}>
              <span className={styles.scoreLabel}>Score</span>
              <span className={percentage >= 70 ? styles.scoreGood : percentage >= 40 ? styles.scoreAvg : styles.scoreLow}>
                {score} / {totalMarks} ({percentage}%)
              </span>
            </div>
            {onViewResult && (
              <button className={styles.viewResultBtn} onClick={onViewResult}>
                Review Results
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ) : isLocked ? (
          <button className={styles.lockedBtn} disabled>
            <Lock size={15} />
            Starts {startDate ? new Date(startDate).toLocaleDateString() : 'Soon'}
          </button>
        ) : (
          <button className={styles.attemptBtn} onClick={onAttempt}>
            Start Exam
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
