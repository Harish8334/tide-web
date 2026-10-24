// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider, useToast } from '@/context/ToastContext';
import styles from './page.module.css';
import { User, Shield, ArrowRight, ArrowLeft, CheckCircle2, Clock, Eye, EyeOff, Atom, Check, Loader2 } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'student' | 'instructor'>('student');

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    program: 'M.Sc Physics',
    institution: '',
    district: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const updateField = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    const fullName = (formData as any).name || '';
    if (!formData.firstName.trim() && fullName.trim()) {
      const parts = fullName.trim().split(' ');
      formData.firstName = parts[0] || 'Student';
      formData.lastName = parts.slice(1).join(' ') || 'Aspirant';
    }
    if (!formData.firstName.trim() && !fullName.trim()) errs.firstName = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!formData.institution.trim()) errs.institution = 'Institution / University is required';
    if (!formData.district.trim()) errs.district = 'City / District is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await register({
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role,
        program: formData.program,
        institution: formData.institution,
        district: formData.district,
      });

      showToast('Registration submitted successfully!', 'success');
      setIsRegistered(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check your data.';
      showToast(msg, 'error');
      setErrors({ form: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            {role === 'student' ? (
              <>
                <div className={styles.iconCirclePending}>
                  <Clock size={40} />
                </div>
                <h1 className={styles.successTitle}>Application Under Review</h1>
                <p className={styles.successDesc}>
                  Your student account for <strong>{formData.email}</strong> has been created with status{' '}
                  <span className="badge badge-warning">Pending Approval</span>.
                </p>
                <div className={styles.infoBox}>
                  <strong>What happens next?</strong>
                  <p>Our academic administration will verify your academic enrollment details within 24 hours. You will receive an email once your access is activated.</p>
                </div>
                <Link href="/login" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
                  Proceed to Login
                </Link>
              </>
            ) : (
              <>
                <div className={styles.iconCircleSuccess}>
                  <CheckCircle2 size={40} />
                </div>
                <h1 className={styles.successTitle}>Instructor Registration Complete</h1>
                <p className={styles.successDesc}>
                  Your educator credentials have been created. Log in to access the instructor dashboard.
                </p>
                <Link href="/login" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}>
                  Proceed to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.authNav}>
        <nav className={styles.navInner}>
          <Link href="/" className={styles.navBrand} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Atom size={22} className="text-primary" /> Tide Physics Academy
          </Link>
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/login">Already registered? Log In</Link>
          </div>
        </nav>
      </header>
      <div className={styles.page}>
        <div className={styles.leftPanel}>
          <Link href="/" className={styles.logo} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Atom size={26} color="#0056D2" /> Tide Physics<span className={styles.logoAccent}> Academy</span>
          </Link>
        <div className={styles.heroText}>
          <h2>Join India&apos;s Premier Physics Coaching Portal</h2>
          <p>
            Experience interactive live classes, comprehensive test series, virtual laboratory simulations, and personalized doubt clearance.
          </p>
          <div className={styles.benefitList}>
            <div className={styles.benefitItem} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} strokeWidth={2.5} color="#22C55E" /> Access to 50+ Specialized Physics Courses</div>
            <div className={styles.benefitItem} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} strokeWidth={2.5} color="#22C55E" /> Daily Live Sessions with Interactive Whiteboard</div>
            <div className={styles.benefitItem} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16} strokeWidth={2.5} color="#22C55E" /> Auto-Graded CSIR-NET &amp; GATE Mock Tests</div>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          {/* Progress Bar */}
          <div className={styles.progressHeader}>
            <div className={styles.stepCounter}>
              Step {step} of 4: {step === 1 ? 'Select Role' : step === 2 ? 'Personal Details' : step === 3 ? 'Academic Info' : 'Review & Submit'}
            </div>
            <div className={styles.progressBarBg}>
              <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {errors.form && (
            <div className={styles.formAlert}>
              {errors.form}
            </div>
          )}

          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h1 className={styles.stepTitle}>Select Your Role</h1>
              <p className={styles.stepSub}>Select how you will be participating on the portal.</p>

              <div className={styles.roleGrid}>
                <div
                  className={`${styles.roleCard} ${role === 'student' ? styles.roleActive : ''}`}
                  onClick={() => setRole('student')}
                >
                  <div className={styles.roleIcon}>
                    <User size={32} />
                  </div>
                  <h3>Postgraduate / Aspirant</h3>
                  <p>Enrolling for M.Sc, CSIR-NET, GATE, or university examinations.</p>
                </div>

                <div
                  className={`${styles.roleCard} ${role === 'instructor' ? styles.roleActive : ''}`}
                  onClick={() => setRole('instructor')}
                >
                  <div className={styles.roleIcon}>
                    <Shield size={32} />
                  </div>
                  <h3>Educator / Instructor</h3>
                  <p>Conducting live classes, managing batches, evaluating exams, and mentoring.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL INFORMATION */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h1 className={styles.stepTitle}>Personal Details</h1>
              <p className={styles.stepSub}>Enter your contact information and create a secure password.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="e.g. Subhash Chandra"
                  value={(formData as any).name ?? `${formData.firstName} ${formData.lastName}`.trim()}
                  onChange={(e) => {
                    const val = e.target.value;
                    updateField('name', val);
                    const parts = val.trim().split(' ');
                    updateField('firstName', parts[0] || '');
                    updateField('lastName', parts.slice(1).join(' ') || '');
                  }}
                />
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regEmail">Email Address *</label>
                <input
                  id="regEmail"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone / WhatsApp Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="regPassword">Password *</label>
                <div className={styles.passwordWrapper}>
                  <input
                    id="regPassword"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                  />
                  {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                </div>
            </div>
          )}

          {/* STEP 3: ACADEMIC INFORMATION */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h1 className={styles.stepTitle}>Academic Credentials</h1>
              <p className={styles.stepSub}>This helps faculty curate batch schedules and test series for you.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="program">Primary Target Program *</label>
                <select
                  id="program"
                  className="form-input form-select"
                  value={formData.program}
                  onChange={(e) => updateField('program', e.target.value)}
                >
                  <option value="M.Sc Physics">M.Sc Physics (Entrance &amp; Semester)</option>
                  <option value="CSIR-NET Physics">CSIR-NET (JRF / LS) Physics</option>
                  <option value="GATE Physics">GATE Physics</option>
                  <option value="B.Ed Pedagogy">B.Ed &amp; Physics Pedagogy</option>
                  <option value="Other">Other University Exam</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="institution">Current College / University *</label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  className={`form-input ${errors.institution ? 'error' : ''}`}
                  placeholder="e.g. Delhi University / BHU / IIT"
                  value={formData.institution}
                  onChange={(e) => updateField('institution', e.target.value)}
                />
                {errors.institution && <span className="form-error">{errors.institution}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="district">District / City *</label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  className={`form-input ${errors.district ? 'error' : ''}`}
                  placeholder="e.g. New Delhi / Jaipur / Varanasi"
                  value={formData.district}
                  onChange={(e) => updateField('district', e.target.value)}
                />
                {errors.district && <span className="form-error">{errors.district}</span>}
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {step === 4 && (
            <div className={styles.stepContent}>
              <h1 className={styles.stepTitle}>Review Application</h1>
              <p className={styles.stepSub}>Verify your registration details before final submission.</p>

              <div className={styles.reviewCard}>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Applied Role</span>
                  <span className={styles.reviewValue} style={{ textTransform: 'capitalize' }}>{role}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Full Name</span>
                  <span className={styles.reviewValue}>{formData.firstName} {formData.lastName}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Email Address</span>
                  <span className={styles.reviewValue}>{formData.email}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Phone Number</span>
                  <span className={styles.reviewValue}>{formData.phone}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Target Program</span>
                  <span className={styles.reviewValue}>{formData.program}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Institution</span>
                  <span className={styles.reviewValue}>{formData.institution}</span>
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>District / City</span>
                  <span className={styles.reviewValue}>{formData.district}</span>
                </div>
              </div>

              <p className={styles.termsNote}>
                By completing submission, you agree to the <Link href="/terms" className={styles.link}>Terms of Service</Link> and <Link href="/privacy" className={styles.link}>Privacy Policy</Link>.
              </p>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className={styles.btnRow}>
            {step > 1 && (
              <button type="button" className="btn btn-outline" onClick={handleBack} disabled={isSubmitting}>
                <ArrowLeft size={16} /> Back
              </button>
            )}

            {step < 4 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ marginLeft: 'auto' }}
              >
                {isSubmitting ? 'Registering...' : 'Submit Registration →'}
              </button>
            )}
          </div>

          <div className={styles.footerPrompt}>
            Already have an account?{' '}
            <Link href="/login" className={styles.link}>
              Log In here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RegisterForm />
      </ToastProvider>
    </AuthProvider>
  );
}
