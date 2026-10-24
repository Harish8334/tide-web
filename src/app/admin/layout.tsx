// src/app/admin/layout.tsx
'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import AcademyLogo from '@/components/AcademyLogo';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Package,
  Video,
  FileText,
  ClipboardList,
  MessageSquare,
  BookMarked,
  Calculator,
  CalendarCheck,
  TrendingUp,
  X,
  Menu,
  LogOut,
  Settings,
  Plus,
} from 'lucide-react';
import styles from './layout.module.css';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, group: 'Overview' },
  { label: 'Students', href: '/admin/students', icon: Users, group: 'Management' },
  { label: 'Courses', href: '/admin/courses', icon: BookOpen, group: 'Management' },
  { label: 'Batches', href: '/admin/batches', icon: Package, group: 'Management' },
  { label: 'Live Classes', href: '/admin/live-classes', icon: Video, group: 'Academics' },
  { label: 'Exams & Quizzes', href: '/admin/exams', icon: FileText, group: 'Academics' },
  { label: 'Enrollments', href: '/admin/enrollments', icon: ClipboardList, group: 'Operations' },
  { label: 'Student Doubts', href: '/admin/doubts', icon: MessageSquare, group: 'Operations' },
  { label: 'DPP Problems', href: '/admin/dpp', icon: BookMarked, group: 'Academics' },
  { label: 'Formulas Handbook', href: '/admin/formulas', icon: Calculator, group: 'Academics' },
  { label: 'Attendance', href: '/admin/attendance', icon: CalendarCheck, group: 'Operations' },
  { label: 'Analytics', href: '/admin/analytics', icon: TrendingUp, group: 'Overview' },
];

function AdminPortalNav({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const displayName = user?.fullName || user?.name || 'Administrator';
  const userInitials = displayName
    ? displayName.split(' ').map((n: string) => n[0] || '').join('').substring(0, 2).toUpperCase()
    : 'AD';

  return (
    <>
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link href="/admin/dashboard" className={styles.brand} onClick={onClose}>
            <AcademyLogo size={32} />
            <span className={styles.brandText}>Tide Physics</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={styles.adminBadge}>ADMIN</span>
            <button className={styles.mobileCloseBtn} onClick={onClose} aria-label="Close admin menu">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            const prevItem = NAV_ITEMS[idx - 1];
            const showGroup = !prevItem || prevItem.group !== item.group;
            const IconComp = item.icon;

            return (
              <React.Fragment key={item.href}>
                {showGroup && <span className={styles.sectionLabel}>{item.group}</span>}
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  onClick={onClose}
                >
                  <IconComp size={18} />
                  <span>{item.label}</span>
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{userInitials}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userRole}>{user?.role?.toUpperCase() || 'ADMIN'}</div>
            </div>
          </div>

          <div className={styles.footerActions}>
            <Link href="/student/dashboard" className={styles.portalBtn} onClick={onClose}>
              Student View
            </Link>
            <button onClick={logout} className={styles.logoutBtn} title="Logout">
              <LogOut size={14} style={{ marginRight: 4 }} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className={styles.adminOverlay} onClick={onClose} aria-hidden="true" />
      )}
    </>
  );
}

function AdminHeader({ onToggle }: { onToggle: () => void }) {
  const pathname = usePathname();
  const currentItem = NAV_ITEMS.find(
    (item) => pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
  );
  const CurrentIcon = currentItem?.icon || Settings;

  return (
    <header className={styles.topBar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className={styles.mobileMenuToggle}
          onClick={onToggle}
          aria-label="Open admin navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className={styles.topBarTitle}>
          <CurrentIcon size={20} style={{ marginRight: 6 }} />
          <span>{currentItem?.label || 'Admin Portal'}</span>
        </h1>
      </div>
      <div className={styles.topBarActions}>
        <Link href="/admin/courses/new" className={styles.actionBtn}>
          <Plus size={14} style={{ marginRight: 4 }} /> New Course
        </Link>
        <Link href="/admin/exams/new" className={styles.actionBtn}>
          <Plus size={14} style={{ marginRight: 4 }} /> New Exam
        </Link>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <Suspense fallback={<div className="admin-loading-screen">Loading Administration...</div>}>
          <div className={styles.layout}>
            <AdminPortalNav mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <div className={styles.mainContent}>
              <AdminHeader onToggle={() => setMobileOpen(!mobileOpen)} />
              <main className={styles.pageBody}>{children}</main>
            </div>
          </div>
        </Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}
