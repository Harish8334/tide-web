// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AcademyLogo from './AcademyLogo';
import {
  Flame,
  Phone,
  Rocket,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  LogIn,
} from 'lucide-react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'All Courses' },
  { href: '/about', label: 'About Academy' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, isSignedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = user?.fullName || user?.name || user?.firstName || 'Student';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0] || '')
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const dashboardHref =
    user?.role === 'admin' || user?.role === 'instructor'
      ? '/admin/dashboard'
      : '/student/dashboard';

  return (
    <>
      {/* Top Academic Notification & Helpline Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementContainer}>
          <div className={styles.announcementLeft}>
            <span className={styles.hotBadge}>
              <Flame size={12} style={{ marginRight: 4, display: 'inline' }} /> ADMISSIONS OPEN
            </span>
            <span className={styles.announcementText}>
              CSIR-NET JRF &amp; GATE 2026-27 Comprehensive Batches Starting Soon! Get 50% Early Bird Scholarship.
            </span>
          </div>
          <div className={styles.announcementRight}>
            <a href="tel:+919876543210" className={styles.phoneLink}>
              <Phone size={13} className={styles.phoneIcon} />
              <span>Helpline: +91 98765 43210</span>
            </a>
            <Link href="/contact" className={styles.callbackLink}>
              Request Callback
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo with Academy Emblem */}
          <Link href="/" className={styles.logo}>
            <AcademyLogo size={42} />
            <div className={styles.logoTextContainer}>
              <div className={styles.logoTitle}>
                Tide <span>Physics</span> Academy
              </div>
              <div className={styles.logoSub}>Premier Institute for Physical Sciences</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className={styles.desktopNav}>
            <ul className={styles.links}>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.link} ${isActive ? styles.active : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className={styles.actions}>
            {isSignedIn ? (
              <div className={styles.userMenu} ref={dropRef}>
                <button
                  className={styles.avatar}
                  onClick={() => setDropOpen(!dropOpen)}
                  aria-label="User Account"
                >
                  {initials}
                </button>
                {dropOpen && (
                  <div className={styles.dropdown}>
                    <div className={styles.dropHeader}>
                      <div className={styles.dropName}>{displayName}</div>
                      <div className={styles.dropRole}>{user?.role}</div>
                    </div>
                    <Link href={dashboardHref} className={styles.dropItem}>
                      <LayoutDashboard size={15} style={{ marginRight: 6 }} /> Go to Dashboard
                    </Link>
                    <Link href="/student/profile" className={styles.dropItem}>
                      <UserIcon size={15} style={{ marginRight: 6 }} /> My Profile
                    </Link>
                    <button onClick={logout} className={styles.dropLogout}>
                      <LogOut size={14} style={{ marginRight: 6 }} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className={styles.loginBtn}>
                  <LogIn size={15} style={{ marginRight: 6 }} /> Student Login
                </Link>
                <Link href="/courses" className={styles.enrollBtn}>
                  Enroll Now <Rocket size={15} style={{ marginLeft: 4 }} />
                </Link>
              </>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`${styles.mobileDrawer} ${mobileOpen ? styles.drawerOpen : ''}`}
          aria-hidden={!mobileOpen}
          {...(!mobileOpen ? { inert: true } : {})}
        >
          <div className={styles.drawerInner}>
            <div className={styles.drawerHeader}>
              <Link href="/" className={styles.drawerLogo} onClick={() => setMobileOpen(false)}>
                <AcademyLogo size={32} />
                <span>Tide Physics Academy</span>
              </Link>
              <button
                className={styles.drawerCloseBtn}
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links in Drawer */}
            <nav className={styles.drawerNav}>
              <ul className={styles.drawerList}>
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Action Buttons in Drawer */}
            <div className={styles.drawerActions}>
              {isSignedIn ? (
                <>
                  <div className={styles.drawerUserCard}>
                    <div className={styles.drawerAvatar}>{initials}</div>
                    <div>
                      <div className={styles.dropName}>{displayName}</div>
                      <div className={styles.dropRole}>{user?.role}</div>
                    </div>
                  </div>
                  <Link
                    href={dashboardHref}
                    className={styles.drawerPrimaryBtn}
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard size={16} style={{ marginRight: 6 }} /> Enter Learning Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className={styles.drawerLogoutBtn}
                  >
                    <LogOut size={15} style={{ marginRight: 6 }} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/courses"
                    className={styles.drawerPrimaryBtn}
                    onClick={() => setMobileOpen(false)}
                  >
                    Enroll in Live Batches <Rocket size={15} style={{ marginLeft: 6 }} />
                  </Link>
                  <Link
                    href="/login"
                    className={styles.drawerSecondaryBtn}
                    onClick={() => setMobileOpen(false)}
                  >
                    Student Portal Login
                  </Link>
                  <Link
                    href="/register"
                    className={styles.drawerTextBtn}
                    onClick={() => setMobileOpen(false)}
                  >
                    New Student? Register Now
                  </Link>
                </>
              )}
            </div>

            {/* Helpline Section in Drawer */}
            <div className={styles.drawerHelpline}>
              <div className={styles.helplineLabel}>Need Admission Guidance?</div>
              <a href="tel:+919876543210" className={styles.drawerPhoneLink}>
                <Phone size={14} style={{ marginRight: 6 }} /> Call +91 98765 43210
              </a>
              <div className={styles.helplineSub}>Daily 8:00 AM – 9:00 PM (IST)</div>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        {mobileOpen && (
          <div
            className={styles.mobileOverlay}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    </>
  );
}
