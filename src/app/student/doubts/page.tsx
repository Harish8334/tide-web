// src/app/student/doubts/page.tsx
'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { MessageSquare, Send, CheckCircle2, Clock, Sparkles, Filter, UserCheck } from 'lucide-react';
import styles from './page.module.css';

interface DoubtItem {
  id: string;
  course: string;
  subject: string;
  question: string;
  status: 'pending' | 'answered';
  time: string;
  answer?: string;
  instructor?: string;
}

const MATH_SYMBOLS = ['ℏ', 'Ψ', 'ψ', '∇', '∂', '∫', '∑', 'λ', 'ω', 'Δ', 'θ', 'π', '∞', '√', '≈', '≠', '≤', '≥', 'Ĥ', 'k_B'];

const INITIAL_DOUBTS: DoubtItem[] = [
  {
    id: 'd1',
    course: 'M.Sc Quantum Mechanics',
    subject: 'Harmonic Oscillator Eigenstates',
    question: 'Why does the ground state wave function ψ_0(x) have zero nodes while the n-th excited state has exactly n nodes?',
    status: 'answered',
    time: 'Yesterday at 3:15 PM',
    instructor: 'Dr. Rajesh Sharma',
    answer: 'This is a direct consequence of the Sturm-Liouville oscillation theorem for bound states in 1D. The ladder operator a† increases the polynomial degree of the Hermite polynomial H_n(x) by 1 at each step, introducing exactly one additional real root (node).',
  },
  {
    id: 'd2',
    course: 'CSIR-NET JRF Super 30',
    subject: 'Electrodynamics Gauge Invariance',
    question: 'How do the Lorenz gauge condition ∇·A + (1/c²)∂V/∂t = 0 and Coulomb gauge ∇·A = 0 transform under a scalar gauge function λ(r, t)?',
    status: 'pending',
    time: 'Today at 9:40 AM',
  },
];

export default function AskDoubtPage() {
  const { showToast } = useToast();
  const [doubts, setDoubts] = useState<DoubtItem[]>(INITIAL_DOUBTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered'>('all');

  const [form, setForm] = useState({
    course: 'M.Sc Quantum Mechanics',
    subject: '',
    question: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const insertSymbol = (sym: string) => {
    setForm((prev) => ({ ...prev, question: prev.question + sym }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.question.trim()) {
      showToast('Please provide both topic and doubt details', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newDoubt: DoubtItem = {
        id: String(Date.now()),
        course: form.course,
        subject: form.subject.trim(),
        question: form.question.trim(),
        status: 'pending',
        time: 'Just now',
      };
      setDoubts((prev) => [newDoubt, ...prev]);
      setForm({ course: form.course, subject: '', question: '' });
      setSubmitting(false);
      showToast('Doubt submitted to faculty lead! You will receive response shortly.', 'success');
    }, 700);
  };

  const filteredDoubts = doubts.filter((d) => {
    if (filter === 'pending') return d.status === 'pending';
    if (filter === 'answered') return d.status === 'answered';
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <MessageSquare size={14} color="var(--primary-light)" /> 1-on-1 Faculty Mentorship
          </div>
          <h1 className={styles.title}>Ask a Doubt &amp; Academic Inquiries</h1>
          <p className={styles.subtitle}>
            Submit your physics queries with mathematical symbol notation. Faculty respond with derivations.
          </p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* New Doubt Form */}
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Submit New Physics Query</h2>

          <form onSubmit={handleSubmit} className={styles.doubtForm}>
            <div className="form-group">
              <label className="form-label" htmlFor="courseSelect">Target Course</label>
              <select
                id="courseSelect"
                className="form-input form-select"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              >
                <option value="M.Sc Quantum Mechanics">M.Sc Quantum Mechanics</option>
                <option value="CSIR-NET JRF Super 30">CSIR-NET JRF Super 30</option>
                <option value="GATE Physics Comprehensive">GATE Physics Comprehensive</option>
                <option value="B.Ed Pedagogy">B.Ed Pedagogy</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subjectInput">Topic / Chapter Name *</label>
              <input
                id="subjectInput"
                type="text"
                placeholder="e.g. WKB Approximation / Maxwell Tensor"
                className="form-input"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            {/* Math Symbol Picker */}
            <div className={styles.symbolSection}>
              <span className={styles.symbolLabel}>
                <Sparkles size={14} color="var(--accent)" /> Quick Physics Symbols:
              </span>
              <div className={styles.symbolGrid}>
                {MATH_SYMBOLS.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    className={styles.symbolBtn}
                    onClick={() => insertSymbol(sym)}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="doubtDesc">Detailed Question Description *</label>
              <textarea
                id="doubtDesc"
                rows={5}
                placeholder="Type your derivation difficulty, question statement, or formula query..."
                className="form-input"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Send size={16} />
              {submitting ? 'Submitting Question...' : 'Submit Doubt to Instructor'}
            </button>
          </form>
        </div>

        {/* My Doubts Thread List */}
        <div className={styles.threadsCard}>
          <div className={styles.threadsHeader}>
            <h2>My Doubt History</h2>
            <div className={styles.filterBtns}>
              {(['all', 'pending', 'answered'] as const).map((f) => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'pending' ? 'Pending' : 'Answered'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.doubtsList}>
            {filteredDoubts.map((d) => (
              <div key={d.id} className={styles.doubtItem}>
                <div className={styles.doubtTop}>
                  <span className={styles.doubtCourse}>{d.course}</span>
                  {d.status === 'answered' ? (
                    <span className="badge badge-success">
                      <CheckCircle2 size={12} /> Answered
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      <Clock size={12} /> Awaiting Faculty
                    </span>
                  )}
                </div>

                <h3 className={styles.doubtTopic}>{d.subject}</h3>
                <p className={styles.doubtQuestion}>{d.question}</p>
                <span className={styles.doubtTime}>Posted {d.time}</span>

                {d.answer && (
                  <div className={styles.answerBox}>
                    <div className={styles.answerHeader}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <UserCheck size={15} color="#0056D2" /> Response from {d.instructor}
                      </span>
                    </div>
                    <p className={styles.answerText}>{d.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
