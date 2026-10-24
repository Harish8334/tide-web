'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { authApi, courseApi, liveClassApi, examApi } from '@/lib/api';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Trophy, 
  Radio, 
  FileText, 
  Video, 
  MessageSquare, 
  Calculator, 
  RefreshCw, 
  Loader2, 
  ArrowRight, 
  BookMarked, 
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';
import styles from './page.module.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

interface Stats { enrolledCourses?: number; avgScore?: number; studyHours?: number; rank?: number; }
interface Course { _id: string; title: string; category?: string; level?: string; instructor?: { name?: string } | string; }
interface LiveClass { _id: string; title: string; status: string; startTime?: string; scheduledAt?: string; endTime?: string; duration?: number; }
interface ExamResult { _id: string; examId?: { title?: string } | string; score?: number; totalMarks?: number; createdAt?: string; }

function StatCard({ icon, label, value, color, href }: { icon: React.ReactNode; label: string; value: string | number; color: string; href?: string }) {
  const inner = (
    <div className={styles.statCard} style={{ borderTopColor: color }}>
      <div className={styles.statTop}>
        <div className={styles.statIcon} style={{ background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span className={styles.statArrow}><ArrowRight size={16} /></span>
      </div>
      <div className={styles.statValue}>{value ?? '—'}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
  if (href) return <Link href={href} style={{ textDecoration: 'none' }}>{inner}</Link>;
  return inner;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const firstName = user?.firstName || user?.name?.split(' ')[0] || 'Student';
  const greeting = getGreeting();

  const [stats, setStats] = useState<Stats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async () => {
    // Stats
    authApi.getStats().then((d: unknown) => {
      setStats((d as { data?: Stats }).data || (d as Stats));
    }).catch(() => {}).finally(() => setStatsLoading(false));

    // Enrolled courses
    courseApi.getEnrolled().then((d: unknown) => {
      const list = (d as { data?: Course[] }).data || (Array.isArray(d) ? d : []);
      setCourses((list as Course[]).slice(0, 6));
    }).catch(() => {}).finally(() => setCoursesLoading(false));

    // Live classes
    liveClassApi.getAll().then((d: unknown) => {
      const list = (d as { data?: LiveClass[] }).data || (Array.isArray(d) ? d : []);
      const now = Date.now();
      const active = (list as LiveClass[]).filter((c) => {
        if (['completed', 'cancelled'].includes(c.status)) return false;
        const start = new Date(c.startTime || c.scheduledAt || 0).getTime();
        const end = c.endTime ? new Date(c.endTime).getTime() : start + (c.duration || 60) * 60000;
        return end > now;
      }).slice(0, 3);
      setLiveClasses(active);
    }).catch(() => {});

    // Exam results
    examApi.getStudentResults().then((d: unknown) => {
      const list = (d as { data?: ExamResult[] }).data || (d as { results?: ExamResult[] }).results || (Array.isArray(d) ? d : []);
      setResults((list as ExamResult[]).slice(0, 5));
    }).catch(() => {});
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadAll();
    setRefreshing(false);
  };

  const isLive = (c: LiveClass) =>
    c.status === 'live' || c.status === 'ongoing' ||
    (c.status === 'scheduled' && new Date(c.startTime || c.scheduledAt || 0) <= new Date());

  const scoreColor = (pct: number) => pct >= 80 ? '#22C55E' : pct >= 60 ? '#F59E0B' : '#DC2626';

  return (
    <div className={styles.page}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.avatarCircle}>{(firstName[0] || 'S').toUpperCase()}</div>
          <div>
            <div className={styles.greeting}>{greeting},</div>
            <div className={styles.heroName} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {firstName}! <Sparkles size={20} color="#F59E0B" />
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <button 
            className={`btn btn-outline btn-sm ${refreshing ? 'btn-loading' : ''}`} 
            onClick={handleRefresh} 
            disabled={refreshing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />} Refresh
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Your Statistics</h2>
        <div className={styles.statsGrid}>
          {statsLoading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.statSkeleton}>
                <div className="skeleton" style={{ height: 20, width: '50%', borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 36, width: '70%', borderRadius: 6, marginTop: 8 }} />
                <div className="skeleton" style={{ height: 16, width: '60%', borderRadius: 6, marginTop: 6 }} />
              </div>
            ))
          ) : (
            <>
              <StatCard icon={<BookOpen size={22} color="#0056D2" />} label="Enrolled Courses" value={stats?.enrolledCourses ?? '—'} color="#0056D2" href="/student/courses" />
              <StatCard icon={<Target size={22} color={stats?.avgScore != null ? scoreColor(stats.avgScore) : '#94A3B8'} />} label="Average Score"
                value={stats?.avgScore != null ? `${Math.round(stats.avgScore)}%` : '—'}
                color={stats?.avgScore != null ? scoreColor(stats.avgScore) : '#94A3B8'}
                href="/student/exams" />
              <StatCard icon={<Clock size={22} color="#7C3AED" />} label="Study Hours" value={stats?.studyHours ?? '—'} color="#7C3AED" />
              <StatCard icon={<Trophy size={22} color="#F59E0B" />} label="Your Rank" value={stats?.rank ? `#${stats.rank}` : '—'} color="#FFD700" href="/student/leaderboard" />
            </>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickSection} aria-labelledby="quick-heading">
        <h3 id="quick-heading" className={styles.sectionTitle}>Quick Access</h3>
        <div className={styles.quickGrid}>
          {[
            { href: '/student/live-classes', icon: <Radio size={20} color="#DC2626" />, label: 'Live Classes', color: '#DC2626' },
            { href: '/student/exams', icon: <FileText size={20} color="#7C3AED" />, label: 'Exams', color: '#7C3AED' },
            { href: '/student/courses', icon: <BookOpen size={20} color="#0056D2" />, label: 'My Courses', color: '#0056D2' },
            { href: '/student/leaderboard', icon: <Trophy size={20} color="#F59E0B" />, label: 'Leaderboard', color: '#FFD700' },
            { href: '/student/doubts', icon: <MessageSquare size={20} color="#22C55E" />, label: 'Ask a Doubt', color: '#22C55E' },
            { href: '/student/formulas', icon: <Calculator size={20} color="#F59E0B" />, label: 'Formulas', color: '#F59E0B' },
          ].map((a) => (
            <Link key={a.href} href={a.href} className={styles.quickAction}>
              <div className={styles.quickIcon} style={{ background: `${a.color}15`, border: `1px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {a.icon}
              </div>
              <span className={styles.quickLabel}>{a.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom grid: courses + live + results */}
      <div className={styles.bottomGrid}>
        {/* Continue Learning */}
        <section className={styles.bottomCard} aria-labelledby="courses-heading">
          <div className={styles.cardHeader}>
            <h3 id="courses-heading" className={styles.sectionTitle}>Continue Learning</h3>
            <Link href="/student/courses" className={styles.seeAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>See All <ArrowRight size={14} /></Link>
          </div>
          {coursesLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ height: 60, borderRadius: 10 }} />
              ))}
            </div>
          ) : courses.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{ display: 'flex', justifyContent: 'center' }}><BookOpen size={36} color="#94A3B8" /></div>
              <p>No courses enrolled yet</p>
              <Link href="/student/courses" className="btn btn-primary btn-sm">Browse Courses</Link>
            </div>
          ) : (
            <div className={styles.courseList}>
              {courses.map((c) => (
                <Link key={c._id} href={`/student/courses/${c._id}`} className={styles.courseItem}>
                  <div className={styles.courseItemIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookMarked size={18} color="#0056D2" />
                  </div>
                  <div className={styles.courseItemInfo}>
                    <div className={styles.courseItemTitle}>{c.title}</div>
                    <div className={styles.courseItemMeta}>{c.category || 'Physics'}</div>
                  </div>
                  <span className={styles.courseItemArrow}><ArrowRight size={14} /></span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Live Classes widget */}
        <section className={styles.bottomCard} aria-labelledby="live-heading">
          <div className={styles.cardHeader}>
            <h3 id="live-heading" className={styles.sectionTitle}>Live Classes</h3>
            <Link href="/student/live-classes" className={styles.seeAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>See All <ArrowRight size={14} /></Link>
          </div>
          {liveClasses.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{ display: 'flex', justifyContent: 'center' }}><Video size={36} color="#94A3B8" /></div>
              <p>No upcoming classes</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {liveClasses.map((c) => {
                const live = isLive(c);
                return (
                  <div key={c._id} className={styles.liveItem}>
                    <div className={styles.liveItemHeader}>
                      {live ? (
                        <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE</span>
                      ) : (
                        <span className={`badge badge-info`} style={{ fontSize: '0.7rem' }}>UPCOMING</span>
                      )}
                    </div>
                    <div className={styles.liveItemTitle}>{c.title}</div>
                    {live && (
                      <Link href={`/student/live/${c._id}`} className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        Join Now <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent Results */}
        <section className={styles.bottomCard} aria-labelledby="results-heading">
          <div className={styles.cardHeader}>
            <h3 id="results-heading" className={styles.sectionTitle}>Recent Results</h3>
            <Link href="/student/exams" className={styles.seeAll} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>See All <ArrowRight size={14} /></Link>
          </div>
          {results.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{ display: 'flex', justifyContent: 'center' }}><BarChart3 size={36} color="#94A3B8" /></div>
              <p>No exams attempted yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {results.map((r) => {
                const examTitle = typeof r.examId === 'object' ? r.examId?.title : 'Exam';
                const pct = r.score != null && r.totalMarks ? Math.round((r.score / r.totalMarks) * 100) : null;
                return (
                  <div key={r._id} className={styles.resultItem}>
                    <div className={styles.resultTitle}>{examTitle || 'Exam'}</div>
                    {pct != null && (
                      <div className={styles.resultScore} style={{ color: scoreColor(pct) }}>
                        {r.score}/{r.totalMarks} <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>({pct}%)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
