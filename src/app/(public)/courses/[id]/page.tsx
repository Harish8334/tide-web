// src/app/(public)/courses/[id]/page.tsx
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Rocket, Download, Phone, Package, Laptop, MessageSquare, BookOpen, Zap, GraduationCap, Atom, UserCheck, Users, Clock, Target, Radio } from 'lucide-react';
import styles from './page.module.css';

export const instant = false;

export async function generateStaticParams() {
  return [
    { id: 'pg-trb' },
    { id: 'edu-psychology-trb' },
    { id: 'ug-trb' },
    { id: 'poly-trb' },
    { id: 'tn-set' },
    { id: 'ap-trb' },
    { id: 'tn-scert-trb' },
    { id: 'engg-trb' },
    { id: 'csir-net' },
    { id: 'jee' },
    { id: 'neet' },
    { id: 'c1' },
    { id: 'c2' },
  ];
}

interface CourseData {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  duration?: number;
  instructor?: { name?: string; email?: string } | string;
  enrolledCount?: number;
  units?: {
    id?: string;
    title: string;
    description?: string;
    topics?: string[];
  }[];
  tags?: string;
}

const FALLBACK_CATALOG: Record<string, CourseData> = {
  'pg-trb': {
    _id: 'pg-trb',
    title: 'PG TRB Physics (Post Graduate Assistant)',
    description: 'Premier coaching program for Tamil Nadu Post Graduate Assistant Teachers Examination in Physics. Comprehensive coverage of Classical Mechanics, Quantum Mechanics, Solid State Physics, Nuclear Physics, Electronics and Optics with unit tests & 10-year previous year question solutions.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 4999,
    originalPrice: 9999,
    rating: 4.96,
    duration: 220,
    instructor: 'Tide Faculty Team (Tiruvannamalai)',
    enrolledCount: 840,
    units: [
      {
        title: 'Unit 1: Vector Fields & Classical Mechanics',
        description: 'Vector calculus, coordinate systems, D’Alembert principle, Lagrange and Hamilton equations, and small oscillations.',
        topics: ['Generalized Coordinates & Variational Principle', 'Central Force Motion & Kepler Laws', 'Poisson Brackets & Canonical Transformations', 'Rigid Body Motion & Euler Angles'],
      },
      {
        title: 'Unit 2: Quantum Mechanics & Wave Equations',
        description: 'Schrödinger wave equation, square wells, harmonic oscillator, angular momentum, and perturbation theory.',
        topics: ['Operators & Expectation Values', 'Hydrogen Atom Exact Solution', 'Perturbation Theory & Stark Effect', 'Identical Particles & Spin'],
      },
      {
        title: 'Unit 3: Solid State Physics & Electronics',
        description: 'Crystal structures, X-ray diffraction, band theory of solids, semiconductor devices, operational amplifiers, and digital logic.',
        topics: ['Reciprocal Lattice & Brillouin Zones', 'Superconductivity & Meissner Effect', 'Op-Amp Inverting & Non-Inverting Circuits', 'Logic Gates & Microprocessor Basics'],
      },
      {
        title: 'Unit 4: Nuclear, Particle & Atomic Spectroscopy',
        description: 'Nuclear models, radioactive decays, elementary particle classification, and Zeeman / Stark effects.',
        topics: ['Liquid Drop Model & Shell Model', 'Alpha, Beta & Gamma Transitions', 'Quarks & Conservation Laws', 'Vector Atom Model & LS Coupling'],
      },
    ],
  },
  'edu-psychology-trb': {
    _id: 'edu-psychology-trb',
    title: 'Education & Psychology TRB (Pedagogy & GK)',
    description: 'High-scoring pedagogy module for all TRB competitive examinations: Educational Psychology, Child Development, Teaching Methodology, Educational Policies, and General Knowledge with 3,000+ MCQs.',
    category: 'TRB Exams',
    level: 'Intermediate',
    price: 2999,
    originalPrice: 5999,
    rating: 4.92,
    duration: 120,
    instructor: 'Dr. Education Specialist',
    enrolledCount: 920,
    units: [
      {
        title: 'Unit 1: Human Growth, Development & Learning Theories',
        description: 'Stages of child growth, Piaget cognitive development, Bruner, Vygotsky, Skinner and Pavlov learning paradigms.',
        topics: ['Cognitive & Emotional Development', 'Operant & Classical Conditioning', 'Gestalt Insight Learning', 'Motivation & Memory Retention'],
      },
      {
        title: 'Unit 2: Personality, Intelligence & Assessment',
        description: 'Theories of intelligence, IQ tests, personality assessment, creativity, and mental health in the classroom.',
        topics: ['Spearman, Gardner & Guilford Models', 'Projective Techniques & Rating Scales', 'Guidance, Counseling & Adjustment', 'Classroom Behavior Management'],
      },
      {
        title: 'Unit 3: Educational Innovations & Tamil Nadu Policies',
        description: 'National and state educational policies, NEP, RTE, Samagra Shiksha, educational technology, and continuous comprehensive evaluation.',
        topics: ['Curriculum Design Principles', 'Modern Pedagogical Methodologies', 'Inclusive Education for Differently-Abled', 'Educational Statistics & Grading'],
      },
    ],
  },
  'ug-trb': {
    _id: 'ug-trb',
    title: 'UG TRB Physics (Graduate Teacher / B.T. Assistant)',
    description: 'Comprehensive coaching for Tamil Nadu Graduate Teachers (UG TRB) in Physics. Full Samacheer Kalvi & Graduate level syllabus with chapter-wise DPPs and model test series.',
    category: 'TRB Exams',
    level: 'Intermediate',
    price: 4499,
    originalPrice: 8999,
    rating: 4.9,
    duration: 180,
    instructor: 'Tide Faculty Team',
    enrolledCount: 710,
    units: [
      {
        title: 'Unit 1: Mechanics, Properties of Matter & Sound',
        description: 'Newtonian mechanics, elasticity, surface tension, viscosity, acoustics, and ultrasonic wave applications.',
        topics: ['Cantilever & Bending of Beams', 'Viscosity Poiseuille Flow', 'Doppler Effect & Architectural Acoustics', 'Ultrasonics Generation & Piezoelectric'],
      },
      {
        title: 'Unit 2: Thermal Physics & Optics',
        description: 'Kinetic theory of gases, thermodynamics cycles, entropy, interference, diffraction, polarization, and lasers.',
        topics: ['Carnot Engine & Maxwell Relations', 'Fresnel & Fraunhofer Diffraction', 'Quarter & Half Wave Plates', 'Laser Principles & Optical Fibers'],
      },
      {
        title: 'Unit 3: Electricity, Magnetism & Modern Physics',
        description: 'Electrostatics, magnetic effects of current, electromagnetic induction, special theory of relativity, and atomic models.',
        topics: ['Biot-Savart & Ampère Law', 'LCR Resonance & Transformers', 'Michelson-Morley Experiment', 'Bohr Atom & Photoelectric Effect'],
      },
    ],
  },
  'poly-trb': {
    _id: 'poly-trb',
    title: 'POLY TRB Physics (Polytechnic College Lecturers)',
    description: 'Specialized coaching for Tamil Nadu Government Polytechnic College Lecturer recruitment. High-yield engineering physics concepts, numerical calculations, and CBT simulator.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 5499,
    originalPrice: 10999,
    rating: 4.94,
    duration: 200,
    instructor: 'Senior Engineering Physics Panel',
    enrolledCount: 650,
    units: [
      {
        title: 'Unit 1: Engineering Physics & Mathematical Methods',
        description: 'Tensors, differential equations, Fourier transforms, crystal growth techniques, and thin film deposition.',
        topics: ['Vector Spaces & Orthogonal Coordinates', 'Fourier & Laplace Series', 'Crystal Imperfections & Defects', 'Non-Destructive Testing (NDT)'],
      },
      {
        title: 'Unit 2: Quantum Engineering & Electromagnetic Fields',
        description: 'Wave-particle duality, tunneling, Maxwell field equations, Poynting vector, and dielectric properties.',
        topics: ['Quantum Well, Wire & Dot Structures', 'Electromagnetic Wave Equations', 'Polarization Mechanisms & Clausius-Mossotti', 'Superconducting Quantum Devices (SQUID)'],
      },
    ],
  },
  'tn-set': {
    _id: 'tn-set',
    title: 'TN SET Physical Sciences (Assistant Professor)',
    description: 'Tamil Nadu State Eligibility Test (TN SET) Physical Sciences. Complete preparation for Paper 1 (Teaching & Research Aptitude) + Paper 2 (Core Physics) with 15-year solved papers.',
    category: 'TN SET & CSIR-NET',
    level: 'Advanced',
    price: 5999,
    originalPrice: 11999,
    rating: 4.95,
    duration: 250,
    instructor: 'Prof. Ananya Sen & Panel',
    enrolledCount: 580,
    units: [
      {
        title: 'Unit 1: Paper 1 Teaching & Research Aptitude',
        description: 'Teaching aptitude, research methodology, data interpretation, communication, higher education governance.',
        topics: ['Research Types & Ethics', 'ICT in Teaching', 'Data Interpretation & Reasoning', 'Environment & Higher Education System'],
      },
      {
        title: 'Unit 2: Paper 2 Core Physical Sciences',
        description: 'Mathematical physics, classical mechanics, electrodynamics, quantum mechanics, thermodynamics, and condensed matter.',
        topics: ['Complex Variables & Green Functions', 'Hamiltonian Dynamics', 'Relativistic Electrodynamics', 'Condensed Matter & Particle Physics'],
      },
    ],
  },
  'ap-trb': {
    _id: 'ap-trb',
    title: 'AP TRB (Assistant Professor TRB - Govt Arts & Science)',
    description: 'Prestige coaching for Collegiate Education Assistant Professor recruitment in Physics. Deep postgraduate curriculum, research orientation, and interview guidance.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 6499,
    originalPrice: 12999,
    rating: 4.97,
    duration: 260,
    instructor: 'Dr. Rajesh Sharma & Team',
    enrolledCount: 520,
    units: [
      {
        title: 'Unit 1: Advanced Postgraduate Physics Core',
        description: 'Higher quantum mechanics, statistical mechanics, relativistic electrodynamics, and solid state physics.',
        topics: ['Dirac Equation & Covariant Formulation', 'Ensembles & Partition Functions', 'Superconductivity & Quantum Hall Effect', 'Non-linear Dynamics & Chaos'],
      },
      {
        title: 'Unit 2: Research Aptitude & Interview Viva Coaching',
        description: 'Research proposals, academic presentations, subject viva simulation, and pedagogical lecture demonstration.',
        topics: ['Research Methodology & Journal Publication', 'Viva Voce Mock Panels', 'Board Presentation Techniques', 'Classroom Pedagogy Demonstration'],
      },
    ],
  },
  'tn-scert-trb': {
    _id: 'tn-scert-trb',
    title: 'TN SCERT TRB Physics (Senior / DIET Lecturer)',
    description: 'Structured preparation for Tamil Nadu SCERT & DIET Lecturer recruitment examinations in Physics with pedagogy, curriculum methodology, and full-length model exams.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 5499,
    originalPrice: 10999,
    rating: 4.91,
    duration: 190,
    instructor: 'Tide Faculty Panel',
    enrolledCount: 430,
    units: [
      {
        title: 'Unit 1: Core Physics Specialization',
        description: 'Mechanics, Electromagnetism, Quantum Theory, and Modern Physics for senior educational researchers.',
        topics: ['Theoretical Frameworks in Physics', 'Laboratory Practical Development', 'Scientific Inquiry Models', 'Diagnostic Testing & Remedial Teaching'],
      },
    ],
  },
  'engg-trb': {
    _id: 'engg-trb',
    title: 'Engg. TRB Physics (Govt Engineering Colleges)',
    description: 'Targeted coaching for Tamil Nadu Government Engineering Colleges Lecturer recruitment in Physics. Advanced mathematical methods, electrodynamics, quantum physics, and thermodynamics.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 5999,
    originalPrice: 11999,
    rating: 4.93,
    duration: 210,
    instructor: 'Senior Engineering Physics Panel',
    enrolledCount: 490,
    units: [
      {
        title: 'Unit 1: Mathematical Physics & Computational Methods',
        description: 'Complex variables, special functions, numerical methods, and differential equations in physics.',
        topics: ['Bessel & Legendre Functions', 'Runge-Kutta & Finite Difference Methods', 'Boundary Value Problems', 'Integral Transforms'],
      },
    ],
  },
  'csir-net': {
    _id: 'csir-net',
    title: 'CSIR - NET Physical Science (JRF & Lectureship)',
    description: 'National benchmark coaching for CSIR UGC-NET JRF in Physical Sciences. 350+ hours live classes covering Parts A, B, and C with full mock test series and printed study kits.',
    category: 'TN SET & CSIR-NET',
    level: 'Advanced',
    price: 6999,
    originalPrice: 13999,
    rating: 4.98,
    duration: 350,
    instructor: 'Prof. Ananya Sen (CSIR-NET AIR 3)',
    enrolledCount: 1120,
    units: [
      {
        title: 'Unit 1: Mathematical Physics & Classical Mechanics',
        description: 'Tensors, Green functions, contour integration, Lagrangian and Hamiltonian mechanics, small oscillations.',
        topics: ['Cauchy Residue Theorem', 'Canonical Transformations', 'Central Force Problems', 'Hamilton-Jacobi Theory'],
      },
      {
        title: 'Unit 2: Quantum Mechanics & Electrodynamics',
        description: 'Bra-ket notation, perturbation methods, scattering, Maxwell equations, relativistic kinematics and radiation.',
        topics: ['Variational & WKB Methods', 'Dirac Equation', 'Retarded Potentials & Larmor Formula', 'Waveguides & Cavities'],
      },
    ],
  },
  'jee': {
    _id: 'jee',
    title: 'JEE Physics (Main & Advanced Foundation & Ranker)',
    description: 'Conceptual intuition and rigorous numerical problem-solving for IIT-JEE Main & Advanced. In-depth HC Verma, Irodov, and 20-year PYQ mastery.',
    category: 'School & Competitive',
    level: 'Intermediate',
    price: 4999,
    originalPrice: 9999,
    rating: 4.95,
    duration: 280,
    instructor: 'IITian Physics Faculty',
    enrolledCount: 880,
    units: [
      {
        title: 'Unit 1: Mechanics & Rotational Motion',
        description: 'Kinematics, Newton laws, work power energy, center of mass, rotational dynamics, and gravitation.',
        topics: ['Moment of Inertia Theorems', 'Rolling Without Slipping', 'Planetary Motion & Orbits', 'Collision in 2D'],
      },
    ],
  },
  'neet': {
    _id: 'neet',
    title: 'NEET Physics (Medical Entrance Score Booster 160+)',
    description: 'Master NEET Physics with line-by-line NCERT coverage, speed-solving tricks, formula handbooks, daily 50-MCQ sheets, and full-length OMR test simulation.',
    category: 'School & Competitive',
    level: 'Intermediate',
    price: 4499,
    originalPrice: 8999,
    rating: 4.94,
    duration: 240,
    instructor: 'Medical Physics Mentor',
    enrolledCount: 950,
    units: [
      {
        title: 'Unit 1: NCERT High-Yield Core Mechanics & Optics',
        description: 'Units & dimensions, motion in a straight line, laws of motion, ray optics, wave optics, and modern physics.',
        topics: ['Dimensional Analysis Shortcuts', 'Projectile Motion Tricks', 'Ray Optics Lens Maker Formula', 'Photoelectric Effect & Nuclear Binding Energy'],
      },
    ],
  },
  c1: {
    _id: 'c1',
    title: 'Advanced Quantum Mechanics',
    description: 'Comprehensive graduate-level curriculum covering Schrödinger wave packets in 3D, Hilbert space formalism, angular momentum algebra, identical particles, and time-independent & time-dependent perturbation theory.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 4999,
    originalPrice: 9999,
    rating: 4.9,
    duration: 180,
    instructor: 'Dr. Rajesh Sharma (Ex-IIT Delhi)',
    enrolledCount: 1420,
    units: [
      {
        title: 'Unit 1: Mathematical Foundations & Dirac Ket Formalism',
        description: 'Linear vector spaces, Hilbert spaces, operators, observables, uncertainty relations, and spectral decomposition theorem.',
        topics: ['Dirac Bra-Ket Algebra', 'Wave Packet Dispersion', 'Generalized Uncertainty Principle', 'Matrix Mechanics Representation'],
      },
    ],
  },
  c2: {
    _id: 'c2',
    title: 'Classical Electrodynamics',
    description: 'Maxwell equations in tensor notation, relativistic kinematics, radiation by moving charges, waveguides, and resonant cavities.',
    category: 'TRB Exams',
    level: 'Advanced',
    price: 4999,
    originalPrice: 9999,
    rating: 4.8,
    duration: 160,
    instructor: 'Dr. Vikram Malhotra (IISc Bangalore)',
    enrolledCount: 1250,
    units: [
      {
        title: 'Unit 1: Boundary Value Problems in Electrostatics',
        description: 'Laplace and Poisson equations, method of images, separation of variables, and multipole expansions.',
        topics: ['Spherical Harmonics', 'Green Functions', 'Dielectric Boundary Conditions', 'Electrostatic Energy Density'],
      },
      {
        title: 'Unit 2: Maxwell Equations & Relativistic Electrodynamics',
        description: 'Electromagnetic field tensor F^μν, Lorentz transformations of E and B fields, covariant formulation, and gauge symmetry.',
        topics: ['Lorenz and Coulomb Gauges', 'Four-Current Density', 'Dual Field Tensor', 'Poynting Vector & Conservation Laws'],
      },
      {
        title: 'Unit 3: Electromagnetic Wave Propagation & Guides',
        description: 'Propagation in linear media, dispersion relations, TE and TM modes in rectangular and circular metallic waveguides.',
        topics: ['Cutoff Frequencies', 'Waveguide Attenuation', 'Skin Depth & Plasma Frequency', 'Resonant Cavity Modes'],
      },
      {
        title: 'Unit 4: Radiation by Accelerated Charges',
        description: 'Retarded potentials, Liénard-Wiechert potentials, Larmor formula, synchrotron radiation, and bremsstrahlung.',
        topics: ['Retarded Green Function', 'Electric Dipole Radiation', 'Relativistic Beaming', 'Radiation Reaction Force'],
      },
    ],
  },
  c3: {
    _id: 'c3',
    title: 'CSIR-NET Physical Sciences Comprehensive',
    description: 'Complete high-yield crash course and test series designed specifically for CSIR-NET JRF and State Eligibility Tests. Covers full 9 core modules with solved 10-year previous year question banks.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    price: 5999,
    originalPrice: 11999,
    rating: 4.95,
    duration: 350,
    instructor: 'Prof. Ananya Sen & Senior Faculty Panel',
    enrolledCount: 3100,
    units: [
      {
        title: 'Unit 1: Mathematical Physics & Complex Analysis',
        description: 'Vector calculus, tensor algebra, Fourier & Laplace transforms, complex contour integrals, and residue calculus.',
        topics: ['Cauchy Residue Theorem', 'Green Function Solutions', 'Special Functions (Bessel, Legendre, Hermite)', 'Group Theory Basics'],
      },
      {
        title: 'Unit 2: Classical Mechanics & Hamiltonian Dynamics',
        description: 'Lagrangian & Hamiltonian formulations, canonical transformations, Poisson brackets, action-angle variables, and small oscillations.',
        topics: ['Generalized Coordinates', 'Central Force Problems', 'Hamilton-Jacobi Theory', 'Rigid Body Euler Angles'],
      },
      {
        title: 'Unit 3: Condensed Matter & Solid State Physics',
        description: 'Reciprocal lattices, X-ray diffraction, phonon dispersions, tight-binding models, superconductivity, and BCS theory.',
        topics: ['Bragg Law & Structure Factors', 'Band Theory & Kronig-Penney', 'Meissner Effect & London Equations', 'Semiconductor Doping'],
      },
      {
        title: 'Unit 4: Nuclear, Particle & Atomic Physics',
        description: 'Liquid drop and shell models, alpha-beta-gamma decays, quark models, Gell-Mann Nishijima formula, and Zeeman effect.',
        topics: ['Semi-Empirical Mass Formula', 'Selection Rules in Nuclear Transitions', 'Isospin Symmetry', 'Fine & Hyperfine Transitions'],
      },
    ],
  },
};

const API_BASE = 'http://52.64.117.32:8000/api';

async function getCourse(id: string): Promise<CourseData | null> {
  // Try remote live backend first
  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      next: { revalidate: 60 },
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      const course = json.data || json;
      if (course && course._id) {
        return {
          _id: course._id,
          title: course.title,
          description: course.description,
          category: course.category || 'Physics',
          level: course.level || 'Advanced',
          price: course.price || 5999,
          originalPrice: course.originalPrice || Math.round((course.price || 5999) * 1.8),
          rating: course.rating || 4.9,
          duration: course.duration || 180,
          instructor: course.instructor?.name || 'Senior Academic Faculty',
          enrolledCount: course.maxStudents ? course.maxStudents * 15 : 1250,
          tags: course.tags,
          units: course.units && course.units.length > 0 ? course.units : [
            {
              title: 'Module 1: Fundamental Concepts & Problem Sets',
              description: course.description || 'Core theoretical principles, rigorous problem solving, and practice drills.',
              topics: course.tags ? course.tags.split(' ').slice(0, 4) : ['Core Theory', 'Numerical Practice', 'Formula Revision'],
            },
            {
              title: 'Module 2: Advanced Topics & Exam Mastery',
              description: 'In-depth derivations, high-yield previous year question patterns, and speed drills.',
              topics: course.tags ? course.tags.split(' ').slice(4, 8) : ['Advanced Applications', 'PYQ Solutions', 'Mock Tests'],
            },
          ],
        };
      }
    }
  } catch {
    // Fall through to fallback catalog
  }

  // Check fallback catalog
  if (FALLBACK_CATALOG[id]) {
    return FALLBACK_CATALOG[id];
  }

  // Generic fallback for any requested ID
  return {
    _id: id,
    title: id.startsWith('c') ? 'CSIR-NET & GATE Physics Masterclass' : 'Advanced Physical Sciences Specialization',
    description: 'Comprehensive curriculum prepared by Tide Physics Academy faculty council. Includes 350+ hours live interactive classes, printed study kits, DPPs, and all-India mock test series.',
    category: 'CSIR-NET/GATE',
    level: 'Advanced',
    price: 4999,
    originalPrice: 9999,
    rating: 4.9,
    duration: 180,
    instructor: 'Dr. Rajesh Sharma & Faculty Council',
    enrolledCount: 1540,
    units: [
      {
        title: 'Unit 1: Core Theoretical Foundations',
        description: 'Complete syllabus breakdown, fundamental mathematical tools, and conceptual clarity sessions.',
        topics: ['Mathematical Physics', 'Vector Analysis', 'Differential Equations', 'Boundary Problems'],
      },
      {
        title: 'Unit 2: Advanced Problem Solving & Numerical Keys',
        description: 'Step-by-step previous year question solutions with time-saving shortcut techniques.',
        topics: ['CSIR-NET PYQs (2015-2025)', 'GATE Physics Numerical Answer Type (NAT)', 'Mock Tests'],
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return {
      title: 'Course Not Found | Tide Physics Academy',
    };
  }

  const rawDesc = course.description || `Enroll in ${course.title} at Tide Physics Academy. Complete online batch with live classes, study kits, and mock exams.`;
  const cleanDesc = rawDesc.length > 155 ? `${rawDesc.slice(0, 152).trim()}...` : rawDesc;
  const safeDesc = cleanDesc.length < 50 ? `${cleanDesc} Join India's top physics mentorship institute today.` : cleanDesc;

  return {
    title: course.title.length > 45 ? course.title.slice(0, 45) : course.title,
    description: safeDesc,
    alternates: {
      canonical: `https://tidephysics.com/courses/${id}`,
    },
    openGraph: {
      title: `${course.title} | Tide Physics`,
      description: safeDesc,
      type: 'article',
      url: `https://tidephysics.com/courses/${id}`,
      siteName: 'Tide Physics Academy',
      images: [
        {
          url: 'https://tidephysics.com/logo.png',
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    keywords: [
      course.title,
      `${course.title} coaching`,
      `${course.category} online classes`,
      'Tide Physics Academy',
    ],
  };
}

export default async function PublicCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  const instructorName =
    typeof course.instructor === 'object' && course.instructor !== null
      ? course.instructor.name || 'Senior Academic Faculty'
      : (course.instructor as string) || 'Senior Academic Faculty';

  const discountPercent =
    course.originalPrice && course.price && course.originalPrice > course.price
      ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
      : 0;

  // Schema.org Course structured data
  const jsonLdCourse = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Tide Physics Academy',
      sameAs: 'https://tidephysics.com',
    },
    offers: {
      '@type': 'Offer',
      price: course.price || 4999,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      instructor: {
        '@type': 'Person',
        name: instructorName,
      },
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCourse) }}
      />

      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/courses">All Courses</Link>
            <span>›</span>
            <span>{course.title}</span>
          </div>

          <div className={styles.heroContent}>
            <div>
              <div className={styles.badgeRow}>
                <span className={styles.categoryBadge}>{course.category || 'Physics'}</span>
                <span className={styles.liveBadge}>
                  <span className={styles.pulseDot} />
                  Live Interactive Batch
                </span>
                <span className={styles.categoryBadge}>⭐ {course.rating || 4.9} / 5.0 Rating</span>
              </div>

              <h1 className={styles.courseTitle}>{course.title}</h1>
              <p className={styles.courseSubtitle}>{course.description}</p>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><UserCheck size={14} color="#0056D2" /> Faculty:</span>
                  <strong>{instructorName}</strong>
                </div>
                <div className={styles.metaItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Users size={14} color="#0056D2" /> Enrolled:</span>
                  <strong>{(course.enrolledCount || 1400).toLocaleString('en-IN')}+ Aspirants</strong>
                </div>
                <div className={styles.metaItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={14} color="#0056D2" /> Duration:</span>
                  <strong>{course.duration || 180} Hours (6 Months Access)</strong>
                </div>
                <div className={styles.metaItem}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><GraduationCap size={14} color="#0056D2" /> Level:</span>
                  <strong>{course.level || 'Advanced'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className={styles.mainLayout}>
          {/* Left Column: Curriculum & Highlights */}
          <div className={styles.contentCol}>
            {/* Key Deliverables Highlights */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={22} color="#0056D2" /> What&apos;s Included in this Program
              </h2>
              <div className={styles.highlightsGrid}>
                <div className={styles.highlightTile}>
                  <span className={styles.highlightIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Radio size={22} color="#DC2626" />
                  </span>
                  <div>
                    <h4>Live HD WebRTC Classes</h4>
                    <p>Interactive two-way audio doubt sessions with daily recordings archive.</p>
                  </div>
                </div>

                <div className={styles.highlightTile}>
                  <span className={styles.highlightIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={22} color="#7C3AED" />
                  </span>
                  <div>
                    <h4>Printed Theory Kits</h4>
                    <p>Free home delivery of spiral-bound theory modules and formula handbooks.</p>
                  </div>
                </div>

                <div className={styles.highlightTile}>
                  <span className={styles.highlightIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Laptop size={22} color="#0056D2" />
                  </span>
                  <div>
                    <h4>CBT Mock Test Simulator</h4>
                    <p>50+ full-length tests replicating the actual NTA CSIR-NET computer screen.</p>
                  </div>
                </div>

                <div className={styles.highlightTile}>
                  <span className={styles.highlightIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageSquare size={22} color="#22C55E" />
                  </span>
                  <div>
                    <h4>24/7 WhatsApp Doubt Desk</h4>
                    <p>Dedicated subject-matter expert mentorship channel for instant clarification.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Curriculum Syllabus */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={22} color="#0056D2" /> Comprehensive Course Syllabus &amp; Modules
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Curated strictly in accordance with latest CSIR-HRDG and GATE Physics guidelines.
              </p>

              <div className={styles.unitList}>
                {course.units?.map((u, idx) => (
                  <div key={idx} className={styles.unitCard}>
                    <div className={styles.unitHeader}>
                      <div className={styles.unitHeaderLeft}>
                        <span className={styles.unitTag}>Module {idx + 1}</span>
                        <span className={styles.unitTitle}>{u.title}</span>
                      </div>
                    </div>
                    <div className={styles.unitBody}>
                      {u.description && <p className={styles.unitDesc}>{u.description}</p>}
                      {u.topics && u.topics.length > 0 && (
                        <div className={styles.topicsList}>
                          {u.topics.map((t, tIdx) => (
                            <span key={tIdx} className={styles.topicChip} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              <Zap size={12} color="#F59E0B" /> {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Faculty Bio Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={22} color="#0056D2" /> Academic Faculty &amp; Mentor Profile
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B0C75 0%, #673DE6 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Atom size={34} color="#FFFFFF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
                    {instructorName}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#673DE6', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                    Senior Faculty — Tide Physics Academy Council
                  </p>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    Over 14+ years of dedicated mentoring for CSIR-NET JRF, GATE Physical Sciences, and M.Sc Physics entrances. Has guided 50+ Top 10 All-India Rankers across prestigious Indian institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Admission Box */}
          <aside className={styles.sidebarCol}>
            <div className={styles.enrollCard}>
              <div className={styles.pricingBlock}>
                <div className={styles.priceRow}>
                  <span className={styles.currentPrice}>₹{(course.price || 4999).toLocaleString('en-IN')}</span>
                  {course.originalPrice && course.originalPrice > (course.price || 4999) && (
                    <>
                      <span className={styles.originalPrice}>₹{course.originalPrice.toLocaleString('en-IN')}</span>
                      <span className={styles.discountChip}>{discountPercent}% OFF</span>
                    </>
                  )}
                </div>
                <span className={styles.taxNotice}>*Inclusive of all GST, printed books courier, and digital test series.</span>
              </div>

              <ul className={styles.featuresChecklist}>
                <li className={styles.featureLi}>
                  <span className={styles.checkMark}><Check size={14} strokeWidth={3} /></span>
                  <span>Daily 1080p Live Interactive Sessions</span>
                </li>
                <li className={styles.featureLi}>
                  <span className={styles.checkMark}><Check size={14} strokeWidth={3} /></span>
                  <span>Handwritten PDF Class Notes + Doorstep Books</span>
                </li>
                <li className={styles.featureLi}>
                  <span className={styles.checkMark}><Check size={14} strokeWidth={3} /></span>
                  <span>50+ Full-Length National CBT Mock Tests</span>
                </li>
                <li className={styles.featureLi}>
                  <span className={styles.checkMark}><Check size={14} strokeWidth={3} /></span>
                  <span>10-Year Solved CSIR &amp; GATE PYQs with Video Keys</span>
                </li>
                <li className={styles.featureLi}>
                  <span className={styles.checkMark}><Check size={14} strokeWidth={3} /></span>
                  <span>Personalized Faculty Mentor on WhatsApp</span>
                </li>
              </ul>

              <Link
                href={`/login?redirect=/student/courses/${course._id}`}
                className={styles.enrollBtnLarge}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                Enroll Now in Live Batch <Rocket size={18} />
              </Link>

              <a
                href="https://wa.me/919994854604?text=Hi%20Tide%20Physics%20Academy,%20please%20send%20the%20detailed%20syllabus%20brochure%20for%20this%20batch."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.syllabusBtn}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <Download size={16} /> Download Detailed Syllabus PDF
              </a>

              <div className={styles.helplineNote}>
                Need help deciding? Speak with our Chief Academic Counsellor:
                <br />
                <a href="tel:9994854604" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
                  <Phone size={14} /> 9994854604 / 9994850604
                </a> (8:30 AM – 7:30 PM)
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
