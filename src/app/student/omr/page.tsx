// src/app/student/omr/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Upload, Scan, CheckCircle, XCircle, Award, FileSpreadsheet, Camera } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ScannedBubble {
  qNum: number;
  marked: 'A' | 'B' | 'C' | 'D' | null;
  correct: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

const DEMO_SCANNED: ScannedBubble[] = [
  { qNum: 1, marked: 'C', correct: 'C', isCorrect: true },
  { qNum: 2, marked: 'A', correct: 'A', isCorrect: true },
  { qNum: 3, marked: 'B', correct: 'B', isCorrect: true },
  { qNum: 4, marked: 'B', correct: 'A', isCorrect: false },
  { qNum: 5, marked: 'D', correct: 'D', isCorrect: true },
  { qNum: 6, marked: 'A', correct: 'C', isCorrect: false },
  { qNum: 7, marked: 'B', correct: 'B', isCorrect: true },
  { qNum: 8, marked: 'C', correct: 'C', isCorrect: true },
  { qNum: 9, marked: 'A', correct: 'A', isCorrect: true },
  { qNum: 10, marked: 'D', correct: 'D', isCorrect: true },
];

export default function OMRScannerPage() {
  const { showToast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<ScannedBubble[] | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setScanning(true);
    showToast('Analyzing OMR bubbles and optical contrast...', 'info');

    setTimeout(() => {
      setScanning(false);
      setResults(DEMO_SCANNED);
      showToast('OMR Evaluation Complete! 8/10 Correct.', 'success');
    }, 1500);
  };

  const correctCount = results ? results.filter((r) => r.isCorrect).length : 0;
  const total = results ? results.length : 0;
  const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <Scan size={14} color="var(--primary-light)" /> Optical Mark Recognition Engine
          </div>
          <h1 className={styles.title}>Smart OMR Sheet Scanner</h1>
          <p className={styles.subtitle}>
            Upload photos of physical offline test sheets to auto-detect bubble marks and evaluate scorecards instantly.
          </p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Upload Zone */}
        <div className={styles.uploadCard}>
          <h2 className={styles.cardTitle}>Upload OMR Response Sheet</h2>
          <p className={styles.cardDesc}>
            Ensure all four corner alignment markers are visible in good lighting. Supported formats: JPG, PNG, PDF.
          </p>

          <label className={styles.dropZone}>
            <input
              type="file"
              accept="image/*,.pdf"
              className={styles.fileInput}
              onChange={handleFileUpload}
            />
            <div className={styles.dropContent}>
              <div className={styles.iconCircle}>
                <Upload size={28} />
              </div>
              <span className={styles.dropPrompt}>
                {fileName ? fileName : 'Click to Browse or Drag & Drop OMR Image'}
              </span>
              <span className={styles.dropSub}>Camera snapshot or scanned image</span>
            </div>
          </label>

          <div className={styles.samplePrompt}>
            <span>Looking for test bubble templates?</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => showToast('OMR 100-Question Standard Template downloaded.', 'success')}
            >
              <FileSpreadsheet size={14} /> Download OMR Template PDF
            </button>
          </div>
        </div>

        {/* Results / Scan Panel */}
        <div className={styles.resultsCard}>
          {scanning ? (
            <div className={styles.scanningBox}>
              <div className={styles.scanBeam} />
              <Scan size={48} className={styles.scanPulse} />
              <h3>Processing Optical Bubbles...</h3>
              <p>Detecting darkened circles and matching against CSIR-NET Master Answer Key.</p>
            </div>
          ) : results ? (
            <div className={styles.evaluationBox}>
              {/* Score summary */}
              <div className={styles.scoreRow}>
                <div className={styles.scoreMetric}>
                  <span className={styles.metricLabel}>Scored Marks</span>
                  <span className={styles.metricVal} style={{ color: 'var(--success)' }}>
                    {correctCount} / {total}
                  </span>
                </div>
                <div className={styles.scoreMetric}>
                  <span className={styles.metricLabel}>Accuracy Rate</span>
                  <span className={styles.metricVal}>{scorePct}%</span>
                </div>
                <div className={styles.scoreMetric}>
                  <span className={styles.metricLabel}>Status</span>
                  <span className="badge badge-success">Evaluated</span>
                </div>
              </div>

              {/* Bubble Grid */}
              <h3 className={styles.gridHeading}>Detected Optical Bubble Breakdown</h3>
              <div className={styles.bubbleList}>
                {results.map((r) => (
                  <div
                    key={r.qNum}
                    className={`${styles.bubbleRow} ${r.isCorrect ? styles.rowCorrect : styles.rowWrong}`}
                  >
                    <span className={styles.qNum}>Q{r.qNum}</span>
                    <div className={styles.bubblesGroup}>
                      {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                        const isMarked = r.marked === opt;
                        const isAnswerKey = r.correct === opt;

                        let bubbleStyle = styles.bubbleBlank;
                        if (isMarked && r.isCorrect) bubbleStyle = styles.bubbleCorrect;
                        else if (isMarked && !r.isCorrect) bubbleStyle = styles.bubbleWrong;
                        else if (!isMarked && isAnswerKey) bubbleStyle = styles.bubbleKey;

                        return (
                          <div key={opt} className={`${styles.bubble} ${bubbleStyle}`}>
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                    <span className={styles.rowResult}>
                      {r.isCorrect ? (
                        <CheckCircle size={16} color="var(--success)" />
                      ) : (
                        <span style={{ color: 'var(--error)', fontSize: '0.78rem' }}>Key: {r.correct}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.idleState}>
              <Scan size={44} color="var(--text-muted)" />
              <h3>Awaiting Sheet Upload</h3>
              <p>Upload your OMR sheet image on the left to view the optical bubble evaluation breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
