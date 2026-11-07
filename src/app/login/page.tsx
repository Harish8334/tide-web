'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider, useToast } from '@/context/ToastContext';
import { 
  Atom, 
  Check, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  GraduationCap, 
  UserCheck, 
  KeyRound 
} from 'lucide-react';
import '@/styles/globals.css';
import styles from './page.module.css';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, isSignedIn, user } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const redirect = searchParams?.get('redirect') || null;

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn && user) {
      const dest = redirect || (user.role === 'student' ? '/student/dashboard' : '/admin/dashboard');
      router.replace(dest);
    }
  }, [isSignedIn, user, redirect, router]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      document.getElementById('email')?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await login(email, password);
      showToast('Welcome back! Redirecting...', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      showToast(msg, 'error');
      setErrors({ form: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.authNav}>
        <nav className={styles.navInner}>
          <Link href="/" className={styles.navBrand}>
            <Atom size={22} className="text-primary" /> Tide Physics Academy
          </Link>
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/register">New Student? Register</Link>
          </div>
        </nav>
      </header>
      <div className={styles.page}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <Link href="/" className={styles.logoLink}>
              <span className={styles.logoIcon}>
                <Atom size={26} color="#0056D2" />
              </span>
              <span className={styles.logoText}>Tide Physics Academy</span>
            </Link>
          <div className={styles.leftHero}>
            <h1 className={styles.leftTitle}>Tamil Nadu’s Premier<br /><span className="gradient-text">Physics Coaching</span></h1>
            <p className={styles.leftDesc}>500+ Students Mastering for PG TRB &amp; UG TRB with Bed., SET., AP TRB (Assistant Professor) with Tamil Nadu’s most advanced online platform.</p>
            <div className={styles.leftBullets}>
              {['Live interactive classes daily', 'AI-powered exam analytics', 'Expert faculty mentorship', 'Complete Physics coverage'].map((b) => (
                <div key={b} className={styles.bullet}>
                  <span className={styles.bulletCheck}><Check size={14} strokeWidth={3} /></span>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.leftQuote}>
            <p>&ldquo;Remember to look up at the stars and not down at your feet.&rdquo;</p>
            <span>— Stephen Hawking</span>
          </div>
          <div className={styles.mottoCard}>
            <div className={styles.mottoBadge}>TIDE PHYSICS ACADEMY — MOTTO</div>
            <div className={styles.mottoHeadline}>&ldquo;MASTER THE CONCEPTS, CONQUER THE EXAM.&rdquo;</div>
            <div className={styles.mottoSub}>THINK LIKE A PHYSICIST • ACHIEVE LIKE A CHAMPION</div>
            <ul className={styles.mottoList}>
              <li>&ldquo;Think like Einstein. Work like Newton. Win like a champion.&rdquo;</li>
              <li>&ldquo;Dream beyond limits. Discover beyond boundaries.&rdquo;</li>
              <li>&ldquo;Every problem is an opportunity to prove your potential.&rdquo;</li>
              <li>&ldquo;Master the concepts. Conquer the examination.&rdquo;</li>
              <li>&ldquo;Your dedication today determines your success tomorrow.&rdquo;</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Welcome back</h2>
            <p className={styles.formSubtitle}>Sign in to continue your Physics journey</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {errors.form && (
              <div className={styles.formError} role="alert" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={18} /> {errors.form}
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="you@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                autoComplete="email"
                required
              />
              {errors.email && <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} /> {errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <div className={styles.labelRow}>
                <label htmlFor="password" className="form-label">Password</label>
                <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="form-error" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertCircle size={14} /> {errors.password}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn btn-primary btn-full btn-lg ${submitting || isLoading ? 'btn-loading' : ''}`}
              disabled={submitting || isLoading}
              aria-busy={submitting || isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {submitting || isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in…
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          {/* Demo logins */}
          <div className={styles.demoSection}>
            <p className={styles.demoTitle}>Quick Demo Login</p>
            <div className={styles.demoBtns}>
              <button
                type="button"
                className={`btn btn-outline btn-sm ${styles.demoBtn}`}
                onClick={() => { setEmail('student@physics.edu'); setPassword('physics123'); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <GraduationCap size={16} color="#0056D2" /> Student Demo
              </button>
              <button
                type="button"
                className={`btn btn-outline btn-sm ${styles.demoBtn}`}
                onClick={() => { setEmail('faculty@physics.edu'); setPassword('faculty123'); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <UserCheck size={16} color="#22C55E" /> Faculty Demo
              </button>
              <button
                type="button"
                className={`btn btn-outline btn-sm ${styles.demoBtn}`}
                onClick={() => { setEmail('admin@physics.edu'); setPassword('admin123'); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <KeyRound size={16} color="#F59E0B" /> Admin Demo
              </button>
            </div>
          </div>

          <p className={styles.registerLink}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className={styles.registerAnchor}>Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>Loading...</div>}>
          <LoginForm />
        </React.Suspense>
      </ToastProvider>
    </AuthProvider>
  );
}
