// src/app/student/live-classes/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { liveClassApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import LiveClassCard from '@/components/LiveClassCard';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';
import styles from './page.module.css';
import { Video, RefreshCw, Calendar, Clock, Radio } from 'lucide-react';

interface ClassItem {
  _id: string;
  title: string;
  instructor?: { name?: string } | string;
  batch?: { name?: string } | string;
  startTime?: string;
  scheduledAt?: string;
  endTime?: string;
  duration?: number;
  status: 'scheduled' | 'live' | 'ongoing' | 'completed' | 'cancelled';
}

const DEMO_CLASSES: ClassItem[] = [
  {
    _id: 'live-1',
    title: 'Quantum Mechanics: Wave Packets & 1D Potential Barriers',
    instructor: 'Dr. Rajesh Sharma',
    batch: 'CSIR-NET JRF Super 30',
    status: 'live',
    startTime: new Date(Date.now() - 15 * 60000).toISOString(),
    duration: 90,
  },
  {
    _id: 'live-2',
    title: 'Electromagnetic Wave Propagation in Plasma & Dielectrics',
    instructor: 'Dr. Vikram Malhotra',
    batch: 'M.Sc Semester 2 Batch A',
    status: 'scheduled',
    startTime: new Date(Date.now() + 4 * 3600000).toISOString(),
    duration: 60,
  },
  {
    _id: 'live-3',
    title: 'Classical Mechanics: Lagrangian Formalism & Noether Theorem',
    instructor: 'Prof. Ananya Sen',
    batch: 'GATE Physics Target 2026',
    status: 'scheduled',
    startTime: new Date(Date.now() + 26 * 3600000).toISOString(),
    duration: 75,
  },
  {
    _id: 'live-4',
    title: 'Thermodynamics & Ensembles: Canonical vs Grand Canonical',
    instructor: 'Dr. Vikram Malhotra',
    batch: 'M.Sc Semester 1 Core',
    status: 'completed',
    startTime: new Date(Date.now() - 48 * 3600000).toISOString(),
    duration: 60,
  },
];

export default function LiveClassesPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');

  const fetchClasses = useCallback(async () => {
    try {
      const res: unknown = await liveClassApi.getAll();
      const list = (res as { data?: ClassItem[] }).data || (Array.isArray(res) ? res : []);
      if (list.length > 0) {
        setClasses(list);
      } else {
        setClasses(DEMO_CLASSES);
      }
    } catch {
      setClasses(DEMO_CLASSES);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
    // Poll every 30 seconds for live status
    const interval = setInterval(fetchClasses, 30000);
    return () => clearInterval(interval);
  }, [fetchClasses]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchClasses();
  };

  const handleJoinClass = async (classId: string) => {
    try {
      await liveClassApi.join(classId);
    } catch {
      // Allow proceeding even if server join endpoint throws
    }
    showToast('Entering interactive live classroom...', 'success');
    router.push(`/student/live/${classId}`);
  };

  const isLive = (c: ClassItem) => c.status === 'live' || c.status === 'ongoing';
  const isPast = (c: ClassItem) => c.status === 'completed' || c.status === 'cancelled';
  const isUpcoming = (c: ClassItem) => !isLive(c) && !isPast(c);

  const liveCount = classes.filter(isLive).length;

  const filteredList = classes.filter((c) => {
    if (activeTab === 'live') return isLive(c);
    if (activeTab === 'upcoming') return isUpcoming(c);
    if (activeTab === 'past') return isPast(c);
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.5rem' }}>
            <Radio size={14} className={liveCount > 0 ? styles.pulseIcon : ''} />
            Live Broadcasting Portal
          </div>
          <h1 className={styles.title}>Live Interactive Sessions</h1>
          <p className={styles.subtitle}>
            Join real-time lecture streams with digital whiteboards, audio Q&amp;A, and live problem-solving.
          </p>
        </div>

        <button
          className={`btn btn-outline btn-sm ${refreshing ? 'btn-loading' : ''}`}
          onClick={handleManualRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          Refresh Schedules
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Classes ({classes.length})
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'live' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('live')}
        >
          <span className={styles.liveIndicator}>
            <span className="live-dot" /> Live Now ({liveCount})
          </span>
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'past' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past / Concluded
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Loader text="Loading live class schedules..." />
      ) : filteredList.length === 0 ? (
        <EmptyState
          icon={<Video size={40} color="var(--primary-light)" />}
          title={activeTab === 'live' ? 'No live classes right now' : 'No classes found in this category'}
          description="Check upcoming schedules or revisit recorded lectures under Study Materials."
          actionLabel="Show All Schedules"
          onAction={() => setActiveTab('all')}
        />
      ) : (
        <div className={styles.grid}>
          {filteredList.map((c) => {
            const instructorName = typeof c.instructor === 'object' ? c.instructor?.name : c.instructor;
            const batchName = typeof c.batch === 'object' ? c.batch?.name : c.batch;

            return (
              <LiveClassCard
                key={c._id}
                id={c._id}
                title={c.title}
                instructor={instructorName}
                batchName={batchName}
                startTime={c.startTime || c.scheduledAt}
                status={c.status}
                duration={c.duration}
                onJoin={() => handleJoinClass(c._id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
