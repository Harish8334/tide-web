// src/components/CourseCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Users, BookOpen, Rocket } from 'lucide-react';
import styles from './CourseCard.module.css';

export interface CourseCardProps {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  category: string;
  price?: number;
  originalPrice?: number;
  enrolledStudents?: number;
  enrolledCount?: number;
  level?: string;
  isLive?: boolean;
  features?: string[];
  thumbnail?: string;
  instructor?: { name?: string } | string;
  href?: string;
  isEnrolled?: boolean;
  onEnroll?: () => void;
}

export default function CourseCard({
  id,
  _id,
  title,
  description = 'Complete curriculum syllabus with recorded and interactive live sessions, question banks, and notes.',
  category,
  price = 4999,
  originalPrice = 9999,
  level = 'Intermediate',
  isLive = true,
  features = [
    '350+ Hours Live + Recorded Classes',
    'Printed & PDF Handwritten Notes',
    '50+ Mock Tests & OMR Quizzes',
    'WhatsApp Faculty Mentorship',
  ],
  href,
  isEnrolled = false,
  enrolledCount,
  enrolledStudents,
  onEnroll,
}: CourseCardProps) {
  const courseId = id || _id || 'course';
  const discountPercent = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={styles.card}>
      {/* Top Bar with Mode & Category */}
      <div className={styles.topBar}>
        <div className={isLive ? styles.modeBadge : styles.modeBadgeRecorded}>
          {isLive && <span className={styles.pulseDot} />}
          {isLive ? 'Live Interactive Batch' : 'Recorded Masterclass'}
        </div>
        <span className={styles.categoryTag}>{category}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        {/* Feature Checklists (Professor Academy style) */}
        <ul className={styles.featuresList}>
          {features.slice(0, 4).map((feat, idx) => (
            <li key={idx} className={styles.featureItem}>
              <span className={styles.featureCheck}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Price & Discount & Enrolled count */}
        <div className={styles.pricingRow}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem' }}>
            <span className={styles.price}>₹{price.toLocaleString('en-IN')}</span>
            {originalPrice > price && (
              <>
                <span className={styles.strikePrice}>₹{originalPrice.toLocaleString('en-IN')}</span>
                <span className={styles.discountBadge}>{discountPercent}% OFF</span>
              </>
            )}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Users size={14} color="#64748B" /> {enrolledCount || enrolledStudents || 350}+ Enrolled Students
          </span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          {isEnrolled ? (
            <Link href={`/student/courses/${courseId}`} className={styles.enrollBtn} style={{ background: '#16A34A' }}>
              <BookOpen size={15} style={{ marginRight: 6 }} /> Go to Course
            </Link>
          ) : onEnroll ? (
            <button type="button" onClick={onEnroll} className={styles.enrollBtn}>
              Enroll Now <Rocket size={15} style={{ marginLeft: 6 }} />
            </button>
          ) : (
            <Link href={href || `/courses?enroll=${courseId}`} className={styles.enrollBtn}>
              Enroll Now <Rocket size={15} style={{ marginLeft: 6 }} />
            </Link>
          )}
          <Link href={`/courses/${courseId}`} className={styles.detailsBtn}>
            View Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
