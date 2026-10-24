// src/components/LiveClassCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './LiveClassCard.module.css';
import { Video, Calendar, Clock, User, ArrowRight } from 'lucide-react';

export interface LiveClassCardProps {
  id?: string;
  title: string;
  instructor?: string;
  startTime?: string;
  status: 'scheduled' | 'live' | 'ongoing' | 'completed' | 'cancelled';
  batchName?: string;
  duration?: number;
  onJoin?: () => void;
}

export default function LiveClassCard({
  title,
  instructor = 'Faculty Lead',
  startTime,
  status,
  batchName,
  duration = 60,
  onJoin,
}: LiveClassCardProps) {
  const isLive = status === 'live' || status === 'ongoing';
  const isCompleted = status === 'completed';
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!startTime || isLive || isCompleted) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(startTime).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('Starting now');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 24) {
        const days = Math.floor(hours / 24);
        setTimeLeft(`${days}d ${hours % 24}h`);
      } else {
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime, isLive, isCompleted]);

  return (
    <div className={`${styles.card} ${isLive ? styles.liveBorder : ''}`}>
      <div className={styles.header}>
        <div className={styles.badges}>
          {isLive ? (
            <span className={styles.liveBadge}>
              <span className="live-dot" /> LIVE NOW
            </span>
          ) : isCompleted ? (
            <span className={styles.completedBadge}>Completed</span>
          ) : (
            <span className={styles.upcomingBadge}>Upcoming</span>
          )}
          {batchName && <span className={styles.batchBadge}>{batchName}</span>}
        </div>
        {!isLive && !isCompleted && timeLeft && (
          <div className={styles.countdown}>
            <Clock size={13} /> {timeLeft}
          </div>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <User size={15} />
          <span>{instructor}</span>
        </div>
        {startTime && (
          <div className={styles.metaItem}>
            <Calendar size={15} />
            <span>{new Date(startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
        <div className={styles.metaItem}>
          <Clock size={15} />
          <span>{duration} mins</span>
        </div>
      </div>

      <div className={styles.footer}>
        {isLive ? (
          <button className={styles.joinBtn} onClick={onJoin}>
            <Video size={16} />
            Join Interactive Class
            <ArrowRight size={16} />
          </button>
        ) : (
          <button className={styles.viewBtn} disabled={isCompleted} onClick={onJoin}>
            {isCompleted ? 'Recording Coming Soon' : 'Set Reminder'}
          </button>
        )}
      </div>
    </div>
  );
}
