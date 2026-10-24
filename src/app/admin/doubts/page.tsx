// src/app/admin/doubts/page.tsx
'use client';

import React, { useState } from 'react';
import { doubtApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { MessageSquare, Send } from 'lucide-react';
import styles from './page.module.css';

interface DoubtItem {
  id: string;
  studentName: string;
  course: string;
  question: string;
  time: string;
  status: 'pending' | 'answered';
  answer?: string;
}

const INITIAL_DOUBTS: DoubtItem[] = [
  {
    id: '1',
    studentName: 'Arjun Verma',
    course: 'Advanced Quantum Mechanics',
    question: 'How do we compute the parity of the spherical harmonic Y_l^m under spatial inversion? Is it (-1)^l independent of m?',
    time: '25 mins ago',
    status: 'pending',
  },
  {
    id: '2',
    studentName: 'Ananya Roy',
    course: 'Classical Electrodynamics',
    question: 'In retarded potentials, why is the integration over source coordinates (t\' = t - R/c) rather than field coordinates?',
    time: '2 hours ago',
    status: 'pending',
  },
  {
    id: '3',
    studentName: 'Priya Sharma',
    course: 'Statistical Mechanics',
    question: 'Can Bose-Einstein condensation occur in a 2-dimensional ideal gas at non-zero temperature?',
    time: 'Yesterday',
    status: 'answered',
    answer: 'According to the Mermin-Wagner theorem, BEC cannot occur at T > 0 in 2D for continuous symmetries because the density of states g(ε) = const, leading to logarithmic divergence.',
  },
];

const MATH_SYMBOLS = ['ℏ', 'Ψ', '∇', '∫', '∑', 'λ', 'ω', 'π', 'δ', '±', '⟨', '⟩', '∂'];

export default function AdminDoubtsPage() {
  const [doubts, setDoubts] = useState<DoubtItem[]>(INITIAL_DOUBTS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered'>('all');
  const [activeDoubtId, setActiveDoubtId] = useState<string | null>('1');
  const [replyText, setReplyText] = useState('');
  const { showToast } = useToast();

  const filtered = doubts.filter((d) => {
    if (filter === 'all') return true;
    return d.status === filter;
  });

  const handleSendReply = async (doubtId: string) => {
    if (!replyText.trim()) return;
    try {
      await doubtApi.answer(doubtId, replyText);
    } catch {}

    setDoubts((prev) =>
      prev.map((d) => (d.id === doubtId ? { ...d, status: 'answered', answer: replyText } : d))
    );
    showToast('Instructor explanation sent to student!', 'success');
    setReplyText('');
    setActiveDoubtId(null);
  };

  const insertSymbol = (sym: string) => {
    setReplyText((prev) => prev + sym);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={24} color="#0056D2" /> Student Physics Doubts &amp; Queries
        </h1>
      </div>

      <div className={styles.filterTabs}>
        <button
          onClick={() => setFilter('all')}
          className={`${styles.tab} ${filter === 'all' ? styles.tabActive : ''}`}
        >
          All ({doubts.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`${styles.tab} ${filter === 'pending' ? styles.tabActive : ''}`}
        >
          Pending Resolution ({doubts.filter((d) => d.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('answered')}
          className={`${styles.tab} ${filter === 'answered' ? styles.tabActive : ''}`}
        >
          Answered ({doubts.filter((d) => d.status === 'answered').length})
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filtered.map((d) => (
          <div key={d.id} className={styles.doubtCard}>
            <div className={styles.doubtHeader}>
              <div className={styles.studentInfo}>
                <div className={styles.avatar}>{d.studentName[0]}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{d.studentName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#38BDF8' }}>{d.course}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{d.time}</span>
                <span
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: d.status === 'answered' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                    color: d.status === 'answered' ? '#10B981' : '#F59E0B',
                  }}
                >
                  {d.status.toUpperCase()}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--color-text-primary)' }}>
              {d.question}
            </p>

            {d.status === 'answered' && d.answer && (
              <div style={{ background: 'rgba(16,185,129,0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981', marginBottom: '0.35rem' }}>
                  FACULTY ANSWER:
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{d.answer}</div>
              </div>
            )}

            {d.status === 'pending' && (
              <div>
                {activeDoubtId === d.id ? (
                  <div className={styles.replyBox}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Draft Academic Solution:</span>
                      <div className={styles.symbolsRow}>
                        {MATH_SYMBOLS.map((s) => (
                          <button key={s} type="button" onClick={() => insertSymbol(s)} className={styles.symBtn}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder="Type step-by-step mathematical derivation or physics clarification..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className={styles.textarea}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button
                        onClick={() => setActiveDoubtId(null)}
                        style={{ padding: '0.45rem 1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(d.id)}
                        style={{ padding: '0.45rem 1.25rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setActiveDoubtId(d.id);
                      setReplyText('');
                    }}
                    style={{ background: 'none', border: '1px solid var(--color-primary)', color: '#38BDF8', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    Reply to Doubt <Send size={13} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
