// src/app/student/pdf/[materialId]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ArrowLeft, Download, Maximize2, FileText, Share2, BookOpen } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PdfViewerPage() {
  const params = useParams();
  const { showToast } = useToast();
  const materialId = params?.materialId as string;

  const handleDownload = () => {
    showToast('Document download initiated.', 'success');
  };

  const handleFullscreen = () => {
    const elem = document.getElementById('pdf-frame');
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/student/study-material" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Documents
        </Link>

        <div className={styles.docDetails}>
          <div className={styles.pdfBadge}>PDF</div>
          <span className={styles.docTitle}>Unit 1 Handwritten Class Notes — Quantum Postulates &amp; Dirac Notation</span>
        </div>

        <div className={styles.headerActions}>
          <button className="btn btn-outline btn-sm" onClick={handleFullscreen} title="Fullscreen">
            <Maximize2 size={15} /> Fullscreen
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleDownload}>
            <Download size={15} /> Download PDF
          </button>
        </div>
      </header>

      {/* Embedded Document Frame */}
      <div className={styles.viewerContainer} id="pdf-frame">
        <div className={styles.documentCanvas}>
          <div className={styles.docPageMock}>
            <div className={styles.docHeader}>
              <span>PHYSICSCOACH PRO — ADVANCED M.SC LECTURE NOTES</span>
              <span>SERIES 2026</span>
            </div>
            <div className={styles.docBody}>
              <h2>Chapter 1: Mathematical Foundations of Quantum Mechanics</h2>
              <hr className="divider" />
              <h3>1.1 State Vectors and Hilbert Space</h3>
              <p>
                In non-relativistic quantum mechanics, the state of a physical system is completely specified by a state vector |Ψ⟩ belonging to a complex, separable Hilbert space ℋ. For every physical observable <em>A</em>, there corresponds a linear Hermitian operator Â acting on ℋ.
              </p>
              <div className={styles.equationCard}>
                <code>Â |ψ_n⟩ = a_n |ψ_n⟩, &emsp; ⟨ψ_m|ψ_n⟩ = δ_mn</code>
              </div>
              <h3>1.2 The General Uncertainty Principle</h3>
              <p>
                For any two Hermitian operators Â and B̂ with commutation relation [Â, B̂] = i Ĉ, the product of their root-mean-square deviations satisfies:
              </p>
              <div className={styles.equationCard}>
                <code>ΔA · ΔB ≥ ½ |⟨[Â, B̂]⟩| = ½ |⟨Ĉ⟩|</code>
              </div>
              <p>
                When applied to position x̂ and linear momentum p̂_x with [x̂, p̂_x] = iℏ, we retrieve the canonical Heisenberg uncertainty relation: <strong>Δx · Δp_x ≥ ℏ/2</strong>.
              </p>
            </div>
            <div className={styles.docFooter}>
              <span>Document ID: {materialId || 'DOC-2026-QM1'}</span>
              <span>Page 1 of 24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
