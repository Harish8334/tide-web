// src/components/SkeletonCard.tsx
'use client';

import React from 'react';
import styles from './SkeletonCard.module.css';

export default function SkeletonCard({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.image} skeleton`} />
          <div className={styles.content}>
            <div className={`${styles.badge} skeleton`} />
            <div className={`${styles.title} skeleton`} />
            <div className={`${styles.description} skeleton`} />
            <div className={styles.footer}>
              <div className={`${styles.instructor} skeleton`} />
              <div className={`${styles.button} skeleton`} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
