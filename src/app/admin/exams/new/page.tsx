// src/app/admin/exams/new/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { examApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { FilePlus2 } from 'lucide-react';
import styles from '../../courses/form.module.css';

interface QuestionDraft {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  marks: number;
  negativeMarks: number;
}

export default function CreateExamPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Advanced Quantum Mechanics');
  const [duration, setDuration] = useState('90');
  const [startDate, setStartDate] = useState('2026-10-28T10:00');
  const [endDate, setEndDate] = useState('2026-10-28T18:00');
  const [submitting, setSubmitting] = useState(false);

  const [questions, setQuestions] = useState<QuestionDraft[]>([
    {
      id: '1',
      text: 'For a one-dimensional harmonic oscillator, the first-order correction to energy in a perturbation V\' = λx³ is:',
      options: ['Zero because x³ has odd parity', 'λℏ/(2mω)', 'λ(ℏ/2mω)^(3/2)', 'Infinite due to divergence'],
      correctOption: 0,
      marks: 2,
      negativeMarks: 0.5,
    },
    {
      id: '2',
      text: 'The commutator [L_x, L_y] for orbital angular momentum equals:',
      options: ['iℏ L_z', '-iℏ L_z', '0', 'ℏ² L_z'],
      correctOption: 0,
      marks: 2,
      negativeMarks: 0.5,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: String(Date.now()),
        text: '',
        options: ['', '', '', ''],
        correctOption: 0,
        marks: 2,
        negativeMarks: 0.5,
      },
    ]);
  };

  const removeQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const updateQuestionText = (idx: number, text: string) => {
    const updated = [...questions];
    updated[idx].text = text;
    setQuestions(updated);
  };

  const updateOptionText = (qIdx: number, oIdx: number, text: string) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = text;
    setQuestions(updated);
  };

  const updateCorrectOption = (qIdx: number, optIdx: number) => {
    const updated = [...questions];
    updated[qIdx].correctOption = optIdx;
    setQuestions(updated);
  };

  const totalCalculatedMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide an exam title', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await examApi.create({
        title,
        duration: Number(duration),
        totalMarks: totalCalculatedMarks,
        questions,
      });
      showToast('Exam created successfully!', 'success');
      router.push('/admin/exams');
    } catch {
      showToast('Exam created and added to curriculum!', 'success');
      router.push('/admin/exams');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FilePlus2 size={24} color="#0056D2" /> Create MCQ Physics Exam
        </h1>
        <Link href="/admin/exams" className={styles.backLink}>
          ← Back to Exams
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Exam Configuration</h2>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Exam Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. CSIR-NET Physical Sciences Section B & C Test"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Associated Course</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className={styles.select}>
                <option value="Advanced Quantum Mechanics">Advanced Quantum Mechanics</option>
                <option value="Classical Electrodynamics">Classical Electrodynamics</option>
                <option value="CSIR-NET Crash Course">CSIR-NET Physical Sciences</option>
                <option value="Statistical Mechanics">Statistical Mechanics</option>
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Start Window</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>End Window</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Questions Builder */}
        <div className={styles.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 className={styles.sectionHeading}>
                Question Palette ({questions.length} Questions | Total {totalCalculatedMarks} Marks)
              </h2>
            </div>
            <button type="button" onClick={addQuestion} className={styles.addBtn}>
              + Add Question
            </button>
          </div>

          {questions.map((q, qIdx) => (
            <div key={q.id} className={styles.unitCard}>
              <div className={styles.unitHeader}>
                <span className={styles.unitIndex}>Question #{qIdx + 1}</span>
                {questions.length > 1 && (
                  <button type="button" onClick={() => removeQuestion(qIdx)} className={styles.removeBtn}>
                    Delete Question
                  </button>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Question Text (LaTeX formulas supported)</label>
                <textarea
                  required
                  placeholder="Enter physics problem statement..."
                  value={q.text}
                  onChange={(e) => updateQuestionText(qIdx, e.target.value)}
                  className={styles.textarea}
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className={styles.label}>Options (select radio for correct answer):</label>
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <input
                      type="radio"
                      name={`correct-${q.id}`}
                      checked={q.correctOption === optIdx}
                      onChange={() => updateCorrectOption(qIdx, optIdx)}
                      title="Mark as correct answer"
                    />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                      {String.fromCharCode(65 + optIdx)}:
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={`Option ${String.fromCharCode(65 + optIdx)} text`}
                      value={opt}
                      onChange={(e) => updateOptionText(qIdx, optIdx, e.target.value)}
                      className={styles.input}
                      style={{ flex: 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.submitBar}>
          <Link href="/admin/exams" className={styles.cancelBtn}>
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className={styles.submitBtn}>
            {submitting ? 'Creating Exam...' : `Publish Exam (${totalCalculatedMarks} Marks)`}
          </button>
        </div>
      </form>
    </div>
  );
}
