// src/app/admin/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { authApi, courseApi, liveClassApi, examApi, batchApi } from '@/lib/api';
import {
  Users,
  BookOpen,
  Package,
  Video,
  ClipboardList,
  Clock,
  FileText,
  TrendingUp,
  MessageSquare,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  User,
  Timer,
  CheckCircle2,
} from 'lucide-react';
import styles from './page.module.css';

const ENROLLMENT_DATA = [
  { name: 'Quantum Mech', students: 142 },
  { name: 'Classical Dyn', students: 98 },
  { name: 'Electrodynamics', students: 124 },
  { name: 'Stat Mech', students: 86 },
  { name: 'Solid State', students: 73 },
  { name: 'Nuclear Phys', students: 65 },
];

const STATUS_DATA = [
  { name: 'Active', value: 480, color: '#10B981' },
  { name: 'Pending', value: 34, color: '#F59E0B' },
  { name: 'Suspended', value: 12, color: '#EF4444' },
];

const SCORE_TRENDS = [
  { month: 'May', avgScore: 68 },
  { month: 'Jun', avgScore: 71 },
  { month: 'Jul', avgScore: 74 },
  { month: 'Aug', avgScore: 72 },
  { month: 'Sep', avgScore: 78 },
  { month: 'Oct', avgScore: 82 },
];

const RECENT_ACTIVITIES = [
  { id: '1', icon: <User size={16} color="#0056D2" />, text: 'Arjun Verma registered as student (Pending Approval)', time: '4 mins ago' },
  { id: '2', icon: <FileText size={16} color="#7C3AED" />, text: 'Priya Sharma submitted CSIR-NET Quantum Mock (Score: 88%)', time: '18 mins ago' },
  { id: '3', icon: <ClipboardList size={16} color="#22C55E" />, text: 'Rohan Mehra requested enrollment in Electrodynamics Core', time: '35 mins ago' },
  { id: '4', icon: <Video size={16} color="#DC2626" />, text: 'Prof. V. Raman completed live lecture "Perturbation Theory"', time: '1 hour ago' },
  { id: '5', icon: <MessageSquare size={16} color="#F59E0B" />, text: 'New doubt submitted on "Wavepacket Dispersion"', time: '2 hours ago' },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 526,
    activeCourses: 12,
    totalBatches: 8,
    liveClassesToday: 3,
    pendingEnrollments: 7,
    pendingApprovals: 5,
    totalExams: 24,
    avgScore: 76.4,
  });

  const [countdownText, setCountdownText] = useState('CSIR-NET Physical Sciences Exam: 48 Days Left');

  useEffect(() => {
    setMounted(true);

    const loadStats = async () => {
      try {
        const [usersRes, coursesRes, liveRes, examsRes, batchesRes] = await Promise.allSettled([
          authApi.getStudents(),
          courseApi.getAll(),
          liveClassApi.getAll(),
          examApi.getAll(),
          batchApi.getAll(),
        ]);

        const totalStudents = usersRes.status === 'fulfilled' && (usersRes.value as any)?.data
          ? ((usersRes.value as any).data.students?.length || (usersRes.value as any).data.length || 526)
          : 526;

        const activeCourses = coursesRes.status === 'fulfilled' && (coursesRes.value as any)?.data
          ? (((coursesRes.value as any).data.courses || (coursesRes.value as any).data)?.length || 12)
          : 12;

        const liveClassesToday = liveRes.status === 'fulfilled' && (liveRes.value as any)?.data
          ? (((liveRes.value as any).data.classes || (liveRes.value as any).data)?.length || 3)
          : 3;

        const totalExams = examsRes.status === 'fulfilled' && (examsRes.value as any)?.data
          ? (((examsRes.value as any).data.exams || (examsRes.value as any).data)?.length || 24)
          : 24;

        const totalBatches = batchesRes.status === 'fulfilled' && (batchesRes.value as any)?.data
          ? (((batchesRes.value as any).data.batches || (batchesRes.value as any).data)?.length || 8)
          : 8;

        setStats((prev) => ({
          ...prev,
          totalStudents,
          activeCourses,
          liveClassesToday,
          totalExams,
          totalBatches,
        }));
      } catch {
        // Keep initial metrics on error
      }
    };

    loadStats();
  }, []);

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, icon: <Users size={22} color="#0056D2" />, color: 'statCardBlue', href: '/admin/students' },
    { label: 'Active Courses', value: stats.activeCourses, icon: <BookOpen size={22} color="#16A34A" />, color: 'statCardGreen', href: '/admin/courses' },
    { label: 'Total Batches', value: stats.totalBatches, icon: <Package size={22} color="#7C3AED" />, color: 'statCardPurple', href: '/admin/batches' },
    { label: 'Live Classes Today', value: stats.liveClassesToday, icon: <Video size={22} color="#DC2626" />, color: 'statCardRed', href: '/admin/live-classes' },
    { label: 'Pending Enrollments', value: stats.pendingEnrollments, icon: <ClipboardList size={22} color="#D97706" />, color: 'statCardAmber', href: '/admin/enrollments' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, icon: <Clock size={22} color="#DC2626" />, color: 'statCardRed', href: '/admin/students?status=pending' },
    { label: 'Total Exams', value: stats.totalExams, icon: <FileText size={22} color="#0284C7" />, color: 'statCardBlue', href: '/admin/exams' },
    { label: 'Avg Exam Score', value: stats.avgScore, icon: <TrendingUp size={22} color="#16A34A" />, color: 'statCardGreen', href: '/admin/analytics' },
  ];

  const quickActions = [
    { icon: <BookOpen size={22} color="#0056D2" />, title: 'Create Course', desc: 'Design syllabus, units & pricing', href: '/admin/courses/new' },
    { icon: <Users size={22} color="#16A34A" />, title: 'Manage Students', desc: 'Approve, suspend & assign batches', href: '/admin/students' },
    { icon: <Video size={22} color="#DC2626" />, title: 'Schedule Class', desc: 'Setup live stream & interactive room', href: '/admin/live-classes/new' },
    { icon: <FileText size={22} color="#7C3AED" />, title: 'Create Exam', desc: 'Build MCQ tests with auto-marking', href: '/admin/exams/new' },
    { icon: <Package size={22} color="#D97706" />, title: 'Manage Batches', desc: 'Organize student groups & schedules', href: '/admin/batches' },
    { icon: <ClipboardList size={22} color="#0284C7" />, title: 'Enrollment Requests', desc: 'Review & approve student requests', href: '/admin/enrollments' },
    { icon: <MessageSquare size={22} color="#22C55E" />, title: 'Student Doubts', desc: 'Answer physics questions with LaTeX', href: '/admin/doubts' },
    { icon: <TrendingUp size={22} color="#8B5CF6" />, title: 'View Analytics', desc: 'Inspect performance & score trends', href: '/admin/analytics' },
  ];

  return (
    <div className={styles.container}>
      {/* Countdown Timer Widget */}
      <div className={styles.countdownBanner}>
        <div className={styles.countdownInfo}>
          <span className={styles.countdownIcon} style={{ display: 'flex', alignItems: 'center' }}>
            <Timer size={24} color="#0056D2" />
          </span>
          <div>
            <div className={styles.countdownTitle}>Active Institute Countdown</div>
            <div className={styles.countdownTime}>{countdownText}</div>
          </div>
        </div>
        <button
          onClick={() => {
            const newT = prompt('Update countdown text:', countdownText);
            if (newT) setCountdownText(newT);
          }}
          className={styles.countdownBtn}
        >
          Edit Countdown
        </button>
      </div>

      {/* 8 Hero Stats Cards */}
      <div className={styles.statsGrid}>
        {statCards.map((c, i) => (
          <Link
            key={i}
            href={c.href}
            className={`${styles.statCard} ${styles[c.color]}`}
            data-testid={`stat-${c.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className={styles.statIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.icon}</div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>{c.value}</div>
              <div className={styles.statLabel}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart3 size={18} color="#0056D2" /> Student Enrollment by Course
          </div>
          <div className={styles.chartBody}>
            {mounted && (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={ENROLLMENT_DATA}>
                  <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                  <Bar dataKey="students" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PieChartIcon size={18} color="#7C3AED" /> Student Status Breakdown
          </div>
          <div className={styles.chartBody}>
            {mounted && (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={STATUS_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Score Trend Full-Width */}
      <div className={styles.fullWidthChartCard}>
        <div className={styles.chartTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={18} color="#16A34A" /> Average Exam Score Trend (Last 6 Months)
        </div>
        <div className={styles.chartBody}>
          {mounted && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={SCORE_TRENDS}>
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className={styles.quickActionsSection}>
        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={20} color="#F59E0B" /> Quick Admin Actions
        </h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((qa, idx) => (
            <Link key={idx} href={qa.href} className={styles.actionTile}>
              <span className={styles.actionTileIcon} style={{ display: 'flex', alignItems: 'center' }}>{qa.icon}</span>
              <span className={styles.actionTileTitle}>{qa.title}</span>
              <span className={styles.actionTileDesc}>{qa.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className={styles.activityCard}>
        <h2 className={styles.sectionTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} color="#64748B" /> Recent System Activity
        </h2>
        <div className={styles.activityList}>
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className={styles.activityItem}>
              <div className={styles.activityMain}>
                <span className={styles.activityIcon} style={{ display: 'flex', alignItems: 'center' }}>{act.icon}</span>
                <span className={styles.activityText}>{act.text}</span>
              </div>
              <span className={styles.activityTime}>{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
