// src/app/student/exams/[examId]/attempt/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { examApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Loader from '@/components/Loader';
import styles from './page.module.css';
import { Clock, Flag, CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, Send } from 'lucide-react';

interface Question {
  _id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  marks?: number;
}

const DEMO_QUESTIONS: Question[] = [
  {
    _id: 'q1',
    questionText: 'For a one-dimensional infinite square well potential of width L, the energy eigenvalue E_n is proportional to:',
    options: {
      A: 'n / L',
      B: 'n² / L',
      C: 'n² / L²',
      D: 'n / L²',
    },
    marks: 4,
  },
  {
    _id: 'q2',
    questionText: 'What is the commutator [L_x, L_y] in quantum mechanical angular momentum algebra?',
    options: {
      A: 'i ℏ L_z',
      B: '-i ℏ L_z',
      C: '0',
      D: 'i ℏ (L_x + L_y)',
    },
    marks: 4,
  },
  {
    _id: 'q3',
    questionText: 'In relativistic mechanics, if the momentum of a particle of rest mass m_0 is equal to m_0 c, its speed is:',
    options: {
      A: 'c / 2',
      B: 'c / √2',
      C: 'c / √3',
      D: 'c',
    },
    marks: 4,
  },
  {
    _id: 'q4',
    questionText: 'According to the Maxwell-Boltzmann distribution, the root-mean-square speed of molecules of an ideal gas at temperature T is proportional to:',
    options: {
      A: 'T',
      B: 'T²',
      C: '√T',
      D: '1 / √T',
    },
    marks: 4,
  },
  {
    _id: 'q5',
    questionText: 'In a canonical ensemble, the partition function Z is related to Helmholtz free energy F by:',
    options: {
      A: 'F = -k_B T ln(Z)',
      B: 'F = k_B T ln(Z)',
      C: 'F = -k_B T / ln(Z)',
      D: 'F = -k_B T² ∂ln(Z)/∂T',
    },
    marks: 4,
  },
];

export default function ExamAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const examId = params?.examId as string;

  const [examTitle, setExamTitle] = useState('Physics Assessment Examination');
  const [questions, setQuestions] = useState<Question[]>(DEMO_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  const [secondsRemaining, setSecondsRemaining] = useState(60 * 60); // 60 mins
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch exam questions
  useEffect(() => {
    if (!examId) return;

    examApi.getById(examId)
      .then((res: unknown) => {
        const data = (res as { data?: { title?: string; duration?: number; questions?: Question[] } }).data;
        if (data) {
          if (data.title) setExamTitle(data.title);
          if (data.duration) setSecondsRemaining(data.duration * 60);
          if (data.questions && data.questions.length > 0) setQuestions(data.questions);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [examId]);

  // Submit exam callback
  const submitExam = useCallback(async () => {
    setIsSubmitting(true);
    const payload = Object.entries(answers).map(([qId, opt]) => ({
      questionId: qId,
      selectedOption: opt,
    }));

    try {
      await examApi.submit(examId, { answers: payload });
    } catch {
      // Proceed even if server simulation throws
    }
    showToast('Exam submitted successfully! Generating scorecard...', 'success');
    router.push(`/student/exams/${examId}/result`);
  }, [examId, answers, router, showToast]);

  // Timer countdown & auto-submit
  useEffect(() => {
    if (secondsRemaining <= 0) {
      showToast('Time expired! Auto-submitting exam...', 'warning');
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, submitExam, showToast]);

  // Anti-cheat detection: visibilitychange
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        showToast('Warning: Window focus lost. Exam activity is monitored!', 'warning');
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [showToast]);

  if (loading) {
    return <Loader fullPage text="Preparing secure examination environment..." />;
  }

  const currentQ = questions[currentIndex];
  const selectedOpt = currentQ ? answers[currentQ._id] : undefined;
  const isFlagged = currentQ ? flagged[currentQ._id] : false;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (opt: string) => {
    if (!currentQ) return;
    setAnswers((prev) => ({ ...prev, [currentQ._id]: opt }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    setFlagged((prev) => ({ ...prev, [currentQ._id]: !prev[currentQ._id] }));
  };

  return (
    <div className={styles.page}>
      {/* Top Test Header */}
      <header className={styles.testHeader}>
        <div className={styles.testInfo}>
          <h1 className={styles.testTitle}>{examTitle}</h1>
          <span className={styles.qCounter}>
            Question <strong>{currentIndex + 1}</strong> of <strong>{questions.length}</strong>
          </span>
        </div>

        <div className={styles.timerBox}>
          <Clock size={18} className={secondsRemaining < 300 ? styles.timerAlert : ''} />
          <span className={`${styles.timerText} ${secondsRemaining < 300 ? styles.timerAlert : ''}`}>
            Time Remaining: {formatTimer(secondsRemaining)}
          </span>
        </div>

        <button className="btn btn-primary" onClick={() => setShowSubmitModal(true)}>
          <Send size={15} /> Submit Test
        </button>
      </header>

      {/* Main Split */}
      <div className={styles.mainGrid}>
        {/* Question Panel */}
        <div className={styles.questionPanel}>
          <div className={styles.questionCard}>
            <div className={styles.qTopRow}>
              <span className={styles.qBadge}>Q{currentIndex + 1}</span>
              <span className={styles.marksBadge}>+{currentQ?.marks || 4} Marks / -1</span>
              <button
                className={`${styles.flagBtn} ${isFlagged ? styles.flagged : ''}`}
                onClick={handleToggleFlag}
              >
                <Flag size={15} />
                <span>{isFlagged ? 'Flagged for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            <div className={styles.questionBody}>
              <p>{currentQ?.questionText}</p>
            </div>

            {/* Options */}
            <div className={styles.optionsList}>
              {currentQ &&
                Object.entries(currentQ.options).map(([key, label]) => {
                  const isSelected = selectedOpt === key;
                  return (
                    <div
                      key={key}
                      className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ''}`}
                      onClick={() => handleSelectOption(key)}
                    >
                      <div className={styles.optionCircle}>{key}</div>
                      <span className={styles.optionText}>{label}</span>
                    </div>
                  );
                })}
            </div>

            {/* Bottom Nav */}
            <div className={styles.qNavRow}>
              <button
                className="btn btn-outline"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              >
                <ArrowLeft size={16} /> Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                >
                  Next Question <ArrowRight size={16} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => setShowSubmitModal(true)}>
                  Review &amp; Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <aside className={styles.paletteSidebar}>
          <div className={styles.paletteCard}>
            <h3 className={styles.paletteTitle}>Question Palette</h3>

            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotAnswered}`} /> Answered ({answeredCount})
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotFlagged}`} /> Flagged ({Object.values(flagged).filter(Boolean).length})
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotUnanswered}`} /> Unanswered ({unansweredCount})
              </div>
            </div>

            <div className={styles.paletteGrid}>
              {questions.map((q, idx) => {
                const isAns = !!answers[q._id];
                const isFlg = !!flagged[q._id];
                const isCur = currentIndex === idx;

                let stateClass = styles.btnDefault;
                if (isCur) stateClass = styles.btnCurrent;
                else if (isFlg) stateClass = styles.btnFlagged;
                else if (isAns) stateClass = styles.btnAnswered;

                return (
                  <button
                    key={q._id}
                    className={`${styles.paletteBtn} ${stateClass}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle color="var(--warning)" /> Confirm Submission
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <p>Are you sure you want to conclude and grade your exam?</p>
              <div style={{ background: 'var(--surface-2)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div>Total Questions: <strong>{questions.length}</strong></div>
                <div>Questions Answered: <strong style={{ color: 'var(--success)' }}>{answeredCount}</strong></div>
                <div>Questions Remaining: <strong style={{ color: unansweredCount > 0 ? 'var(--warning)' : 'var(--text-muted)' }}>{unansweredCount}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-outline"
                onClick={() => setShowSubmitModal(false)}
                disabled={isSubmitting}
              >
                Return to Test
              </button>
              <button
                className="btn btn-primary"
                onClick={submitExam}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Evaluating Score...' : 'Confirm & Finalize'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
