// src/app/student/lab/page.tsx
'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Atom, Play, Maximize2, X, Sparkles, Filter } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface Experiment {
  id: string;
  title: string;
  category: 'Mechanics' | 'Electromagnetism' | 'Optics' | 'Thermodynamics' | 'Modern Physics';
  description: string;
  simulationType: 'PhET Interactive' | 'Virtual Lab Simulation';
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-1',
    title: 'Photoelectric Effect & Planck Constant Determination',
    category: 'Modern Physics',
    description: 'Vary light frequency and target metal work function to observe stopping potentials and photo-current saturation.',
    simulationType: 'PhET Interactive',
  },
  {
    id: 'exp-2',
    title: 'Rutherford Alpha Particle Scattering Simulation',
    category: 'Modern Physics',
    description: 'Observe differential scattering cross-sections off gold nuclei and deduce nuclear size bounds.',
    simulationType: 'Virtual Lab Simulation',
  },
  {
    id: 'exp-3',
    title: 'Franck-Hertz Experiment & Atomic Energy Quantization',
    category: 'Quantum Mechanics' as any,
    description: 'Demonstrate discrete inelastic collision energy loss of electrons passing through mercury vapor.',
    simulationType: 'Virtual Lab Simulation',
  },
  {
    id: 'exp-4',
    title: 'Michelson Interferometer & Wavelength Calibration',
    category: 'Optics',
    description: 'Translate movable mirror to count optical fringe shifts and calculate laser beam wavelengths.',
    simulationType: 'PhET Interactive',
  },
  {
    id: 'exp-5',
    title: 'Faraday Electromagnetic Induction & Magnetic Flux',
    category: 'Electromagnetism',
    description: 'Pass bar magnets through single and multi-turn coils to observe induced electromotive forces.',
    simulationType: 'PhET Interactive',
  },
  {
    id: 'exp-6',
    title: 'Coupled Harmonic Oscillators & Normal Modes',
    category: 'Mechanics',
    description: 'Examine symmetric and antisymmetric normal mode frequencies of spring-coupled dual pendulums.',
    simulationType: 'Virtual Lab Simulation',
  },
];

const CATEGORIES = ['All', 'Modern Physics', 'Electromagnetism', 'Optics', 'Mechanics'];

export default function PhysicsLabPage() {
  const { showToast } = useToast();
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeExp, setActiveExp] = useState<Experiment | null>(null);

  const filtered = EXPERIMENTS.filter(
    (e) => selectedCat === 'All' || e.category === selectedCat
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className="section-tag" style={{ gap: '0.4rem' }}>
            <Atom size={14} color="var(--primary-light)" /> Virtual Research Laboratory
          </div>
          <h1 className={styles.title}>Physics Laboratory Simulations</h1>
          <p className={styles.subtitle}>
            Conduct virtual experiments, vary apparatus parameters, and visualize physical phenomena in real time.
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.chips}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${selectedCat === c ? styles.chipActive : ''}`}
              onClick={() => setSelectedCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Experiment Cards */}
      <div className={styles.grid}>
        {filtered.map((exp) => (
          <div key={exp.id} className={styles.expCard}>
            <div className={styles.cardTop}>
              <span className={styles.categoryBadge}>{exp.category}</span>
              <span className={styles.simBadge}>{exp.simulationType}</span>
            </div>

            <h3 className={styles.expTitle}>{exp.title}</h3>
            <p className={styles.expDesc}>{exp.description}</p>

            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: 'auto' }}
              onClick={() => setActiveExp(exp)}
            >
              <Play size={15} fill="#fff" /> Launch Simulation
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Simulation Modal */}
      {activeExp && (
        <div className="modal-overlay">
          <div className={styles.simModal}>
            <div className={styles.modalHeader}>
              <div>
                <span className="badge badge-primary">{activeExp.category}</span>
                <h2 className={styles.modalTitle}>{activeExp.title}</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setActiveExp(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Simulation Canvas Viewport */}
            <div className={styles.simViewport}>
              <div className={styles.simApparatus}>
                <div className={styles.apparatusHeader}>
                  <span>Virtual Experiment Apparatus Running</span>
                  <span style={{ color: 'var(--success)' }}>● Real-Time ODE Solver Active</span>
                </div>
                <div className={styles.simulationGraphic}>
                  <div className={styles.circuitBox}>
                    <div className={styles.circuitItem}>Target Metal: <strong>Cesium (Work Function Φ = 2.14 eV)</strong></div>
                    <div className={styles.circuitItem}>Incident Photon Energy: <strong>hν = 3.82 eV</strong></div>
                    <div className={styles.circuitItem}>Stopping Potential: <strong>V_s = (hν - Φ)/e = 1.68 V</strong></div>
                    <div className={styles.circuitItem}>Max Kinetic Energy: <strong>K_max = 1.68 eV</strong></div>
                  </div>
                </div>
                <div className={styles.apparatusControls}>
                  <div className={styles.controlGroup}>
                    <label>Light Frequency (ν): 9.2 × 10¹⁴ Hz</label>
                    <input type="range" min="1" max="100" defaultValue="65" />
                  </div>
                  <div className={styles.controlGroup}>
                    <label>Retarding Voltage (V): -1.68 V</label>
                    <input type="range" min="0" max="50" defaultValue="16" />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <span>Physics simulations aligned with CSIR-NET Laboratory Practicals</span>
              <button className="btn btn-outline" onClick={() => setActiveExp(null)}>
                Close Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
