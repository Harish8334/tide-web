// src/app/student/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import '@/styles/globals.css';
import AcademyLogo from '@/components/AcademyLogo';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  FolderGit2,
  Trophy,
  MessageSquare,
  Calculator,
  BookMarked,
  CalendarCheck,
  User as UserIcon,
  LogOut,
  Menu,
  Home,
} from 'lucide-react';
import styles from './layout.module.css';

const NAV_ITEMS = [
  { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/student/courses', icon: BookOpen, label: 'My Courses' },
  { href: '/student/live-classes', icon: Video, label: 'Live Classes' },
  { href: '/student/exams', icon: FileText, label: 'Exams' },
  { href: '/student/study-material', icon: FolderGit2, label: 'Study Material' },
  { href: '/student/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/student/doubts', icon: MessageSquare, label: 'Ask a Doubt' },
  { href: '/student/formulas', icon: Calculator, label: 'Formulas' },
  { href: '/student/mistakes', icon: BookMarked, label: 'Mistake Notebook' },
  { href: '/student/attendance', icon: CalendarCheck, label: 'Attendance' },
  { href: '/student/profile', icon: UserIcon, label: 'Profile' },
];

const PAGE_TITLES: Record<string, string> = {
  '/student/dashboard': 'Dashboard',
  '/student/courses': 'My Courses',
  '/student/live-classes': 'Live Classes',
  '/student/exams': 'Exams',
  '/student/study-material': 'Study Material',
  '/student/leaderboard': 'Leaderboard',
  '/student/doubts': 'Ask a Doubt',
  '/student/formulas': 'Formula Handbook',
  '/student/mistakes': 'Mistake Notebook',
  '/student/attendance': 'Attendance',
  '/student/profile': 'Profile',
};

function PortalContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isSignedIn, isLoading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isSignedIn) router.replace('/login');
  }, [isLoading, isSignedIn, router]);

  if (isLoading || !isSignedIn) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0F172A' }}>
        <div className="animate-spin" style={{ width: 36, height: 36, border: '3px solid #2D3F55', borderTopColor: '#0056D2', borderRadius: '50%' }} />
      </div>
    );
  }

  const displayName = user?.firstName || user?.name?.split(' ')[0] || 'Student';
  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] || ''}`.toUpperCase()
    : (user?.name?.[0] || 'S').toUpperCase();

  const pageTitle = Object.entries(PAGE_TITLES).find(([key]) => pathname?.startsWith(key))?.[1] || 'Portal';

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`} aria-label="Student navigation">
        {/* Brand */}
        <div className={styles.sidebarBrand}>
          <Link href="/" className={styles.brandLink}>
            <AcademyLogo size={32} />
            <span className={styles.brandText}>Tide Physics Academy</span>
          </Link>
        </div>

        {/* User card */}
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{initials}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userRole}>{user?.role}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Student menu">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => {
              const active = pathname?.startsWith(item.href);
              const IconComp = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={styles.navIcon}>
                      <IconComp size={18} />
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                    {item.label === 'Live Classes' && (
                      <span className={styles.livePip} aria-label="Live classes available" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={16} style={{ marginRight: 6 }} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Main content */}
      <div className={styles.main}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <div className={styles.topLeft}>
            <button
              className={styles.menuBtn}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
          </div>
          <div className={styles.topRight}>
            <Link href="/" className={styles.topHomeLink} title="Back to home">
              <Home size={18} />
            </Link>
            <div className={styles.topAvatar}>{initials}</div>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <React.Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#94A3B8' }}>Loading portal...</div>}>
          <PortalContent>{children}</PortalContent>
        </React.Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}
