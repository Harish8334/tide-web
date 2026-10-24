// src/app/student/exams/[examId]/result/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { examApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Loader from '@/components/Loader';
import styles from './page.module.css';
import { Award, CheckCircle2, XCircle, Share2, ArrowLeft, RefreshCw, BarChart2 } from 'lucide-react';

interface ResultData {
  examTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  timeTakenMinutes?: number;
  submittedAt?: string;
  questions: {
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

const DEMO_RESULT: ResultData = {
  examTitle: 'Quantum Mechanics & Relativistic Dynamics Assessment',
  score: 84,
  totalMarks: 100,
  percentage: 84,
  passed: true,
  timeTakenMinutes: 42,
  submittedAt: new Date().toLocaleDateString(),
  questions: [
    {
      questionText: 'For a one-dimensional infinite square well potential of width L, the energy eigenvalue E_n is proportional to:',
      selectedOption: 'C: n² / L²',
      correctOption: 'C: n² / L²',
      isCorrect: true,
      explanation: 'From the boundary conditions ψ(0)=ψ(L)=0, k = nπ/L, and E = ℏ²k²/(2m) = n²π²ℏ²/(2mL²), which scales as n²/L².',
    },
    {
      questionText: 'What is the commutator [L_x, L_y] in quantum mechanical angular momentum algebra?',
      selectedOption: 'A: i ℏ L_z',
      correctOption: 'A: i ℏ L_z',
      isCorrect: true,
      explanation: 'Fundamental angular momentum commutation relation: [L_i, L_j] = i ℏ ε_ijk L_k.',
    },
    {
      questionText: 'In relativistic mechanics, if the momentum of a particle of rest mass m_0 is equal to m_0 c, its speed is:',
      selectedOption: 'B: c / √2',
      correctOption: 'B: c / √2',
      isCorrect: true,
      explanation: 'p = γ m_0 v = m_0 c => γ (v/c) = 1 => (v²/c²) / (1 - v²/c²) = 1 => v = c / √2.',
    },
    {
      questionText: 'In a canonical ensemble, the partition function Z is related to Helmholtz free energy F by:',
      selectedOption: 'B: F = k_B T ln(Z)',
      correctOption: 'A: F = -k_B T ln(Z)',
      isCorrect: false,
      explanation: 'By definition in statistical thermodynamics, F = -k_B T ln(Z), with a negative sign.',
    },
  ],
};

export default function ExamResultPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const examId = params?.examId as string;

  const [result, setResult] = useState<ResultData>(DEMO_RESULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;

    examApi.getResult(examId)
      .then((res: unknown) => {
        const data = (res as { data?: ResultData }).data || (res as ResultData);
        if (data && data.score !== undefined) {
          setResult(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [examId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Scorecard URL copied to clipboard!', 'success');
    }
  };

  if (loading) {
    return <Loader fullPage text="Compiling detailed exam evaluation..." />;
  }

  const { percentage, score, totalMarks, passed, questions } = result;
  const correctCount = questions.filter((q) => q.isCorrect).length;
  const wrongCount = questions.length - correctCount;

  return (
    <div className={styles.page}>
      <Link href="/student/exams" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Examinations
      </Link>

      {/* Hero Scorecard */}
      <div className={styles.scoreCard}>
        <div className={styles.scoreLeft}>
          {/* Conic Gradient Ring */}
          <div
            className={styles.conicRing}
            style={{
              background: `conic-gradient(var(--success) 0% ${percentage}%, var(--surface-2) ${percentage}% 100%)`,
            }}
          >
            <div className={styles.ringInner}>
              <span className={styles.ringPercent}>{percentage}%</span>
              <span className={styles.ringStatus}>{passed ? 'PASSED' : 'NEEDS PRACTICE'}</span>
            </div>
          </div>
        </div>

        <div className={styles.scoreDetails}>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <Award size={14} /> Exam Performance Summary
          </div>
          <h1 className={styles.examTitle}>{result.examTitle}</h1>

          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Total Score</span>
              <span className={styles.metricValue}>
                {score} / {totalMarks}
              </span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Correct Answers</span>
              <span className={styles.metricValue} style={{ color: 'var(--success)' }}>
                {correctCount} Questions
              </span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Incorrect</span>
              <span className={styles.metricValue} style={{ color: 'var(--error)' }}>
                {wrongCount} Questions
              </span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricLabel}>Time Spent</span>
              <span className={styles.metricValue}>
                {result.timeTakenMinutes || 40} Mins
              </span>
            </div>
          </div>

          <div className={styles.actionRow}>
            <button className="btn btn-outline" onClick={handleShare}>
              <Share2 size={16} /> Share Result
            </button>
            <Link href={`/student/exams/${examId}/attempt`} className="btn btn-primary">
              <RefreshCw size={16} /> Retake Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Question Review Section */}
      <section className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <BarChart2 size={22} color="var(--primary-light)" />
          <h2>Question-by-Question Analysis</h2>
        </div>

        <div className={styles.questionsList}>
          {questions.map((q, idx) => (
            <div
              key={idx}
              className={`${styles.qCard} ${q.isCorrect ? styles.qCardCorrect : styles.qCardWrong}`}
            >
              <div className={styles.qTop}>
                <span className={styles.qNumber}>Question {idx + 1}</span>
                {q.isCorrect ? (
                  <span className={styles.badgeCorrect}>
                    <CheckCircle2 size={14} /> Correct (+4)
                  </span>
                ) : (
                  <span className={styles.badgeWrong}>
                    <XCircle size={14} /> Incorrect (-1)
                  </span>
                )}
              </div>

              <p className={styles.qText}>{q.questionText}</p>

              <div className={styles.answersRow}>
                <div className={styles.ansBox}>
                  <span className={styles.ansLabel}>Your Selection:</span>
                  <span className={q.isCorrect ? styles.textCorrect : styles.textWrong}>
                    {q.selectedOption}
                  </span>
                </div>

                {!q.isCorrect && (
                  <div className={styles.ansBox}>
                    <span className={styles.ansLabel}>Correct Answer:</span>
                    <span className={styles.textCorrect}>{q.correctOption}</span>
                  </div>
                )}
              </div>

              {q.explanation && (
                <div className={styles.explanationBox}>
                  <strong>Physical Explanation &amp; Derivation:</strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
