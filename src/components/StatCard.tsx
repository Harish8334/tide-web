// src/components/StatCard.tsx
'use client';

import React from 'react';
import styles from './StatCard.module.css';
import { ArrowUpRight } from 'lucide-react';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export default function StatCard({
  icon,
  label,
  value,
  sublabel,
  color = 'var(--primary)',
  onClick,
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return (
      <div className={`${styles.card} ${styles.skeletonCard}`}>
        <div className="skeleton" style={{ width: 44, height: 44, borderRadius: '50%' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="skeleton" style={{ width: '60%', height: 28 }} />
          <div className="skeleton" style={{ width: '40%', height: 16 }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
      style={{ '--accent-color': color } as React.CSSProperties}
    >
      <div className={styles.accentBar} />
      <div className={styles.topRow}>
        <div className={styles.iconCircle} style={{ color }}>
          {icon}
        </div>
        {onClick && (
          <div className={styles.arrowIcon}>
            <ArrowUpRight size={18} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
        {sublabel && <div className={styles.sublabel}>{sublabel}</div>}
      </div>
    </div>
  );
}
