// src/app/admin/formulas/page.tsx
'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { BookMarked, Plus } from 'lucide-react';
import styles from '../students/page.module.css';

interface FormulaEntry {
  id: string;
  chapter: string;
  name: string;
  latex: string;
  description: string;
  tags: string;
}

const INITIAL_FORMULAS: FormulaEntry[] = [
  { id: '1', chapter: 'Quantum Mechanics', name: 'Time-Independent Schrödinger Equation', latex: '-\\frac{\\hbar^2}{2m} \\nabla^2 \\psi + V(\\mathbf{r})\\psi = E\\psi', description: 'Stationary state eigenvalue equation', tags: 'schrodinger, wave equation' },
  { id: '2', chapter: 'Electrodynamics', name: 'Maxwell-Ampère Law with Displacement Current', latex: '\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\epsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}', description: 'Circuital law including Maxwell displacement current', tags: 'maxwell, electrodynamics' },
  { id: '3', chapter: 'Statistical Mechanics', name: 'Canonical Partition Function', latex: 'Z = \\sum_i e^{-\\beta E_i} = \\int g(E) e^{-\\beta E} dE', description: 'Sum over states for thermodynamic variables', tags: 'partition function, boltzmann' },
  { id: '4', chapter: 'Special Relativity', name: 'Relativistic Energy-Momentum Invariant', latex: 'E^2 = (pc)^2 + (m_0 c^2)^2', description: 'Fundamental dispersion relation for relativistic particles', tags: 'relativity, energy-momentum' },
];

export default function AdminFormulasPage() {
  const [formulas, setFormulas] = useState<FormulaEntry[]>(INITIAL_FORMULAS);
  const [showModal, setShowModal] = useState(false);
  const [chapter, setChapter] = useState('Quantum Mechanics');
  const [name, setName] = useState('');
  const [latex, setLatex] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const { showToast } = useToast();

  const handleAddFormula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !latex.trim()) return;

    const newF: FormulaEntry = {
      id: String(Date.now()),
      chapter,
      name,
      latex,
      description,
      tags,
    };

    setFormulas([newF, ...formulas]);
    showToast('New physics formula added to student handbook!', 'success');
    setShowModal(false);
    setName('');
    setLatex('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    setFormulas(formulas.filter((f) => f.id !== id));
    showToast('Formula entry removed', 'info');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookMarked size={24} color="#0056D2" /> Physics Formula Handbook Management
        </h1>
        <button onClick={() => setShowModal(true)} className={styles.iconBtn} style={{ background: 'var(--color-primary)', color: '#fff', padding: '0.65rem 1.25rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <Plus size={16} /> Add New Formula
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Chapter</th>
              <th>Formula Name</th>
              <th>LaTeX Representation</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formulas.map((f) => (
              <tr key={f.id}>
                <td>
                  <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(0,86,210,0.15)', color: '#38BDF8', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {f.chapter}
                  </span>
                </td>
                <td><strong>{f.name}</strong></td>
                <td>
                  <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#FCD34D', fontSize: '0.82rem' }}>
                    {f.latex}
                  </code>
                </td>
                <td style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{f.description}</td>
                <td>
                  <button
                    onClick={() => handleDelete(f.id)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Add New Formula to Handbook</h2>
            <form onSubmit={handleAddFormula} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Physics Chapter *</label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                >
                  <option value="Quantum Mechanics">Quantum Mechanics</option>
                  <option value="Electrodynamics">Electrodynamics</option>
                  <option value="Statistical Mechanics">Statistical Mechanics</option>
                  <option value="Special Relativity">Special Relativity</option>
                  <option value="Mathematical Physics">Mathematical Physics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Formula Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Klein-Gordon Relativistic Wave Equation"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>LaTeX String *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. (\Box + m^2)\psi = 0"
                  value={latex}
                  onChange={(e) => setLatex(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              {latex && (
                <div style={{ background: 'var(--color-bg)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>LIVE PREVIEW:</div>
                  <code style={{ color: '#FCD34D' }}>{latex}</code>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem' }}>Conceptual Description</label>
                <textarea
                  placeholder="Explain application context and physical meaning..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', borderRadius: '6px', color: '#fff', minHeight: '60px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.5rem 1rem', background: 'var(--color-surface-hover)', border: '1px solid var(--color-border)', color: '#fff', borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.5rem 1.25rem', background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '6px', fontWeight: 600 }}
                >
                  Save Formula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
