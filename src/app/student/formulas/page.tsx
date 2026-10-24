// src/app/student/formulas/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Bookmark, Search, BookOpen, Star, Copy, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface FormulaItem {
  id: string;
  chapter: string;
  name: string;
  formula: string;
  note: string;
}

const FORMULAS_DATA: FormulaItem[] = [
  // Quantum
  { id: 'f1', chapter: 'Quantum Mechanics', name: 'Time-Independent Schrödinger Equation', formula: 'Ĥ ψ(x) = E ψ(x)', note: 'Fundamental energy eigenvalue equation for non-relativistic stationary states.' },
  { id: 'f2', chapter: 'Quantum Mechanics', name: 'Harmonic Oscillator Eigenenergies', formula: 'E_n = (n + ½) ℏω,   n = 0, 1, 2, ...', note: 'Equispaced discrete energy spectrum with zero-point ground state energy E_0 = ½ ℏω.' },
  { id: 'f3', chapter: 'Quantum Mechanics', name: 'Heisenberg Uncertainty Principle', formula: 'Δx · Δp_x ≥ ℏ / 2', note: 'Standard deviation bound between position and conjugate momentum operators.' },
  // Electrodynamics
  { id: 'f4', chapter: 'Electromagnetism', name: 'Faraday Law of Electromagnetic Induction', formula: '∇ × E = - ∂B / ∂t', note: 'Maxwell second equation relating curl of electric field to time-rate of change of magnetic field.' },
  { id: 'f5', chapter: 'Electromagnetism', name: 'Poynting Vector & Energy Flux', formula: 'S = (1 / μ₀) (E × B)', note: 'Direction and magnitude of electromagnetic energy flow per unit area per unit time.' },
  // Thermodynamics
  { id: 'f6', chapter: 'Thermodynamics', name: 'Helmholtz Free Energy & Partition Function', formula: 'F = - k_B T ln(Z)', note: 'Bridge relation between statistical ensemble sum Z and thermodynamic macroscopic potential F.' },
  { id: 'f7', chapter: 'Thermodynamics', name: 'Maxwell-Boltzmann Distribution', formula: 'f(v) = 4π (m / 2π k_B T)^(3/2) v² e^(-mv² / 2k_B T)', note: 'Speed probability density distribution for classical point molecules in thermal equilibrium.' },
  // Mechanics
  { id: 'f8', chapter: 'Mechanics', name: 'Euler-Lagrange Equation of Motion', formula: 'd/dt (∂L / ∂q̇_j) - ∂L / ∂q_j = 0', note: 'Dynamical equations derived from Hamilton principle of stationary action S = ∫ L dt.' },
  { id: 'f9', chapter: 'Mechanics', name: 'Hamilton Canonical Equations', formula: 'q̇_j = ∂H / ∂p_j,   ṗ_j = - ∂H / ∂q_j', note: 'First-order coupled differential equations governing motion in phase space coordinates.' },
  // Optics
  { id: 'f10', chapter: 'Optics', name: 'Bragg Diffraction Condition', formula: '2d sin(θ) = n λ', note: 'Constructive interference condition for electromagnetic wave scattering off crystalline lattice planes.' },
];

const CHAPTERS = ['All', 'Quantum Mechanics', 'Electromagnetism', 'Thermodynamics', 'Mechanics', 'Optics', 'Bookmarks'];

export default function FormulaHandbookPage() {
  const { showToast } = useToast();
  const [activeChapter, setActiveChapter] = useState('All');
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Restore bookmarks
  useEffect(() => {
    try {
      const saved = localStorage.getItem('physics_formula_bookmarks');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      localStorage.setItem('physics_formula_bookmarks', JSON.stringify(next));
      showToast(prev.includes(id) ? 'Removed from bookmarks' : 'Added to formula bookmarks!', 'info');
      return next;
    });
  };

  const copyFormula = (id: string, formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    showToast('Formula copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFormulas = FORMULAS_DATA.filter((item) => {
    const matchChapter =
      activeChapter === 'All'
        ? true
        : activeChapter === 'Bookmarks'
        ? bookmarks.includes(item.id)
        : item.chapter === activeChapter;

    const matchSearch =
      !search.trim() ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.formula.toLowerCase().includes(search.toLowerCase()) ||
      item.note.toLowerCase().includes(search.toLowerCase());

    return matchChapter && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <BookOpen size={14} color="var(--accent)" /> Quick Revision Handbook
          </div>
          <h1 className={styles.title}>Physics Formula Reference</h1>
          <p className={styles.subtitle}>
            Essential formulas, operators, and identities with physical context for CSIR-NET &amp; GATE exams.
          </p>
        </div>

        <div className={styles.searchBox}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Schrödinger, Bragg, Maxwell..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Chapter Tabs */}
      <div className={styles.tabBar}>
        {CHAPTERS.map((ch) => (
          <button
            key={ch}
            className={`${styles.tabBtn} ${activeChapter === ch ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveChapter(ch)}
          >
            {ch === 'Bookmarks' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Star size={14} fill={activeChapter === 'Bookmarks' ? 'currentColor' : 'none'} /> Bookmarks ({bookmarks.length})
              </span>
            ) : (
              ch
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredFormulas.map((f) => {
          const isBookmarked = bookmarks.includes(f.id);
          const isCopied = copiedId === f.id;

          return (
            <div key={f.id} className={styles.formulaCard}>
              <div className={styles.cardTop}>
                <span className={styles.chapterBadge}>{f.chapter}</span>
                <div className={styles.cardActions}>
                  <button
                    className={styles.actionIcon}
                    onClick={() => copyFormula(f.id, f.formula)}
                    title="Copy Formula"
                  >
                    {isCopied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                  </button>
                  <button
                    className={`${styles.actionIcon} ${isBookmarked ? styles.bookmarked : ''}`}
                    onClick={() => toggleBookmark(f.id)}
                    title="Bookmark Formula"
                  >
                    <Bookmark size={16} fill={isBookmarked ? 'var(--accent)' : 'none'} />
                  </button>
                </div>
              </div>

              <h3 className={styles.formulaName}>{f.name}</h3>

              <div className={styles.formulaEquation}>
                <code>{f.formula}</code>
              </div>

              <p className={styles.formulaNote}>{f.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
