// src/app/student/attendance/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Calendar as CalendarIcon, CheckCircle2, XCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StudentAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  // 31 days attendance mock
  // 1 = attended (green), 0 = missed (red), -1 = no class (gray)
  const daysStatus: Record<number, number> = {
    1: 1, 2: 1, 3: -1, 4: -1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: -1, 11: -1,
    12: 1, 13: 1, 14: 0, 15: 1, 16: 1, 17: -1, 18: -1, 19: 1, 20: 1, 21: 1,
    22: 1, 23: 1, 24: -1, 25: -1, 26: 1, 27: 0, 28: 1, 29: 1, 30: 1, 31: -1,
  };

  const totalClasses = Object.values(daysStatus).filter((s) => s === 1 || s === 0).length;
  const attendedCount = Object.values(daysStatus).filter((s) => s === 1).length;
  const missedCount = totalClasses - attendedCount;
  const attendancePct = Math.round((attendedCount / totalClasses) * 100);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <CalendarIcon size={14} color="var(--primary-light)" /> Class Participation
          </div>
          <h1 className={styles.title}>Student Attendance Register</h1>
          <p className={styles.subtitle}>
            Monitor your live lecture presence, batch regularity, and minimum university quota compliance.
          </p>
        </div>

        {/* Month selector */}
        <div className={styles.monthSelector}>
          <button className={styles.monthArrow} onClick={() => setCurrentMonth('September 2026')}>
            <ChevronLeft size={18} />
          </button>
          <span className={styles.monthText}>{currentMonth}</span>
          <button className={styles.monthArrow} onClick={() => setCurrentMonth('November 2026')}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Warning banner if < 75% */}
      {attendancePct < 75 && (
        <div className={styles.warningBanner}>
          <AlertTriangle size={20} color="var(--warning)" />
          <div>
            <strong>Attendance Warning: Current rate is {attendancePct}%</strong>
            <p>You must maintain at least 75% attendance to remain eligible for final CSIR-NET grant certification.</p>
          </div>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Scheduled Classes</span>
          <span className={styles.statVal}>{totalClasses}</span>
        </div>

        <div className={styles.statCard} style={{ borderTopColor: 'var(--success)' }}>
          <span className={styles.statLabel}>Classes Attended</span>
          <span className={styles.statVal} style={{ color: 'var(--success)' }}>{attendedCount}</span>
        </div>

        <div className={styles.statCard} style={{ borderTopColor: 'var(--error)' }}>
          <span className={styles.statLabel}>Classes Missed</span>
          <span className={styles.statVal} style={{ color: 'var(--error)' }}>{missedCount}</span>
        </div>

        <div className={styles.statCard} style={{ borderTopColor: attendancePct >= 75 ? 'var(--success)' : 'var(--warning)' }}>
          <span className={styles.statLabel}>Overall Attendance Rate</span>
          <span className={styles.statVal} style={{ color: attendancePct >= 75 ? 'var(--success)' : 'var(--warning)' }}>
            {attendancePct}%
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={styles.calendarCard}>
        <div className={styles.calLegend}>
          <div className={styles.legItem}>
            <span className={`${styles.legDot} ${styles.dotPresent}`} /> Attended Live
          </div>
          <div className={styles.legItem}>
            <span className={`${styles.legDot} ${styles.dotAbsent}`} /> Missed Session
          </div>
          <div className={styles.legItem}>
            <span className={`${styles.legDot} ${styles.dotHoliday}`} /> No Scheduled Class / Weekend
          </div>
        </div>

        <div className={styles.daysGrid}>
          {Array.from({ length: 31 }).map((_, idx) => {
            const dayNum = idx + 1;
            const status = daysStatus[dayNum];

            let cellClass = styles.cellHoliday;
            let statusText = 'No Class';
            if (status === 1) {
              cellClass = styles.cellPresent;
              statusText = 'Present';
            } else if (status === 0) {
              cellClass = styles.cellAbsent;
              statusText = 'Absent';
            }

            return (
              <div key={dayNum} className={`${styles.dayCell} ${cellClass}`}>
                <span className={styles.cellNum}>{dayNum}</span>
                <span className={styles.cellStatus}>{statusText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
